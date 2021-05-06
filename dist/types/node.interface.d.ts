import { Node } from 'types';
export interface NodeOperation {
    type: string;
    path: Iterable<number>;
    node: Node;
}
export interface SplitNodeOperation {
    type: string;
    path: Iterable<number>;
    position: number;
    target: number;
    properties: Record<string, any>;
    data?: Map<string, any>;
}
export interface SetNodeOperation {
    type: string;
    path: Iterable<number>;
    properties: Record<string, any>;
    newProperties: Record<string, any>;
    data?: Map<string, any>;
}
export interface RemoveNodeOperation {
    type: string;
    path: Iterable<number>;
    node: Node;
    data: Map<string, any>;
}
export interface MoveNodeOperation {
    type: string;
    path: Iterable<number>;
    newPath: Array<any>;
    data: Map<string, any>;
}
export interface MergeNodeOperation {
    type: string;
    path: Iterable<number>;
    position: number;
    properties: Record<string, any>;
    data: Map<string, any>;
}
export interface InsertNodeOperation {
    type: string;
    path: Iterable<number>;
    node: Node;
    data: Map<string, any>;
}
//# sourceMappingURL=node.interface.d.ts.map