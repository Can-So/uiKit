import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { TypeAheadHandler } from '../types';
export declare function inputRulePlugin(schema: Schema, typeAheads: TypeAheadHandler[]): Plugin | undefined;
export default inputRulePlugin;
