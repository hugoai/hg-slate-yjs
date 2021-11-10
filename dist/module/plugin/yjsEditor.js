import { Editor } from 'slate';
import invariant from 'tiny-invariant';
import { applyYjsEvents } from '../applyToSlate';
import applySlateOps from '../applyToYjs';
import { slateYjsSymbol } from '../model';
import { toSlateDoc } from '../utils';
const IS_REMOTE = new WeakSet();
const LOCAL_OPERATIONS = new WeakMap();
const SHARED_TYPES = new WeakMap();
export const YjsEditor = {
    /**
     * Set the editor value to the content of the to the editor bound shared type.
     */
    synchronizeValue: (e) => {
        Editor.withoutNormalizing(e, () => {
            e.children = toSlateDoc(e.sharedType);
            e.onChange();
        });
    },
    /**
     * Returns whether the editor currently is applying remote changes.
     */
    sharedType: (editor) => {
        const sharedType = SHARED_TYPES.get(editor);
        invariant(sharedType, 'YjsEditor without attached shared type');
        return sharedType;
    },
    /**
     * Returns whether the editor currently is applying remote changes.
     */
    isRemote: (editor) => {
        return IS_REMOTE.has(editor);
    },
    /**
     * Performs an action as a remote operation.
     */
    asRemote: (editor, fn) => {
        const wasRemote = YjsEditor.isRemote(editor);
        IS_REMOTE.add(editor);
        fn();
        if (!wasRemote) {
            IS_REMOTE.delete(editor);
        }
    },
};
function localOperations(editor) {
    const operations = LOCAL_OPERATIONS.get(editor);
    invariant(operations, 'YjsEditor without attached local operations');
    return operations;
}
function trackLocalOperations(editor, operation) {
    if (!YjsEditor.isRemote(editor)) {
        localOperations(editor).add(operation);
    }
}
/**
 * Applies a slate operations to the bound shared type.
 */
function applyLocalOperations(editor) {
    const editorLocalOperations = localOperations(editor);
    applySlateOps(YjsEditor.sharedType(editor), Array.from(editorLocalOperations), slateYjsSymbol);
    editorLocalOperations.clear();
}
/**
 * Apply Yjs events to slate
 */
function applyRemoteYjsEvents(editor, events) {
    Editor.withoutNormalizing(editor, () => YjsEditor.asRemote(editor, () => applyYjsEvents(editor, events.filter((event) => event.transaction.origin !== slateYjsSymbol))));
}
export function withYjs(editor, sharedType, { synchronizeValue = true } = {}) {
    const e = editor;
    e.sharedType = sharedType;
    SHARED_TYPES.set(editor, sharedType);
    LOCAL_OPERATIONS.set(editor, new Set());
    if (synchronizeValue) {
        setTimeout(() => YjsEditor.synchronizeValue(e), 0);
    }
    sharedType.observeDeep((events) => applyRemoteYjsEvents(e, events));
    const { apply, onChange } = e;
    e.apply = (op) => {
        trackLocalOperations(e, op);
        apply(op);
    };
    e.onChange = () => {
        applyLocalOperations(e);
        onChange();
    };
    return e;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWpzRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BsdWdpbi95anNFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBYSxNQUFNLE9BQU8sQ0FBQztBQUMxQyxPQUFPLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBYyxjQUFjLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV0QyxNQUFNLFNBQVMsR0FBb0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUNqRCxNQUFNLGdCQUFnQixHQUFvQyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBQ3hFLE1BQU0sWUFBWSxHQUFnQyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBTWhFLE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBRztJQUN2Qjs7T0FFRztJQUNILGdCQUFnQixFQUFFLENBQUMsQ0FBWSxFQUFRLEVBQUU7UUFDdkMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDaEMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxFQUFFLENBQUMsTUFBaUIsRUFBYyxFQUFFO1FBQzVDLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsU0FBUyxDQUFDLFVBQVUsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sVUFBVSxDQUFDO0lBQ3BC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