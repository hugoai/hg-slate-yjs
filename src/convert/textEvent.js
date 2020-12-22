const { toSlateMarks, toSlatePath } = require('../utils/convert');

/**
 * Converts a Yjs Text event into Slate operations.
 *
 * textEvent(event: Y.YTextEvent): TextOperation[]
 */
const textEvent = (event) => {
  const eventTargetPath = toSlatePath(event.path);

  /**
   * createTextOp(type: 'insert_text'|'remove_text', offset: number, text: string): TextOperation
   */
  const createTextOp = (type, offset, text, marks = []) => {
    return {
      type,
      offset,
      text,
      path: eventTargetPath,
      marks,
    };
  };

  /**
   * createAddMarkOp(offset: number, length: number, attributes: Object<string, string>): MarkOperation
   */
  const createAddMarkOp = (offset, length, attributes) => {
    return {
      type: 'add_mark',
      path: eventTargetPath,
      offset,
      length,
      mark: toSlateMarks(attributes)[0],
    };
  };

  const removedValues = event.changes.deleted.values();
  let removeOffset = 0;
  let addOffset = 0;
  const removeOps = [];
  const addOps = [];
  const markOps = [];
  for (const delta of event.delta) {
    const d = delta;
    if (d.retain !== undefined) {
      if (!!d.attributes) {
        markOps.push(createAddMarkOp(addOffset, d.retain, d.attributes));
      }
      removeOffset += d.retain;
      addOffset += d.retain;
    } else if (d.delete !== undefined) {
      let text = '';
      while (text.length < d.delete) {
        const item = removedValues.next().value;
        const { content } = item;
        if (!(content && content.constructor.name === "ContentString")) {
          throw new TypeError(`Unsupported content type ${item.content}`);
        }
        text = text.concat(content.str);
      }
      if (text.length !== d.delete) {
        throw new Error(
          `Unexpected length: expected ${d.delete}, got ${text.length}`
        );
      }
      removeOps.push(createTextOp('remove_text', removeOffset, text));
    } else if (d.insert !== undefined) {
      addOps.push(createTextOp('insert_text', addOffset, d.insert, toSlateMarks(d.attributes)));
      addOffset += d.insert.length;
    }
  }

  return [...removeOps, ...addOps, ...markOps];
};

module.exports = textEvent;
