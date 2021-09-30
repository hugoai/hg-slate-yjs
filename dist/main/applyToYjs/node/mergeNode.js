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
 * Applies a merge node operation to a SharedType.
 *
 * @param doc
 * @param op
 */
function mergeNode(doc, op) {
    const [parent, index] = (0, path_1.getParent)(doc, op.path);
    const children = model_1.SyncNode.getChildren(parent);
    (0, tiny_invariant_1.default)(children, 'Parent of element should have children');
    const prev = children.get(index - 1);
    const next = children.get(index);
    const prevText = model_1.SyncNode.getText(prev);
    const nextText = model_1.SyncNode.getText(next);
    if (prevText && nextText) {
        prevText.insert(prevText.length, nextText.toString());
    }
    else {
        const nextChildren = model_1.SyncNode.getChildren(next);
        const prevChildren = model_1.SyncNode.getChildren(prev);
        (0, tiny_invariant_1.default)(nextChildren, 'Next element should have children');
        (0, tiny_invariant_1.default)(prevChildren, 'Prev element should have children');
        const toPush = nextChildren.map(utils_1.cloneSyncElement);
        prevChildren.push(toPush);
    }
    children.delete(index, 1);
    return doc;
}
exports.default = mergeNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2VOb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcGx5VG9ZanMvbm9kZS9tZXJnZU5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvRUFBdUM7QUFDdkMsdUNBQW1EO0FBQ25ELHFDQUF1QztBQUN2Qyx1Q0FBK0M7QUFFL0M7Ozs7O0dBS0c7QUFDSCxTQUF3QixTQUFTLENBQy9CLEdBQWUsRUFDZixFQUFzQjtJQUV0QixNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUEsZ0JBQVMsRUFBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhELE1BQU0sUUFBUSxHQUFHLGdCQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLElBQUEsd0JBQVMsRUFBQyxRQUFRLEVBQUUsd0NBQXdDLENBQUMsQ0FBQztJQUU5RCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpDLE1BQU0sUUFBUSxHQUFHLGdCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE1BQU0sUUFBUSxHQUFHLGdCQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXhDLElBQUksUUFBUSxJQUFJLFFBQVEsRUFBRTtRQUN4QixRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7S0FDdkQ7U0FBTTtRQUNMLE1BQU0sWUFBWSxHQUFHLGdCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELE1BQU0sWUFBWSxHQUFHLGdCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhELElBQUEsd0JBQVMsRUFBQyxZQUFZLEVBQUUsbUNBQW1DLENBQUMsQ0FBQztRQUM3RCxJQUFBLHdCQUFTLEVBQUMsWUFBWSxFQUFFLG1DQUFtQyxDQUFDLENBQUM7UUFFN0QsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQyx3QkFBZ0IsQ0FBQyxDQUFDO1FBQ2xELFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDM0I7SUFFRCxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUE5QkQsNEJBOEJDIn0=