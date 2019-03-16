import { ResolvedPos, Node } from 'prosemirror-model';
import { PluginKey, Plugin, Transaction } from 'prosemirror-state';
export declare const inlineCursorTargetStateKey: PluginKey<any>;
export declare const SPECIAL_NODES: string[];
export declare const isSpecial: (node: Node<any> | null | undefined) => boolean | null | undefined;
export declare const findSpecialNodeAfter: ($pos: ResolvedPos<any>, tr: Transaction<any>) => number | undefined;
export declare const findSpecialNodeBefore: ($pos: ResolvedPos<any>, tr: Transaction<any>) => number | undefined;
declare const _default: () => Plugin<any>;
export default _default;
