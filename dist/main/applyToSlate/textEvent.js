"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const convert_1 = require("../utils/convert");
/**
 * Translates a Yjs text event into a slate operations.
 *
 * @param event
 */
function translateTextEvent(event) {
    const targetPath = (0, convert_1.toSlatePath)(event.path);
    let offset = 0;
    const ops = [];
    event.changes.delta.forEach((delta) => {
        var _a, _b;
        if ('retain' in delta) {
            offset += (_a = delta.retain) !== null && _a !== void 0 ? _a : 0;
        }
        if ('delete' in delta) {
            const deleteLength = (_b = delta.delete) !== null && _b !== void 0 ? _b : 0;
            let removalText = '';
            for (let index = 0; index < deleteLength; index++) {
                // Yjs doesn't expose the portion of the string that was removed and Slate only
                // uses it to get the length of the substring that is going to be removed.
                // This populates the substring with dummy text making the lengths match.
                removalText += '0';
            }
            ops.push({
                type: 'remove_text',
                offset,
                path: targetPath,
                text: removalText,
            });
        }
        if ('insert' in delta) {
            (0, tiny_invariant_1.default)(typeof delta.insert === 'string', `Unexpected text insert content type: expected string, got ${typeof delta.insert}`);
            ops.push({
                type: 'insert_text',
                offset,
                text: delta.insert,
                path: targetPath,
            });
            offset += delta.insert.length;
        }
    });
    return ops;
}
exports.default = translateTextEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGx5VG9TbGF0ZS90ZXh0RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvRUFBdUM7QUFFdkMsOENBQStDO0FBRS9DOzs7O0dBSUc7QUFDSCxTQUF3QixrQkFBa0IsQ0FDeEMsS0FBbUI7SUFFbkIsTUFBTSxVQUFVLEdBQUcsSUFBQSxxQkFBVyxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUzQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDZixNQUFNLEdBQUcsR0FBb0IsRUFBRSxDQUFDO0lBRWhDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOztRQUNwQyxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDckIsTUFBTSxJQUFJLE1BQUEsS0FBSyxDQUFDLE1BQU0sbUNBQUksQ0FBQyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3JCLE1BQU0sWUFBWSxHQUFHLE1BQUEsS0FBSyxDQUFDLE1BQU0sbUNBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNyQixLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNqRCwrRUFBK0U7Z0JBQy9FLDBFQUEwRTtnQkFDMUUseUVBQXlFO2dCQUN6RSxXQUFXLElBQUksR0FBRyxDQUFDO2FBQ3BCO1lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsTUFBTTtnQkFDTixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLFdBQVc7YUFDbEIsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDckIsSUFBQSx3QkFBUyxFQUNQLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQ2hDLDZEQUE2RCxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FDbkYsQ0FBQztZQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLE1BQU07Z0JBQ04sSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNsQixJQUFJLEVBQUUsVUFBVTthQUNqQixDQUFDLENBQUM7WUFFSCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDL0I7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQWpERCxxQ0FpREMifQ==