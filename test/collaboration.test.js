const { TestEditor } = require('./testEditor');
const { toSlateDoc } = require('../src');
const { createLine, createText } = require('./utils');
const { Text, Value } = require('slate');
const Y = require('yjs');

const tests = [
  [
    "Insert text into a paragraph node",
    [createLine([createText("")])],
    [
      TestEditor.makeInsertText("Hello ", { path: [0, 0], offset: 0 }),
      TestEditor.makeInsertText("collaborator", { path: [0, 0], offset: 6 }),
      TestEditor.makeInsertText("!", { path: [0, 0], offset: 18 }),
    ],
    [createLine([createText("Hello collaborator!")])],
  ],
  [
    "Delete characters from a paragraph node",
    [createLine([createText("Hello collaborator!")])],
    [
      TestEditor.makeRemoveCharacters(7, { path: [0, 0], offset: 11 }),
      TestEditor.makeRemoveCharacters(6, { path: [0, 0], offset: 5 }),
    ],
    [createLine([createText("Hello!")])],
  ],
  [
    "Insert new nodes (both paragraph and text)",
    [createLine([createText("")])],
    [
      TestEditor.makeInsertNodes([createLine([createText("")])], [1]),
      TestEditor.makeInsertNodes([createText("Hello collaborator!")], [1, 0]),
    ],
    [
      createLine([createText("")]),
      createLine([createText("Hello collaborator!")]),
    ],
  ],
  [
    "Insert new nodes (two paragraphs)",
    [
      createLine([createText("alfa")]),
      createLine([createText("bravo")]),
      createLine([createText("charlie")]),
      createLine([createText("delta")]),
    ],
    [
      TestEditor.makeInsertNodes([createLine([createText("echo")])], [1]),
      TestEditor.makeInsertNodes([createLine([createText("foxtrot")])], [4]),
    ],
    [
      createLine([createText("alfa")]),
      createLine([createText("echo")]),
      createLine([createText("bravo")]),
      createLine([createText("charlie")]),
      createLine([createText("foxtrot")]),
      createLine([createText("delta")]),
    ],
  ],
  [
    "Insert new nodes (three paragraphs)",
    [
      createLine([createText("one")]),
      createLine([createText("two")]),
      createLine([createText("three")]),
      createLine([createText("four")]),
    ],
    [
      TestEditor.makeInsertNodes([createLine([createText("five")])], [1]),
      TestEditor.makeInsertNodes([createLine([createText("six")])], [3]),
      TestEditor.makeInsertNodes([createLine([createText("seven")])], [5]),
    ],
    [
      createLine([createText("one")]),
      createLine([createText("five")]),
      createLine([createText("two")]),
      createLine([createText("six")]),
      createLine([createText("three")]),
      createLine([createText("seven")]),
      createLine([createText("four")]),
    ],
  ],
  [
    "Merge two paragraph nodes",
    [
      createLine([
        Text.create({ leaves: [
          { text: 'Hello', marks: [{ type: 'strong' }]},
          { text: ' ' },
        ]})
      ]),
      createLine([
        Text.create({ leaves: [
          { text: 'collaborator!', marks: [{ type: 'em' }]},
        ]})
      ]),
    ],
    [TestEditor.makeMergeNodes([1])],
    [
      createLine([
        Text.create({ leaves: [
          { text: 'Hello', marks: [{ type: 'strong' }]},
          { text: ' ' },
          { text: 'collaborator!', marks: [{ type: 'em' }]}
        ]})
      ]),
    ],
  ],
  [
    // Also verifies that marks are preserved when moving nodes.
    'Move a paragraph node to an existing position',
    [
      createLine([
        Text.create({ leaves: [{ text: 'first', marks: [{ type: 'em' }]}]})
      ]),
      createLine([
        Text.create({ leaves: [{ text: 'second', marks: [{ type: 'strong' }]}]})
      ]),
      createLine([
        Text.create({ leaves: [{ text: 'third', marks: [{ type: 'underline' }]}]})
      ]),
    ],
    [TestEditor.makeMoveNodes([1], [0])],
    [
      createLine([
        Text.create({ leaves: [{ text: 'second', marks: [{ type: 'strong' }]}]})
      ]),
      createLine([
        Text.create({ leaves: [{ text: 'first', marks: [{ type: 'em' }]}]})
      ]),
      createLine([
        Text.create({ leaves: [{ text: 'third', marks: [{ type: 'underline' }]}]})
      ]),
    ],
  ],
  [
    "Move a paragraph node to the end",
    [
      createLine([createText("first")]),
      createLine([createText("second")]),
      createLine([createText("third")]),
    ],
    [TestEditor.makeMoveNodes([0], [3])],
    [
      createLine([createText("second")]),
      createLine([createText("third")]),
      createLine([createText("first")]),
    ],
  ],
  [
    "Move a paragraph node far past the end",
    [
      createLine([createText("first")]),
      createLine([createText("second")]),
      createLine([createText("third")]),
    ],
    [TestEditor.makeMoveNodes([0], [1000])],
    [
      createLine([createText("second")]),
      createLine([createText("third")]),
      createLine([createText("first")]),
    ],
  ],
  [
    "Move a text node",
    [
      createLine([createText("first")]),
      createLine([createText("second")]),
      createLine([createText("third")]),
    ],
    [TestEditor.makeMoveNodes([1, 0], [2, 0])],
    [
      createLine([createText("first")]),
      createLine([createText("")]),
      createLine([createText("secondthird")]),
    ],
  ],
  [
    "Remove a paragraph node",
    [
      createLine([createText("first")]),
      createLine([createText("second")]),
      createLine([createText("third")]),
    ],
    [TestEditor.makeRemoveNodes([0])],
    [createLine([createText("second")]), createLine([createText("third")])],
  ],
  [
    "Remove two non-consecutive paragraph nodes",
    [
      createLine([createText("first")]),
      createLine([createText("second")]),
      createLine([createText("third")]),
      createLine([createText("fourth")]),
    ],
    [TestEditor.makeRemoveNodes([0]), TestEditor.makeRemoveNodes([1])],
    [createLine([createText("second")]), createLine([createText("fourth")])],
  ],
  [
    "Remove two consecutive paragraph nodes",
    [
      createLine([createText("first")]),
      createLine([createText("second")]),
      createLine([createText("third")]),
      createLine([createText("fourth")]),
    ],
    [TestEditor.makeRemoveNodes([1]), TestEditor.makeRemoveNodes([1])],
    [createLine([createText("first")]), createLine([createText("fourth")])],
  ],
  [
    "Remove a text node",
    [
      createLine([createText("first")]),
      createLine([createText("second")]),
      createLine([createText("third")]),
    ],
    [TestEditor.makeRemoveNodes([1, 0])],
    [
      createLine([createText("first")]),
      createLine([createText("")]),
      createLine([createText("third")]),
    ],
  ],
  [
    "Set properties of a paragraph node",
    [
      createLine([createText("first")], { test: "1234" }),
      createLine([createText("second")]),
    ],
    [TestEditor.makeSetNodes([0], { test: "4567" })],
    [
      createLine([createText("first")], { test: "4567" }),
      createLine([createText("second")]),
    ],
  ],
  [
    "Split an existing paragraph",
    [createLine([createText("Hello collaborator!")])],
    [TestEditor.makeSplitNodes({ path: [0, 0], offset: 6 })],
    [
      createLine([createText("Hello ")]),
      createLine([createText("collaborator!")]),
    ],
  ],
  [
    "Insert and remove text in the same paragraph",
    [createLine([createText("abc def")])],
    [
      TestEditor.makeInsertText("ghi ", { path: [0, 0], offset: 4 }),
      TestEditor.makeRemoveCharacters(2, { path: [0, 0], offset: 1 }),
      TestEditor.makeInsertText("jkl ", { path: [0, 0], offset: 6 }),
      TestEditor.makeRemoveCharacters(1, { path: [0, 0], offset: 11 }),
      TestEditor.makeInsertText(" mno", { path: [0, 0], offset: 12 }),
    ],
    [createLine([createText("a ghi jkl df mno")])],
  ],
  [
    "Remove first paragraph, insert text into second paragraph",
    [createLine([createText("abcd")]), createLine([createText("efgh")])],
    [
      TestEditor.makeRemoveNodes([0]),
      TestEditor.makeInsertText(" ijkl ", { path: [0, 0], offset: 2 }),
    ],
    [createLine([createText("ef ijkl gh")])],
  ],
  [
    "More complex case: insert text, both insert and remove nodes",
    [
      createLine([createText("abcd")]),
      createLine([createText("efgh")]),
      createLine([createText("ijkl")]),
    ],
    [
      TestEditor.makeInsertText(" mnop ", { path: [0, 0], offset: 2 }),
      TestEditor.makeRemoveNodes([1]),
      TestEditor.makeInsertText(" qrst ", { path: [1, 0], offset: 2 }),
      TestEditor.makeInsertNodes([createLine([createText("uvxw")])], [1]),
    ],
    [
      createLine([createText("ab mnop cd")]),
      createLine([createText("uvxw")]),
      createLine([createText("ij qrst kl")]),
    ],
  ],
  [
    "Insert text, then insert node that affects the path to the affected text",
    [createLine([createText("abcd")])],
    [
      TestEditor.makeInsertText(" efgh ", { path: [0, 0], offset: 2 }),
      TestEditor.makeInsertNodes([createLine([createText("ijkl")])], [0]),
    ],
    [createLine([createText("ijkl")]), createLine([createText("ab efgh cd")])],
  ],
  [
    "Set properties, then insert node that affects path to the affected node",
    [createLine([createText("abcd")])],
    [
      TestEditor.makeSetNodes([0], { test: "1234" }),
      TestEditor.makeInsertNodes([createLine([createText("ijkl")])], [0]),
    ],
    [
      createLine([createText("ijkl")]),
      createLine([createText("abcd")], { test: "1234" }),
    ],
  ],
  [
    "Insert node, then insert second node that affects path to the first node",
    [
      createLine([
        createLine([createText("abc")]),
        createLine([createText("def")]),
      ]),
    ],
    [
      TestEditor.makeInsertNodes([createLine([createText("jkl")])], [0, 1]),
      TestEditor.makeInsertNodes([createLine([createText("ghi")])], [0]),
    ],
    [
      createLine([createText("ghi")]),
      createLine([
        createLine([createText("abc")]),
        createLine([createText("jkl")]),
        createLine([createText("def")]),
      ]),
    ],
  ],
  [
    "remove_text op spans location of previous remove_text op",
    [createLine([createText("abc defg ijklm")])],
    [TestEditor.makeRemoveCharacters(5, { path: [0, 0], offset: 4 })],
    [createLine([createText("abc ijklm")])],
    [TestEditor.makeRemoveCharacters(6, { path: [0, 0], offset: 1 })],
    [createLine([createText("alm")])],
  ],
  [
    "remove_text op spans locations of two previous remove_text ops",
    [createLine([createText("abcdefghijklmnopqrst")])],
    [TestEditor.makeRemoveCharacters(3, { path: [0, 0], offset: 2 })],
    [createLine([createText("abfghijklmnopqrst")])],
    [TestEditor.makeRemoveCharacters(8, { path: [0, 0], offset: 5 })],
    [createLine([createText("abfghqrst")])],
    [TestEditor.makeRemoveCharacters(7, { path: [0, 0], offset: 1 })],
    [createLine([createText("at")])],
  ],
  [
    "Set Value to slate and Yjs",
    [createLine([createText("")])],
    [
      TestEditor.makeSetValue({
        createdBy: {
          emailAddress: "danielblank07@gmail.com",
          id: "ac8e5fe7-af4e-4281-b1e2-53630606e7c6",
          name: "Daniel Blank",
          pictureUrl:
            "https://lh4.googleusercontent.com/-Au4KLfih-zQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcJjTL-m5CILVsClpS2Om3OQycCcQ/photo.jpg",
          teamId: "8d930c14-9116-4984-b5c8-cdee9432ae87",
        },
      }),
    ],
    [createLine([createText("")])],
  ],
  [
    'Add marks to existing text',
    [
      createLine([createText('alfa bravo charlie')]),
    ],
    [
      TestEditor.makeAddMark([0, 0], 0, 4, 'underline'),
    ],
    [
      createLine([
        Text.create({ leaves: [
          { text: 'alfa', marks: [{ type: 'underline' }]},
          { text: ' bravo charlie' }
        ]})]),
    ],
    [
      TestEditor.makeAddMark([0, 0], 5, 5, 'strong'),
    ],
    [
      createLine([
        Text.create({ leaves: [
          { text: 'alfa', marks: [{ type: 'underline' }]},
          { text: ' ' },
          { text: 'bravo', marks: [{ type: 'strong' }]},
          { text: ' charlie' }
        ]})]),
    ],
  ],
  [
    'Remove marks from existing text',
    [
      createLine([
        Text.create({ leaves: [
          { text: 'alfa ', marks: [{ type: 'strong' }]},
          { text: 'bravo charlie', marks: [{ type: 'em' }]},
          { text: ' delta' }
        ]})]),
    ],
    [
      TestEditor.makeRemoveMark([0, 0], 1, 4, 'strong'),
    ],
    [
      createLine([
        Text.create({ leaves: [
          { text: 'a', marks: [{ type: 'strong' }]},
          { text: 'lfa ' },
          { text: 'bravo charlie', marks: [{ type: 'em' }]},
          { text: ' delta' }
        ]})]),
    ],
    [
      TestEditor.makeRemoveMark([0, 0], 7, 11, 'em'),
    ],
    [
      createLine([
        Text.create({ leaves: [
          { text: 'a', marks: [{ type: 'strong' }]},
          { text: 'lfa ' },
          { text: 'br', marks: [{ type: 'em' }]},
          { text: 'avo charlie' },
          { text: ' delta' }
        ]})]),
    ],
  ],
];

