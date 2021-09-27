import { createEditor, Node, Operation } from 'slate';
import * as Y from 'yjs';
import { toSlateDoc, toSyncDoc } from '../../src';
import { toSlateOps } from '../../src/applyToSlate';
import { createNode, createList, createMention, createText } from '../utils';

const tests: Array<[string, Node]> = [
  [
    'block node with inline',
    {
      type: 'paragraph',
      children: [
        createText('ghi'),
        createMention([createText('@jkl')]),
        createText(''),
      ],
    },
  ],
  [
    'block node with properties',
    createNode('paragraph', 'mno', { pqr: 'stu' }),
  ],
  [
    'text with marks',
    {
      type: 'paragraph',
      children: [
        { text: 'ab' },
        {
          text: 'cde',
          strong: true,
        },
        {
          text: 'fghi',
          em: true,
          underline: true,
        },
        { text: 'jklmn' },
      ],
    },
  ],
  [
    'bullet list',
    createList(
      [
        createNode('paragraph', 'abcd'),
        createNode('paragraph', 'efgh'),
        createNode('paragraph', 'ijkl'),
      ],
      { itemType: 'bullet' }
    ),
  ],
  [
    'numbered list',
    createList(
      [
        createNode('paragraph', 'mnop'),
        createNode('paragraph', 'qrst'),
        createNode('paragraph', 'uvwx'),
      ],
      { itemType: 'number' }
    ),
  ],
];

// const nodeToJS = (node) => node.toJS();

describe('convert', () => {
  tests.forEach(([testName, input]) => {
    it(`${testName}`, () => {
      const doc = new Y.Doc();
      const syncDoc = doc.getMap('content');

      toSyncDoc(syncDoc, { document: [input] });
      const output = toSlateDoc(syncDoc.get('document'));
      expect(output).toStrictEqual([input]);
    });
  });

  it('should create insert_node Slate operations when creating a document', () => {
    const editor = createEditor();

    const doc = new Y.Doc();
    const syncDoc = doc.getMap('content');
    const operations: Operation[] = [];
    syncDoc.observeDeep((events) => {
      const ops = toSlateOps(editor, events);
      operations.push(...ops);
    });

    const value = {
      document: [
        createNode('paragraph', 'Line 1'),
        {
          type: 'paragraph',
          children: [{ text: 'Line 2', strong: true }],
        },
      ],
    };

    toSyncDoc(syncDoc, value);
    expect(operations).toHaveLength(2);
    expect(operations).toEqual([
      {
        type: 'insert_node',
        path: [0],
        node: {
          children: [
            {
              text: 'Line 1',
            },
          ],
          type: 'paragraph',
        },
      },
      {
        type: 'insert_node',
        path: [1],
        node: {
          children: [
            {
              text: 'Line 2',
              strong: true,
            },
          ],
          type: 'paragraph',
        },
      },
    ]);
  });
});
