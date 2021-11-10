"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a remove node operation to a SharedType.
 *
 * @param doc
 * @param op
 */
function removeNode(doc, op) {
    const [parent, index] = (0, path_1.getParent)(doc, op.path);
    if (model_1.SyncNode.getText(parent) !== undefined) {
        throw new TypeError("Can't remove node from text node");
    }
    const children = model_1.SyncNode.getChildren(parent);
    (0, tiny_invariant_1.default)(children, 'Parent should have children');
    children.delete(index);
    return doc;
}
exports.default = removeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHBseVRvWWpzL25vZGUvcmVtb3ZlTm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9FQUF1QztBQUN2Qyx1Q0FBbUQ7QUFDbkQscUNBQXVDO0FBRXZDOzs7OztHQUtHO0FBQ0gsU0FBd0IsVUFBVSxDQUNoQyxHQUFlLEVBQ2YsRUFBdUI7SUFFdkIsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsR0FBRyxJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVoRCxJQUFJLGdCQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsRUFBRTtRQUMxQyxNQUFNLElBQUksU0FBUyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7S0FDekQ7SUFFRCxNQUFNLFFBQVEsR0FBRyxnQkFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxJQUFBLHdCQUFTLEVBQUMsUUFBUSxFQUFFLDZCQUE2QixDQUFDLENBQUM7SUFDbkQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV2QixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFmRCw2QkFlQyJ9