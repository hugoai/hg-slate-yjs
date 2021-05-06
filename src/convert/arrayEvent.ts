import { NodeOperation } from 'node.interface';
import { Block } from 'slate';
import { SyncDoc } from 'types';
import * as Y from 'yjs';
import { toSlateNode, toSlatePath } from '../utils/convert';
/**
 * Converts a Yjs Array event into Slate operations.
 *
 * arrayEvent(event: Y.YArrayEvent<SyncElement>): NodeOperation[]
 */
const arrayEvent = (event: Y.YArrayEvent<SyncDoc>): NodeOperation[] => {
    const eventTargetPath = toSlatePath(event.path);

    /**
     * createRemoveNode(index: number): NodeOperation
     */
    const createRemoveNode = (index: number): NodeOperation => {
        const path = [...eventTargetPath, index];
        // Although we may be removing something other than a Block node (e.g., Text
        // or Inline), slate doesn't seem to care if we always pass a Block node
        // here.
        const node = Block.create('');
        return { type: 'remove_node', path, node };
    };

    /**
     * createInsertNode(index: number, element: SyncElement): NodeOperation
     */
    const createInsertNode = (index: number, element: SyncDoc): NodeOperation => {
        const path = [...eventTargetPath, index];
        const node = toSlateNode(element);
        return { type: 'insert_node', path, node };
    };

    const sortFunc = (a, b) => (a.path[a.path.length - 1] > b.path[b.path.length - 1] ? 1 : 0);

    let removeIndex = 0;
    let addIndex = 0;
    let removeOps: NodeOperation[] = [];
    let addOps: NodeOperation[] = [];
    for (const delta of event.changes.delta) {
        const d = delta;
        if (d['retain'] !== undefined) {
            removeIndex += d['retain'];
            addIndex += d['retain'];
        } else if (d['delete'] !== undefined) {
            for (let i = 0; i < d['delete']; i += 1) {
                removeOps.push(createRemoveNode(removeIndex));
            }
        } else if (d['insert'] !== undefined) {
            const elements = d['insert'] as SyncDoc[];
            if (elements) {
                addOps = addOps.concat(
                    // eslint-disable-next-line @typescript-eslint/no-loop-func
                    elements.map((e: SyncDoc, i: number) => createInsertNode(addIndex + i, e))
                );
                addIndex += elements.length;
            }
        }
    }

    removeOps = removeOps.sort(sortFunc);
    addOps = addOps.sort(sortFunc);

    return [...removeOps, ...addOps];
};

export default arrayEvent;
