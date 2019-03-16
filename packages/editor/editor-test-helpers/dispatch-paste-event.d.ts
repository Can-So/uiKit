import { EditorView } from 'prosemirror-view';
export interface PasteContent {
    plain?: string;
    html?: string;
    types?: Array<string>;
    files?: Array<File>;
}
declare const _default: (editorView: EditorView<any>, content: PasteContent) => false | Event;
/**
 * Dispatch a paste event on the given ProseMirror instance
 *
 * Usage:
 *     dispatchPasteEvent(pm, {
 *         plain: 'copied text'
 *     });
 */
export default _default;
