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
   * convertMapOp(targetElement: event.target, key: string): json | string
   */
  const convertChildToSlate = (targetElement, key)=>{
    if(["YMap","YArray","YText"].includes(targetElement.get(key).constructor.name)){
      return targetElement.get(key).toJSON()
    }
    return targetElement.get(key)
  }


  /**
   * convertMapOp(actionEntry: [string, MapAction]): SetNodeOperationProperties
   */
  const convertMapOp = (actionEntry) => {
    const [key, action] = actionEntry;
    const targetElement = event.target;
    return {
      properties: { [key]: convertChildToSlate(targetElement, key)},
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

  for( var [key, action] of keys.entries()){}
  
  var baseOp;
  if(key === 'data' && action.action === 'update' && !event.path.length){
    baseOp = {
      type: 'set_value',
      newProperties: {},
      properties: {},
      path: toSlatePath(event.path),
    };
  }else{
    baseOp = {
      type: 'set_node',
      newProperties: {},
      properties: {},
      path: toSlatePath(event.path),
    };
  }

  // Combine changes into a single set node operation
  return [changes.reduce(combineMapOp, baseOp)];
};

module.exports = mapEvent;
