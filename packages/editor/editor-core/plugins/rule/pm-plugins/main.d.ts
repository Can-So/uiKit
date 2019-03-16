import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
declare const plugins: (schema: Schema<any, any>) => Plugin<any>[];
export default plugins;
