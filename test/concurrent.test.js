/* eslint-disable no-param-reassign */
const Y = require('yjs');
const { Text } = require('slate');
const { TestEditor } = require('./testEditor');
const { toSlateDoc } = require('../src');
const { createLine, createText } = require('./utils');

const initialState = [
    createLine([
        Text.create({ leaves: [{ text: 'alfa brav' }, { text: 'o', marks: [{ type: 'em' }] }] }),
    ]),
    createLine([createText('charlie delta')]),
    createLine([
        Text.create({
            leaves: [{ text: 'ech', marks: [{ type: 'strong' }] }, { text: 'o foxtrot' }],
        }),
    ]),
    createLine([createText('golf hotel')]),
];

const tests = [
    {
        name: 'Insert text into 1st paragraph',
        transform: TestEditor.makeInsertText('india ', { path: [0, 0], offset: 5 }),
    },
    {
        name: 'Insert text into 2nd paragraph',
        transform: TestEditor.makeInsertText('juliett ', { path: [1, 0], offset: 8 }),
    },
    {
        name: 'Insert text into 3rd paragraph',
        transform: TestEditor.makeInsertText('kilo ', { path: [2, 0], offset: 5 }),
    },
    {
        name: 'Insert text into 4th paragraph',
        transform: TestEditor.makeInsertText('lima ', { path: [3, 0], offset: 5 }),
    },
    {
        name: 'Delete text from 1st paragraph',
        transform: TestEditor.makeRemoveCharacters(5, { path: [0, 0], offset: 2 }),
    },
    {
        name: 'Delete text from 2nd paragraph',
        transform: TestEditor.makeRemoveCharacters(6, { path: [1, 0], offset: 4 }),
    },
    {
        name: 'Delete text from 3nd paragraph',
        transform: TestEditor.makeRemoveCharacters(5, { path: [2, 0], offset: 3 }),
    },
    {
        name: 'Delete text from 4th paragraph',
        transform: TestEditor.makeRemoveCharacters(7, { path: [3, 0], offset: 1 }),
    },
    {
        name: 'Insert new paragraph before 1st',
        transform: TestEditor.makeInsertNodes([createLine([createText('mike')])], [0]),
    },
    {
        name: 'Insert new paragraph between 1st and 2nd',
        transform: TestEditor.makeInsertNodes([createLine([createText('november')])], [1]),
    },
    {
        name: 'Insert new paragraph between 2nd and 3rd',
        transform: TestEditor.makeInsertNodes([createLine([createText('oscar')])], [2]),
    },
    {
        name: 'Insert new paragraph between 3rd and 4th',
        transform: TestEditor.makeInsertNodes([createLine([createText('papa')])], [3]),
    },
    {
        name: 'Insert new paragraph after 4th',
        transform: TestEditor.makeInsertNodes([createLine([createText('quebec')])], [4]),
    },
    {
        name: 'Insert new text node into 1st paragraph',
        transform: TestEditor.makeInsertNodes([createText('romeo')], [0, 0]),
    },
    {
        name: 'Insert new text node into 2nd paragraph',
        transform: TestEditor.makeInsertNodes([createText('sierra')], [1, 0]),
    },
    {
        name: 'Insert new text node into 3rd paragraph',
        transform: TestEditor.makeInsertNodes([createText('tango')], [2, 0]),
    },
    {
        name: 'Insert new text node into 4th paragraph',
        transform: TestEditor.makeInsertNodes([createText('uniform')], [3, 0]),
    },
    {
        name: 'Merge 1st and 2nd paragraphs',
        transform: TestEditor.makeMergeNodes([1]),
    },
    {
        name: 'Merge 2nd and 3rd paragraphs',
        transform: TestEditor.makeMergeNodes([2]),
    },
    {
        name: 'Merge 3nd and 4th paragraphs',
        transform: TestEditor.makeMergeNodes([3]),
    },
    {
        name: 'Remove 1st paragraph',
        transform: TestEditor.makeRemoveNodes([0]),
    },
    {
        name: 'Remove 2nd paragraph',
        transform: TestEditor.makeRemoveNodes([1]),
    },
    {
        name: 'Remove 3rd paragraph',
        transform: TestEditor.makeRemoveNodes([2]),
    },
    {
        name: 'Remove 4th paragraph',
        transform: TestEditor.makeRemoveNodes([3]),
    },
    {
        name: 'Remove text node from 1st paragraph',
        transform: TestEditor.makeRemoveNodes([0, 0]),
    },
    {
        name: 'Remove text node from 2nd paragraph',
        transform: TestEditor.makeRemoveNodes([1, 0]),
    },
    {
        name: 'Remove text node from 3nd paragraph',
        transform: TestEditor.makeRemoveNodes([2, 0]),
    },
    {
        name: 'Remove text node from 4th paragraph',
        transform: TestEditor.makeRemoveNodes([3, 0]),
    },
    {
        name: 'Split 1st paragraph',
        transform: TestEditor.makeSplitNodes({ path: [0, 0], offset: 4 }),
    },
    {
        name: 'Split 2nd paragraph',
        transform: TestEditor.makeSplitNodes({ path: [1, 0], offset: 5 }),
    },
    {
        name: 'Split 3rd paragraph',
        transform: TestEditor.makeSplitNodes({ path: [2, 0], offset: 6 }),
    },
    {
        name: 'Split 4th paragraph',
        transform: TestEditor.makeSplitNodes({ path: [3, 0], offset: 7 }),
    },
    {
        name: 'Move 1st paragraph',
        transform: TestEditor.makeMoveNodes([0], [3]),
    },
    {
        name: 'Move 2nd paragraph',
        transform: TestEditor.makeMoveNodes([3], [2]),
    },
    {
        name: 'Move 3rd paragraph',
        transform: TestEditor.makeMoveNodes([2], [1]),
    },
    {
        name: 'Move 4th paragraph',
        transform: TestEditor.makeMoveNodes([1], [0]),
    },
    {
        name: 'Add formatting to 1st paragraph',
        transform: TestEditor.makeAddMark([0, 0], 1, 9, 'strong'),
    },
    {
        name: 'Add formatting to 2nd paragraph',
        transform: TestEditor.makeAddMark([1, 0], 2, 11, 'em'),
    },
    {
        name: 'Add formatting to 3rd paragraph',
        transform: TestEditor.makeAddMark([2, 0], 3, 6, 'underline'),
    },
    {
        name: 'Add formatting to 4th paragraph',
        transform: TestEditor.makeAddMark([3, 0], 4, 2, 'strong'),
    },
    {
        name: 'Remove formatting from 1st paragraph',
        transform: TestEditor.makeRemoveMark([0, 0], 9, 1, 'em'),
    },
    {
        name: 'Remove formatting from 3rd paragraph',
        transform: TestEditor.makeRemoveMark([2, 0], 0, 3, 'strong'),
    },
    {
        name: 'Add TopLevel data',
        transform: TestEditor.makeSetValue({
            createdBy: {
                emailAddress: 'danielblank07@gmail.com',
            },
        }),
    },
    {
        name: 'Update the TopLevel Data 1',
        transform: TestEditor.makeSetValue({
            createdBy: {
                emailAddress: 'danielblank07@gmail.com',
                id: 'ac8e5fe7-af4e-4281-b1e2-53630606e7c6',
            },
        }),
    },
    {
        name: 'Update the TopLevel Data 2',
        transform: TestEditor.makeSetValue({
            createdBy: {
                emailAddress: 'danielblank07@gmail.com',
                id: 'ac8e5fe7-af4e-4281-b1e2-53630606e7c6',
                name: 'Daniel Blank',
            },
        }),
    },
    {
        name: 'Update the TopLevel Data 3',
        transform: TestEditor.makeSetValue({
            createdBy: {
                emailAddress: 'danielblank07@gmail.com',
                id: 'ac8e5fe7-af4e-4281-b1e2-53630606e7c6',
                name: 'Daniel Blank',
                pictureUrl:
                    'https://lh4.googleusercontent.com/-Au4KLfih-zQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcJjTL-m5CILVsClpS2Om3OQycCcQ/photo.jpg',
                teamId: '8d930c14-9116-4984-b5c8-cdee9432ae87',
            },
        }),
    },
];

