"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySlateOp = void 0;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const node_1 = __importDefault(require("./node"));
const text_1 = __importDefault(require("./text"));
const nullOp = (doc) => doc;
const opMappers = Object.assign(Object.assign(Object.assign({}, text_1.default), node_1.default), { 
    // SetSelection is currently a null op since we don't support cursors
    set_selection: nullOp });
/**
 * Applies a slate operation to a SharedType
 *
 * @param sharedType
 * @param op
 */
function applySlateOp(sharedType, op) {
    const apply = opMappers[op.type];
    if (!apply) {
        throw new Error(`Unknown operation: ${op.type}`);
    }
    return apply(sharedType, op);
}
exports.applySlateOp = applySlateOp;
/**
 * Applies slate operations to a SharedType
 */
function applySlateOps(sharedType, ops, origin) {
    (0, tiny_invariant_1.default)(sharedType.doc, 'Shared type without attached document');
    if (ops.length > 0) {
        sharedType.doc.transact(() => {
            ops.forEach((op) => applySlateOp(sharedType, op));
        }, origin);
    }
    return sharedType;
}
exports.default = applySlateOps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbHlUb1lqcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxvRUFBdUM7QUFFdkMsa0RBQTBCO0FBQzFCLGtEQUEwQjtBQUcxQixNQUFNLE1BQU0sR0FBYyxDQUFDLEdBQWUsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO0FBRW5ELE1BQU0sU0FBUyxpREFDVixjQUFJLEdBQ0osY0FBSTtJQUVQLHFFQUFxRTtJQUNyRSxhQUFhLEVBQUUsTUFBTSxHQUN0QixDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxTQUFnQixZQUFZLENBQzFCLFVBQXNCLEVBQ3RCLEVBQWE7SUFFYixNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBeUIsQ0FBQztJQUN6RCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEQ7SUFFRCxPQUFPLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQVZELG9DQVVDO0FBRUQ7O0dBRUc7QUFDSCxTQUF3QixhQUFhLENBQ25DLFVBQXNCLEVBQ3RCLEdBQWdCLEVBQ2hCLE1BQWU7SUFFZixJQUFBLHdCQUFTLEVBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO0lBRW5FLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDbEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFO1lBQzNCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDWjtJQUVELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFkRCxnQ0FjQyJ9