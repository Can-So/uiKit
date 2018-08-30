import { Node } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Transformer } from '@atlaskit/editor-common';
import {
  getEditorValueWithMedia,
  insertFileFromDataUrl as insertFileFromUrl,
  preprocessDoc,
  toJSON,
  processRawValue,
} from '../utils';
import { EventDispatcher } from '../event-dispatcher';
import { safeInsert } from 'prosemirror-utils';

export type ContextUpdateHandler = (
  editorView: EditorView,
  eventDispatcher: EventDispatcher,
) => void;

export interface EditorActionsOptions {
  focus(): boolean;
  blur(): boolean;
  clear(): boolean;
  getValue(): Promise<any | undefined>;
  replaceDocument(rawValue: any): boolean;
  replaceSelection(rawValue: Node | Object | string): boolean;
  appendText(text: string): boolean;
  insertFileFromDataUrl(url: string, filename: string): boolean;
}

export default class EditorActions implements EditorActionsOptions {
  private editorView?: EditorView;
  private contentTransformer?: Transformer<any>;
  private eventDispatcher?: EventDispatcher;
  private listeners: Array<ContextUpdateHandler> = [];

  static from(
    view: EditorView,
    eventDispatcher: EventDispatcher,
    transformer?: Transformer<any>,
  ) {
    const editorActions = new EditorActions();
    editorActions._privateRegisterEditor(view, eventDispatcher, transformer);
    return editorActions;
  }

  // This method needs to be public for context based helper components.
  _privateGetEditorView(): EditorView | undefined {
    return this.editorView;
  }

  _privateGetEventDispathcer(): EventDispatcher | undefined {
    return this.eventDispatcher;
  }

  // This method needs to be public for EditorContext component.
  _privateRegisterEditor(
    editorView: EditorView,
    eventDispatcher: EventDispatcher,
    contentTransformer?: Transformer<any>,
  ): void {
    this.contentTransformer = contentTransformer;
    this.eventDispatcher = eventDispatcher;

    if (!this.editorView && editorView) {
      this.editorView = editorView;
      this.listeners.forEach(cb => cb(editorView, eventDispatcher));
    } else if (this.editorView !== editorView) {
      throw new Error(
        "Editor has already been registered! It's not allowed to re-register editor with the new Editor instance.",
      );
    }
  }

  // This method needs to be public for EditorContext component.
  _privateUnregisterEditor(): void {
    this.editorView = undefined;
    this.contentTransformer = undefined;
    this.eventDispatcher = undefined;
  }

  _privateSubscribe(cb: ContextUpdateHandler): void {
    // If editor is registered and somebody is trying to add a listener,
    // just call it first.
    if (this.editorView && this.eventDispatcher) {
      cb(this.editorView, this.eventDispatcher);
    }

    this.listeners.push(cb);
  }

  _privateUnsubscribe(cb: ContextUpdateHandler): void {
    this.listeners = this.listeners.filter(c => c !== cb);
  }

  focus(): boolean {
    if (!this.editorView || this.editorView.hasFocus()) {
      return false;
    }

    this.editorView.focus();
    this.editorView.dispatch(this.editorView.state.tr.scrollIntoView());
    return true;
  }

  blur(): boolean {
    if (!this.editorView || !this.editorView.hasFocus()) {
      return false;
    }

    (this.editorView.dom as HTMLElement).blur();
    return true;
  }

  clear(): boolean {
    if (!this.editorView) {
      return false;
    }

    const editorView = this.editorView;
    const { state } = editorView;
    const tr = editorView.state.tr
      .setSelection(TextSelection.create(state.doc, 0, state.doc.nodeSize - 2))
      .deleteSelection();

    editorView.dispatch(tr);

    return true;
  }

  getValue(): Promise<any | undefined> {
    return getEditorValueWithMedia(this.editorView).then(doc => {
      const processedDoc = preprocessDoc(this.editorView!.state.schema, doc);
      if (this.contentTransformer && processedDoc) {
        return this.contentTransformer.encode(processedDoc);
      }
      return processedDoc ? toJSON(processedDoc) : processedDoc;
    });
  }

  replaceDocument(rawValue: any): boolean {
    if (!this.editorView || rawValue === undefined || rawValue === null) {
      return false;
    }

    const { state } = this.editorView;
    const { schema } = state;

    const transformedDoc = this.contentTransformer
      ? this.contentTransformer.parse(rawValue).toJSON()
      : rawValue;

    const content = processRawValue(schema, transformedDoc);

    if (!content) {
      return false;
    }

    const tr = state.tr
      // In case of replacing a whole document, we only need a content of a top level node e.g. document.
      .replaceWith(0, state.doc.nodeSize - 2, content.content)
      .scrollIntoView();

    this.editorView.dispatch(tr);

    return true;
  }

  replaceSelection(rawValue: Node | Object | string): boolean {
    if (!this.editorView) {
      return false;
    }

    const { state } = this.editorView;

    if (!rawValue) {
      const tr = state.tr.deleteSelection().scrollIntoView();
      this.editorView.dispatch(tr);
      return true;
    }

    const { schema } = state;
    const content = processRawValue(schema, rawValue);

    if (!content) {
      return false;
    }

    // try to find a place in the document where to insert a node if its not allowed at the cursor position by schema
    this.editorView.dispatch(safeInsert(content)(state.tr).scrollIntoView());

    return true;
  }

  appendText(text: string): boolean {
    if (!this.editorView || !text) {
      return false;
    }

    const { state } = this.editorView;
    const lastChild = state.doc.lastChild;

    if (lastChild && lastChild.type !== state.schema.nodes.paragraph) {
      return false;
    }

    const tr = state.tr.insertText(text).scrollIntoView();
    this.editorView.dispatch(tr);

    return true;
  }

  insertFileFromDataUrl(url: string, filename: string): boolean {
    if (!this.editorView) {
      return false;
    }
    insertFileFromUrl(this.editorView.state, url, filename);
    return true;
  }
}
