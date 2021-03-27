import { InsertNodeOperation } from 'node.interface';
import { SyncDoc } from 'types';
import { SyncNode } from '../../model';
import { getParent } from '../../path';
import { toSyncElement } from '../../utils/convert';

/**
 * Applies an insert node operation to a SyncDoc.
 *
 * insertNode(doc: SyncDoc, op: InsertNodeOperation): SyncDoc
 */
const insertNode = (doc: SyncDoc, op: InsertNodeOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const [parent, index] = getParent(syncDoc, op.path);

    const children = SyncNode.getChildren(parent);
    if (SyncNode.getText(parent) !== undefined || !children) {
        throw new TypeError("Can't insert node into text node");
    }

    children.insert(index, [toSyncElement(op.node)]);
    return doc;
};

export default insertNode;
