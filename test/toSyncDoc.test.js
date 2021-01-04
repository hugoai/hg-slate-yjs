const { Value } = require("slate");
const { toSyncDoc } = require("../src");
const Y = require("yjs");

describe("toSyncDoc", () => {
  it("should replicate the Slate value to the Yjs doc", () => {
    const documentNodes = [
      {
        object: "block",
        type: "line",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "Hello world!",
                marks: [],
              },
            ],
          },
        ],
      },
    ];
    const data = {
      actions: [{ id: "test-id", user: { name: "test-name" } }],
      access: { public: true },
    };
    const value = Value.fromJSON({
      object: "value",
      document: {
        object: "document",
        nodes: documentNodes,
      },
      data,
    });

    const doc = new Y.Doc();
    const syncDoc = doc.getMap("content");

    toSyncDoc(syncDoc, value);
    expect(syncDoc.toJSON()).toStrictEqual({
      document: [
        {
          object: "block",
          type: "line",
          data: {},
          children: [
            {
              text: "Hello world!",
              object: "text",
            },
          ],
        },
      ],
      data,
    });
  });
});
