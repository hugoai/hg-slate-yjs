const { Operation } = require('slate');
const node = require('./node');
const text = require('./text');

const nullOp = (doc) => doc;

const opMappers = {
  ...text,
  ...node,

  // SetSelection is currently a null op since we don't support cursors
  set_selection: nullOp,
};

/**
 * Applies a slate operation to a SyncDoc
 *
 * applySlateOp(doc: SyncDoc, op: Operation): SyncDoc
 */
const applySlateOp = (doc, op) => {
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
const applySlateOps = (doc, operations) => {
  return operations.reduce(applySlateOp, doc);
};

module.exports = { applySlateOp, applySlateOps };
