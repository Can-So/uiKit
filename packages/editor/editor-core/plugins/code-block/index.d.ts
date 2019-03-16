import { EditorPlugin } from '../../types';
export interface CodeBlockOptions {
    enableKeybindingsForIDE?: boolean;
}
declare const codeBlockPlugin: (options?: CodeBlockOptions) => EditorPlugin;
export default codeBlockPlugin;
