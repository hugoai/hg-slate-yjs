import { SetNodeOperation } from 'node.interface';
import { SyncDoc } from 'types';
import { getTarget } from '../../path';

/**
 * Applies a setNode operation to a SyncDoc
 *
 * setNode(doc: SyncDoc, op: SetNodeOperation): SyncDoc
 */
const setNode = (doc: SyncDoc, op: SetNodeOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const node = getTarget(syncDoc, op.path);
    if (node) {
        const properties = node.get('data');
        for (const [key, value] of Object.entries(op.properties.data)) {
            if (key === 'children' || key === 'text') {
                throw new Error(`Cannot set the "${key}" property of nodes!`);
            }

            properties[key] = value;
        }
        node.set('data', properties);
    }

    return doc;
};

export default setNode;
