"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const convert_1 = require("../utils/convert");
/**
 * Translates a Yjs array event into a slate operations.
 *
 * @param event
 */
function translateArrayEvent(event) {
    const targetPath = (0, convert_1.toSlatePath)(event.path);
    let offset = 0;
    const ops = [];
    event.changes.delta.forEach((delta) => {
        var _a;
        if ('retain' in delta) {
            offset += (_a = delta.retain) !== null && _a !== void 0 ? _a : 0;
        }
        if ('delete' in delta) {
            const removePath = [...targetPath, offset];
            const d = delta.delete || 0;
            for (let i = 0; i < d; i += 1) {
                ops.push({
                    type: 'remove_node',
                    path: removePath,
                    node: { children: [] },
                });
            }
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
            offset += delta.insert.length;
        }
    });
    return ops;
}
exports.default = translateArrayEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHBseVRvU2xhdGUvYXJyYXlFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG9FQUF1QztBQUd2Qyw4Q0FBNEQ7QUFFNUQ7Ozs7R0FJRztBQUNILFNBQXdCLG1CQUFtQixDQUN6QyxLQUFpQztJQUVqQyxNQUFNLFVBQVUsR0FBRyxJQUFBLHFCQUFXLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLE1BQU0sR0FBRyxHQUFvQixFQUFFLENBQUM7SUFFaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1FBQ3BDLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNyQixNQUFNLElBQUksTUFBQSxLQUFLLENBQUMsTUFBTSxtQ0FBSSxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDckIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ1AsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO2lCQUN2QixDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3JCLElBQUEsd0JBQVMsRUFDUCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDM0IsNkRBQTZELElBQUksQ0FBQyxTQUFTLENBQ3pFLEtBQUssQ0FBQyxNQUFNLENBQ2IsRUFBRSxDQUNKLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBVyxDQUFDLENBQUM7WUFFL0MsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDUCxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLENBQUMsR0FBRyxVQUFVLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDakMsSUFBSTtpQkFDTCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUMvQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBaERELHNDQWdEQyJ9