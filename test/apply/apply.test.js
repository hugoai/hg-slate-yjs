const { applySlateOps, toSlateDoc, applySlateOp } = require('../../src');
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
        path: [0, 0],
        text: 'Hello ',
        type: 'insert_text'
      },
      {
        marks: [],
        offset: 6,
        path: [0, 0],
        text: 'collaborator',
        type: 'insert_text'
      },
      {
        marks: [],
        offset: 18,
        path: [0, 0],
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
        path: [0, 0],
        text: 'borator',
        type: 'remove_text',
        marks: []
      },
      {
        offset: 5,
        path: [0, 0],
        text: ' colla',
        type: 'remove_text',
        marks: []
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
        path: [1],
        node: createLine([])
      },
      {
        type: 'insert_node',
        path: [1, 0],
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
        path: [1],
        position: 1,
        properties: { type: 'line' },
        target: null,
        type: 'merge_node'
      },
      {
        path: [0, 1],
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
        newPath: [0],
        path: [1],
        type: 'move_node'
      },
      {
        newPath: [3, 0],
        path: [2, 0],
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
        path: [1, 0],
        type: 'remove_node'
      },
      {
        path: [0],
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
      {
        path: [0],
        type: 'set_node',
        properties: {
          data: {
            test: '4567'
          },
        },
      },
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
        path: [0, 0],
        position: 6,
        properties: {
          type: 'text'
        },
        target: null,
        type: 'split_node'
      },
      {
        path: [0],
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
      const content = doc.getMap('content')
      
      doc.transact(() => {
        applySlateOps(content, operations.map(Operation.create));
      });

      const syncDocForAssertion = content.get('document');
      expect(output.map(nodeToJSON)).toStrictEqual(toSlateDoc(syncDocForAssertion).map(nodeToJSON));
    });
  });
});

const setValueTransform = [
  'set_value',
    [
      createLine([createText('Hello collaborator!')])
    ],
    {
      type: 'set_value',
      properties: {
        createdBy:{
          emailAddress: "danielblank07@gmail.com",
          id: "ac8e5fe7-af4e-4281-b1e2-53630606e7c6",
          name: "Daniel Blank",
          pictureUrl: "https://lh4.googleusercontent.com/-Au4KLfih-zQ/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcJjTL-m5CILVsClpS2Om3OQycCcQ/photo.jpg",
          teamId: "8d930c14-9116-4984-b5c8-cdee9432ae87"
        }
      }
    }
    ,
    [
      createLine([createText('Hello collaborator!')])
    ],
]


describe('apply slate "set_value" operations to document', () => {
  const [op, input, operations, output] = setValueTransform
  it(`apply ${op} operations`, () => {
    const doc = createDoc(input);
    const content = doc.getMap('content')
    
    doc.transact(() => {
      applySlateOp(content, operations);
    });

    const syncDocMapForAssertion = content.get('data')
    const syncDocArrayForAssertion = content.get('document');

    expect(output.map(nodeToJSON)).toStrictEqual(toSlateDoc(syncDocArrayForAssertion).map(nodeToJSON));
    expect(operations['properties']).toStrictEqual(syncDocMapForAssertion.toJSON());

  });
});

      expect(output.map(nodeToJSON)).toStrictEqual(toSlateDoc(syncDoc).map(nodeToJSON));
    });
  });
});
