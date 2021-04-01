export interface AttributeMap {
    [key: string]: any;
}

export interface Delta {
    insert?: string | Record<string, unknown>;
    delete?: number;
    retain?: number;

    attributes?: AttributeMap;
}
