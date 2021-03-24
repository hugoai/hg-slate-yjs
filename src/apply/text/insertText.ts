import { SlateOperation, SyncDoc } from 'types';
import { SyncElement } from '../../model';
import { getTarget } from '../../path';
import { toFormattingAttributes } from '../../utils';

/**
 * Applies a insert text operation to a SyncDoc.
 *
 * insertText(doc: SyncDoc, op: InsertTextOperation): SyncDoc
 */
const insertText = (doc: SyncDoc, op: SlateOperation): SyncDoc => {
    const syncDoc = doc.get('document');
    const node = getTarget(syncDoc, op.path);
    const format = toFormattingAttributes(op.marks);
    const nodeText = SyncElement.getText(node);

    if (nodeText) nodeText.insert(op.offset, op.text, format);

    return doc;
};

export default insertText;