const nodeToJSON = (node) => node.toJSON();
// Returns slate document as JSON.
const getSlateDocAsJSON = (editor) => {
  return editor.slateDoc.document.nodes.toArray().map(nodeToJSON)
};

// Returns sync document converted to slate format as JSON.
const getSyncDocAsJSON = (editor) => {
  return toSlateDoc(editor.syncDoc).toJSON();
};

describe("slate operations propagate between editors", () => {
  tests.forEach(([testName, input, ...rest]) => {
    it(`${testName}`, () => {
      // Create two editors.
      const src = TestEditor.create();
      const dst = TestEditor.create();

      src.syncDoc.set("data", new Y.Map());
      src.syncDoc.set("document", new Y.Array());

      // Set initial state for src editor, propagate changes to dst editor.
      TestEditor.applyTransform(src, TestEditor.makeInsertNodes(input, [0]));
      let updates = TestEditor.getCapturedYjsUpdates(src);

      TestEditor.applyYjsUpdatesToYjs(dst, updates);

      // Verify initial states.
      const inputAsJSON = input.map(nodeToJSON);
      const inputValueAsJSON = Value.create({
        document: { nodes: inputAsJSON },
      }).toJSON();

      expect(getSlateDocAsJSON(src)).toStrictEqual(inputAsJSON);
      expect(getSyncDocAsJSON(src)).toStrictEqual(inputValueAsJSON);
      expect(getSyncDocAsJSON(dst)).toStrictEqual(inputValueAsJSON);
      expect(getSlateDocAsJSON(dst)).toStrictEqual(inputAsJSON);

        // Allow for multiple rounds of applying transforms and verifying state.
        while (rest.length > 0) {
          let transforms, output;
          [transforms, output, ...rest] = rest;

          // Apply transforms to src editor, propagate changes to dst editor.
          TestEditor.applyTransforms(src, transforms);
          updates = TestEditor.getCapturedYjsUpdates(src);
          TestEditor.applyYjsUpdatesToYjs(dst, updates);

          // Verify final states.
          const outputAsJSON = output.map(nodeToJSON);
          const outputValueAsJSON = Value.create({
            document: { nodes: outputAsJSON },
          }).toJSON();

          // Verify final 'document' states.
          expect(getSlateDocAsJSON(src)).toStrictEqual(outputAsJSON);
          expect(getSyncDocAsJSON(src)).toStrictEqual(outputValueAsJSON);
          expect(getSyncDocAsJSON(dst)).toStrictEqual(outputValueAsJSON);
          expect(getSlateDocAsJSON(dst)).toStrictEqual(outputAsJSON);

          // Verify final 'data' states.
          expect(dst.syncDoc.get("data").toJSON()).toStrictEqual(
            src.syncDoc.get("data").toJSON()
          );
          expect(src.slateDoc.data.toJSON()).toStrictEqual(
            dst.slateDoc.data.toJSON()
          );
        }
    });
  });
});
