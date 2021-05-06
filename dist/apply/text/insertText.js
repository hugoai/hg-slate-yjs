"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
const utils_1 = require("../../utils");
/**
 * Applies a insert text operation to a SyncDoc.
 *
 * insertText(doc: SyncDoc, op: InsertTextOperation): SyncDoc
 */
const insertText = (doc, op) => {
    const syncDoc = doc.get('document');
    const node = path_1.getTarget(syncDoc, op.path);
    const format = utils_1.toFormattingAttributes(op.marks);
    const nodeText = model_1.SyncElement.getText(node);
    if (nodeText)
        nodeText.insert(op.offset, op.text, format);
    return doc;
};
exports.default = insertText;
//# sourceMappingURL=insertText.js.map