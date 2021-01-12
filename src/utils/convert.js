const { Block, Document, Inline, Leaf, Mark, Text, Value } = require('slate');
const Y = require('yjs');
const { SyncElement } = require('../model');
const { Set } = require('immutable');

/**
 * Converts a sync element to a slate node
 *
 * toSlateNode(element: SyncElement): Node
 */
const toSlateNode = (element) => {
  let attrs = {};
  for (const [key, value] of element.entries()) {
    if (key !== "children" && key !== "text" && key !== "marks") {
      attrs[key] = value;
    }
  }

  const object = element.get("object");
  if (object === "block") {
    const children = SyncElement.getChildren(element);
    attrs = {
      nodes: children.map(toSlateNode),
      ...attrs,
    };
    return Block.create(attrs);
  } else if (object === "inline") {
    const children = SyncElement.getChildren(element);
    attrs = {
      nodes: children.map(toSlateNode),
      ...attrs,
    };
    return Inline.create(attrs);
  } else if (object === "text") {
    const text = SyncElement.getText(element);
    attrs = {
      leaves: text.toDelta().map(toSlateLeaf),
      ...attrs,
    };
    return Text.create(attrs);
  }

  throw new Error(`Unable to convert '${object}' element`);
};

/**
 * Converts a Quill delta element (as returned from Y.Text.toDelta()) to a slate
 * Leaf
 *
 * toSlateLeaf(delta): Leaf
 */
const toSlateLeaf = (delta) => {
  if (!delta.insert) {
    throw new Error(`Unable to convert '${delta}' element`);
  }

  return Leaf.create({
    text: delta.insert,
    marks: toSlateMarks(delta.attributes),
  });
}

/**
 * Converts Yjs formatting attributes to a List of slate Marks
 *
 * toSlateMarks(Object<string, string>): Mark[]
 */
const toSlateMarks = (attributes) => {
  const marks = [];
  if (!!attributes) {
    for (const markType in attributes) {
      let markAttrs = { type: markType };
      if (attributes[markType] !== "true") {
        markAttrs = { data: { value: attributes[markType] }, ...markAttrs };
      }
      marks.push(Mark.create(markAttrs));
    }
  }
  return marks;
}

/**
 * Converts a SyncDoc to a Slate doc
 *
 * toSlateDoc(syncDoc: SyncDoc): Node[]
 */
const toSlateDoc = (syncDoc) => {
  const documentNodes = syncDoc.get("document") || [];
  const nodes = documentNodes.map(toSlateNode);
  const document = Document.create({ nodes });
  const data = syncDoc.get("data");
  return Value.create({ document, data: data ? data.toJSON() : {} });
};

/**
 * Converts all elements into a Slate doc to SyncElements and adds them to the
 * SyncDoc
 *
 * toSyncDoc(syncDoc: SyncDoc, value: Value): void
 */
const toSyncDoc = (syncDoc, value) => {
  const document = new Y.Array();
  document.insert(0, value.document.nodes.map(toSyncElement));
  syncDoc.set("document", document);
  syncDoc.set("data", new Y.Map(value.data));
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
    element.set("children", childContainer);
  }

  if (Text.isText(node)) {
    const textElement = new Y.Text(node.text);
    element.set('text', textElement);
    let index = 0;
    node.getLeaves().forEach(leaf => {
      if (leaf.marks.size > 0) {
        textElement.format(index, leaf.text.length, toFormattingAttributes(leaf.marks));
      }
      index += leaf.text.length;
    });
  }

  for (const [key, value] of Object.entries(node.toJSON())) {
    if (key !== "leaves" && key !== "nodes") {
      element.set(key, value);
    }
  }

  return element;
};

/**
 * Converts a List of slate Marks to Yjs formatting attributes
 *
 * toFormattingAttributes(List<Mark>, boolean): Object<string, string>
 */
const toFormattingAttributes = (marks, setMark = true) => {
  const result = {};
  marks.forEach(mark => {
    // If setMark is false, use a value of null to indicate that application of
    // the resulting formatting attributes should cause the mark to be cleared.
    let value = null;
    if (setMark) {
      if (mark.data && mark.data.has("value")) {
        value = mark.data.get("value");
      } else {
        value = "true";
      }
    }
    result[mark.type] = value;
  })
  return result;
};

/**
 * Converts a SyncDoc path the a slate path
 *
 * toSlatePath(path: (string | number)[]): Path
 */
const toSlatePath = (path) => {
  return path.filter((node) => typeof node === "number");
};

module.exports = {
  toFormattingAttributes,
  toSlateMarks,
  toSlateNode,
  toSlateDoc,
  toSyncDoc,
  toSyncElement,
  toSlatePath,
};
