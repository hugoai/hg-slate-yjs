const Y = require('yjs');
const { toSlatePath } = require('../utils/convert');

// type MapAction = { action: 'add' | 'update' | 'delete'; oldValue: any };
// type SetNodeOperationProperties = Pick<
//   SetNodeOperation,
//   'newProperties' | 'properties'
// >;

/**
 * Converts a Yjs Map event into Slate operations.
 *
 * mapEvent(event: Y.YMapEvent<any>): SetNodeOperation[]
 */
const mapEvent = (event) => {
  /**
   * convertMapOp(actionEntry: [string, MapAction]): SetNodeOperationProperties
   */
  const convertMapOp = (actionEntry) => {
    const [key, action] = actionEntry;
    const targetElement = event.target;

    return {
      properties: { [key]: targetElement.get(key) },
    };
  };

  /**
   * combineMapOp(op: SetNodeOperation, props: SetNodeOperationProperties): SetNodeOperation
   */
  const combineMapOp = (op, props) => {
    return {
      ...op,
      newProperties: { ...op.newProperties, ...props.newProperties },
      properties: { ...op.properties, ...props.properties },
    };
  };

  const keys = event.changes.keys;
  const changes = Array.from(keys.entries(), convertMapOp);

  const baseOp = {
    type: 'set_node',
    newProperties: {},
    properties: {},
    path: toSlatePath(event.path),
  };

  // Combine changes into a single set node operation
  return [changes.reduce(combineMapOp, baseOp)];
};

module.exports = mapEvent;
