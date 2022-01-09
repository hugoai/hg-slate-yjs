import { Editor, Operation } from 'slate';
import * as Y from 'yjs';
import translateArrayEvent from './arrayEvent';
import translateMapEvent from './mapEvent';
import translateTextEvent from './textEvent';

/**
 * Translates a Yjs event into slate editor operations.
 *
 * @param event
 */
export function translateYjsEvent(event: Y.YEvent): Operation[] {
  if (event instanceof Y.YArrayEvent) {
    return translateArrayEvent(event);
  }

  if (event instanceof Y.YMapEvent) {
    return translateMapEvent(event);
  }

  if (event instanceof Y.YTextEvent) {
    return translateTextEvent(event);
  }

  throw new Error('Unsupported yjs event');
}

/**
 * Applies multiple yjs events to a slate editor.
 */
export function applyYjsEvents(editor: Editor, events: Y.YEvent[]): void {
  Editor.withoutNormalizing(editor, () => {
    events.forEach((event) =>
      translateYjsEvent(event).forEach((op) => {
        editor.apply(op);
      })
    );
  });
}

export const toSlateOps = (events: Y.YEvent[]): Operation[] => {
  const operations: Operation[] = [];
  events.forEach((event) => operations.push(...translateYjsEvent(event)));
  return operations;
};
