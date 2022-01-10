import { NodeOperation } from 'slate';
import * as Y from 'yjs';
import { SyncElement } from '../model';
/**
 * Translates a Yjs array event into a slate operations.
 *
 * @param event
 */
export default function translateArrayEvent(event: Y.YArrayEvent<SyncElement>): NodeOperation[];
