import { Mark } from 'prosemirror-model';
import { Style } from './interfaces';
export declare const createTag: (tagName: string, attrs?: {
    [key: string]: string | number | undefined;
} | undefined, content?: string | null | undefined) => string;
export declare const serializeStyle: (style: Style) => string;
export declare const applyMarks: (marks: Mark<any>[], text: string) => string;
export declare const withTable: (text: string, style?: Style) => string;
