const { SyncElement } = require('../../model');
const { getTarget } = require('../../path');

/**
 * Applies a remove text operation to a SyncDoc.
 *
 * removeText(doc: SyncDoc, op: RemoveTextOperation): SyncDoc
 */
const removeText = (doc, op) => {
  const syncDoc = doc.get('document')
  const node = getTarget(syncDoc, op.path);
  const nodeText = SyncElement.getText(node);
  nodeText.delete(op.offset, op.text.length);
  return doc;
};

module.exports = removeText;
