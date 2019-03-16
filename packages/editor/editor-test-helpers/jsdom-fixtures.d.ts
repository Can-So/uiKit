export declare class NullSelectionReader {
    private warnOnce;
    constructor(warnOnce: () => void);
    destroy(): void;
    poll(): void;
    editableChanged(): void;
    domChanged(): boolean;
    storeDOMState(selection: any): void;
    clearDOMState(): void;
    readFromDOM(origin: any): boolean;
}
declare const _default: (editorView: any) => void;
export default _default;
