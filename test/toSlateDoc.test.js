const { Value } = require('slate');
const Y = require('yjs');
const { toSyncDoc, toSlateDoc } = require('../src');

describe('toSlateDoc', () => {
    it('should replicate the Yjs doc to the Slate value', () => {
        const documentNodes = [
            {
                object: 'block',
                type: 'line',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'Hello world!',
                                marks: [],
                            },
                        ],
                    },
                ],
            },
        ];
        const data = {
            actions: [{ id: 'test-id', user: { name: 'test-name' } }],
            access: { public: true },
        };
        const value = Value.fromJSON({
            object: 'value',
            document: {
                object: 'document',
                nodes: documentNodes,
            },
            data,
        });

        const doc = new Y.Doc();
        const syncDoc = doc.getMap('content');
        toSyncDoc(syncDoc, value);
        const convertedValue = toSlateDoc(syncDoc);

        expect(convertedValue.toJSON()).toStrictEqual(value.toJSON());
    });
});
