const { Path } = require('slate');
const Y = require('yjs');
const { SyncDoc, SyncElement, SyncNode } = require('../model');
const { toSlateDoc } = require('../utils/convert');

/**
 * Returns the SyncNode referenced by the path
 *
 * getTarget(doc: SyncDoc, path: Path): SyncNode | undefined
 */
const getTarget = (doc, path) => {
  /**
   * iterate(current: SyncNode, idx: number): SyncNode
   */
  const iterate = (current, idx) => {
    let result = undefined;
    let children = SyncNode.getChildren(current);
    if (!!children) {
      result = children.get(idx);
    }
    if (!result) {
      throw new TypeError(
        `path ${path.toString()} does not match doc ${JSON.stringify(
          toSlateDoc(doc)
        )}`
      );
    }
    return result;
  };

  return path.reduce(iterate, doc);
};

/**
 * getParentPath(path: Path, level = 1): [number, Path]
 */
const getParentPath = (path, level = 1) => {
  if (level > path.size) {
    throw new TypeError('requested ancestor is higher than root');
  }

  return [path.get(path.size - level), path.slice(0, path.size - level)];
};

/**
 * getParent(doc: SyncDoc, path: Path, level = 1): [SyncNode, number]
 */
const getParent = (doc, path, level = 1) => {
  const [idx, parentPath] = getParentPath(path, level);
  return [getTarget(doc, parentPath), idx];
};

/**
 * Returns the document path of a sync item
 *
 * getSyncItemPath(item: Y.Item): Path
 */
const getSyncItemPath = (item) => {
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

/**
 * Returns the position of the sync item inside inside it's parent array.
 *
 * getArrayPosition(item: Y.Item): number
 */
const getArrayPosition = (item) => {
  let i = 0;
  let c = item.parent._start;
  while (c !== item && c !== null) {
    if (!c.deleted) {
      i++;
    }
    c = c.right;
  }

  return i;
};

module.exports = {
  getTarget,
  getParentPath,
  getParent,
  getSyncItemPath,
  getArrayPosition,
};
