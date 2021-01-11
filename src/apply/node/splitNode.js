const { SyncNode } = require('../../model');
const { getParent } = require('../../path');

/**
 * Applies a split node operation to a SyncDoc
 *
 * splitNode(doc: SyncDoc, op: SplitNodeOperation): SyncDoc
 */
const splitNode = (doc, op) => {
  const syncDoc = doc.get('document')
  const [parent, index] = getParent(syncDoc, op.path);

  const target = SyncNode.getChildren(parent).get(index);
  const inject = target.clone();

  // Inject is a shallow clone of target at this point; they share the same
  // 'data' member. Clone 'data' as well such that future changes to one aren't
  // reflected in the other.
  inject.set('data', Object.assign({}, target.get('data')));

  SyncNode.getChildren(parent).insert(index + 1, [inject]);

  if (SyncNode.getText(target) !== undefined) {
    const targetText = SyncNode.getText(target);
    const injectText = SyncNode.getText(inject);

    if (targetText.length > op.position) {
      targetText.delete(op.position, targetText.length - op.position);
    }

    if (injectText !== undefined && op.position !== undefined) {
      injectText.delete(0, op.position);
    }
  } else {
    const targetChildren = SyncNode.getChildren(target);
    const injectChildren = SyncNode.getChildren(inject);

    targetChildren.delete(op.position, targetChildren.length - op.position);

    if (op.position !== undefined) {
      injectChildren.delete(0, op.position);
    }
  }

  return doc;
};

module.exports = splitNode;
