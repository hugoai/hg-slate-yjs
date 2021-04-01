import _ from 'lodash';
import { SlateOperation } from 'types';

import * as Y from 'yjs';
import arrayEvent from './arrayEvent';
import mapEvent from './mapEvent';
import textEvent from './textEvent';

/**
 * Converts a yjs event into slate operations.
 *
 * toSlateOp(event: Y.YEvent): Operation[]
 */
export const toSlateOp = (event: Y.YEvent): SlateOperation[] => {
    if (event instanceof Y.YArrayEvent) {
        return arrayEvent(event);
    }

    if (event instanceof Y.YMapEvent) {
        return mapEvent(event);
    }

    if (event instanceof Y.YTextEvent) {
        return textEvent(event);
    }

    throw new Error('Unsupported yjs event');
};

/**
 * Converts yjs events into slate operations.
 *
 * toSlateOps(events: Y.YEvent[]): Operation[]
 */
export const toSlateOps = (events: Y.YEvent[]): SlateOperation[] =>
    _.flatten(events.map(toSlateOp));
