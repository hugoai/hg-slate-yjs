"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a move node operation to a SyncDoc.
 *
 * moveNode(doc: SyncDoc, op: MoveNodeOperation): SyncDoc
 */
const moveNode = (doc, op) => {
    const syncDoc = doc.get('document');
    const [from, fromIndex] = path_1.getParent(syncDoc, op.path);
    const [to, toIndex] = path_1.getParent(syncDoc, op.newPath);
    if (model_1.SyncNode.getText(from) !== undefined || model_1.SyncNode.getText(to) !== undefined) {
        throw new TypeError("Can't move node as child of a text node");
    }
    const fromChildren = model_1.SyncNode.getChildren(from);
    const toChildren = model_1.SyncNode.getChildren(to);
    if (fromChildren) {
        const toMove = fromChildren.get(fromIndex);
        const toInsert = toMove.clone();
        fromChildren.delete(fromIndex);
        if (toChildren) {
            toChildren.insert(Math.min(toIndex, toChildren.length), [toInsert]);
        }
    }
    return doc;
};
exports.default = moveNode;
//# sourceMappingURL=moveNode.js.map