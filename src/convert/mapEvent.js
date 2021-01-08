const Y = require("yjs");
const { Block } = require("slate");
const { toSlatePath } = require("../utils/convert");

const mapInsertNodeOperations = (event) => {
  const changes = Array.from(event.changes.keys.entries());
  const operations = [];
  changes.forEach(([key]) => {
    if (key === "document") {
      const documentNodes = event.target.get(key).toJSON();
      const index = 0;
      documentNodes.forEach((node) => {
        const blockNode = node;
        blockNode['nodes'] = node.children;
        const block = Block.create(blockNode);
        operations.push({ type: "insert_node", path: [index], node: block.toJSON() });
      });
    }
  });
  return operations;
};

/**
 * Converts a Yjs Map event into Slate operations.
 *
 * mapEvent(event: Y.YMapEvent<any>): SetNodeOperation[]
 */
const mapEvent = (event) => {
  /**
   * convertMapOp(targetElement: event.target, key: string): json | string
   */
  const convertChildToSlate = (targetElement, key) => {
    if (
      ["YMap", "YArray", "YText"].includes(
        targetElement.get(key).constructor.name
      )
    ) {
      return targetElement.get(key).toJSON();
    }
    return targetElement.get(key);
  };

  /**
   * convertMapOp(actionEntry: [string, MapAction]): SetNodeOperationProperties
   */
  const convertMapOp = (actionEntry) => {
    const [key, action] = actionEntry;
    const targetElement = event.target;
    return {
      properties: { [key]: convertChildToSlate(targetElement, key) },
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
  let mapOperations = [];

  const isSetValueOperation = keys.has("data") && event.path.length === 0;
  const isSetNodeOperation = keys.has("data") && event.path.length !== 1;
  if (isSetValueOperation || isSetNodeOperation) {
    var baseOp = {
      type: isSetValueOperation ? "set_value" : "set_node",
      newProperties: {},
      properties: {},
      path: toSlatePath(event.path),
    };
    mapOperations = [changes.reduce(combineMapOp, baseOp)];
  }
  const insertNodeOperations = mapInsertNodeOperations(event);

  // Combine changes into a single set node operation
  return [...insertNodeOperations, ...mapOperations];
};

module.exports = mapEvent;
