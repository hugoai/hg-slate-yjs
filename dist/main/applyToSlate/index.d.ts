import { Editor, Operation } from 'slate';
import * as Y from 'yjs';
/**
 * Translates a Yjs event into slate editor operations.
 *
 * @param event
 */
export declare function translateYjsEvent(event: Y.YEvent): Operation[];
/**
 * Applies multiple yjs events to a slate editor.
 */
export declare function applyYjsEvents(editor: Editor, events: Y.YEvent[]): void;
export declare const toSlateOps: (events: Y.YEvent[]) => Operation[];
