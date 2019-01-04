import { ReactElement } from 'react';
import { InjectedIntl } from 'react-intl';
import { EditorState, Transaction } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { SelectItemMode } from './commands/select-item';

export type TypeAheadItem = {
  title: string;
  icon?: () => ReactElement<any>;
  [key: string]: any;
};

export type TypeAheadHandler = {
  trigger: string;
  customRegex?: string;
  getItems: (
    query: string,
    editorState: EditorState,
    intl: InjectedIntl,
    meta: {
      prevActive: boolean;
      queryChanged: boolean;
    },
  ) => Array<TypeAheadItem> | Promise<Array<TypeAheadItem>>;
  selectItem: (
    state: EditorState,
    item: TypeAheadItem,
    insert: (
      node?: Node | Object | string,
      opts?: { selectInlineNode?: boolean },
    ) => Transaction,
    meta: {
      mode: SelectItemMode;
    },
  ) => Transaction | false;
  dismiss?: (state: EditorState) => void;
};

export type TypeAheadItemsLoader = null | {
  promise: Promise<Array<TypeAheadItem>>;
  cancel(): void;
};
