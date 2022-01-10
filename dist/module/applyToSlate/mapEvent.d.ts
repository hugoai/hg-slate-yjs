import { NodeOperation } from 'slate';
import * as Y from 'yjs';
/**
 * Translates a Yjs map event into a slate operations.
 *
 * @param event
 */
export default function translateMapEvent(event: Y.YMapEvent<unknown>): NodeOperation[];
