import { MarkAttrs } from 'mark.interface';

export interface TextOperation {
    type: string;
    offset: number;
    text: string;
    path: Iterable<number>;
    marks: MarkAttrs[];
}
