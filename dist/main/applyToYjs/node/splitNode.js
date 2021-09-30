"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const model_1 = require("../../model");
const path_1 = require("../../path");
const clone_1 = __importDefault(require("../../utils/clone"));
/**
 * Applies a split node operation to a SharedType
 *
 * @param doc
 * @param op
 */
function splitNode(doc, op) {
    const [parent, index] = (0, path_1.getParent)(doc, op.path);
    const children = model_1.SyncNode.getChildren(parent);
    (0, tiny_invariant_1.default)(children, 'Parent of node should have children');
    const target = children.get(index);
    const inject = (0, clone_1.default)(target);
    children.insert(index + 1, [inject]);
    Object.entries(op.properties).forEach(([key, value]) => inject.set(key, value));
    if (model_1.SyncNode.getText(target) !== undefined) {
        const targetText = model_1.SyncNode.getText(target);
        const injectText = model_1.SyncNode.getText(inject);
        (0, tiny_invariant_1.default)(targetText);
        (0, tiny_invariant_1.default)(injectText);
        if (targetText.length > op.position) {
            targetText.delete(op.position, targetText.length - op.position);
        }
        if (injectText !== undefined && op.position !== undefined) {
            injectText.delete(0, op.position);
        }
    }
    else {
        const targetChildren = model_1.SyncNode.getChildren(target);
        const injectChildren = model_1.SyncNode.getChildren(inject);
        (0, tiny_invariant_1.default)(targetChildren);
        (0, tiny_invariant_1.default)(injectChildren);
        targetChildren.delete(op.position, targetChildren.length - op.position);
        if (op.position !== undefined) {
            injectChildren.delete(0, op.position);
        }
    }
    return doc;
}
exports.default = splitNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXROb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcGx5VG9ZanMvbm9kZS9zcGxpdE5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvRUFBdUM7QUFDdkMsdUNBQW1EO0FBQ25ELHFDQUF1QztBQUN2Qyw4REFBaUQ7QUFFakQ7Ozs7O0dBS0c7QUFDSCxTQUF3QixTQUFTLENBQy9CLEdBQWUsRUFDZixFQUFzQjtJQUV0QixNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxHQUF1QixJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVwRSxNQUFNLFFBQVEsR0FBRyxnQkFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxJQUFBLHdCQUFTLEVBQUMsUUFBUSxFQUFFLHFDQUFxQyxDQUFDLENBQUM7SUFFM0QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGVBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUVyQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQ3JELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUN2QixDQUFDO0lBRUYsSUFBSSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDMUMsTUFBTSxVQUFVLEdBQUcsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsTUFBTSxVQUFVLEdBQUcsZ0JBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsSUFBQSx3QkFBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RCLElBQUEsd0JBQVMsRUFBQyxVQUFVLENBQUMsQ0FBQztRQUV0QixJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNuQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakU7UUFFRCxJQUFJLFVBQVUsS0FBSyxTQUFTLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDekQsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO0tBQ0Y7U0FBTTtRQUNMLE1BQU0sY0FBYyxHQUFHLGdCQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BELE1BQU0sY0FBYyxHQUFHLGdCQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXBELElBQUEsd0JBQVMsRUFBQyxjQUFjLENBQUMsQ0FBQztRQUMxQixJQUFBLHdCQUFTLEVBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUIsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhFLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDN0IsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUE5Q0QsNEJBOENDIn0=