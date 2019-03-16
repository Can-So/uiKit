export declare type Token = {
    new (type: string, tag: string, level: number): Token;
    type: string;
    content: string;
    level: number;
    tag: string;
    attrs?: string[][];
    children?: any[];
};
export interface MdState {
    Token: Token;
    tokens: Token[];
    md: any;
}
export declare const markdownItMedia: (md: any) => void;
