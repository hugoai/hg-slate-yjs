import { Awareness } from 'y-protocols/awareness';
import { YjsEditor } from './yjsEditor';
export interface CursorEditor extends YjsEditor {
    awareness: Awareness;
}
export declare const CursorEditor: {
    awareness(editor: CursorEditor): Awareness;
    updateCursor: (editor: CursorEditor) => void;
};
export declare function withCursor<T extends YjsEditor>(editor: T, awareness: Awareness): T & CursorEditor;
