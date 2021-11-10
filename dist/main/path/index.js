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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSyncNodePath = exports.getArrayPosition = exports.getParent = exports.getTarget = void 0;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const Y = __importStar(require("yjs"));
const model_1 = require("../model");
const convert_1 = require("../utils/convert");
const isTree = (node) => !!model_1.SyncNode.getChildren(node);
/**
 * Returns the SyncNode referenced by the path
 *
 * @param doc
 * @param path
 */
function getTarget(doc, path) {
    function iterate(current, idx) {
        const children = model_1.SyncNode.getChildren(current);
        if (!isTree(current) || !(children === null || children === void 0 ? void 0 : children.get(idx))) {
            throw new TypeError(`path ${path.toString()} does not match doc ${JSON.stringify((0, convert_1.toSlateDoc)(doc))}`);
        }
        return children.get(idx);
    }
    return path.reduce(iterate, doc);
}
exports.getTarget = getTarget;
function getParentPath(path, level = 1) {
    if (level > path.length) {
        throw new TypeError('requested ancestor is higher than root');
    }
    return [path[path.length - level], path.slice(0, path.length - level)];
}
function getParent(doc, path, level = 1) {
    const [idx, parentPath] = getParentPath(path, level);
    const parent = getTarget(doc, parentPath);
    (0, tiny_invariant_1.default)(parent, 'Parent node should exists');
    return [parent, idx];
}
exports.getParent = getParent;
/**
 * Returns the position of the sync item inside inside it's parent array.
 *
 * @param item
 */
function getArrayPosition(item) {
    let i = 0;
    let c = item.parent._start;
    while (c !== item && c !== null) {
        if (!c.deleted) {
            i += 1;
        }
        c = c.right;
    }
    return i;
}
exports.getArrayPosition = getArrayPosition;
/**
 * Returns the document path of a sync item
 *
 * @param node
 */
function getSyncNodePath(node) {
    if (!node) {
        return [];
    }
    const { parent } = node;
    if (!parent) {
        return [];
    }
    if (parent instanceof Y.Array) {
        (0, tiny_invariant_1.default)(node._item, 'Parent should be associated with a item');
        return [...getSyncNodePath(parent), getArrayPosition(node._item)];
    }
    if (parent instanceof Y.Map) {
        return getSyncNodePath(parent);
    }
    throw new Error(`Unknown parent type ${parent}`);
}
exports.getSyncNodePath = getSyncNodePath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGF0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0VBQXVDO0FBQ3ZDLHVDQUF5QjtBQUN6QixvQ0FBNkQ7QUFDN0QsOENBQThDO0FBRTlDLE1BQU0sTUFBTSxHQUFHLENBQUMsSUFBYyxFQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFekU7Ozs7O0dBS0c7QUFDSCxTQUFnQixTQUFTLENBQUMsR0FBZSxFQUFFLElBQVU7SUFDbkQsU0FBUyxPQUFPLENBQUMsT0FBaUIsRUFBRSxHQUFXO1FBQzdDLE1BQU0sUUFBUSxHQUFHLGdCQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9DLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsRUFBRTtZQUMzQyxNQUFNLElBQUksU0FBUyxDQUNqQixRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUUsdUJBQXVCLElBQUksQ0FBQyxTQUFTLENBQzFELElBQUEsb0JBQVUsRUFBQyxHQUFHLENBQUMsQ0FDaEIsRUFBRSxDQUNKLENBQUM7U0FDSDtRQUVELE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFXLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBaEJELDhCQWdCQztBQUVELFNBQVMsYUFBYSxDQUFDLElBQVUsRUFBRSxLQUFLLEdBQUcsQ0FBQztJQUMxQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ3ZCLE1BQU0sSUFBSSxTQUFTLENBQUMsd0NBQXdDLENBQUMsQ0FBQztLQUMvRDtJQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQUVELFNBQWdCLFNBQVMsQ0FDdkIsR0FBZSxFQUNmLElBQVUsRUFDVixLQUFLLEdBQUcsQ0FBQztJQUVULE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLElBQUEsd0JBQVMsRUFBQyxNQUFNLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUFURCw4QkFTQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixnQkFBZ0IsQ0FBQyxJQUFZO0lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksQ0FBQyxHQUFJLElBQUksQ0FBQyxNQUErQixDQUFDLE1BQU0sQ0FBQztJQUVyRCxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMvQixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUNkLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDUjtRQUNELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ2I7SUFFRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFaRCw0Q0FZQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixlQUFlLENBQUMsSUFBYztJQUM1QyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUVELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7SUFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUNYLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFJLE1BQU0sWUFBWSxDQUFDLENBQUMsS0FBSyxFQUFFO1FBQzdCLElBQUEsd0JBQVMsRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFFLHlDQUF5QyxDQUFDLENBQUM7UUFDakUsT0FBTyxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ25FO0lBRUQsSUFBSSxNQUFNLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRTtRQUMzQixPQUFPLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNoQztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQXBCRCwwQ0FvQkMifQ==