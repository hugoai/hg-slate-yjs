/* eslint-disable guard-for-in */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable valid-jsdoc */
import { AttributeMap, Delta } from 'delta.interface';
import { Block, Document, Inline, Leaf, Mark, Text, Value, Node } from 'slate';
import { SyncDoc, SyncArray, SlatePath } from 'types';
import * as Y from 'yjs';
import { SyncElement } from '../model';
import { MarkAttrs } from '../types/mark.interface';

/**
 * Converts a Yjs formatting attributes key to the corresponding slate Mark
 *
 * toSlateMark(string): Mark
 */
export const toSlateMark = (formattingAttributesKey: string): Mark => {
    const s = formattingAttributesKey.split(':');
    let markAttrs: MarkAttrs = { type: s[0] };
    if (s.length > 1) {
        markAttrs = { data: { value: s[1] }, ...markAttrs };
    }
    return Mark.create(markAttrs);
};

/**
 * Converts Yjs formatting attributes to a List of slate Marks
 *
 * toSlateMarks(Object<string, string>): Mark[]
 */
export const toSlateMarks = (formattingAttributes: AttributeMap | undefined): Mark[] => {
    const marks: Mark[] = [];
    if (!!formattingAttributes) {
        for (const formattingAttributesKey in formattingAttributes) {
            marks.push(toSlateMark(formattingAttributesKey));
        }
    }
    return marks;
};
/**
 * Converts a Quill delta element (as returned from Y.Text.toDelta()) to a slate
 * Leaf
 *
 * toSlateLeaf(delta): Leaf
 */
const toSlateLeaf = (delta: Delta): Leaf => {
    if (!delta.insert) {
        throw new Error(`Unable to convert '${delta}' element`);
    }

    return Leaf.create({
        text: delta.insert,
        marks: toSlateMarks(delta.attributes),
    });
};

/**
 * Converts a sync element to a slate node
 *
 * toSlateNode(element: SyncDoc): Node
 */
export const toSlateNode = (element: SyncDoc): Node => {
    let attrs = {};
    for (const [key, value] of element.entries()) {
        if (key !== 'children' && key !== 'text' && key !== 'marks') {
            attrs[key] = value;
        }
    }

    const object = element.get('object');
    if (object === 'block') {
        const children = SyncElement.getChildren(element);
        attrs = {
            nodes: children && children.map(toSlateNode),
            ...attrs,
        };
        return Block.create(attrs);
    } else if (object === 'inline') {
        const children = SyncElement.getChildren(element);
        attrs = {
            nodes: children && children.map(toSlateNode),
            ...attrs,
        };
        return Inline.create(attrs);
    } else if (object === 'text') {
        const text = SyncElement.getText(element);
        attrs = {
            leaves: text && text.toDelta().map(toSlateLeaf),
            ...attrs,
        };
        return Text.create(attrs);
    }

    throw new Error(`Unable to convert '${object}' element`);
};

/**
 * Converts a SyncDoc to a Slate doc
 *
 * toSlateDoc(syncDoc: SyncDoc): Value
 */
export const toSlateDoc = (syncDoc: SyncDoc): Value => {
    const documentNodes: SyncArray = syncDoc.get('document') || [];
    const nodes = documentNodes.map(toSlateNode);
    const document = Document.create({ nodes });
    const data = syncDoc.get('data');
    return Value.create({ document, data: data ? data.toJSON() : {} });
};

/**
 * Returns the formatting attributes key that should be used for the given slate
 * Mark.
 *
 * toFormattingAttributesKey(Mark): string
 */
export const toFormattingAttributesKey = (mark: Mark): string => {
    let key = mark.type;
    if (mark.data && mark.data.has('value')) {
        key = `${key}:${mark.data.get('value')}`;
    }
    return key;
};

/**
 * Converts a List of slate Marks to Yjs formatting attributes
 *
 * toFormattingAttributes(List<Mark>, boolean): Object<string, string>
 */
export const toFormattingAttributes = (
    marks: Mark[],
    setMark = true
): Record<string, string | null> => {
    const result: Record<string, string | null> = {};
    marks.forEach((mark) => {
        // If setMark is false, use a value of null to indicate that application of
        // the resulting formatting attributes should cause the mark to be cleared.
        result[toFormattingAttributesKey(mark)] = setMark ? 'true' : null;
    });
    return result;
};

/**
 * Converts a slate node to a sync element
 *
 * toSyncElement(node: Node): SyncDoc
 */
export const toSyncElement = (node: Node): SyncDoc => {
    const element = new Y.Map();

    if (Block.isBlock(node) || Inline.isInline(node)) {
        const childElements = node.nodes.map(toSyncElement);
        const childContainer = new Y.Array();
        childContainer.insert(0, childElements);
        element.set('children', childContainer);
    }

    if (Text.isText(node)) {
        const textElement = new Y.Text(node.text);
        element.set('text', textElement);
        let index = 0;
        node.getLeaves().forEach((leaf: Leaf) => {
            if (leaf.marks.size > 0) {
                textElement.format(index, leaf.text.length, toFormattingAttributes(leaf.marks));
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

/**
 * Converts all elements into a Slate doc to SyncElements and adds them to the
 * SyncDoc
 *
 * toSyncDoc(syncDoc: SyncDoc, value: Value): void
 */
export const toSyncDoc = (syncDoc: SyncDoc, value: Value): void => {
    const document = new Y.Array();
    document.insert(0, value.document.nodes.map(toSyncElement));
    syncDoc.set('document', document);
    syncDoc.set('data', new Y.Map(value.data));
};

/**
 * Converts a SyncDoc path the a slate path
 *
 * toSlatePath(path: (string | number)[]): Path
 */
export const toSlatePath = (path: SlatePath): SlatePath =>
    path.filter((node) => typeof node === 'number');
