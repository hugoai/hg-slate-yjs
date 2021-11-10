"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withYjs = exports.YjsEditor = void 0;
const slate_1 = require("slate");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const applyToSlate_1 = require("../applyToSlate");
const applyToYjs_1 = __importDefault(require("../applyToYjs"));
const model_1 = require("../model");
const utils_1 = require("../utils");
const IS_REMOTE = new WeakSet();
const LOCAL_OPERATIONS = new WeakMap();
const SHARED_TYPES = new WeakMap();
exports.YjsEditor = {
    /**
     * Set the editor value to the content of the to the editor bound shared type.
     */
    synchronizeValue: (e) => {
        slate_1.Editor.withoutNormalizing(e, () => {
            e.children = (0, utils_1.toSlateDoc)(e.sharedType);
            e.onChange();
        });
    },
    /**
     * Returns whether the editor currently is applying remote changes.
     */
    sharedType: (editor) => {
        const sharedType = SHARED_TYPES.get(editor);
        (0, tiny_invariant_1.default)(sharedType, 'YjsEditor without attached shared type');
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
        const wasRemote = exports.YjsEditor.isRemote(editor);
        IS_REMOTE.add(editor);
        fn();
        if (!wasRemote) {
            IS_REMOTE.delete(editor);
        }
    },
};
function localOperations(editor) {
    const operations = LOCAL_OPERATIONS.get(editor);
    (0, tiny_invariant_1.default)(operations, 'YjsEditor without attached local operations');
    return operations;
}
function trackLocalOperations(editor, operation) {
    if (!exports.YjsEditor.isRemote(editor)) {
        localOperations(editor).add(operation);
    }
}
/**
 * Applies a slate operations to the bound shared type.
 */
function applyLocalOperations(editor) {
    const editorLocalOperations = localOperations(editor);
    (0, applyToYjs_1.default)(exports.YjsEditor.sharedType(editor), Array.from(editorLocalOperations), model_1.slateYjsSymbol);
    editorLocalOperations.clear();
}
/**
 * Apply Yjs events to slate
 */
function applyRemoteYjsEvents(editor, events) {
    slate_1.Editor.withoutNormalizing(editor, () => exports.YjsEditor.asRemote(editor, () => (0, applyToSlate_1.applyYjsEvents)(editor, events.filter((event) => event.transaction.origin !== model_1.slateYjsSymbol))));
}
function withYjs(editor, sharedType, { synchronizeValue = true } = {}) {
    const e = editor;
    e.sharedType = sharedType;
    SHARED_TYPES.set(editor, sharedType);
    LOCAL_OPERATIONS.set(editor, new Set());
    if (synchronizeValue) {
        setTimeout(() => exports.YjsEditor.synchronizeValue(e), 0);
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
exports.withYjs = withYjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieWpzRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BsdWdpbi95anNFZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUNBQTBDO0FBQzFDLG9FQUF1QztBQUV2QyxrREFBaUQ7QUFDakQsK0RBQTBDO0FBQzFDLG9DQUFzRDtBQUN0RCxvQ0FBc0M7QUFFdEMsTUFBTSxTQUFTLEdBQW9CLElBQUksT0FBTyxFQUFFLENBQUM7QUFDakQsTUFBTSxnQkFBZ0IsR0FBb0MsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUN4RSxNQUFNLFlBQVksR0FBZ0MsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQU1uRCxRQUFBLFNBQVMsR0FBRztJQUN2Qjs7T0FFRztJQUNILGdCQUFnQixFQUFFLENBQUMsQ0FBWSxFQUFRLEVBQUU7UUFDdkMsY0FBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUU7WUFDaEMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFBLGtCQUFVLEVBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxFQUFFLENBQUMsTUFBaUIsRUFBYyxFQUFFO1FBQzVDLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBQSx3QkFBUyxFQUFDLFVBQVUsRUFBRSx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsRUFBRSxDQUFDLE1BQWlCLEVBQVcsRUFBRTtRQUN2QyxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUSxFQUFFLENBQUMsTUFB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