"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
const convert_1 = require("../../utils/convert");
/**
 * Applies an insert node operation to a SyncDoc.
 *
 * insertNode(doc: SyncDoc, op: InsertNodeOperation): SyncDoc
 */
const insertNode = (doc, op) => {
    const syncDoc = doc.get('document');
    const [parent, index] = path_1.getParent(syncDoc, op.path);
    const children = model_1.SyncNode.getChildren(parent);
    if (model_1.SyncNode.getText(parent) !== undefined || !children) {
        throw new TypeError("Can't insert node into text node");
    }
    children.insert(index, [convert_1.toSyncElement(op.node)]);
    return doc;
};
exports.default = insertNode;
//# sourceMappingURL=insertNode.js.map