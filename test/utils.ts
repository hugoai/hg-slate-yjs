import { createEditor, Node, Text } from 'slate';
import * as Y from 'yjs';
import {
  SharedType,
  SyncElement,
  toSharedType,
  toSlateDoc,
  toSyncDoc,
  withYjs,
} from '../src';
import { TestEditor, withTest } from './testEditor';
import { WithYjsOptions } from '../src/plugin';

export function createText(text = ''): Text {
  return {
    text,
  };
}

export function createNode(
  type = 'paragraph',
  text = '',
  data?: Partial<Node>
): Node {
  return {
    type,
    children: [createText(text)],
    ...data,
  };
}

export function createValue(children?: Node[]): { children: Node[] } {
  return {
    children: children || [createNode()],
  };
}

export function createMention(children: Node[], properties = {}): Node {
  return { type: 'mention', data: properties, children };
}
interface CreateListProps {
  indentation?: number;
  itemType?: string;
}
export function createList(
  children: Node[],
  properties: CreateListProps = {}
): Node {
  const { indentation = 1, itemType = 'bullet' } = properties;
  let orderNumber = 0;
  return {
    type: 'list',
    data: {},
    children: children.map((child) => {
      orderNumber += 1;
      return {
        type: 'list_item',
        data: {
          indentation,
          itemType,
          orderNumber,
        },
        children: [child],
      };
    }),
  };
}

export function createDoc(children?: Node[]): Y.Doc {
  const doc = new Y.Doc();
  toSharedType(doc.getArray('content'), createValue(children).children);
  return doc;
}

export function createSyncDoc(children?: Node[]): Y.Doc {
  const doc = new Y.Doc();
  toSyncDoc(doc.getMap('content'), { document: children || [], data: {} });
  return doc;
}

export function cloneDoc(doc: SharedType): Y.Doc {
  const clone = new Y.Doc();
  toSharedType(clone.getArray('content'), toSlateDoc(doc));
  return clone;
}

export function wait(ms = 0): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export async function createTestEditor(
  value?: Node[],
  options?: WithYjsOptions
): Promise<TestEditor> {
  const doc = new Y.Doc();
  const syncType = doc.getArray<SyncElement>('content');

  if (value) {
    toSharedType(syncType, value);
  }

  const editor = withTest(withYjs(createEditor(), syncType, options));

  // wait for value sync
  await wait();

  return editor;
}
