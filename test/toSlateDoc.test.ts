import * as Y from 'yjs';
import { toSlateDoc, toSyncDoc } from '../src';

describe('toSlateDoc', () => {
  it('should replicate the Yjs doc to the Slate value', () => {
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
    const convertedValue = toSlateDoc(syncDoc.get('document'));

    expect(convertedValue).toStrictEqual(document);
  });
});
