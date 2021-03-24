import * as Y from 'yjs';
import { Block, Document, Inline, Leaf, Mark, Text, Value } from 'slate';

type SyncElementType = Y.Map<any>;
type SyncDoc = Y.Array<SyncElementType>;
type SyncNodeType = SyncDoc | SyncElementType;

type Node = Block | Inline | Text;
