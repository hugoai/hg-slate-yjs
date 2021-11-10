import { Operation, Node, Editor, createEditor } from 'slate';
import { applySlateOps, toSlateDoc } from '../../src';
import { createNode, createSyncDoc, createText } from '../utils';

const transforms = [
  [
    'insert_text',
    [createNode('paragraph')],
    [
      {
        offset: 0,
        path: [0, 0],
        text: 'Hello ',
        type: 'insert_text',
      },
      {
        offset: 6,
        path: [0, 0],
        text: 'collaborator',
        type: 'insert_text',
      },
      {
        offset: 18,
        path: [0, 0],
        text: '!',
        type: 'insert_text',
      },
    ],
    [createNode('paragraph', 'Hello collaborator!')],
  ],
  [
    'remove_text',
    [createNode('paragraph', 'Hello collaborator!')],
    [
      {
        offset: 11,
        path: [0, 0],
        text: 'borator',
        type: 'remove_text',
      },
      {
        offset: 5,
        path: [0, 0],
        text: ' colla',
        type: 'remove_text',
      },
    ],
    [createNode('paragraph', 'Hello!')],
  ],
  [
    'insert_node',
    [createNode()],
    [
      {
        type: 'insert_node',
        path: [1],
        node: createNode('paragraph', 'Hello collaborator!'),
      },
    ],
    [createNode(), createNode('paragraph', 'Hello collaborator!')],
  ],
  [
    'merge_node',
    [
      createNode('paragraph', 'Hello '),
      createNode('paragraph', 'collaborator!'),
    ],
    [
      {
        path: [1],
        position: 1,
        properties: { type: 'paragraph' },

        type: 'merge_node',
      },
      {
        path: [0, 1],
        position: 6,
        properties: {},

        type: 'merge_node',
      },
    ],
    [createNode('paragraph', 'Hello collaborator!')],
  ],
  [
    'move_node',
    [
      createNode('paragraph', 'first'),
      createNode('paragraph', 'second'),
      createNode('paragraph', 'third'),
      createNode('paragraph', 'fourth'),
    ],
    [
      {
        newPath: [0],
        path: [1],
        type: 'move_node',
      },
      {
        newPath: [3, 0],
        path: [2, 0],
        type: 'move_node',
      },
    ],
    [
      createNode('paragraph', 'second'),
      createNode('paragraph', 'first'),
      createNode('paragraph'),
      {
        type: 'paragraph',
        children: [createText('thirdfourth')],
      },
    ],
  ],
  [
    'remove_node',
    [
      createNode('paragraph', 'first'),
      createNode('paragraph', 'second'),
      createNode('paragraph', 'third'),
    ],
    [
      {
        path: [1, 0],
        type: 'remove_node',
      },
      {
        path: [0],
        type: 'remove_node',
      },
    ],
    [createNode('paragraph'), createNode('paragraph', 'third')],
  ],
  [
    'set_node',
    [
      createNode('paragraph', 'first', { test: '1234' }),
      createNode('paragraph', 'second'),
    ],
    [
      {
        path: [0],
        type: 'set_node',
        properties: {},
        newProperties: {
          test: '4567',
        },
      },
    ],
    [
      createNode('paragraph', 'first', { test: '4567' }),
      createNode('paragraph', 'second'),
    ],
  ],
  [
    'split_node',
    [createNode('paragraph', 'Hello collaborator!')],
    [
      {
        path: [0, 0],
        position: 6,
        properties: {},

        type: 'split_node',
      },
      {
        path: [0],
        position: 1,
        properties: {
          type: 'paragraph',
        },
        target: 6,
        type: 'split_node',
      },
    ],
    [
      createNode('paragraph', 'Hello '),
      createNode('paragraph', 'collaborator!'),
    ],
  ],
  [
    'add_mark',
    [createNode('paragraph', 'hotel uniform golf oscar')],
    [
      {
        path: [0, 0],
        position: 6,
        properties: {},

        type: 'split_node',
      },
      {
        path: [0, 0],
        properties: {},
        newProperties: {
          em: true,
        },
        type: 'set_node',
      },
      {
        path: [0, 1],
        position: 7,
        properties: {},

        type: 'split_node',
      },
      {
        path: [0, 1],
        properties: {},
        newProperties: {
          em: true,
          strong: true,
        },
        type: 'set_node',
      },
      {
        path: [0, 2],
        position: 5,
        properties: {},

        type: 'split_node',
      },
      {
        path: [0, 2],
        properties: {},
        newProperties: {
          strong: true,
        },
        type: 'set_node',
      },
    ],
    [
      {
        type: 'paragraph',
        children: [
          { text: 'hotel ', em: true },
          { text: 'uniform', em: true, strong: true },
          { text: ' golf', strong: true },
          { text: ' oscar' },
        ],
      },
    ],
  ],
  [
    'remove_mark',
    [
      {
        type: 'paragraph',
        children: [
          { text: 'hotel ', em: true },
          { text: 'uniform', em: true, strong: true },
          { text: ' golf', strong: true },
          { text: ' oscar' },
        ],
      },
    ],
    [
      {
        path: [0, 0],
        properties: { em: true },
        newProperties: {},
        type: 'set_node',
      },
      {
        path: [0, 1],
        properties: { em: true, strong: true },
        newProperties: {},
        type: 'set_node',
      },
      {
        path: [0, 2],
        properties: { strong: true },
        newProperties: {},
        type: 'set_node',
      },
    ],
    [createNode('paragraph', 'hotel uniform golf oscar')],
  ],
  [
    // TODO: check the new way to add text with marks
    'insert_text with mark',
    [createNode('paragraph', 'test')],
    [
      {
        offset: 1,
        path: [0, 0],
        text: 'acos are b',
        type: 'insert_text',
      },
      {
        path: [0, 0],
        position: 11,
        properties: {},
        type: 'split_node',
      },
      {
        path: [0, 0],
        position: 1,
        properties: { em: true },
        type: 'split_node',
      },
    ],
    [
      {
        type: 'paragraph',
        children: [
          { text: 't' },
          { text: 'acos are b', em: true },
          { text: 'est' },
        ],
      },
    ],
  ],
];

describe('apply slate operations to document', () => {
  transforms.forEach(([op, input, operations, output]) => {
    it(`apply ${op} operations`, () => {
      const editor = createEditor();
      const doc = createSyncDoc(input as Node[]);
      const content = doc.getMap('content');
      doc.transact(() => {
        applySlateOps(
          content.get('document'),
          operations as Operation[],
          undefined
        );
      });
      editor.children = toSlateDoc(content.get('document'));
      Editor.normalize(editor, { force: true });

      expect(output).toEqual(editor.children);
    });
  });
});

describe('apply Invalid slate operation to document', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  it(`should not change the document`, () => {
    const doc = createSyncDoc([{ text: 'test' }]);
    const content = doc.getMap('content');
    expect(() => {
      doc.transact(() => {
        applySlateOps(
          content.get('document'),
          [{ type: 'invalid' }] as never,
          undefined
        );
      });
    }).toThrow();
  });
});
