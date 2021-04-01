import { SyncDoc, SyncArray, SyncNodeType } from 'types';
import * as Y from 'yjs';

export const SyncElement = {
    /**
     * getText(element: SyncDoc): Y.Text | undefined
     */
    getText(element?: SyncDoc): Y.Text | undefined {
        return element !== undefined && element.get('text');
    },

    /**
     * getChildren(element: SyncDoc): SyncArray | undefined
     */
    getChildren(element?: SyncDoc): SyncArray | undefined {
        return element !== undefined && element.get('children');
    },
};

export const SyncNode = {
    /**
     * getChildren(node: SyncNodeType): SyncArray | undefined
     */
    getChildren(node?: SyncNodeType): SyncArray | undefined {
        if (node !== undefined && node instanceof Y.Array) {
            return node;
        }
        return SyncElement.getChildren(node);
    },

    /**
     * getText(node: SyncNodeType): Y.Text | undefined
     */
    getText(node?: SyncNodeType): Y.Text | undefined {
        if (node !== undefined && node instanceof Y.Array) {
            return undefined;
        }

        return SyncElement.getText(node);
    },
};
