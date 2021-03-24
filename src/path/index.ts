/* eslint-disable @typescript-eslint/dot-notation */
import { SyncDoc, SlatePath } from 'types';
import * as Y from 'yjs';
import { SyncNode } from '../model';

/**
 * Returns the SyncNode referenced by the path
 *
 * getTarget(doc: SyncDoc, path: Path): SyncNode | undefined
 */
export const getTarget = (doc: SyncDoc, path: SlatePath): SyncDoc | undefined => {
    /**
     * iterate(current: SyncNode, idx: number): SyncNode
     */
    const iterate = (current?: SyncDoc, idx?: number): SyncDoc => {
        let result;
        const children = SyncNode.getChildren(current);
        if (children) {
            result = idx && children.get(idx);
        }
        if (!result) {
            throw new TypeError(
                `path ${path.toString()} does not match doc ${JSON.stringify(doc)}`
            );
        }
        return result;
    };

    return path.reduce(iterate, doc);
};

/**
 * getParentPath(path: Path, level = 1): [number, Path]
 */
export const getParentPath = (path: SlatePath, level = 1): [number, SlatePath] => {
    if (level > path.size) {
        throw new TypeError('requested ancestor is higher than root');
    }

    return [path.get(path.size - level), path.slice(0, path.size - level)];
};

/**
 * getParent(doc: SyncDoc, path: Path, level = 1): [SyncDoc | undefined, number]
 */
export const getParent = (
    doc: SyncDoc,
    path: SlatePath,
    level = 1
): [SyncDoc | undefined, number] => {
    const [idx, parentPath] = getParentPath(path, level);
    return [getTarget(doc, parentPath), idx];
};

/**
 * Returns the position of the sync item inside inside it's parent array.
 *
 * getArrayPosition(item: Y.Item): number
 */
export const getArrayPosition = (item: Y.Item): number => {
    let i = 0;
    if (item.parent) {
        let c = item.parent['_start'];
        while (c !== item && c !== null) {
            if (!c.deleted) {
                i++;
            }
            c = c.right;
        }
    }
    return i;
};

/**
 * Returns the document path of a sync item
 *
 * getSyncItemPath(item: Y.Item): Path
 */
export const getSyncItemPath = (item: Y.Item | null): SlatePath => {
    if (!item) {
        return [];
    }

    const parent = item.parent;
    if (parent instanceof Y.Array) {
        return [...getSyncItemPath(parent._item), getArrayPosition(item)];
    }

    if (parent instanceof Y.Map) {
        return getSyncItemPath(parent._item);
    }

    throw new Error(`Unknown parent type ${parent}`);
};
