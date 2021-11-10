"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slate_1 = require("slate");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const convert_1 = require("../utils/convert");
/**
 * Translates a Yjs array event into a slate operations.
 *
 * @param event
 */
function translateArrayEvent(editor, event) {
    const targetPath = (0, convert_1.toSlatePath)(event.path);
    const targetElement = slate_1.Node.get(editor, targetPath);
    (0, tiny_invariant_1.default)(!slate_1.Text.isText(targetElement), 'Cannot apply array event to text node');
    let offset = 0;
    const ops = [];
    const children = Array.from(targetElement.children);
    event.changes.delta.forEach((delta) => {
        var _a, _b;
        if ('retain' in delta) {
            offset += (_a = delta.retain) !== null && _a !== void 0 ? _a : 0;
        }
        if ('delete' in delta) {
            const path = [...targetPath, offset];
            children.splice(offset, (_b = delta.delete) !== null && _b !== void 0 ? _b : 0).forEach((node) => {
                ops.push({ type: 'remove_node', path, node });
            });
        }
        if ('insert' in delta) {
            (0, tiny_invariant_1.default)(Array.isArray(delta.insert), `Unexpected array insert content type: expected array, got ${JSON.stringify(delta.insert)}`);
            const toInsert = delta.insert.map(convert_1.toSlateNode);
            toInsert.forEach((node, i) => {
                ops.push({
                    type: 'insert_node',
                    path: [...targetPath, offset + i],
                    node,
                });
            });
            children.splice(offset, 0, ...toInsert);
            offset += delta.insert.length;
        }
    });
    return ops;
}
exports.default = translateArrayEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHBseVRvU2xhdGUvYXJyYXlFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlDQUEwRDtBQUMxRCxvRUFBdUM7QUFHdkMsOENBQTREO0FBRTVEOzs7O0dBSUc7QUFDSCxTQUF3QixtQkFBbUIsQ0FDekMsTUFBYyxFQUNkLEtBQWlDO0lBRWpDLE1BQU0sVUFBVSxHQUFHLElBQUEscUJBQVcsRUFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0MsTUFBTSxhQUFhLEdBQUcsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFbkQsSUFBQSx3QkFBUyxFQUNQLENBQUMsWUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFDM0IsdUNBQXVDLENBQ3hDLENBQUM7SUFFRixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDZixNQUFNLEdBQUcsR0FBb0IsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXBELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOztRQUNwQyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDckIsTUFBTSxJQUFJLE1BQUEsS0FBSyxDQUFDLE1BQU0sbUNBQUksQ0FBQyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDckMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBQSxLQUFLLENBQUMsTUFBTSxtQ0FBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDMUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFBLHdCQUFTLEVBQ1AsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQzNCLDZEQUE2RCxJQUFJLENBQUMsU0FBUyxDQUN6RSxLQUFLLENBQUMsTUFBTSxDQUNiLEVBQUUsQ0FDSixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQVcsQ0FBQyxDQUFDO1lBRS9DLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ1AsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxDQUFDLEdBQUcsVUFBVSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBQ2pDLElBQUk7aUJBQ0wsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDL0I7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQXBERCxzQ0FvREMifQ==