"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a remove text operation to a SyncDoc.
 *
 * removeText(doc: SyncDoc, op: RemoveTextOperation): SyncDoc
 */
const removeText = (doc, op) => {
    const syncDoc = doc.get('document');
    const node = path_1.getTarget(syncDoc, op.path);
    const nodeText = model_1.SyncElement.getText(node);
    if (nodeText)
        nodeText.delete(op.offset, op.text.length);
    return doc;
};
exports.default = removeText;
//# sourceMappingURL=removeText.js.map