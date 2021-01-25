const { SyncNode } = require('../../model');
const { getParent } = require('../../path');

/**
 * Applies a remove node operation to a SyncDoc.
 *
 * removeNode(doc: SyncDoc, op: RemoveNodeOperation): SyncDoc
 */
const removeNode = (doc, op) => {
    const syncDoc = doc.get('document');
    const [parent, index] = getParent(syncDoc, op.path);

    if (SyncNode.getText(parent) !== undefined) {
        throw new TypeError("Can't remove node from text node");
    }

    SyncNode.getChildren(parent).delete(index);
    return doc;
};

module.exports = removeNode;
