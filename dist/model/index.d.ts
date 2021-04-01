import { SyncDoc, SyncArray, SyncNodeType } from 'types';
import * as Y from 'yjs';
export declare const SyncElement: {
    /**
     * getText(element: SyncDoc): Y.Text | undefined
     */
    getText(element?: SyncDoc | undefined): Y.Text | undefined;
    /**
     * getChildren(element: SyncDoc): SyncArray | undefined
     */
    getChildren(element?: SyncDoc | undefined): SyncArray | undefined;
};
export declare const SyncNode: {
    /**
     * getChildren(node: SyncNodeType): SyncArray | undefined
     */
    getChildren(node?: SyncNodeType | undefined): SyncArray | undefined;
    /**
     * getText(node: SyncNodeType): Y.Text | undefined
     */
    getText(node?: SyncNodeType | undefined): Y.Text | undefined;
};
//# sourceMappingURL=index.d.ts.map