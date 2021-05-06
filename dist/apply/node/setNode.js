"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("../../path");
/**
 * Applies a setNode operation to a SyncDoc
 *
 * setNode(doc: SyncDoc, op: SetNodeOperation): SyncDoc
 */
const setNode = (doc, op) => {
    const syncDoc = doc.get('document');
    const node = path_1.getTarget(syncDoc, op.path);
    if (node !== undefined) {
        const properties = node.get('data');
        for (const [key, value] of Object.entries(op.properties.data.toJSON())) {
            if (key === 'children' || key === 'text') {
                throw new Error(`Cannot set the "${key}" property of nodes!`);
            }
            properties[key] = value;
        }
        node.set('data', properties);
    }
    return doc;
};
exports.default = setNode;
//# sourceMappingURL=setNode.js.map