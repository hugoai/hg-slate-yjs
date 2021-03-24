import * as Y from 'yjs';
import { Block, Inline, Text } from 'slate';

type SyncElementType = Y.Map<any>;
type SyncDoc = Y.Array<SyncElementType>;
type SyncNodeType = SyncDoc | SyncElementType;

type Node = Block | Inline | Text;
