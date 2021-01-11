const { Block, Inline, Text, Value } = require("slate");
const Y = require("yjs");
const { toSyncDoc } = require("../src");

const createList = (children, properties = {}) => {
  const { indentation = 1, itemType = "bullet" } = properties;
  let orderNumber = 0;
  return Block.fromJSON({
    object: "block",
    type: "list",
    data: {},
    nodes: children.map(child => {
      orderNumber = orderNumber + 1;
      return Block.fromJSON({
        object: "block",
        type: "list_item",
        data: {
          indentation,
          itemType,
          orderNumber
        },
        nodes: [ child ],
      })
    })
  });
};

const createLine = (children, properties = {}) => {
  return Block.fromJSON({
    object: "block",
    type: "line",
    data: properties,
    nodes: children,
  });
};

const createMention = (children, properties = {}) => {
  return Inline.fromJSON({
    object: "inline",
    type: "mention",
    data: properties,
    nodes: children,
  });
};

const createText = (text = "") => {
  return Text.fromJSON({
    object: "text",
    leaves: [
      {
        object: "leaf",
        text,
        marks: [],
      },
    ],
  });
};

const createSlateValue = (properties) => {
  return Value.create().change().setValue({ data: properties }).value.data;
};

const createDoc = (children) => {
  const doc = new Y.Doc();
  const innerDocument = doc.getMap("content");

  toSyncDoc(innerDocument, Value.create({ document: { nodes: children } }));

  return doc;
};

module.exports = {
  createList,
  createLine,
  createMention,
  createText,
  createDoc,
  createSlateValue,
};
