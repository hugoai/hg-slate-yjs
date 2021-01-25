const { SyncElement } = require('../../model');
const { getTarget } = require('../../path');
const { toFormattingAttributes } = require('../../utils');

/**
 * Applies a insert text operation to a SyncDoc.
 *
 * insertText(doc: SyncDoc, op: InsertTextOperation): SyncDoc
 */
const insertText = (doc, op) => {
    const syncDoc = doc.get('document');
    const node = getTarget(syncDoc, op.path);
    const format = toFormattingAttributes(op.marks);
    const nodeText = SyncElement.getText(node);
    nodeText.insert(op.offset, op.text, format);
    return doc;
};

module.exports = insertText;
