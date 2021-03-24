import { SyncDoc } from 'types';
import { Operation } from 'slate';
import node from './node';
import text from './text';
import value from './value';
import mark from './mark';

const nullOp = (doc: SyncDoc) => doc;

const opMappers = {
    ...text,
    ...node,
    ...value,
    ...mark,

    // SetSelection is currently a null op since we don't support cursors
    set_selection: nullOp,
};

/**
 * Applies a slate operation to a SyncDoc
 *
 * applySlateOp(doc: SyncDoc, op: Operation): SyncDoc
 */
export const applySlateOp = (doc: SyncDoc, op: Operation): SyncDoc => {
    try {
        const apply = opMappers[op.type];
        if (!apply) {
            throw new Error(`Unknown operation: ${op.type}`);
        }

        return apply(doc, op);
    } catch (e) {
        // TODO: We probably don't want to catch/swallow this exception -- either
        // don't catch it or log and rethrow?
        console.error(e, op, doc.toJSON());
        return doc;
    }
};

/**
 * Applies slate operations to a SyncDoc
 *
 * applySlateOps(doc: SyncDoc, operations: Operation[]): SyncDoc
 */
export const applySlateOps = (doc: SyncDoc, operations: Operation[]): SyncDoc =>
    operations.reduce(applySlateOp, doc);
