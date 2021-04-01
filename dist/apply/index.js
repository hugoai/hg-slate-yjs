"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySlateOps = exports.applySlateOp = void 0;
const node_1 = __importDefault(require("./node"));
const text_1 = __importDefault(require("./text"));
const value_1 = __importDefault(require("./value"));
const mark_1 = __importDefault(require("./mark"));
const nullOp = (doc) => doc;
const opMappers = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, text_1.default), node_1.default), value_1.default), mark_1.default), { 
    // SetSelection is currently a null op since we don't support cursors
    set_selection: nullOp });
/**
 * Applies a slate operation to a SyncDoc
 *
 * applySlateOp(doc: SyncDoc, op: SlateOperation): SyncDoc
 */
const applySlateOp = (doc, op) => {
    try {
        const apply = opMappers[op.type];
        if (!apply) {
            throw new Error(`Unknown operation: ${op.type}`);
        }
        return apply(doc, op);
    }
    catch (e) {
        // TODO: We probably don't want to catch/swallow this exception -- either
        // don't catch it or log and rethrow?
        console.error(e, op, doc.toJSON());
        return doc;
    }
};
exports.applySlateOp = applySlateOp;
/**
 * Applies slate operations to a SyncDoc
 *
 * applySlateOps(doc: SyncDoc, operations: Operation[]): SyncDoc
 */
const applySlateOps = (doc, operations) => operations.reduce(exports.applySlateOp, doc);
exports.applySlateOps = applySlateOps;
//# sourceMappingURL=index.js.map