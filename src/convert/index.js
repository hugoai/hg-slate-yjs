const _ = require('lodash');
const Y = require('yjs');
const arrayEvent = require('./arrayEvent');
const mapEvent = require('./mapEvent');
const textEvent = require('./textEvent');

/**
 * Converts a yjs event into slate operations.
 *
 * toSlateOp(event: Y.YEvent): Operation[]
 */
const toSlateOp = (event) => {
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
const toSlateOps = (events) => _.flatten(events.map(toSlateOp));

module.exports = { toSlateOps, toSlateOp };
