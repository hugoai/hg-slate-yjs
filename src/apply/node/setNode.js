const { SyncElement } = require('../../model');
const { getTarget } = require('../../path');

/**
 * Applies a setNode operation to a SyncDoc
 *
 * setNode(doc: SyncDoc, op: SetNodeOperation): SyncDoc
 */
const setNode = (doc, op) => {
  const syncDoc = doc.get('document')
  const node = getTarget(syncDoc, op.path);

  const properties = node.get('data');
  for (const [key, value] of Object.entries(op.properties.data.toJSON())) {
    if (key === 'children' || key === 'text') {
      throw new Error(`Cannot set the "${key}" property of nodes!`);
    }

    properties[key] = value;
  }
  node.set('data', properties);

  return doc;
};

module.exports = setNode;
