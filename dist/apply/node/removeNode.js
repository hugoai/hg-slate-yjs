"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a remove node operation to a SyncDoc.
 *
 * removeNode(doc: SyncDoc, op: RemoveNodeOperation): SyncDoc
 */
const removeNode = (doc, op) => {
    const syncDoc = doc.get('document');
    const [parent, index] = path_1.getParent(syncDoc, op.path);
    if (model_1.SyncNode.getText(parent) !== undefined) {
        throw new TypeError("Can't remove node from text node");
    }
    const children = model_1.SyncNode.getChildren(parent);
    if (children) {
        children.delete(index);
    }
    return doc;
};
exports.default = removeNode;
//# sourceMappingURL=removeNode.js.map