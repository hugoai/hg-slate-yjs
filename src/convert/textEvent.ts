/* eslint-disable no-extra-boolean-cast */
import { MarkAttrs, MarkOperation } from 'mark.interface';
import { TextOperation } from 'text.interface';
import { TextEventOp } from 'types';
import * as Y from 'yjs';
import { toFormattingAttributesKey, toSlateMarks, toSlatePath } from '../utils/convert';

/**
 * Converts a Yjs Text event into Slate operations.
 *
 * textEvent(event: Y.YTextEvent): TextEventOp[]
 */
const textEvent = (event: Y.YTextEvent): TextEventOp[] => {
    const eventTargetPath = toSlatePath(event.path);

    /**
     * createTextOp(
     *   type: 'insert_text'|'remove_text',
     *   offset: number,
     *   text: string,
     *   marks: SlateMark[]): TextOperation
     */
    const createTextOp = (
        type: 'insert_text' | 'remove_text',
        offset: number,
        text: string,
        marks: MarkAttrs[] = []
    ): TextOperation => ({
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
    const createMarkOps = (
        offset: number,
        length: number,
        attributes: MarkAttrs
    ): MarkOperation[] =>
        toSlateMarks(attributes).map((mark) => ({
            type: attributes[toFormattingAttributesKey(mark)] !== null ? 'add_mark' : 'remove_mark',
            path: eventTargetPath,
            offset,
            length,
            mark,
        }));

    const removedValues = event.changes.deleted.values();
    let removeOffset = 0;
    let addOffset = 0;
    const removeOps: TextOperation[] = [];
    const addOps: TextOperation[] = [];
    const markOps: MarkOperation[] = [];
    for (const delta of event.delta) {
        const d = delta;
        if (d.retain !== undefined) {
            if (!!d.attributes) {
                createMarkOps(addOffset, d.retain, d.attributes as MarkAttrs).forEach(
                    (markOp: MarkOperation): void => {
                        markOps.push(markOp);
                    }
                );
            }
            removeOffset += d.retain;
            addOffset += d.retain;
        } else if (d.delete !== undefined) {
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
        } else if (d.insert !== undefined) {
            addOps.push(
                createTextOp('insert_text', addOffset, d.insert, toSlateMarks(d.attributes))
            );
            addOffset += d.insert.length;
        }
    }

    return [...removeOps, ...addOps, ...markOps];
};

export default textEvent;
