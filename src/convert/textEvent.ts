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
            for (let index = 0; index < d.delete; index++) {
                // Yjs doesn't expose the portion of the string that was removed and Slate only
                // uses it to get the length of the substring that is going to be removed.
                // This populates the substring with dummy text making the lengths match.
                text += '0';
            }
            if (text.length !== d.delete) {
                throw new Error(`Unexpected length: expected ${d.delete}, got ${text.length}`);
            }
            removeOps.push(createTextOp('remove_text', removeOffset, text));
        } else if (d.insert !== undefined && typeof d.insert == 'string') {
            addOps.push(
                createTextOp('insert_text', addOffset, d.insert, toSlateMarks(d.attributes))
            );
            addOffset += d.insert.length;
        }
    }

    return [...removeOps, ...addOps, ...markOps];
};

export default textEvent;
