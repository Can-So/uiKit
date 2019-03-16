import { EditorView } from 'prosemirror-view';
export declare const handleBlur: (view: EditorView<any>, event: Event) => boolean;
export declare const handleFocus: (view: EditorView<any>, event: Event) => boolean;
export declare const handleClick: (view: EditorView<any>, event: Event) => boolean;
export declare const handleMouseOver: (view: EditorView<any>, mouseEvent: Event) => boolean;
export declare const handleMouseLeave: (view: EditorView<any>) => boolean;
export declare function handleTripleClick(view: EditorView, pos: number): boolean;
export declare const handleMouseDown: (view: EditorView<any>, event: Event) => boolean;
