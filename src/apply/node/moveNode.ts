import { MoveNodeOperation } from 'node.interface';
import { SyncDoc } from 'types';
import { SyncNode } from '../../model';
import { getParent } from '../../path';

/**
 * Applies a move node operation to a SyncDoc.
 *
 * moveNode(doc: SyncDoc, op: MoveNodeOperation): SyncDoc
 */
const moveNode = (doc: SyncDoc, op: MoveNodeOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const [from, fromIndex] = getParent(syncDoc, op.path);
    const [to, toIndex] = getParent(syncDoc, op.newPath);

    if (SyncNode.getText(from) !== undefined || SyncNode.getText(to) !== undefined) {
        throw new TypeError("Can't move node as child of a text node");
    }

    const fromChildren = SyncNode.getChildren(from);
    const toChildren = SyncNode.getChildren(to);
    if (fromChildren) {
        const toMove = fromChildren.get(fromIndex);
        const toInsert = (toMove.clone() as any) as SyncDoc;

        fromChildren.delete(fromIndex);
        if (toChildren) {
            toChildren.insert(Math.min(toIndex, toChildren.length), [toInsert]);
        }
    }

    return doc;
};

export default moveNode;
