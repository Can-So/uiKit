import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
export declare function getEditorValueWithMedia(editorView?: EditorView): Promise<Node | undefined>;
export declare function insertFileFromDataUrl(editorState: EditorState | undefined, url: string, fileName: string): void;
