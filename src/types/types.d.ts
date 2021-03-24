import * as Y from 'yjs';
import { Iterable } from 'immutable';
import { Block, Inline, Text, Operation } from 'slate';

export type SyncDoc = Y.Map<any>;
export type SyncArray = Y.Array<SyncDoc>;
export type SyncNodeType = SyncDoc | SyncArray;

export type Node = Block | Inline | Text;

export type SlateOperation = Operation;
export type SlatePath = Iterable<number>;
