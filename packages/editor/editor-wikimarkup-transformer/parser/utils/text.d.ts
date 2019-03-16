import { Node as PMNode } from 'prosemirror-model';
/**
 * Check if the node has certain marks
 */
export declare function hasAnyOfMarks(node: PMNode, types: string[]): boolean;
export declare function isDigit(value: string): boolean;
export declare function isBlank(value: string | null): boolean;
export declare function isNotBlank(value: string | null): boolean;
export declare class StringBuffer {
    private buffer;
    constructor(buffer?: string);
    indexOf(value: string): number;
    lastIndexOf(value: string): number;
    charAt(index: number): string;
    length(): number;
    delete(start: number, end: number): void;
    append(value: string): void;
    substring(start: number, end?: number): string;
    deleteCharAt(index: number): void;
    toString(): string;
}
