"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCursor = exports.CursorEditor = void 0;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const utils_1 = require("../cursor/utils");
const yjsEditor_1 = require("./yjsEditor");
const AWARENESS = new WeakMap();
exports.CursorEditor = {
    awareness(editor) {
        const awareness = AWARENESS.get(editor);
        (0, tiny_invariant_1.default)(awareness, 'CursorEditor without attaches awareness');
        return awareness;
    },
    updateCursor: (editor) => {
        const sharedType = yjsEditor_1.YjsEditor.sharedType(editor);
        const { selection } = editor;
        const anchor = selection &&
            (0, utils_1.absolutePositionToRelativePosition)(sharedType, selection.anchor);
        const focus = selection &&
            (0, utils_1.absolutePositionToRelativePosition)(sharedType, selection.focus);
        const awareness = exports.CursorEditor.awareness(editor);
        awareness.setLocalState(Object.assign(Object.assign({}, awareness.getLocalState()), { anchor, focus }));
    },
};
function withCursor(editor, awareness) {
    const e = editor;
    AWARENESS.set(e, awareness);
    e.awareness = awareness;
    const { onChange } = editor;
    e.onChange = () => {
        setTimeout(() => exports.CursorEditor.updateCursor(e), 0);
        if (onChange) {
            onChange();
        }
    };
    return e;
}
exports.withCursor = withCursor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3Vyc29yRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BsdWdpbi9jdXJzb3JFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0Esb0VBQXVDO0FBRXZDLDJDQUFxRTtBQUNyRSwyQ0FBd0M7QUFFeEMsTUFBTSxTQUFTLEdBQStCLElBQUksT0FBTyxFQUFFLENBQUM7QUFNL0MsUUFBQSxZQUFZLEdBQUc7SUFDMUIsU0FBUyxDQUFDLE1BQW9CO1FBQzVCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBQSx3QkFBUyxFQUFDLFNBQVMsRUFBRSx5Q0FBeUMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxZQUFZLEVBQUUsQ0FBQyxNQUFvQixFQUFRLEVBQUU7UUFDM0MsTUFBTSxVQUFVLEdBQUcscUJBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUU3QixNQUFNLE1BQU0sR0FDVixTQUFTO1lBQ1QsSUFBQSwwQ0FBa0MsRUFBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5FLE1BQU0sS0FBSyxHQUNULFNBQVM7WUFDVCxJQUFBLDBDQUFrQyxFQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbEUsTUFBTSxTQUFTLEdBQUcsb0JBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsU0FBUyxDQUFDLGFBQWEsaUNBQU0sU0FBUyxDQUFDLGFBQWEsRUFBRSxLQUFFLE1BQU0sRUFBRSxLQUFLLElBQUcsQ0FBQztJQUMzRSxDQUFDO0NBQ0YsQ0FBQztBQUVGLFNBQWdCLFVBQVUsQ0FDeEIsTUFBUyxFQUNULFNBQW9CO0lBRXBCLE1BQU0sQ0FBQyxHQUFHLE1BQTBCLENBQUM7SUFFckMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDNUIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFFeEIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQztJQUU1QixDQUFDLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUNoQixVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbEQsSUFBSSxRQUFRLEVBQUU7WUFDWixRQUFRLEVBQUUsQ0FBQztTQUNaO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBcEJELGdDQW9CQyJ9