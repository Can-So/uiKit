import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { EditorProps } from '../../../types/editor-props';
export declare function createKeymapPlugin(schema: Schema, props: EditorProps): Plugin | undefined;
export default createKeymapPlugin;
