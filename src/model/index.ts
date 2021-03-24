import { SyncDoc, SyncElementType, SyncNodeType } from 'types';
import * as Y from 'yjs';

export const SyncElement = {
    /**
     * getText(element: SyncElement): Y.Text | undefined
     */
    getText(element: SyncElementType): Y.Text | undefined {
        return element && element.get('text');
    },

    /**
     * getChildren(element: SyncElement): SyncDoc | undefined
     */
    getChildren(element: SyncElementType): SyncDoc | undefined {
        return element && element.get('children');
    },
};

export const SyncNode = {
    /**
     * getChildren(node: SyncNodeType): SyncDoc | undefined
     */
    getChildren(node: SyncNodeType): SyncDoc | undefined {
        if (node && node instanceof Y.Array) {
            return node;
        }

        return SyncElement.getChildren(node);
    },

    /**
     * getText(node: SyncNodeType): Y.Text | undefined
     */
    getText(node: SyncNodeType): Y.Text | undefined {
        if (node && node instanceof Y.Array) {
            return undefined;
        }

        return SyncElement.getText(node);
    },
};
