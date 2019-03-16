/// <reference types="react" />
interface EditorActions {
    replaceDocument: (input: any) => void;
    replaceSelection: (input: any) => void;
    appendText: (input: string) => void;
}
export declare const customInsertMenuItems: ({
    content: string;
    value: {
        name: string;
    };
    tooltipDescription: string;
    tooltipPosition: string;
    elemBefore: JSX.Element;
    onClick: (editorActions: EditorActions) => void;
    className?: undefined;
} | {
    content: string;
    value: {
        name: string;
    };
    tooltipDescription: string;
    tooltipPosition: string;
    elemBefore: JSX.Element;
    className: string;
    onClick: (editorActions: EditorActions) => void;
})[];
export {};
