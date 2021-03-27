import { RemoveNodeOperation } from 'node.interface';
import { SyncDoc } from 'types';
import { SyncNode } from '../../model';
import { getParent } from '../../path';

/**
 * Applies a remove node operation to a SyncDoc.
 *
 * removeNode(doc: SyncDoc, op: RemoveNodeOperation): SyncDoc
 */
const removeNode = (doc: SyncDoc, op: RemoveNodeOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const [parent, index] = getParent(syncDoc, op.path);

    if (SyncNode.getText(parent) !== undefined) {
        throw new TypeError("Can't remove node from text node");
    }
    const children = SyncNode.getChildren(parent);
    if (children) {
        children.delete(index);
    }

    return doc;
};

export default removeNode;
