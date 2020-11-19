const { toSlateDoc, toSyncDoc } = require('../../src');
const { createLine, createMention, createText } = require('../utils');
const Y = require('yjs');

const tests = [
  [
    'text node',
    createText('abc')
  ],
  [
    'inline node',
    createMention([createText('@def')])
  ],
  [
    'block node',
    createLine([
      createText('ghi'), 
      createMention([createText('@jkl')])
    ])
  ],
  [
    'block node with properties',
    createLine([createText('mno')], { pqr: 'stu' })
  ],
];

const nodeToJS = (node) => node.toJS();

describe('convert', () => {
  tests.forEach(([testName, input]) => {
    it(`${testName}`, () => {
      const doc = new Y.Doc();
      const syncDoc = doc.getArray('content');

      toSyncDoc(syncDoc, [input]);
      const output = toSlateDoc(syncDoc);
      expect(output.map(nodeToJS)).toStrictEqual([nodeToJS(input)]);
    });
  });
});
