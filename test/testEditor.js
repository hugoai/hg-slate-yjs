/* eslint-disable no-param-reassign */
const { Value } = require('slate');
const Y = require('yjs');
const { List } = require('immutable');
const { applySlateOps } = require('../src/apply');
const { toSlateOps } = require('../src/convert');

const TestEditor = {
    /**
     * create(): TestEditor
     */
    create() {
        const e = {};

        e.slateDoc = Value.create();
        e.doc = new Y.Doc();
        e.syncDoc = e.doc.getMap('content');
        e.capturedYjsUpdates = [];

        e.doc.on('update', (updateMessage, origin) => {
            TestEditor.captureYjsUpdate(e, updateMessage, origin);
        });

        e.syncDoc.observeDeep((events) => {
            TestEditor.applyYjsEventsToSlate(e, events);
        });

        return e;
    },

    /**
     * Apply slate ops to Yjs
     *
     * applySlateOpsToYjs(e: TestEditor, operations: Operation[]): void
     */
    applySlateOpsToYjs(e, operations) {
        e.doc.transact(() => {
            applySlateOps(e.syncDoc, operations);
        });
    },

    /**
     * Capture Yjs updates generated by this editor.
     *
     * captureYjsUpdate(e: TestEditor, update: Uint8Array, origin: any): void
     */
    captureYjsUpdate(e, update, origin) {
        if (origin === 'testEditor') return;
        e.capturedYjsUpdates.push(update);
    },

    /**
     * Return captured Yjs updates.
     *
     * getCapturedYjsUpdates: (e: TestEditor): Uint8Array[]
     */
    getCapturedYjsUpdates(e) {
        const result = e.capturedYjsUpdates;
        e.capturedYjsUpdates = [];
        return result;
    },

    /**
     * Apply one Yjs update to Yjs.
     *
     * applyYjsUpdateToYjs(e: TestEditor, update: Uint8Array): void
     */
    applyYjsUpdateToYjs(e, update) {
        try {
            Y.applyUpdate(e.doc, update, 'testEditor');
        } catch (err) {
            throw Error(err);
        }
    },

    /**
     * Apply multiple Yjs updates to Yjs.
     *
     * applyYjsUpdatesToYjs(e: TestEditor, updates: Uint8Array[]): void
     */
    applyYjsUpdatesToYjs(e, updates) {
        updates.forEach((update) => {
            TestEditor.applyYjsUpdateToYjs(e, update);
        });
    },

    /**
     * Apply one TransformFunc to slate.
     *
     * applyTransform(e: TestEditor, transform: TransformFunc): void
     */
    applyTransform(e, transform) {
        try {
            transform(e);
        } catch (err) {
            throw Error(err);
        }
    },

    /**
     * Apply multiple TransformFuncs to slate.
     *
     * applyTransforms(e: TestEditor, transforms: TransformFunc[]): void
     */
    applyTransforms(e, transforms) {
        transforms.forEach((transform) => {
            TestEditor.applyTransform(e, transform);
        });
    },

    /**
     * Apply Yjs events to slate
     *
     * applyYjsEventsToSlate(e: TestEditor, events: Y.YEvent[]): void
     */
    applyYjsEventsToSlate(e, events) {
        const change = e.slateDoc.change();
        change.withoutNormalizing(() => {
            toSlateOps(events).forEach((op) => {
                change.applyOperation(op);
            });
        });
        e.slateDoc = change.value;
    },

    /**
     * makeInsertText(text: string, at: Location): TransformFunc
     */
    makeInsertText(text, at) {
        return (e) => {
            const change = e.slateDoc.change().insertTextByPath(List(at.path), at.offset, text);
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeRemoveCharacters(count: number, at: Location): TransformFunc
     */
    makeRemoveCharacters(count, at) {
        return (e) => {
            const change = e.slateDoc.change().removeTextByPath(List(at.path), at.offset, count);
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeInsertNodes(nodes: Node[], path: Path): TransformFunc
     */
    makeInsertNodes(nodes, path) {
        return (e) => {
            let idx = path[path.length - 1];
            path = List(path.slice(0, -1));
            nodes.forEach((node) => {
                const change = e.slateDoc.change().insertNodeByPath(path, idx++, node);
                TestEditor.applySlateOpsToYjs(e, change.operations);
                e.slateDoc = change.value;
            });
        };
    },

    /**
     * makeMergeNodes(path: Path): TransformFunc
     */
    makeMergeNodes(path) {
        return (e) => {
            const change = e.slateDoc.change().mergeNodeByPath(List(path));
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeMoveNodes(from: Path, to: Path): TransformFunc
     */
    makeMoveNodes(from, to) {
        return (e) => {
            const idx = to[to.length - 1];
            to = to.slice(0, -1);
            const change = e.slateDoc.change().moveNodeByPath(List(from), List(to), idx);
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeRemoveNodes(path: Path): TransformFunc
     */
    makeRemoveNodes(path) {
        return (e) => {
            const change = e.slateDoc.change().removeNodeByPath(List(path));
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeSetNodes(at: Path, props: Partial<Node>): TransformFunc
     */
    makeSetNodes(path, props) {
        return (e) => {
            const change = e.slateDoc.change().setNodeByPath(List(path), { data: props });
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeSplitNodes(at: Location): TransformFunc
     */
    makeSplitNodes(at) {
        return (e) => {
            const c = e.slateDoc.change().moveTo(List(at.path), at.offset);
            const change = c.value.change().splitBlock();
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeSetValue(Properties: Properties): TransformFunc
     */
    makeSetValue(properties) {
        return (e) => {
            const change = e.slateDoc.change().setValue({ data: properties });
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeAddMark(path: Path, offset: number, length: number, markType: string): TransformFunc
     */
    makeAddMark(path, offset, length, markType) {
        return (e) => {
            const change = e.slateDoc
                .change()
                .addMarkByPath(path, offset, length, { type: markType });
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },

    /**
     * makeRemoveMark(path: Path, offset: number, length: number, markType: string): TransformFunc
     */
    makeRemoveMark(path, offset, length, markType) {
        return (e) => {
            const change = e.slateDoc
                .change()
                .removeMarkByPath(path, offset, length, { type: markType });
            TestEditor.applySlateOpsToYjs(e, change.operations);
            e.slateDoc = change.value;
        };
    },
};

module.exports = { TestEditor };
