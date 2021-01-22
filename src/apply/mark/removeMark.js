const { SyncElement } = require('../../model');
const { getTarget } = require('../../path');
const { toFormattingAttributes } = require('../../utils');

/**
 * Applies a remove mark operation to a SyncDoc.
 *
 * removeMark(doc: SyncDoc, op: MarkOperation): SyncDoc
 */
const removeMark = (doc, op) => {
    const syncDoc = doc.get('document');
    const node = getTarget(syncDoc, op.path);
    const nodeText = SyncElement.getText(node);
    nodeText.format(op.offset, op.length, toFormattingAttributes([op.mark], false));
    return doc;
};

module.exports = removeMark;
