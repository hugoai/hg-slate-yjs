"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a insert text operation to a SharedType.
 *
 * @param doc
 * @param op
 */
function insertText(doc, op) {
    const node = (0, path_1.getTarget)(doc, op.path);
    const nodeText = model_1.SyncElement.getText(node);
    (0, tiny_invariant_1.default)(nodeText, 'Apply text operation to non text node');
    nodeText.insert(op.offset, op.text);
    return doc;
}
exports.default = insertText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zZXJ0VGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHBseVRvWWpzL3RleHQvaW5zZXJ0VGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9FQUF1QztBQUN2Qyx1Q0FBc0Q7QUFDdEQscUNBQXVDO0FBRXZDOzs7OztHQUtHO0FBQ0gsU0FBd0IsVUFBVSxDQUNoQyxHQUFlLEVBQ2YsRUFBdUI7SUFFdkIsTUFBTSxJQUFJLEdBQUcsSUFBQSxnQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFnQixDQUFDO0lBQ3BELE1BQU0sUUFBUSxHQUFHLG1CQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLElBQUEsd0JBQVMsRUFBQyxRQUFRLEVBQUUsdUNBQXVDLENBQUMsQ0FBQztJQUU3RCxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQVhELDZCQVdDIn0=