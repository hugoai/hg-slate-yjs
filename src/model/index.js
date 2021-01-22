const Y = require('yjs');

// SyncElement = Y.Map<any>
// SyncDoc = Y.Array<SyncElement>
// SyncNode = SyncDoc | SyncElement

const SyncElement = {
    /**
     * getText(element: SyncElement): Y.Text | undefined
     */
    getText(element) {
        return element && element.get('text');
    },

    /**
     * getChildren(element: SyncElement): Y.Array<SyncElement> | undefined
     */
    getChildren(element) {
        return element && element.get('children');
    },
};

const SyncNode = {
    /**
     * getChildren(node: SyncNode): Y.Array<SyncElement> | undefined
     */
    getChildren(node) {
        if (node && node instanceof Y.Array) {
            return node;
        }

        return SyncElement.getChildren(node);
    },

    /**
     * getText(node: SyncNode): Y.Text | undefined
     */
    getText(node) {
        if (node && node instanceof Y.Array) {
            return undefined;
        }

        return SyncElement.getText(node);
    },
};

module.exports = { SyncElement, SyncNode };
