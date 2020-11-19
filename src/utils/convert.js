const { Block, Inline, Text } = require('slate');
const isPlainObject = require('is-plain-object');
const Y = require('yjs');
const { SyncElement } = require('../model');
const { Set } = require('immutable');

/**
 * isElement(value): boolean
 */
const isElement = (value) => {
  // object: block | inline
  return isPlainObject(value) && Array.isArray(value.nodes);
};

/**
 * Converts a sync element to a slate node
 *
 * toSlateNode(element: SyncElement): Node
 */
const toSlateNode = (element) => {
  let attrs = {};
  for (const [key, value] of element.entries()) {
    if (key !== 'children' && key !== 'text' && key !== 'marks') {
      attrs[key] = value;
    }
  }

  const object = element.get('object');
  if (object === 'block') {
    const children = SyncElement.getChildren(element);
    attrs = {
      nodes: children.map(toSlateNode),
      ...attrs,
    };
    return Block.create(attrs);
  } else if (object === 'inline') {
    const children = SyncElement.getChildren(element);
    attrs = {
      nodes: children.map(toSlateNode),
      ...attrs,
    };
    return Inline.create(attrs);
  } else if (object === 'text') {
    const text = SyncElement.getText(element);
    attrs = {
      text: text.toString(),
      marks: Set(element.get('marks')),
      ...attrs,
    };
    return Text.create(attrs);
  }

  throw new Error(`Unable to convert '${object}' element`);
};

/**
 * Converts a SyncDoc to a Slate doc
 *
 * toSlateDoc(syncDoc: SyncDoc): Node[]
 */
const toSlateDoc = (syncDoc) => {
  return syncDoc.map(toSlateNode);
};

/**
 * Converts all elements into a Slate doc to SyncElements and adds them to the
 * SyncDoc
 *
 * toSyncDoc(syncDoc: SyncDoc, doc: Node[]): void
 */
const toSyncDoc = (syncDoc, doc) => {
  syncDoc.insert(0, doc.map(toSyncElement));
};

/**
 * Converts a slate node to a sync element
 *
 * toSyncElement(node: Node): SyncElement
 */
const toSyncElement = (node) => {
  const element = new Y.Map();

  if (Block.isBlock(node) || Inline.isInline(node)) {
    const childElements = node.nodes.map(toSyncElement);
    const childContainer = new Y.Array();
    childContainer.insert(0, childElements);
    element.set('children', childContainer);
  }

  if (Text.isText(node)) {
    const textElement = new Y.Text(node.text);
    element.set('text', textElement);
    element.set('marks', node.getMarks().toJSON());
  }

  for (const [key, value] of Object.entries(node.toJSON())) {
    if (key !== 'leaves' && key !== 'nodes') {
      element.set(key, value);
    }
  }

  return element;
};

/**
 * Converts a SyncDoc path the a slate path
 *
 * toSlatePath(path: (string | number)[]): Path
 */
const toSlatePath = (path) => {
  return path.filter((node) => typeof node === 'number');
};

module.exports = {
  toSlateNode,
  toSlateDoc,
  toSyncDoc,
  toSyncElement,
  toSlatePath,
};
