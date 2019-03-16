import { Node as PmNode } from 'prosemirror-model';
export declare const generateColgroup: (node: PmNode<any>) => (string | {} | {
    [attr: string]: string;
})[];
export declare const renderColgroupFromNode: (node: PmNode<any>) => Node | undefined;
export declare const insertColgroupFromNode: (tableElem: HTMLTableElement, node: PmNode<any>) => HTMLCollection;
export declare const hasTableBeenResized: (node: PmNode<any>) => boolean;
