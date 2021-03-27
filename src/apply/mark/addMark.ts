import { MarkOperation } from 'mark.interface';
import { SyncDoc } from 'types';

import { SyncElement } from '../../model';
import { getTarget } from '../../path';
import { toFormattingAttributes } from '../../utils';

/**
 * Applies an add mark operation to a SyncDoc.
 *
 * addMark(doc: SyncDoc, op: MarkOperation): SyncDoc
 */
const addMark = (doc: SyncDoc, op: MarkOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const node = getTarget(syncDoc, op.path);
    const nodeText = SyncElement.getText(node);

    if (nodeText) nodeText.format(op.offset, op.length, toFormattingAttributes([op.mark]));
    return doc;
};

export default addMark;
