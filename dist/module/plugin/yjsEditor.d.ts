import { Editor } from 'slate';
import { SharedType } from '../model';
export interface YjsEditor extends Editor {
    sharedType: SharedType;
}
export declare const YjsEditor: {
    /**
     * Set the editor value to the content of the to the editor bound shared type.
     */
    synchronizeValue: (e: YjsEditor) => void;
    /**
     * Returns whether the editor currently is applying remote changes.
     */
    sharedType: (editor: YjsEditor) => SharedType;
    /**
     * Returns whether the editor currently is applying remote changes.
     */
    isRemote: (editor: YjsEditor) => boolean;
    /**
     * Performs an action as a remote operation.
     */
    asRemote: (editor: YjsEditor, fn: () => void) => void;
};
export declare function withYjs<T extends Editor>(editor: T, sharedType: SharedType, { synchronizeValue }?: WithYjsOptions): T & YjsEditor;
export declare type WithYjsOptions = {
    synchronizeValue?: boolean;
};
