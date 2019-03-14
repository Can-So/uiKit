import { ReactElement, ReactNode } from 'react';
import { InjectedIntl } from 'react-intl';
import { EditorState, Transaction } from 'prosemirror-state';
import { Node } from 'prosemirror-model';
import { SelectItemMode } from './commands/select-item';
import { Dispatch } from '../../event-dispatcher';

export type TypeAheadItemRenderProps = {
  onClick: () => void;
  onMouseMove: () => void;
  isSelected: boolean;
};

export type TypeAheadItem = {
  title: string;
  icon?: () => ReactElement<any>;
  render?: (props: TypeAheadItemRenderProps) => ReactNode;
  [key: string]: any;
};

export type TypeAheadInsert = (
  node?: Node | Object | string,
  opts?: { selectInlineNode?: boolean },
) => Transaction;

export type TypeAheadSelectItem = (
  state: EditorState,
  item: TypeAheadItem,
  insert: TypeAheadInsert,
  meta: {
    mode: SelectItemMode;
  },
) => Transaction | false;

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
    tr: Transaction,
    dipatch: Dispatch,
  ) => Array<TypeAheadItem> | Promise<Array<TypeAheadItem>>;
  selectItem: TypeAheadSelectItem;
  dismiss?: (state: EditorState) => void;
};

export type TypeAheadItemsLoader = null | {
  promise: Promise<Array<TypeAheadItem>>;
  cancel(): void;
};
