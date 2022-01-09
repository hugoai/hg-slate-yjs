import { TextOperation } from 'slate';
import invariant from 'tiny-invariant';
import * as Y from 'yjs';
import { toSlatePath } from '../utils/convert';

/**
 * Translates a Yjs text event into a slate operations.
 *
 * @param event
 */
export default function translateTextEvent(
  event: Y.YTextEvent
): TextOperation[] {
  const targetPath = toSlatePath(event.path);

  let offset = 0;
  const ops: TextOperation[] = [];

  event.changes.delta.forEach((delta) => {
    if ('retain' in delta) {
      offset += delta.retain ?? 0;
    }

    if ('delete' in delta) {
      const deleteLength = delta.delete ?? 0;
      let removalText = '';
      for (let index = 0; index < deleteLength; index++) {
        // Yjs doesn't expose the portion of the string that was removed and Slate only
        // uses it to get the length of the substring that is going to be removed.
        // This populates the substring with dummy text making the lengths match.
        removalText += '0';
      }

      ops.push({
        type: 'remove_text',
        offset,
        path: targetPath,
        text: removalText,
      });
    }

    if ('insert' in delta) {
      invariant(
        typeof delta.insert === 'string',
        `Unexpected text insert content type: expected string, got ${typeof delta.insert}`
      );

      ops.push({
        type: 'insert_text',
        offset,
        text: delta.insert,
        path: targetPath,
      });

      offset += delta.insert.length;
    }
  });

  return ops;
}
