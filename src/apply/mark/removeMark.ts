import { MarkOperation } from 'mark.interface';
import { SyncDoc } from 'types';
import { SyncElement } from '../../model';
import { getTarget } from '../../path';
import { toFormattingAttributes } from '../../utils';

/**
 * Applies a remove mark operation to a SyncDoc.
 *
 * removeMark(doc: SyncDoc, op: MarkOperation): SyncDoc
 */
const removeMark = (doc: SyncDoc, op: MarkOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const node = getTarget(syncDoc, op.path);
    const nodeText = SyncElement.getText(node);
    if (nodeText) nodeText.format(op.offset, op.length, toFormattingAttributes([op.mark], false));

    return doc;
};

export default removeMark;
