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
const Y = __importStar(require("yjs"));
const convert_1 = require("../utils/convert");
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
const mapInsertNodeOperations = (event) => {
    const changesKeys = Array.from(event.changes.keys.entries());
    const operations = [];
    changesKeys.forEach(([key, meta]) => {
        if (key === 'document' && meta.action !== 'add') {
            throw new Error(`Unsupported Yjs event:  ${event.target.toJSON()}`);
        }
        if (key === 'document') {
            let index = 0;
            const documentNodes = event.target.get(key).map(convert_1.toSlateNode);
            documentNodes.forEach((block) => {
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
const mapSetValueOrSetNodeOperations = (event) => {
    /**
     * convertChildToSlate(targetElement: event.target, key: string): json | string
     */
    const convertChildToSlate = (targetElement, key) => {
        const element = targetElement.get(key);
        if (element instanceof Y.Map || element instanceof Y.Array || element instanceof Y.Text) {
            return element.toJSON();
        }
        return element;
    };
    /**
     * convertMapOp(actionEntry: [string, MapAction]): SetNodeOperationProperties
     */
    const convertMapOp = (actionEntry) => {
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
    const combineMapOp = (op, props) => (Object.assign(Object.assign({}, op), { newProperties: Object.assign(Object.assign({}, op.newProperties), props.newProperties), properties: Object.assign(Object.assign({}, op.properties), props.properties) }));
    const keys = event.changes.keys;
    const changes = Array.from(keys.entries(), convertMapOp);
    let mapOperations = [];
    const isSetValueOperation = keys.has('data') && event.path.length === 0;
    const isSetNodeOperation = keys.has('data') && event.path.length !== 1;
    if (isSetValueOperation || isSetNodeOperation) {
        const baseOp = {
            type: isSetValueOperation ? 'set_value' : 'set_node',
            newProperties: {},
            properties: {},
            path: convert_1.toSlatePath(event.path),
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
const mapEvent = (event) => {
    const insertNodeOperations = mapInsertNodeOperations(event);
    const setValueOrSetNodeOperations = mapSetValueOrSetNodeOperations(event);
    return [...insertNodeOperations, ...setValueOrSetNodeOperations];
};
exports.default = mapEvent;
//# sourceMappingURL=mapEvent.js.map