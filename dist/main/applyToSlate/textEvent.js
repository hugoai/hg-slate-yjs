"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slate_1 = require("slate");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const convert_1 = require("../utils/convert");
/**
 * Translates a Yjs text event into a slate operations.
 *
 * @param event
 */
function translateTextEvent(editor, event) {
    const targetPath = (0, convert_1.toSlatePath)(event.path);
    const targetText = slate_1.Node.get(editor, targetPath);
    (0, tiny_invariant_1.default)(slate_1.Text.isText(targetText), 'Cannot apply text event to non-text node');
    let offset = 0;
    let { text } = targetText;
    const ops = [];
    event.changes.delta.forEach((delta) => {
        var _a, _b;
        if ('retain' in delta) {
            offset += (_a = delta.retain) !== null && _a !== void 0 ? _a : 0;
        }
        if ('delete' in delta) {
            const endOffset = offset + ((_b = delta.delete) !== null && _b !== void 0 ? _b : 0);
            ops.push({
                type: 'remove_text',
                offset,
                path: targetPath,
                text: text.slice(offset, endOffset),
            });
            text = text.slice(0, offset) + text.slice(endOffset);
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
            text = text.slice(0, offset) + delta.insert + text.slice(offset);
        }
    });
    return ops;
}
exports.default = translateTextEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGx5VG9TbGF0ZS90ZXh0RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxpQ0FBMEQ7QUFDMUQsb0VBQXVDO0FBRXZDLDhDQUErQztBQUUvQzs7OztHQUlHO0FBQ0gsU0FBd0Isa0JBQWtCLENBQ3hDLE1BQWMsRUFDZCxLQUFtQjtJQUVuQixNQUFNLFVBQVUsR0FBRyxJQUFBLHFCQUFXLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLE1BQU0sVUFBVSxHQUFHLFlBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRWhELElBQUEsd0JBQVMsRUFDUCxZQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUN2QiwwQ0FBMEMsQ0FDM0MsQ0FBQztJQUVGLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUM7SUFDMUIsTUFBTSxHQUFHLEdBQW9CLEVBQUUsQ0FBQztJQUVoQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7UUFDcEMsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxNQUFBLEtBQUssQ0FBQyxNQUFNLG1DQUFJLENBQUMsQ0FBQztTQUM3QjtRQUVELElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNyQixNQUFNLFNBQVMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFBLEtBQUssQ0FBQyxNQUFNLG1DQUFJLENBQUMsQ0FBQyxDQUFDO1lBRS9DLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLE1BQU07Z0JBQ04sSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDckIsSUFBQSx3QkFBUyxFQUNQLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQ2hDLDZEQUE2RCxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FDbkYsQ0FBQztZQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLE1BQU07Z0JBQ04sSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNsQixJQUFJLEVBQUUsVUFBVTthQUNqQixDQUFDLENBQUM7WUFFSCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBckRELHFDQXFEQyJ9