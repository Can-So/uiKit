import { ResolvedPos, Schema, NodeType } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { INPUT_METHOD } from '../analytics';
import { TaskDecisionListType, AddItemTransactionCreator } from './types';
import { TOOLBAR_MENU_TYPE } from '../insert-block/ui/ToolbarInsertBlock';
export declare const getListTypes: (listType: TaskDecisionListType, schema: Schema<any, any>) => {
    list: NodeType<any>;
    item: NodeType<any>;
};
export declare const insertTaskDecision: (view: EditorView<any>, listType: TaskDecisionListType, inputMethod?: TOOLBAR_MENU_TYPE) => boolean;
export declare const insertTaskDecisionWithAnalytics: (state: EditorState<any>, listType: TaskDecisionListType, inputMethod: INPUT_METHOD.FORMATTING | INPUT_METHOD.KEYBOARD | INPUT_METHOD.INSERT_MENU | INPUT_METHOD.QUICK_INSERT | INPUT_METHOD.TOOLBAR, addAndCreateList: AddItemTransactionCreator, addToList?: AddItemTransactionCreator | undefined) => Transaction<any> | null;
export declare const isSupportedSourceNode: (schema: Schema<any, any>, selection: Selection<any>) => boolean;
export declare const changeInDepth: (before: ResolvedPos<any>, after: ResolvedPos<any>) => number;
export declare const createListAtSelection: (tr: Transaction<any>, list: any, item: any, schema: Schema<any, any>, state: EditorState<any>, listLocalId?: string | true, itemLocalId?: string | true) => Transaction<any> | null;
export declare const splitListAtSelection: (tr: Transaction<any>, schema: Schema<any, any>) => Transaction<any>;
