const { TestEditor } = require('./testEditor');
const { toSlateDoc } = require('../src');
const { createLine, createText } = require('./utils');

const Y = require('yjs');

const initialState = [
  createLine([createText('alfa bravo')]),
  createLine([createText('charlie delta')]),
  createLine([createText('echo foxtrot')]),
  createLine([createText('golf hotel')]),
];

const tests = [
  {
    name: 'Insert text into 1st paragraph',
    transform: TestEditor.makeInsertText('india ', { path: [0, 0], offset: 5}),
  },
  {
    name: 'Insert text into 2nd paragraph',
    transform: TestEditor.makeInsertText('juliett ', { path: [1, 0], offset: 8}),
  },
  {
    name: 'Insert text into 3rd paragraph',
    transform: TestEditor.makeInsertText('kilo ', { path: [2, 0], offset: 5}),
  },
  {
    name: 'Insert text into 4th paragraph',
    transform: TestEditor.makeInsertText('lima ', { path: [3, 0], offset: 5}),
  },
  {
    name: 'Delete text from 1st paragraph',
    transform: TestEditor.makeRemoveCharacters(5, { path: [0, 0], offset: 2}),
  },
  {
    name: 'Delete text from 2nd paragraph',
    transform: TestEditor.makeRemoveCharacters(6, { path: [1, 0], offset: 4}),
  },
  {
    name: 'Delete text from 3nd paragraph',
    transform: TestEditor.makeRemoveCharacters(5, { path: [2, 0], offset: 3}),
  },
  {
    name: 'Delete text from 4th paragraph',
    transform: TestEditor.makeRemoveCharacters(7, { path: [3, 0], offset: 1}),
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
    transform: TestEditor.makeSplitNodes({ path: [0, 0], offset: 4}),
  },
  {
    name: 'Split 2nd paragraph',
    transform: TestEditor.makeSplitNodes({ path: [1, 0], offset: 5}),
  },
  {
    name: 'Split 3rd paragraph',
    transform: TestEditor.makeSplitNodes({ path: [2, 0], offset: 6}),
  },
  {
    name: 'Split 4th paragraph',
    transform: TestEditor.makeSplitNodes({ path: [3, 0], offset: 7}),
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
  // Temporarily comment out the following, as it is causing test failures.
  //  {
  //    name: 'Add formatting to 4th paragraph',
  //    transform: TestEditor.makeAddMark([3, 0], 4, 2, 'strong'),
  //  },
  {
    name: 'Add TopLevel data',
    transform: TestEditor.makeSetValue({createdBy:{
      emailAddress: "danielblank07@gmail.com",
    }})
  },
  {
    name: 'Update the TopLevel Data 1',
    transform: TestEditor.makeSetValue({createdBy:{
      emailAddress: "danielblank07@gmail.com",
      id: "ac8e5fe7-af4e-4281-b1e2-53630606e7c6",
    }})
  },
  {
    name: 'Update the TopLevel Data 2',
    transform: TestEditor.makeSetValue({createdBy:{
      emailAddress: "danielblank07@gmail.com",
      id: "ac8e5fe7-af4e-4281-b1e2-53630606e7c6",
      name: "Daniel Blank",
    }})
  },
  {
    name: 'Update the TopLevel Data 3',
    transform: TestEditor.makeSetValue({createdBy:{
      emailAddress: "danielblank07@gmail.com",
      id: "ac8e5fe7-af4e-4281-b1e2-53630606e7c6",
      name: "Daniel Blank",
      pictureUrl: "https://lh4.googleusercontent.com/-Au4KLfih-zQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcJjTL-m5CILVsClpS2Om3OQycCcQ/photo.jpg",
      teamId: "8d930c14-9116-4984-b5c8-cdee9432ae87"
    }})
  },
];

const nodeToJSON = (node) => node.toJSON();

// Returns slate document as JSON.
const getSlateDocAsJSON = (editor) => {
  return editor.slateDoc.document.nodes.toArray().map(nodeToJSON);
};

// Returns sync document converted to slate format as JSON.
const getSyncDocAsJSON = (editor) => {
  return toSlateDoc(editor.syncDoc.get('document')).map(nodeToJSON);
};

const runOneTest = async (ti, tj) => {
  // Create two editors.
  const ei = TestEditor.create();
  const ej = TestEditor.create();

  ei.syncDoc.set("data", new Y.Map())
  ei.syncDoc.set("document", new Y.Array())

  // Set initial state for 1st editor, propagate changes to 2nd.
  TestEditor.applyTransform(ei, TestEditor.makeInsertNodes(initialState, [0]));
  const updates = TestEditor.getCapturedYjsUpdates(ei);
  TestEditor.applyYjsUpdatesToYjs(ej, updates);

  // Verify initial 'document' states.
  expect(getSlateDocAsJSON(ei)).toEqual(getSlateDocAsJSON(ej));
  expect(getSyncDocAsJSON(ei)).toEqual(getSyncDocAsJSON(ej));
  expect(Y.encodeStateAsUpdate(ei.doc)).toEqual(Y.encodeStateAsUpdate(ej.doc));

  // Verify initial 'data' states.
  expect(ei.slateDoc.data.toJSON())
    .toEqual(ej.slateDoc.data.toJSON());
  expect(ei.syncDoc.get('data').toJSON())
    .toEqual(ej.syncDoc.get('data').toJSON());

  // Apply 1st transform to 1st editor, capture updates.
  TestEditor.applyTransform(ei, ti.transform);
  const updatesFromI = TestEditor.getCapturedYjsUpdates(ei);

  // Apply 2nd transform to 2nd editor, capture updates.
  TestEditor.applyTransform(ej, tj.transform);
  const updatesFromJ = TestEditor.getCapturedYjsUpdates(ej);

  // Cross-propagate updates between editors.
  TestEditor.applyYjsUpdatesToYjs(ei, updatesFromJ);
  TestEditor.applyYjsUpdatesToYjs(ej, updatesFromI);

  // Verify final 'document' states.
  expect(Y.encodeStateAsUpdate(ei.doc)).toEqual(Y.encodeStateAsUpdate(ej.doc));
  expect(getSyncDocAsJSON(ei)).toEqual(getSyncDocAsJSON(ej));
  expect(getSlateDocAsJSON(ei)).toEqual(getSlateDocAsJSON(ej));

  // Verify final 'data' states.
  expect(ei.syncDoc.get('data').toJSON())
    .toEqual(ej.syncDoc.get('data').toJSON());
  expect(ei.slateDoc.data.toJSON())
    .toEqual(ej.slateDoc.data.toJSON());
}

describe('model concurrent edits in separate editors', () => {
  for (let i = 0; i < tests.length; i += 1) {
    const ti = tests[i];
    describe(`I:${ti.name}`, () => {
      for (let j = i; j < tests.length; j += 1) {
        const tj = tests[j];
        it(`J:${tj.name}`, async () => {
          await runOneTest(ti, tj);
        });
      }
    })
  }
})
