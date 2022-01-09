import { NodeOperation } from 'slate';
import invariant from 'tiny-invariant';
import * as Y from 'yjs';
import { SyncElement } from '../model';
import { toSlateNode, toSlatePath } from '../utils/convert';

/**
 * Translates a Yjs array event into a slate operations.
 *
 * @param event
 */
export default function translateArrayEvent(
  event: Y.YArrayEvent<SyncElement>
): NodeOperation[] {
  const targetPath = toSlatePath(event.path);

  let offset = 0;
  const ops: NodeOperation[] = [];

  event.changes.delta.forEach((delta) => {
    if ('retain' in delta) {
      offset += delta.retain ?? 0;
    }

    if ('delete' in delta) {
      const removePath = [...targetPath, offset];
      const d = delta.delete || 0;
      for (let i = 0; i < d; i += 1) {
        ops.push({
          type: 'remove_node',
          path: removePath,
          node: { children: [] },
        });
      }
    }

    if ('insert' in delta) {
      invariant(
        Array.isArray(delta.insert),
        `Unexpected array insert content type: expected array, got ${JSON.stringify(
          delta.insert
        )}`
      );

      const toInsert = delta.insert.map(toSlateNode);

      toInsert.forEach((node, i) => {
        ops.push({
          type: 'insert_node',
          path: [...targetPath, offset + i],
          node,
        });
      });

      offset += delta.insert.length;
    }
  });

  return ops;
}
