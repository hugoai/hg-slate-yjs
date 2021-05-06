"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a split node operation to a SyncDoc
 *
 * splitNode(doc: SyncDoc, op: SplitNodeOperation): SyncDoc
 */
const splitNode = (doc, op) => {
    const syncDoc = doc.get('document');
    const [parent, index] = path_1.getParent(syncDoc, op.path);
    if (parent !== undefined) {
        const children = model_1.SyncNode.getChildren(parent);
        if (children) {
            const target = children.get(index);
            const inject = target.clone();
            // Inject is a shallow clone of target at this point; they share the same
            // 'data' member. Clone 'data' as well such that future changes to one aren't
            // reflected in the other.
            inject.set('data', Object.assign({}, target.get('data')));
            children.insert(index + 1, [inject]);
            if (model_1.SyncNode.getText(target) !== undefined) {
                const targetText = model_1.SyncNode.getText(target);
                const injectText = model_1.SyncNode.getText(inject);
                if (targetText !== undefined && targetText.length > op.position) {
                    targetText.delete(op.position, targetText.length - op.position);
                }
                if (injectText !== undefined && op.position !== undefined) {
                    injectText.delete(0, op.position);
                }
            }
            else {
                const targetChildren = model_1.SyncNode.getChildren(target);
                const injectChildren = model_1.SyncNode.getChildren(inject);
                if (targetChildren) {
                    targetChildren.delete(op.position, targetChildren.length - op.position);
                }
                if (injectChildren && op.position !== undefined) {
                    injectChildren.delete(0, op.position);
                }
            }
        }
    }
    return doc;
};
exports.default = splitNode;
//# sourceMappingURL=splitNode.js.map