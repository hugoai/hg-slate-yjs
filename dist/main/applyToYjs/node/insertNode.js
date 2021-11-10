"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const model_1 = require("../../model");
const path_1 = require("../../path");
const convert_1 = require("../../utils/convert");
/**
 * Applies an insert node operation to a SharedType.
 *
 * @param doc
 * @param op
 */
function insertNode(doc, op) {
    const [parent, index] = (0, path_1.getParent)(doc, op.path);
    const children = model_1.SyncNode.getChildren(parent);
    if (model_1.SyncNode.getText(parent) !== undefined || !children) {
        throw new TypeError("Can't insert node into text node");
    }
    (0, tiny_invariant_1.default)(children, 'cannot apply insert node operation to text node');
    children.insert(index, [(0, convert_1.toSyncElement)(op.node)]);
    return doc;
}
exports.default = insertNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHBseVRvWWpzL25vZGUvaW5zZXJ0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9FQUF1QztBQUN2Qyx1Q0FBbUQ7QUFDbkQscUNBQXVDO0FBQ3ZDLGlEQUFvRDtBQUVwRDs7Ozs7R0FLRztBQUNILFNBQXdCLFVBQVUsQ0FDaEMsR0FBZSxFQUNmLEVBQXVCO0lBRXZCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEdBQUcsSUFBQSxnQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFaEQsTUFBTSxRQUFRLEdBQUcsZ0JBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUMsSUFBSSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDdkQsTUFBTSxJQUFJLFNBQVMsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0tBQ3pEO0lBRUQsSUFBQSx3QkFBUyxFQUFDLFFBQVEsRUFBRSxpREFBaUQsQ0FBQyxDQUFDO0lBRXZFLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBQSx1QkFBYSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBZkQsNkJBZUMifQ==