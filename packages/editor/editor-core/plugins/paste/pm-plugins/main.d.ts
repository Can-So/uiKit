import * as MarkdownIt from 'markdown-it';
import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorAppearance } from '../../../types';
export declare const stateKey: PluginKey<any>;
export declare const md: MarkdownIt;
export declare function createPlugin(schema: Schema, editorAppearance?: EditorAppearance): Plugin<any>;
