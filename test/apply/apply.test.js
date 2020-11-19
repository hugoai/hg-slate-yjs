const { applySlateOps, toSlateDoc } = require('../../src');
const { createLine, createDoc, createNode, createText } = require('../utils');
const { List } = require('immutable');
const { Operation } = require('slate');

const transforms = [
  [
    'insert_text',
    [
      createLine([createText('')])
    ],
    [
      {
        marks: [],
        offset: 0,
        path: List([0, 0]),
        text: 'Hello ',
        type: 'insert_text'
      },
      {
        marks: [],
        offset: 6,
        path: List([0, 0]),
        text: 'collaborator',
        type: 'insert_text'
      },
      {
        marks: [],
        offset: 18,
        path: List([0, 0]),
        text: '!',
        type: 'insert_text'
      }
    ],
    [
      createLine([createText('Hello collaborator!')])
    ],
  ],
  [
    'remove_text',
    [
      createLine([createText('Hello collaborator!')])
    ],
    [
      {
        offset: 11,
        path: List([0, 0]),
        text: 'borator',
        type: 'remove_text'
      },
      {
        offset: 5,
        path: List([0, 0]),
        text: ' colla',
        type: 'remove_text'
      }
    ],
    [
      createLine([createText('Hello!')])
    ],
  ],
  [
    'insert_node',
    [
      createLine([])
    ],
    [
      {
        type: 'insert_node',
        path: List([1]),
        node: createLine([])
      },
      {
        type: 'insert_node',
        path: List([1, 0]),
        node: createText('Hello collaborator!')
      }
    ],
    [
      createLine([]),
      createLine([createText('Hello collaborator!')])
    ]
  ],
  [
    'merge_node',
    [
      createLine([createText('Hello ')]),
      createLine([createText('collaborator!')])
    ],
    [
      {
        path: List([1]),
        position: 1,
        properties: { type: 'line' },
        target: null,
        type: 'merge_node'
      },
      {
        path: List([0, 1]),
        position: 6,
        properties: {},
        target: null,
        type: 'merge_node'
      }
    ],
    [
      createLine([createText('Hello collaborator!')])
    ]
  ],
  [
    'move_node',
    [
      createLine([createText('first')]),
      createLine([createText('second')]),
      createLine([createText('third')]),
      createLine([createText('fourth')])
    ],
    [
      {
        newPath: List([0]),
        path: List([1]),
        type: 'move_node'
      },
      {
        newPath: List([3, 0]),
        path: List([2, 0]),
        type: 'move_node'
      }
    ],
    [
      createLine([createText('second')]),
      createLine([createText('first')]),
      createLine([]),
      createLine([createText('third'), createText('fourth')])
    ]
  ],
  [
    'remove_node',
    [
      createLine([createText('first')]),
      createLine([createText('second')]),
      createLine([createText('third')])
    ],
    [
      {
        path: List([1, 0]),
        type: 'remove_node'
      },
      {
        path: List([0]),
        type: 'remove_node'
      }
    ],
    [
      createLine([]),
      createLine([createText('third')])
    ]
  ],
  [
    'set_node',
    [
      createLine([createText('first')], { test: '1234' }),
      createLine([createText('second')])
    ],
    [
      // TODO: Rework throughout this file (not just this test case) such that
      // we have Operations in this slot instead of POJOs. TBD: maybe some
      // helper functions, or map Operation.create over the POJOs in the test
      // code?
      // 
      // But for now, create an Operation explicitly for this test case, good
      // enough to get things working + unblocked.
      Operation.create(
        {
          path: List([0]),
          type: 'set_node',
          properties: {
            data: {
              test: '4567'
            },
          },
        },
      ),
    ],
    [
      createLine([createText('first')], { test: '4567' }),
      createLine([createText('second')]),
    ]
  ],
  [
    'split_node',
    [
      createLine([createText('Hello collaborator!')])
    ],
    [
      {
        path: List([0, 0]),
        position: 6,
        target: null,
        type: 'split_node'
      },
      {
        path: List([0]),
        position: 1,
        properties: {
          type: 'line'
        },
        target: 6,
        type: 'split_node'
      }
    ],
    [
      createLine([createText('Hello ')]),
      createLine([createText('collaborator!')])
    ]
  ]
];

const nodeToJSON = (node) => node.toJSON();

describe('apply slate operations to document', () => {
  transforms.forEach(([op, input, operations, output]) => {
    it(`apply ${op} operations`, () => {
      const doc = createDoc(input);
      const syncDoc = doc.getArray('content');

      doc.transact(() => {
        applySlateOps(syncDoc, operations);
      });

      expect(output.map(nodeToJSON)).toStrictEqual(toSlateDoc(syncDoc).map(nodeToJSON));
    });
  });
});
