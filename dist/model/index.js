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
exports.SyncNode = exports.SyncElement = void 0;
const Y = __importStar(require("yjs"));
exports.SyncElement = {
    /**
     * getText(element: SyncDoc): Y.Text | undefined
     */
    getText(element) {
        return element !== undefined && element.get('text');
    },
    /**
     * getChildren(element: SyncDoc): SyncArray | undefined
     */
    getChildren(element) {
        return element !== undefined && element.get('children');
    },
};
exports.SyncNode = {
    /**
     * getChildren(node: SyncNodeType): SyncArray | undefined
     */
    getChildren(node) {
        if (node !== undefined && node instanceof Y.Array) {
            return node;
        }
        return exports.SyncElement.getChildren(node);
    },
    /**
     * getText(node: SyncNodeType): Y.Text | undefined
     */
    getText(node) {
        if (node !== undefined && node instanceof Y.Array) {
            return undefined;
        }
        return exports.SyncElement.getText(node);
    },
};
//# sourceMappingURL=index.js.map