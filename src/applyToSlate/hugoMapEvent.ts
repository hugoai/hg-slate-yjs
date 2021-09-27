import { Node, NodeOperation } from 'slate';
import * as Y from 'yjs';
import { SyncElement } from '../model';
import { toSlateNode } from '../utils/convert';

/**
 * Translates a Yjs map event into a slate operations.
 *
 * @param event
 */
export default function hugoTranslateMapEvent(
  event: Y.YMapEvent<unknown>
): NodeOperation[] {
  const keyChanges = Array.from(event.changes.keys.entries());

  const operations: NodeOperation[] = [];
  keyChanges.forEach(([key, meta]) => {
    if (key === 'document' && meta.action !== 'add') {
      throw new Error(`Unsupported Yjs event:  ${event.target.toJSON()}`);
    }

    if (key === 'document') {
      let index = 0;
      const documentNodes = (event.target as SyncElement)
        .get(key)
        .map(toSlateNode);
      documentNodes.forEach((node: Node) => {
        operations.push({
          type: 'insert_node',
          path: [index],
          node,
        });
        index += 1;
      });
    }
  });

  console.log(operations);

  // const newProperties = Object.fromEntries(
  //   keyChanges.map(([key, info]) => [
  //     key,
  //     info.action === 'delete' ? null : targetSyncElement.get(key),
  //   ])
  // );

  // const properties = Object.fromEntries(
  //   keyChanges.map(([key]) => [key, targetElement[key]])
  // );

  return operations;
}
