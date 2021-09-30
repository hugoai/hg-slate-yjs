"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const model_1 = require("../../model");
const path_1 = require("../../path");
const utils_1 = require("../../utils");
/**
 * Applies a move node operation to a SharedType.
 *
 * @param doc
 * @param op
 */
function moveNode(doc, op) {
    const [from, fromIndex] = (0, path_1.getParent)(doc, op.path);
    const [to, toIndex] = (0, path_1.getParent)(doc, op.newPath);
    if (model_1.SyncNode.getText(from) !== undefined ||
        model_1.SyncNode.getText(to) !== undefined) {
        throw new TypeError("Can't move node as child of a text node");
    }
    const fromChildren = model_1.SyncNode.getChildren(from);
    const toChildren = model_1.SyncNode.getChildren(to);
    (0, tiny_invariant_1.default)(fromChildren, 'From element should not be a text node');
    (0, tiny_invariant_1.default)(toChildren, 'To element should not be a text node');
    const toMove = fromChildren.get(fromIndex);
    const toInsert = (0, utils_1.cloneSyncElement)(toMove);
    fromChildren.delete(fromIndex);
    toChildren.insert(Math.min(toIndex, toChildren.length), [toInsert]);
    return doc;
}
exports.default = moveNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW92ZU5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBwbHlUb1lqcy9ub2RlL21vdmVOb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esb0VBQXVDO0FBQ3ZDLHVDQUFtRDtBQUNuRCxxQ0FBdUM7QUFDdkMsdUNBQStDO0FBRS9DOzs7OztHQUtHO0FBQ0gsU0FBd0IsUUFBUSxDQUM5QixHQUFlLEVBQ2YsRUFBcUI7SUFFckIsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsR0FBRyxJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRCxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUEsZ0JBQVMsRUFBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpELElBQ0UsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUztRQUNwQyxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxTQUFTLEVBQ2xDO1FBQ0EsTUFBTSxJQUFJLFNBQVMsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsTUFBTSxZQUFZLEdBQUcsZ0JBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsTUFBTSxVQUFVLEdBQUcsZ0JBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUMsSUFBQSx3QkFBUyxFQUFDLFlBQVksRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ2xFLElBQUEsd0JBQVMsRUFBQyxVQUFVLEVBQUUsc0NBQXNDLENBQUMsQ0FBQztJQUU5RCxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sUUFBUSxHQUFHLElBQUEsd0JBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFFMUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFcEUsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBM0JELDJCQTJCQyJ9