"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a merge node operation to a SyncDoc.
 *
 * mergeNode(doc: SyncDoc, op: MergeNodeOperation): SyncDoc
 */
const mergeNode = (doc, op) => {
    const syncDoc = doc.get('document');
    const [parent, index] = path_1.getParent(syncDoc, op.path);
    const children = model_1.SyncNode.getChildren(parent);
    if (children !== undefined) {
        const prev = children.get(index - 1);
        const next = children.get(index);
        const prevText = model_1.SyncNode.getText(prev);
        const nextText = model_1.SyncNode.getText(next);
        if (prevText && nextText) {
            // A bit of complexity: If prevText has formatting attributes that extend to
            // the end of the text, then if we insert the contents of nextText at the
            // end of prevText, those formatting attributes are extended to include the
            // new contents, which is not what we want.
            //
            // Instead, we effect the merge by building a combined delta, deleting the
            // existing contents of prevText, and then applying that delta. (It seems
            // like one should be able to add a leading 'delete' element to the combined
            // delta in order to delete the existing text, but that didn't have the
            // desired effect, ergo doing it separately.)
            const combinedDelta = [...prevText.toDelta(), ...nextText.toDelta()];
            prevText.delete(0, prevText.length);
            prevText.applyDelta(combinedDelta);
        }
        else {
            const nextChildren = model_1.SyncNode.getChildren(next);
            const prevChildren = model_1.SyncNode.getChildren(prev);
            if (nextChildren) {
                const toPush = nextChildren.map((element) => element.clone());
                if (prevChildren)
                    prevChildren.push(toPush);
            }
        }
        children.delete(index, 1);
    }
    return doc;
};
exports.default = mergeNode;
//# sourceMappingURL=mergeNode.js.map