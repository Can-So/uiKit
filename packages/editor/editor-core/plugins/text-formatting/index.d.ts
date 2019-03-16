import { EditorPlugin } from '../../types';
export interface TextFormattingOptions {
    disableSuperscriptAndSubscript?: boolean;
    disableUnderline?: boolean;
    disableCode?: boolean;
    disableSmartTextCompletion?: boolean;
}
declare const textFormatting: (options: TextFormattingOptions) => EditorPlugin;
export default textFormatting;
