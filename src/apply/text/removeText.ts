import { SyncDoc, SlateOperation } from 'types';
import { SyncElement } from '../../model';
import { getTarget } from '../../path';

/**
 * Applies a remove text operation to a SyncDoc.
 *
 * removeText(doc: SyncDoc, op: RemoveTextOperation): SyncDoc
 */
const removeText = (doc: SyncDoc, op: SlateOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const node = getTarget(syncDoc, op.path);
    const nodeText = SyncElement.getText(node);

    if (nodeText) nodeText.delete(op.offset, op.text.length);

    return doc;
};

export default removeText;
