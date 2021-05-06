"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
const utils_1 = require("../../utils");
/**
 * Applies an add mark operation to a SyncDoc.
 *
 * addMark(doc: SyncDoc, op: MarkOperation): SyncDoc
 */
const addMark = (doc, op) => {
    const syncDoc = doc.get('document');
    const node = path_1.getTarget(syncDoc, op.path);
    const nodeText = model_1.SyncElement.getText(node);
    if (nodeText)
        nodeText.format(op.offset, op.length, utils_1.toFormattingAttributes([op.mark]));
    return doc;
};
exports.default = addMark;
//# sourceMappingURL=addMark.js.map