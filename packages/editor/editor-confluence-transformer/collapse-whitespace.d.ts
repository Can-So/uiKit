declare module 'collapse-whitespace';
export interface ICollapseWhitespace {
    (node: Node, blockTest?: (node: Node) => boolean, preTest?: (node: Node) => boolean): void;
}
declare const collapseWhitespace: ICollapseWhitespace;
export default collapseWhitespace;