const nodeToJSON = (node) => node.toJSON();

// Recursively walk JSON representation of slate doc, reordering leaf marks
// (when present) into canonical order (sorted by mark type).
const fixMarkOrder = (node) => {
    for (const key in node) {
        if (key === 'nodes' && node.object === 'block') {
            node[key] = node[key].map(fixMarkOrder);
        } else if (key === 'leaves' && node.object === 'text') {
            node[key] = node[key].map(fixMarkOrder);
        } else if (key === 'marks' && node.object === 'leaf') {
            node[key] = node[key].map(fixMarkOrder).sort((a, b) => {
                if (a.type < b.type) {
                    return -1;
                } else if (a.type > b.type) {
                    return 1;
                }
                return 0;
            });
        }
    }
    return node;
};

// Returns slate document as JSON.
const getSlateDocAsJSON = (editor) =>
    editor.slateDoc.document.nodes.toArray().map(nodeToJSON).map(fixMarkOrder);

// Returns sync document converted to slate format as JSON.
const getSyncDocAsJSON = (editor) => toSlateDoc(editor.syncDoc.get('document')).map(nodeToJSON);

const runOneTest = async (ti, tj) => {
    // Create two editors.
    const ei = TestEditor.create();
    const ej = TestEditor.create();

    ei.syncDoc.set('data', new Y.Map());
    ei.syncDoc.set('document', new Y.Array());

    // Set initial state for 1st editor, propagate changes to 2nd.
    TestEditor.applyTransform(ei, TestEditor.makeInsertNodes(initialState, [0]));
    const updates = TestEditor.getCapturedYjsUpdates(ei);
    TestEditor.applyYjsUpdatesToYjs(ej, updates);

    // Verify initial 'document' states.
    expect(getSlateDocAsJSON(ei)).toEqual(getSlateDocAsJSON(ej));
    expect(getSyncDocAsJSON(ei)).toEqual(getSyncDocAsJSON(ej));
    expect(Y.encodeStateAsUpdate(ei.doc)).toEqual(Y.encodeStateAsUpdate(ej.doc));
    expect(Y.encodeStateVector(ei.doc)).toEqual(Y.encodeStateVector(ej.doc));

    // Verify initial 'data' states.
    expect(ei.slateDoc.data.toJSON()).toEqual(ej.slateDoc.data.toJSON());
    expect(ei.syncDoc.get('data').toJSON()).toEqual(ej.syncDoc.get('data').toJSON());

    // Apply 1st transform to 1st editor.
    TestEditor.applyTransform(ei, ti.transform);

    // Apply 2nd transform to 2nd editor.
    TestEditor.applyTransform(ej, tj.transform);

    // Cross-propagate updates between editors (using a loop, as it is possible
    // that applying one update will cause another update to be generated -- see
    // https://discuss.yjs.dev/t/yjs-state-diverging-trying-to-figure-out-why/329).
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const updatesFromI = TestEditor.getCapturedYjsUpdates(ei);
        const updatesFromJ = TestEditor.getCapturedYjsUpdates(ej);
        if (updatesFromI.length === 0 && updatesFromJ.length === 0) {
            break;
        }

        TestEditor.applyYjsUpdatesToYjs(ei, updatesFromJ);
        TestEditor.applyYjsUpdatesToYjs(ej, updatesFromI);
    }

    // Verify final 'document' states.
    expect(Y.encodeStateVector(ei.doc)).toEqual(Y.encodeStateVector(ej.doc));
    expect(Y.encodeStateAsUpdate(ei.doc)).toEqual(Y.encodeStateAsUpdate(ej.doc));
    expect(getSyncDocAsJSON(ei)).toEqual(getSyncDocAsJSON(ej));
    expect(getSlateDocAsJSON(ei)).toEqual(getSlateDocAsJSON(ej));

    // Verify final 'data' states.
    expect(ei.syncDoc.get('data').toJSON()).toEqual(ej.syncDoc.get('data').toJSON());
    expect(ei.slateDoc.data.toJSON()).toEqual(ej.slateDoc.data.toJSON());
};

describe('model concurrent edits in separate editors', () => {
    for (let i = 0; i < tests.length; i += 1) {
        const ti = tests[i];
        describe(`I:${ti.name}`, () => {
            for (let j = i; j < tests.length; j += 1) {
                const tj = tests[j];
                // eslint-disable-next-line jest/expect-expect
                it(`J:${tj.name}`, async () => {
                    await runOneTest(ti, tj);
                });
            }
        });
    }
});
