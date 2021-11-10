import * as Y from 'yjs';
import { toSyncDoc } from '../src';

describe('toSyncDoc', () => {
  it('should replicate the Slate value to the Yjs doc', () => {
    const document = [
      {
        type: 'line',
        children: [
          {
            text: 'Hello world!',
          },
        ],
      },
    ];
    const data = {
      actions: [{ id: 'test-id', user: { name: 'test-name' } }],
      access: { public: true },
    };
    const value = {
      document,
      data,
    };

    const doc = new Y.Doc();
    const syncDoc = doc.getMap('content');

    toSyncDoc(syncDoc, value);
    expect(syncDoc.toJSON()).toStrictEqual({
      document: [
        {
          type: 'line',
          children: [
            {
              text: 'Hello world!',
            },
          ],
        },
      ],
      data,
    });
  });
});
