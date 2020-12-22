const { toSlateMarks, toSlatePath } = require('../utils/convert');

/**
 * Converts a Yjs Text event into Slate operations.
 *
 * textEvent(event: Y.YTextEvent): TextOperation[]
 */
const textEvent = (event) => {
  const eventTargetPath = toSlatePath(event.path);

  /**
   * createTextOp(
   *   type: 'insert_text'|'remove_text', 
   *   offset: number, 
   *   text: string, 
   *   marks: Mark[]): TextOperation
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
   * createMarkOp(
   *   offset: number, 
   *   length: number, 
   *   attributes: Object<string, string>): MarkOperation
   */
  const createMarkOp = (offset, length, attributes) => {
    // It appears that (a) an 'add_mark' or 'remove_mark' op can only contain a
    // single mark and (b) that 'retain' elements in Yjs TextEvents are aligned
    // with this; log an error if that is not the case. (If we do see 'retain'
    // elements that yield multiple marks, we probably need to change things
    // such that this code can return multiple ops, one per mark.)
    const marks = toSlateMarks(attributes);
    if (marks.length > 1) {
      console.error(`Attributes yield more than one mark: ${attributes}`);
    }
    const mark = marks[0];

    return {
      type: ((attributes[mark.type] !== null) ? 'add_mark' : 'remove_mark'),
      path: eventTargetPath,
      offset,
      length,
      mark,
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
        markOps.push(createMarkOp(addOffset, d.retain, d.attributes));
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
