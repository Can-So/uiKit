import {
  MentionPluginState,
  TextFormattingState,
  EditorActions,
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
  createTable,
  insertTaskDecision,
  changeColor,
  TypeAheadItem,
  selectItem as selectTypeAheadItem,
} from '@atlaskit/editor-core';
import { EditorView } from 'prosemirror-view';
import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { Color as StatusColor } from '@atlaskit/status';

import NativeToWebBridge from './bridge';
import WebBridge from '../../web-bridge';
import { rejectPromise, resolvePromise } from '../../cross-platform-promise';
import { setBlockType } from '../../../../editor-core/src/plugins/block-type/commands';

export default class WebBridgeImpl extends WebBridge
  implements NativeToWebBridge {
  textFormatBridgeState: TextFormattingState | null = null;
  statusBridgeState: StatusState | null = null;
  blockFormatBridgeState: BlockTypeState | null = null;
  listBridgeState: ListsState | null = null;
  mentionsPluginState: MentionPluginState | null = null;
  editorView: EditorView | null = null;
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

  onMentionSelect(mention: string) {}

  onMentionPickerResult(result: string) {}

  onMentionPickerDismissed() {}

  setContent(content: string) {
    if (this.editorActions) {
      this.editorActions.replaceDocument(content, false);
    }
  }

  getContent(): string {
    return this.editorView
      ? JSON.stringify(this.transformer.encode(this.editorView.state.doc))
      : '';
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
          const uploadPromise = new Promise(resolve => {
            this.mediaMap.set(payload.file.id, resolve);
          });
          payload.file.upfrontId = uploadPromise;
          payload.preview = {
            dimensions: payload.file.dimensions,
          };
          this.mediaPicker.emit(eventName, payload);

          return;
        }
        case 'upload-end': {
          if (typeof payload.file.collectionName === 'string') {
            /**
             * We call this custom event instead of `upload-end` to set the collection
             * As when emitting `upload-end`, the `ready` handler will usually fire before
             * the `publicId` is resolved which causes a noop, resulting in bad ADF.
             */
            this.mediaPicker.emit('collection', payload);
          }
          const getUploadPromise = this.mediaMap.get(payload.file.id);
          if (getUploadPromise) {
            getUploadPromise!(payload.file.publicId);
          }
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

  insertBlockType(type) {
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

  setFocus() {
    if (!this.editorView || this.editorView.hasFocus()) {
      return false;
    }

    this.editorView.focus();
    return true;
  }

  getRootElement(): HTMLElement | null {
    return document.querySelector('#editor');
  }
}
