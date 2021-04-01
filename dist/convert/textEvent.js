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
 * Converts a Yjs Text event into Slate operations.
 *
 * textEvent(event: Y.YTextEvent): TextEventOp[]
 */
const textEvent = (event) => {
    const eventTargetPath = convert_1.toSlatePath(event.path);
    /**
     * createTextOp(
     *   type: 'insert_text'|'remove_text',
     *   offset: number,
     *   text: string,
     *   marks: SlateMark[]): TextOperation
     */
    const createTextOp = (type, offset, text, marks = []) => ({
        type,
        offset,
        text,
        path: eventTargetPath,
        marks,
    });
    /**
     * createMarkOps(
     *   offset: number,
     *   length: number,
     *   attributes: Object<string, string>): MarkOperation[]
     */
    const createMarkOps = (offset, length, attributes) => convert_1.toSlateMarks(attributes).map((mark) => ({
        type: attributes[convert_1.toFormattingAttributesKey(mark)] !== null ? 'add_mark' : 'remove_mark',
        path: eventTargetPath,
        offset,
        length,
        mark,
    }));
    const removedValues = event.changes.deleted.values();
    let removeOffset = 0;
    let addOffset = 0;
    const removeOps = [];
    const addOps = [];
    const markOps = [];
    for (const delta of event.delta) {
        const d = delta;
        if (d.retain !== undefined) {
            if (!!d.attributes) {
                createMarkOps(addOffset, d.retain, d.attributes).forEach((markOp) => {
                    markOps.push(markOp);
                });
            }
            removeOffset += d.retain;
            addOffset += d.retain;
        }
        else if (d.delete !== undefined) {
            let text = '';
            while (text.length < d.delete) {
                const item = removedValues.next().value;
                const { content } = item;
                // Skip deleted items that don't contain text (e.g., some only contain
                // formatting attributes).
                if (content && content instanceof Y.ContentString) {
                    text = text.concat(content.str);
                }
            }
            if (text.length !== d.delete) {
                throw new Error(`Unexpected length: expected ${d.delete}, got ${text.length}`);
            }
            removeOps.push(createTextOp('remove_text', removeOffset, text));
        }
        else if (d.insert !== undefined) {
            addOps.push(createTextOp('insert_text', addOffset, d.insert, convert_1.toSlateMarks(d.attributes)));
            addOffset += d.insert.length;
        }
    }
    return [...removeOps, ...addOps, ...markOps];
};
exports.default = textEvent;
//# sourceMappingURL=textEvent.js.map