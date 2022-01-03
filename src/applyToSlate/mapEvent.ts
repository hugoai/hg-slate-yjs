import { Editor, Node, NodeOperation } from 'slate';
import * as Y from 'yjs';
import { SyncElement } from '../model';
import { toSlatePath } from '../utils/convert';

/**
 * Translates a Yjs map event into a slate operations.
 *
 * @param event
 */
export default function translateMapEvent(
  editor: Editor,
  event: Y.YMapEvent<unknown>
): NodeOperation[] {
  const targetPath = toSlatePath(event.path);
  const targetSyncElement = event.target as SyncElement;
  const targetElement = Node.get(editor, targetPath);

  const keyChanges = Array.from(event.changes.keys.entries());
  const newProperties = Object.fromEntries(
    keyChanges.map(([key, info]) => [
      key,
      info.action === 'delete' ? null : targetSyncElement.get(key),
    ])
  );

  const properties = Object.fromEntries(
    keyChanges.map(([key]) => [key, targetElement[key]])
  );
  const documentChanges = keyChanges.find((change) => change[0] === 'document');
  if (
    event.path.length === 0 &&
    documentChanges &&
    documentChanges[1].action === 'add'
  ) {
    const operations: NodeOperation[] = [];
    const nodes = newProperties.document.toJSON() as Node[];
    nodes.forEach((node, index) =>
      operations.push({
        type: 'insert_node',
        path: [index],
        node,
      })
    );

    return operations;
  }

  // If it's not an operation to insert new Slate nodes and it has no path, it has no use.
  if (!targetPath.length) {
    return [];
  }

  return [{ type: 'set_node', newProperties, properties, path: targetPath }];
}
