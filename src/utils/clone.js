const Y = require('yjs');
const { SyncElement } = require('../model');

/**
 * cloneSyncElement(element: SyncElement): SyncElement
 */
const cloneSyncElement = (element) => {
  const text = SyncElement.getText(element);
  const children = SyncElement.getChildren(element);

  const clone = new Y.Map();

  if (text !== undefined) {
    const textElement = new Y.Text(text.toString());
    clone.set('text', textElement);
    let index = 0;
    text.toDelta().forEach(d => {
      if (!d.insert) {
        // We expect the delta representation to only contain 'insert' elements.
        throw new Error(`Unexpected delta element: ${d}`);
      }
      if (!!d.attributes) {
        // If the current element contains formatting attributes, apply them to
        // the cloned text.
        textElement.format(index, d.insert.length, d.attributes);
      }
      index += d.insert.length;
    });
  }

  if (children !== undefined) {
    const childElements = children.map(cloneSyncElement);
    const childContainer = new Y.Array();
    childContainer.insert(0, childElements);
    clone.set('children', childContainer);
  }

  for (const [key, value] of element.entries()) {
    if (key !== 'children' && key !== 'text') {
      clone.set(key, value);
    }
  }

  return clone;
};

module.exports = { cloneSyncElement };
