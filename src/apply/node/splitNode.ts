import { SplitNodeOperation } from 'node.interface';
import { SyncDoc } from 'types';
import { SyncNode } from '../../model';
import { getParent } from '../../path';
/**
 * Applies a split node operation to a SyncDoc
 *
 * splitNode(doc: SyncDoc, op: SplitNodeOperation): SyncDoc
 */
const splitNode = (doc: SyncDoc, op: SplitNodeOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const [parent, index] = getParent(syncDoc, op.path);

    if (parent !== undefined) {
        const children = SyncNode.getChildren(parent);
        if (children) {
            const target = children.get(index);
            const inject = (target.clone() as any) as SyncDoc;

            // Inject is a shallow clone of target at this point; they share the same
            // 'data' member. Clone 'data' as well such that future changes to one aren't
            // reflected in the other.
            inject.set('data', { ...target.get('data') });

            children.insert(index + 1, [inject]);

            if (SyncNode.getText(target) !== undefined) {
                const targetText = SyncNode.getText(target);
                const injectText = SyncNode.getText(inject);

                if (targetText !== undefined && targetText.length > op.position) {
                    targetText.delete(op.position, targetText.length - op.position);
                }

                if (injectText !== undefined && op.position !== undefined) {
                    injectText.delete(0, op.position);
                }
            } else {
                const targetChildren = SyncNode.getChildren(target);
                const injectChildren = SyncNode.getChildren(inject);

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

export default splitNode;
