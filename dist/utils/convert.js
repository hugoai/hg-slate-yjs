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
exports.toSlatePath = exports.toSyncDoc = exports.toSyncElement = exports.toFormattingAttributes = exports.toFormattingAttributesKey = exports.toSlateDoc = exports.toSlateNode = exports.toSlateMarks = exports.toSlateMark = void 0;
const slate_1 = require("slate");
const Y = __importStar(require("yjs"));
const model_1 = require("../model");
/**
 * Converts a Yjs formatting attributes key to the corresponding slate Mark
 *
 * toSlateMark(string): Mark
 */
const toSlateMark = (formattingAttributesKey) => {
    const s = formattingAttributesKey.split(':');
    let markAttrs = { type: s[0] };
    if (s.length > 1) {
        markAttrs = Object.assign({ data: { value: s[1] } }, markAttrs);
    }
    return slate_1.Mark.create(markAttrs);
};
exports.toSlateMark = toSlateMark;
/**
 * Converts Yjs formatting attributes to a List of slate Marks
 *
 * toSlateMarks(Object<string, string>): Mark[]
 */
const toSlateMarks = (formattingAttributes) => {
    const marks = [];
    if (!!formattingAttributes) {
        for (const formattingAttributesKey in formattingAttributes) {
            marks.push(exports.toSlateMark(formattingAttributesKey));
        }
    }
    return marks;
};
exports.toSlateMarks = toSlateMarks;
/**
 * Converts a Quill delta element (as returned from Y.Text.toDelta()) to a slate
 * Leaf
 *
 * toSlateLeaf(delta): Leaf
 */
const toSlateLeaf = (delta) => {
    if (!delta.insert) {
        throw new Error(`Unable to convert '${delta}' element`);
    }
    return slate_1.Leaf.create({
        text: delta.insert,
        marks: exports.toSlateMarks(delta.attributes),
    });
};
/**
 * Converts a sync element to a slate node
 *
 * toSlateNode(element: SyncDoc): Node
 */
const toSlateNode = (element) => {
    let attrs = {};
    for (const [key, value] of element.entries()) {
        if (key !== 'children' && key !== 'text' && key !== 'marks') {
            attrs[key] = value;
        }
    }
    const object = element.get('object');
    if (object === 'block') {
        const children = model_1.SyncElement.getChildren(element);
        attrs = Object.assign({ nodes: children && children.map(exports.toSlateNode) }, attrs);
        return slate_1.Block.create(attrs);
    }
    else if (object === 'inline') {
        const children = model_1.SyncElement.getChildren(element);
        attrs = Object.assign({ nodes: children && children.map(exports.toSlateNode) }, attrs);
        return slate_1.Inline.create(attrs);
    }
    else if (object === 'text') {
        const text = model_1.SyncElement.getText(element);
        attrs = Object.assign({ leaves: text && text.toDelta().map(toSlateLeaf) }, attrs);
        return slate_1.Text.create(attrs);
    }
    throw new Error(`Unable to convert '${object}' element`);
};
exports.toSlateNode = toSlateNode;
/**
 * Converts a SyncDoc to a Slate doc
 *
 * toSlateDoc(syncDoc: SyncDoc): Value
 */
const toSlateDoc = (syncDoc) => {
    const documentNodes = syncDoc.get('document') || [];
    const nodes = documentNodes.map(exports.toSlateNode);
    const document = slate_1.Document.create({ nodes });
    const data = syncDoc.get('data');
    return slate_1.Value.create({ document, data: data ? data.toJSON() : {} });
};
exports.toSlateDoc = toSlateDoc;
/**
 * Returns the formatting attributes key that should be used for the given slate
 * Mark.
 *
 * toFormattingAttributesKey(Mark): string
 */
const toFormattingAttributesKey = (mark) => {
    let key = mark.type;
    if (mark.data !== undefined && mark.data.has('value')) {
        key = `${key}:${mark.data.get('value')}`;
    }
    return key;
};
exports.toFormattingAttributesKey = toFormattingAttributesKey;
/**
 * Converts a List of slate Marks to Yjs formatting attributes
 *
 * toFormattingAttributes(List<Mark>, boolean): Object<string, string>
 */
const toFormattingAttributes = (marks, setMark = true) => {
    const result = {};
    marks.forEach((mark) => {
        // If setMark is false, use a value of null to indicate that application of
        // the resulting formatting attributes should cause the mark to be cleared.
        result[exports.toFormattingAttributesKey(mark)] = setMark ? 'true' : null;
    });
    return result;
};
exports.toFormattingAttributes = toFormattingAttributes;
/**
 * Converts a slate node to a sync element
 *
 * toSyncElement(node: Node): SyncDoc
 */
const toSyncElement = (node) => {
    const element = new Y.Map();
    if (slate_1.Block.isBlock(node) || slate_1.Inline.isInline(node)) {
        const childElements = node.nodes.map(exports.toSyncElement);
        const childContainer = new Y.Array();
        childContainer.insert(0, childElements);
        element.set('children', childContainer);
    }
    if (slate_1.Text.isText(node)) {
        const textElement = new Y.Text(node.text);
        element.set('text', textElement);
        let index = 0;
        node.getLeaves().forEach((leaf) => {
            if (leaf.marks.size > 0) {
                textElement.format(index, leaf.text.length, exports.toFormattingAttributes(leaf.marks));
            }
            index += leaf.text.length;
        });
    }
    for (const [key, value] of Object.entries(node.toJSON())) {
        if (key !== 'leaves' && key !== 'nodes') {
            element.set(key, value);
        }
    }
    return element;
};
exports.toSyncElement = toSyncElement;
/**
 * Converts all elements into a Slate doc to SyncElements and adds them to the
 * SyncDoc
 *
 * toSyncDoc(syncDoc: SyncDoc, value: Value): void
 */
const toSyncDoc = (syncDoc, value) => {
    const document = new Y.Array();
    document.insert(0, value.document.nodes.map(exports.toSyncElement));
    syncDoc.set('document', document);
    syncDoc.set('data', new Y.Map(value.data));
};
exports.toSyncDoc = toSyncDoc;
/**
 * Converts a SyncDoc path the a slate path
 *
 * toSlatePath(path: (string | number)[]): Path
 */
const toSlatePath = (path) => path.filter((node) => typeof node === 'number');
exports.toSlatePath = toSlatePath;
//# sourceMappingURL=convert.js.map