const { SyncElement } = require('../../model');
const { getTarget } = require('../../path');
const { toFormattingAttributes } = require('../../utils');

/**
 * Applies an add mark operation to a SyncDoc.
 *
 * addMark(doc: SyncDoc, op: MarkOperation): SyncDoc
 */ 
const addMark = (doc, op) => {
  const syncDoc = doc.get('document')
  const node = getTarget(syncDoc, op.path);
  const nodeText = SyncElement.getText(node);
  nodeText.format(op.offset, op.length, toFormattingAttributes([op.mark]));
  return doc;
};

module.exports = addMark;
