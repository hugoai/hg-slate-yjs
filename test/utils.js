const { Block, Inline, Text } = require('slate');
const Y = require('yjs');
const { toSyncDoc } = require('../src');

const createLine = (children, properties = {}) => {
  return Block.fromJSON({
    object: 'block',
    type: 'line',
    data: properties,
    nodes: children,
  });
};

const createMention = (children, properties = {}) => {
  return Inline.fromJSON({
    object: 'inline',
    type: 'mention',
    data: properties,
    nodes: children,
  });
};

const createText = (text = '') => {
  return Text.fromJSON({
    object: 'text',
    leaves: [
      {
        object: 'leaf',
        text,
        marks: [],
      }
    ],
  });
};

const createValue = (children) => ({
  children: children || [createNode()]
});

const createDoc = (children) => {
  const doc = new Y.Doc();
  toSyncDoc(doc.getArray('content'), createValue(children).children);
  return doc;
};

module.exports = { createLine, createMention, createText, createDoc };
