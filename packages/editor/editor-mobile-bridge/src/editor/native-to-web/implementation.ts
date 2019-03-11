import {
  MentionPluginState,
  TextFormattingState,
  EditorActions,
  Command,
  CustomMediaPicker,
  BlockTypeState,
  ListsState,
  indentList,
  outdentList,
  toggleOrderedList,
  toggleBulletList,
  toggleSuperscript,
  toggleSubscript,
  toggleStrike,
  toggleCode,
  toggleUnderline,
  toggleEm,
  toggleStrong,
  StatusState,
  updateStatus,
  commitStatusPicker,
  insertBlockType,
  setBlockType,
  createTable,
  insertTaskDecision,
  changeColor,
  TypeAheadItem,
  selectItem as selectTypeAheadItem,
  insertLink,
  isTextAtPos,
  isLinkAtPos,
  setLinkHref,
  setLinkText,
} from '@atlaskit/editor-core';
import { EditorView } from 'prosemirror-view';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { Color as StatusColor } from '@atlaskit/status';

import NativeToWebBridge from './bridge';
import WebBridge from '../../web-bridge';
import { ProseMirrorDOMChange } from '../../types';
import { hasValue } from '../../utils';
import { rejectPromise, resolvePromise } from '../../cross-platform-promise';

export default class WebBridgeImpl extends WebBridge
  implements NativeToWebBridge {
  textFormatBridgeState: TextFormattingState | null = null;
  statusBridgeState: StatusState | null = null;
  blockFormatBridgeState: BlockTypeState | null = null;
  listBridgeState: ListsState | null = null;
  mentionsPluginState: MentionPluginState | null = null;
  editorView: EditorView & ProseMirrorDOMChange | null = null;
  transformer: JSONTransformer = new JSONTransformer();
  editorActions: EditorActions = new EditorActions();
  mediaPicker: CustomMediaPicker | undefined;
  mediaMap: Map<string, Function> = new Map();

  onBoldClicked() {
    if (this.textFormatBridgeState && this.editorView) {
      toggleStrong()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onItalicClicked() {
    if (this.textFormatBridgeState && this.editorView) {
      toggleEm()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onUnderlineClicked() {
    if (this.textFormatBridgeState && this.editorView) {
      toggleUnderline()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onCodeClicked() {
    if (this.textFormatBridgeState && this.editorView) {
      toggleCode()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onStrikeClicked() {
    if (this.textFormatBridgeState && this.editorView) {
      toggleStrike()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onSuperClicked() {
    if (this.textFormatBridgeState && this.editorView) {
      toggleSuperscript()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onSubClicked() {
    if (this.textFormatBridgeState && this.editorView) {
      toggleSubscript()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onMentionSelect(mention: string) {}

  onMentionPickerResult(result: string) {}

  onMentionPickerDismissed() {}

  onStatusUpdate(text: string, color: StatusColor, uuid: string) {
    if (this.statusBridgeState && this.editorView) {
      updateStatus({
        text,
        color,
        localId: uuid,
      })(this.editorView);
    }
  }

  onStatusPickerDismissed() {
    if (this.statusBridgeState && this.editorView) {
      commitStatusPicker()(this.editorView);
    }
  }

  setContent(content: string) {
    if (this.editorActions) {
      this.editorActions.replaceDocument(content, false);
    }
  }

  getContent(): string {
    if (!this.editorView) {
      return '';
    }

    // Flush DOM to apply current in flight composition.
    this.flushDOM();

    return JSON.stringify(this.transformer.encode(this.editorView.state.doc));
  }

  setTextFormattingStateAndSubscribe(state: TextFormattingState) {
    this.textFormatBridgeState = state;
  }

  setTextColor(color: string) {
    if (this.editorView) {
      changeColor(color)(this.editorView.state, this.editorView.dispatch);
    }
  }

  onMediaPicked(eventName: string, mediaPayload: string) {
    if (this.mediaPicker) {
      const payload = JSON.parse(mediaPayload);

      switch (eventName) {
        case 'upload-preview-update': {
          payload.preview = {
            dimensions: payload.file.dimensions,
          };
          this.mediaPicker.emit('upload-preview-update', payload);
          return;
        }
        case 'upload-end': {
          /** emit a mobile-only event */
          this.mediaPicker.emit('mobile-upload-end', payload);
          return;
        }
      }
    }
  }

  onPromiseResolved(uuid: string, payload: string) {
    resolvePromise(uuid, JSON.parse(payload));
  }

  onPromiseRejected(uuid: string) {
    rejectPromise(uuid);
  }

  onBlockSelected(blockType: string) {
    if (this.editorView) {
      const { state, dispatch } = this.editorView;
      setBlockType(blockType)(state, dispatch);
    }
  }

  onOrderedListSelected() {
    if (this.listBridgeState && this.editorView) {
      toggleOrderedList(this.editorView);
    }
  }
  onBulletListSelected() {
    if (this.listBridgeState && this.editorView) {
      toggleBulletList(this.editorView);
    }
  }

  onIndentList() {
    if (this.listBridgeState && this.editorView) {
      indentList()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onOutdentList() {
    if (this.listBridgeState && this.editorView) {
      outdentList()(this.editorView.state, this.editorView.dispatch);
    }
  }

  onLinkUpdate(text: string, url: string) {
    if (!this.editorView) {
      return;
    }

    const { state, dispatch } = this.editorView;
    const { from, to } = state.selection;

    if (!isTextAtPos(from)(state)) {
      insertLink(from, to, url, text)(state, dispatch);
      return;
    }

    // if cursor is on link => modify the whole link
    const { leftBound, rightBound } = isLinkAtPos(from)(state)
      ? {
          leftBound: from - state.doc.resolve(from).textOffset,
          rightBound: undefined,
        }
      : { leftBound: from, rightBound: to };

    [setLinkHref(url, leftBound, rightBound)]
      .reduce(
        (cmds, setLinkHrefCmd) =>
          // if adding link => set link then set link text
          // if removing link => execute the same reversed
          hasValue(url)
            ? [
                setLinkHrefCmd,
                setLinkText(text, leftBound, rightBound),
                ...cmds,
              ]
            : [
                setLinkText(text, leftBound, rightBound),
                setLinkHrefCmd,
                ...cmds,
              ],
        [] as Command[],
      )
      .forEach(cmd => cmd(this.editorView!.state, dispatch));
  }

  insertBlockType(type: string) {
    if (!this.editorView) {
      return;
    }

    const { state, dispatch } = this.editorView;

    switch (type) {
      case 'blockquote':
        insertBlockType('blockquote')(state, dispatch);
        return;
      case 'codeblock':
        insertBlockType('codeblock')(state, dispatch);
        return;
      case 'panel':
        insertBlockType('panel')(state, dispatch);
        return;
      case 'action':
        insertTaskDecision(this.editorView, 'taskList');
        return;
      case 'decision':
        insertTaskDecision(this.editorView, 'decisionList');
        return;
      case 'table':
        createTable(state, dispatch);
        return;

      default:
        // tslint:disable-next-line:no-console
        console.error(`${type} cannot be inserted as it's not supported`);
        return;
    }
  }

  insertTypeAheadItem(type: 'mention' | 'emoji', payload: string) {
    if (!this.editorView) {
      return;
    }

    this.flushDOM();

    const { state, dispatch } = this.editorView;
    const item: TypeAheadItem = JSON.parse(payload);

    selectTypeAheadItem(
      {
        selectItem: (state, item, insert) => {
          if (type === 'mention') {
            const { id, name, nickname, accessLevel, userType } = item;
            const renderName = nickname ? nickname : name;
            const mention = state.schema.nodes.mention.createChecked({
              text: `@${renderName}`,
              id,
              accessLevel,
              userType: userType === 'DEFAULT' ? null : userType,
            });
            return insert(mention);
          }

          return false;
        },
        // Needed for interface.
        trigger: '',
        getItems: () => [],
      },
      item,
    )(state, dispatch);
  }

  setFocus(force: boolean) {
    if (!this.editorView) {
      return false;
    }
    if (this.editorView.hasFocus() && force) {
      /**
       * Forcefully remove focus (we re-focus below), as in some scenarios native views make webview cursors invisble.
       */
      (this.editorView.dom as HTMLElement).blur();
    }

    this.editorView.focus();
    return true;
  }

  flushDOM() {
    if (!this.editorView) {
      return false;
    }

    /**
     * NOTE: `inDOMChange` is a private API, it's used as a workaround to forcefully apply current composition
     * when integrators request the content. It doesn't break the users current composing so they may continue
     * to compose the current item.
     * @see ED-5924
     */
    const domChange = this.editorView.inDOMChange;
    if (domChange && domChange.composing) {
      domChange.finish(true);
      return true;
    }

    return false;
  }

  getRootElement(): HTMLElement | null {
    return document.querySelector('#editor');
  }
}
