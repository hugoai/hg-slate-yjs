import { SyncDoc, SlatePath, SyncNodeType } from 'types';
import * as Y from 'yjs';
/**
 * Returns the SyncNode referenced by the path
 *
 * getTarget(doc: SyncDoc, path: Path): SyncDoc | undefined
 */
export declare const getTarget: (doc: SyncDoc, path: any) => SyncDoc | undefined;
/**
 * getParentPath(path: Path, level = 1): [number, Path]
 */
export declare const getParentPath: (path: any, level?: number) => [number, SlatePath];
/**
 * getParent(doc: SyncDoc, path: Path, level = 1): [SyncDoc | undefined, number]
 */
export declare const getParent: (doc: SyncDoc, path: any, level?: number) => [SyncNodeType | undefined, number];
/**
 * Returns the position of the sync item inside inside it's parent array.
 *
 * getArrayPosition(item: Y.Item): number
 */
export declare const getArrayPosition: (item: Y.Item) => number;
/**
 * Returns the document path of a sync item
 *
 * getSyncItemPath(item: Y.Item): Path
 */
export declare const getSyncItemPath: (item: Y.Item | null) => any;
//# sourceMappingURL=index.d.ts.map