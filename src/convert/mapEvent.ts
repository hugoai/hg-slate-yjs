import { NodeOperation, SetNodeOperation } from 'node.interface';
import * as Y from 'yjs';
import { Block } from 'slate';
import { SlateOperation, SyncDoc } from 'types';
import { toSlatePath, toSlateNode } from '../utils/convert';
/**
 * Extracts insert_node operations from a Yjs Map event.
 * This is only needed when the initial state is constructed as when Yjs populates the document
 * it will yield a Y.MapEvent stating that "document" field has changed with potentially more than
 * one children. The only way for Slate to interpret through operations is by multiple insert_node
 * operations.
 * All other changes to the document (not the data map), will yield Y.ArrayEvent that will be
 * handled by arrayEvent.js.
 * mapInsertNodeOperations(event: Y.YMapEvent<any>): InsertNodeOperation[]
 */
const mapInsertNodeOperations = (event: Y.YMapEvent<any>) => {
    const changesKeys = Array.from(event.changes.keys.entries());
    const operations: NodeOperation[] = [];
    changesKeys.forEach(([key, meta]) => {
        if (key === 'document' && meta.action !== 'add') {
            throw new Error(`Unsupported Yjs event:  ${event.target.toJSON()}`);
        }

        if (key === 'document') {
            let index = 0;
            const documentNodes = ((event.target as any) as SyncDoc).get(key).map(toSlateNode);
            documentNodes.forEach((block: Block) => {
                operations.push({
                    type: 'insert_node',
                    path: [index],
                    node: block.toJSON(),
                });
                index += 1;
            });
        }
    });
    return operations;
};

/**
 * Extracts set_value or set_node operations from a Yjs Map event.
 * mapInsertNodeOperations(event: Y.YMapEvent<any>): Operation[]
 */
const mapSetValueOrSetNodeOperations = (event: Y.YMapEvent<any>): SlateOperation[] => {
    /**
     * convertChildToSlate(targetElement: event.target, key: string): json | string
     */
    const convertChildToSlate = (targetElement: Y.AbstractType<any>, key: string) => {
        const element = ((targetElement as any) as SyncDoc).get(key);
        if (element instanceof Y.Map || element instanceof Y.Array || element instanceof Y.Text) {
            return element.toJSON();
        }
        return element;
    };

    /**
     * convertMapOp(actionEntry: [string, MapAction]): SetNodeOperationProperties
     */
    const convertMapOp = (actionEntry: [string, any]) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [key, action] = actionEntry;
        const targetElement = event.target;
        return {
            properties: { [key]: convertChildToSlate(targetElement, key) },
        };
    };

    /**
     * combineMapOp(op: SetNodeOperation, props: SetNodeOperationProperties): SetNodeOperation
     */
    const combineMapOp = (op: SetNodeOperation, props) => ({
        ...op,
        newProperties: { ...op.newProperties, ...props.newProperties },
        properties: { ...op.properties, ...props.properties },
    });

    const keys = event.changes.keys;
    const changes = Array.from(keys.entries(), convertMapOp);
    let mapOperations: SetNodeOperation[] = [];

    const isSetValueOperation = keys.has('data') && event.path.length === 0;
    const isSetNodeOperation = keys.has('data') && event.path.length !== 1;
    if (isSetValueOperation || isSetNodeOperation) {
        const baseOp = {
            type: isSetValueOperation ? 'set_value' : 'set_node',
            newProperties: {},
            properties: {},
            path: toSlatePath(event.path),
        };
        mapOperations = [changes.reduce(combineMapOp, baseOp)];
    }
    return mapOperations;
};

/**
 * Converts a Yjs Map event into Slate operations.
 *
 * mapEvent(event: Y.YMapEvent<any>): Operation[]
 */
const mapEvent = (event: Y.YMapEvent<any>): SlateOperation[] => {
    const insertNodeOperations = mapInsertNodeOperations(event);
    const setValueOrSetNodeOperations = mapSetValueOrSetNodeOperations(event);

    return [...insertNodeOperations, ...setValueOrSetNodeOperations];
};

export default mapEvent;
