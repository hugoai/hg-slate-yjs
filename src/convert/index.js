const _ = require("lodash");
const arrayEvent = require("./arrayEvent");
const mapEvent = require("./mapEvent");
const textEvent = require("./textEvent");

/**
 * Converts yjs events into slate operations.
 *
 * toSlateOps(events: Y.YEvent[]): Operation[]
 */
const toSlateOps = (events) => {
  return _.flatten(events.map(toSlateOp));
};

/**
 * Converts a yjs event into slate operations.
 *
 * toSlateOp(event: Y.YEvent): Operation[]
 */
const toSlateOp = (event) => {
  if (event.constructor.name === "YArrayEvent") {
    return arrayEvent(event);
  }

  if (event.constructor.name === "YMapEvent") {
    return mapEvent(event);
  }

  if (event.constructor.name === "YTextEvent") {
    return textEvent(event);
  }

  throw new Error("Unsupported yjs event");
};

module.exports = { toSlateOps, toSlateOp };
