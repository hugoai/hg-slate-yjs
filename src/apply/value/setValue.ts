import * as Y from 'yjs';
import { SyncDoc, SlateOperation } from 'types';

const setValue = (doc: SyncDoc, op: SlateOperation): SyncDoc => {
    if (op.properties && op.properties.data) {
        const newData = new Y.Map();
        for (const [key, value] of Object.entries(op.properties.data.toJSON())) {
            newData.set(key, value);
        }
        doc.set('data', newData);
    }

    return doc;
};

export default setValue;
