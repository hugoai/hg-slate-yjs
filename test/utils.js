const { Block, Inline, Text, Value } = require('slate');
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

const createSlateValue = (properties) => {
  return Value.create().change().setValue({data:properties}).value.data
}

const createDoc = (children) => {
  const doc = new Y.Doc();
  const innerDocument = new Y.Array()

  toSyncDoc(innerDocument, createValue(children).children)

  doc.getMap('content').set('document', innerDocument)
  doc.getMap('content').set('data', new Y.Map())

  return doc;
};

module.exports = { createLine, createMention, createText, createDoc, createSlateValue };
