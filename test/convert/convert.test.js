const { Value, Text } = require("slate");
const { toSlateDoc, toSyncDoc } = require("../../src");
const { createLine, createList, createMention, createText } = require("../utils");
const Y = require("yjs");

const tests = [
  [
    "block node with inline",
    createLine([
      createText("ghi"),
      createMention([createText("@jkl")]),
      createText(""),
    ]),
  ],
  [
    "block node with properties",
    createLine([createText("mno")], { pqr: "stu" }),
  ],
  [
    "text with marks",
    createLine([
      Text.create({
        leaves: [
          { text: "ab" },
          {
            text: "cde",
            marks: [{ type: "strong" }],
          },
          {
            text: "fghi",
            marks: [{ type: "em" }, { type: "underline" }],
          },
          { text: "jklmn" },
        ],
      }),
    ]),
  ],
  [
    "bullet list",
    createList([createLine([createText("abcd")]),
                createLine([createText("efgh")]),
                createLine([createText("ijkl")]),
               ],
               { itemType: "bullet" })
  ],
  [
    "numbered list",
    createList([createLine([createText("mnop")]),
                createLine([createText("qrst")]),
                createLine([createText("uvwx")]),
               ],
               { itemType: "number" })
  ],
];

const nodeToJS = (node) => node.toJS();

describe("convert", () => {
  tests.forEach(([testName, input]) => {
    it(`${testName}`, () => {
      const doc = new Y.Doc();
      const syncDoc = doc.getMap("content");

      toSyncDoc(syncDoc, Value.create({ document: { nodes: [input] } }));
      const output = toSlateDoc(syncDoc);
      expect(output.document.nodes.toJS()).toStrictEqual([nodeToJS(input)]);
    });
  });
});
