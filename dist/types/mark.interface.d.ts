export interface MarkAttrs {
    type: string;
    data?: {
        value: string;
    };
}
export interface MarkOperation {
    type: string;
    path: Iterable<number>;
    offset: number;
    length: number;
    mark: MarkAttrs;
}
//# sourceMappingURL=mark.interface.d.ts.map