const { SyncNode } = require('../../model');
const { getParent } = require('../../path');
const { toSyncElement } = require('../../utils/convert');

/**
 * Applies an insert node operation to a SyncDoc.
 *
 * insertNode(doc: SyncDoc, op: InsertNodeOperation): SyncDoc
 */
const insertNode = (doc, op) => {
  const syncDoc = doc.get('document')

  const [parent, index] = getParent(syncDoc, op.path);

  const children = SyncNode.getChildren(parent);
  if (SyncNode.getText(parent) !== undefined || !children) {
    throw new TypeError("Can't insert node into text node");
  }

  SyncNode.getChildren(parent).insert(index, [toSyncElement(op.node)]);
  return doc;
};

module.exports = insertNode;
