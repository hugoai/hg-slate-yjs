import * as Y from 'yjs';
import { Block, Inline, Text } from 'slate';

export type SyncDoc = Y.Map<any>;
export type SyncArray = Y.Array<SyncDoc>;
export type SyncNodeType = SyncDoc | SyncDoc;

export type Node = Block | Inline | Text;
