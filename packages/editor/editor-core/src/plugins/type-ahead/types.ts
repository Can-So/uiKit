import { EditorState } from 'prosemirror-state';
import { Node } from 'prosemirror-model';

export type TypeAheadItem = {
  title: string;
  icon?: () => React.ReactElement<any>;
  [key: string]: any;
};

export type TypeAheadHandler = {
  trigger: string;
  getItems: (
    query: string,
    editorState: EditorState,
  ) => Array<TypeAheadItem> | Promise<Array<TypeAheadItem>>;
  selectItem: (
    state: EditorState,
    item: TypeAheadItem,
    insert: (node: Node | Object | string) => boolean,
  ) => boolean;
};

export type TypeAheadItemsLoader = null | {
  promise: Promise<Array<TypeAheadItem>>;
  cancel(): void;
};
