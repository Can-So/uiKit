import { IndentationMarkAttributes } from '../../../../../adf-schema';
import { INDENT_DIR } from '../../analytics';
import { Transaction } from 'prosemirror-state';
import { GetAttrsChange } from '../../../utils/getAttrsWithChangesRecorder';
declare type PrevAttributes = IndentationMarkAttributes | undefined;
declare type NewAttributes = IndentationMarkAttributes | undefined | false;
export declare type IndentationChangesOptions = {
    direction: INDENT_DIR;
};
/**
 * Get the current indentation level given prev and new attributes
 * @param prevAttrs - Previous attributes from indentation
 * @param newAttrs - New attributes from indentation
 */
export declare function getNewIndentLevel(prevAttrs: PrevAttributes, newAttrs: NewAttributes): number;
/**
 * Get the previous indentation level  prev attributes
 * @param prevAttrs - Previous attributes from indentation
 */
export declare function getPrevIndentLevel(prevAttrs: PrevAttributes): number;
/**
 * Create a new dispatch function who add analytics events given a list of attributes changes
 *
 * @export
 * @param {*} getAttrsChanges
 * @param dispatch
 * @returns
 */
export declare function createAnalyticsDispatch(getAttrsChanges: () => GetAttrsChange<IndentationMarkAttributes, IndentationChangesOptions>[], dispatch?: (tr: Transaction) => void): (tr: Transaction) => void;
export {};
