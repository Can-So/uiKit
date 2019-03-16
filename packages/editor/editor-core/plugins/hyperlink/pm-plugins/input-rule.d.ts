import { InputRule } from 'prosemirror-inputrules';
import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
export declare function createLinkInputRule(regexp: RegExp, formatUrl: (url: string[]) => string): InputRule;
export declare function createInputRulePlugin(schema: Schema): Plugin | undefined;
export default createInputRulePlugin;
