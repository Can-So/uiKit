import { InjectedIntl } from 'react-intl';
import { EditorState, Transaction } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { TypeAheadItem } from '../type-ahead/types';
export declare type QuickInsertActionInsert = (node?: Node | Object | string, opts?: {
    selectInlineNode?: boolean;
}) => Transaction;
export declare type QuickInsertItem = TypeAheadItem & {
    keywords?: Array<string>;
    priority?: number;
    action: (insert: QuickInsertActionInsert, state: EditorState) => Transaction | false;
};
export declare type QuickInsertProvider = {
    getItems: () => Promise<Array<QuickInsertItem>>;
};
export declare type QuickInsertOptions = boolean | {
    provider: Promise<QuickInsertProvider>;
};
export declare type QuickInsertHandler = Array<QuickInsertItem> | ((intl: InjectedIntl) => Array<QuickInsertItem>);
