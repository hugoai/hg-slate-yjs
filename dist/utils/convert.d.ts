import { AttributeMap } from 'delta.interface';
import { Mark } from 'slate';
import { SyncDoc } from 'types';
/**
 * Converts a Yjs formatting attributes key to the corresponding slate Mark
 *
 * toSlateMark(string): Mark
 */
export declare const toSlateMark: (formattingAttributesKey: string) => any;
/**
 * Converts Yjs formatting attributes to a List of slate Marks
 *
 * toSlateMarks(Object<string, string>): Mark[]
 */
export declare const toSlateMarks: (formattingAttributes: AttributeMap | undefined) => Mark[];
/**
 * Converts a sync element to a slate node
 *
 * toSlateNode(element: SyncDoc): Node
 */
export declare const toSlateNode: (element: SyncDoc) => any;
/**
 * Converts a SyncDoc to a Slate doc
 *
 * toSlateDoc(syncDoc: SyncDoc): Value
 */
export declare const toSlateDoc: (syncDoc: SyncDoc) => any;
/**
 * Returns the formatting attributes key that should be used for the given slate
 * Mark.
 *
 * toFormattingAttributesKey(Mark): string
 */
export declare const toFormattingAttributesKey: (mark: any) => string;
/**
 * Converts a List of slate Marks to Yjs formatting attributes
 *
 * toFormattingAttributes(List<Mark>, boolean): Object<string, string>
 */
export declare const toFormattingAttributes: (marks: Mark[], setMark?: boolean) => Record<string, string | null>;
/**
 * Converts a slate node to a sync element
 *
 * toSyncElement(node: Node): SyncDoc
 */
export declare const toSyncElement: (node: any) => SyncDoc;
/**
 * Converts all elements into a Slate doc to SyncElements and adds them to the
 * SyncDoc
 *
 * toSyncDoc(syncDoc: SyncDoc, value: Value): void
 */
export declare const toSyncDoc: (syncDoc: SyncDoc, value: any) => void;
/**
 * Converts a SyncDoc path the a slate path
 *
 * toSlatePath(path: (string | number)[]): Path
 */
export declare const toSlatePath: (path: any) => any;
//# sourceMappingURL=convert.d.ts.map