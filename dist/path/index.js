"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSyncItemPath = exports.getArrayPosition = exports.getParent = exports.getParentPath = exports.getTarget = void 0;
const Y = __importStar(require("yjs"));
const model_1 = require("../model");
/**
 * Returns the SyncNode referenced by the path
 *
 * getTarget(doc: SyncDoc, path: Path): SyncDoc | undefined
 */
const getTarget = (doc, path) => {
    /**
     * iterate(current: SyncDoc, idx: number): SyncDoc
     */
    const iterate = (current, idx) => {
        let result;
        const children = model_1.SyncNode.getChildren(current);
        if (children !== undefined && idx !== undefined) {
            result = children.get(idx);
        }
        if (result === undefined) {
            throw new TypeError(`path ${path.toString()} does not match doc ${JSON.stringify(doc)}`);
        }
        return result;
    };
    return path.reduce(iterate, doc);
};
exports.getTarget = getTarget;
/**
 * getParentPath(path: Path, level = 1): [number, Path]
 */
const getParentPath = (path, level = 1) => {
    if (level > path.size) {
        throw new TypeError('requested ancestor is higher than root');
    }
    return [path.get(path.size - level), path.slice(0, path.size - level)];
};
exports.getParentPath = getParentPath;
/**
 * getParent(doc: SyncDoc, path: Path, level = 1): [SyncDoc | undefined, number]
 */
const getParent = (doc, path, level = 1) => {
    const [idx, parentPath] = exports.getParentPath(path, level);
    return [exports.getTarget(doc, parentPath), idx];
};
exports.getParent = getParent;
/**
 * Returns the position of the sync item inside inside it's parent array.
 *
 * getArrayPosition(item: Y.Item): number
 */
const getArrayPosition = (item) => {
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
exports.getArrayPosition = getArrayPosition;
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
        return [...exports.getSyncItemPath(parent._item), exports.getArrayPosition(item)];
    }
    if (parent instanceof Y.Map) {
        return exports.getSyncItemPath(parent._item);
    }
    throw new Error(`Unknown parent type ${parent}`);
};
exports.getSyncItemPath = getSyncItemPath;
//# sourceMappingURL=index.js.map