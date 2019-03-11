import * as assert from 'assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Node as PMNode, Schema, Node } from 'prosemirror-model';
import { insertPoint } from 'prosemirror-transform';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';
import {
  EditorState,
  NodeSelection,
  Plugin,
  PluginKey,
} from 'prosemirror-state';
import { Context, FileIdentifier } from '@atlaskit/media-core';
import { UploadParams } from '@atlaskit/media-picker';
import { MediaSingleLayout, MediaBaseAttributes } from '@atlaskit/adf-schema';

import { ErrorReporter } from '@atlaskit/editor-common';
import { Dimensions } from '@atlaskit/media-editor';

import analyticsService from '../../../analytics/service';
import { isImage, SetAttrsStep } from '../../../utils';
import { Dispatch } from '../../../event-dispatcher';
import { ProsemirrorGetPosHandler } from '../../../nodeviews';
import { EditorAppearance } from '../../../types/editor-props';
import DropPlaceholder, { PlaceholderType } from '../ui/Media/DropPlaceholder';
import { MediaPluginOptions } from '../media-plugin-options';
import { insertMediaGroupNode } from '../utils/media-files';
import { removeMediaNode, splitMediaGroup } from '../utils/media-common';
import PickerFacade, {
  PickerFacadeConfig,
  MediaStateEventListener,
  MediaStateEventSubscriber,
} from '../picker-facade';
import { MediaState, MediaProvider, MediaStateStatus } from '../types';
import { insertMediaSingleNode } from '../utils/media-single';

import { findDomRefAtPos } from 'prosemirror-utils';
export { MediaState, MediaProvider, MediaStateStatus };

const MEDIA_RESOLVED_STATES = ['ready', 'error', 'cancelled'];

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export class MediaPluginState {
  public allowsUploads: boolean = false;
  public mediaContext: Context;
  public uploadContext?: Context;
  public ignoreLinks: boolean = false;
  public waitForMediaUpload: boolean = true;
  public allUploadsFinished: boolean = true;
  public showDropzone: boolean = false;
  public element?: HTMLElement;
  public layout: MediaSingleLayout = 'center';
  public mediaNodes: MediaNodeWithPosHandler[] = [];
  public mediaGroupNodes: object = {};
  private pendingTask = Promise.resolve<MediaState | null>(null);
  public options: MediaPluginOptions;
  private view: EditorView;
  private destroyed = false;
  public mediaProvider: MediaProvider;
  private errorReporter: ErrorReporter;

  public pickers: PickerFacade[] = [];
  public binaryPicker?: PickerFacade;
  private popupPicker?: PickerFacade;
  // @ts-ignore
  private clipboardPicker?: PickerFacade;
  private dropzonePicker?: PickerFacade;
  // @ts-ignore
  private customPicker?: PickerFacade;

  public editingMediaSinglePos?: number;
  public showEditingDialog?: boolean;

  public editorAppearance: EditorAppearance;
  private removeOnCloseListener: () => void = () => {};

  private reactContext: () => {};

  constructor(
    state: EditorState,
    options: MediaPluginOptions,
    reactContext: () => {},
    editorAppearance?: EditorAppearance,
  ) {
    this.reactContext = reactContext;
    this.options = options;
    this.editorAppearance = editorAppearance!;
    this.waitForMediaUpload =
      options.waitForMediaUpload === undefined
        ? true
        : options.waitForMediaUpload;

    const { nodes } = state.schema;
    assert(
      nodes.media && (nodes.mediaGroup || nodes.mediaSingle),
      'Editor: unable to init media plugin - media or mediaGroup/mediaSingle node absent in schema',
    );

    options.providerFactory.subscribe(
      'mediaProvider',
      (name, provider?: Promise<MediaProvider>) =>
        this.setMediaProvider(provider),
    );

    this.errorReporter = options.errorReporter || new ErrorReporter();
  }

  setMediaProvider = async (mediaProvider?: Promise<MediaProvider>) => {
    if (!mediaProvider) {
      this.destroyPickers();

      this.allowsUploads = false;
      if (!this.destroyed) {
        this.view.dispatch(
          this.view.state.tr.setMeta(stateKey, {
            allowsUploads: this.allowsUploads,
          }),
        );
      }

      return;
    }

    // TODO disable (not destroy!) pickers until mediaProvider is resolved
    try {
      let resolvedMediaProvider: MediaProvider = (this.mediaProvider = await mediaProvider);

      assert(
        resolvedMediaProvider && resolvedMediaProvider.viewContext,
        `MediaProvider promise did not resolve to a valid instance of MediaProvider - ${resolvedMediaProvider}`,
      );
    } catch (err) {
      const wrappedError = new Error(
        `Media functionality disabled due to rejected provider: ${err.message}`,
      );
      this.errorReporter.captureException(wrappedError);

      this.destroyPickers();

      this.allowsUploads = false;
      if (!this.destroyed) {
        this.view.dispatch(
          this.view.state.tr.setMeta(stateKey, {
            allowsUploads: this.allowsUploads,
          }),
        );
      }

      return;
    }

    this.mediaContext = await this.mediaProvider.viewContext;

    this.allowsUploads = !!this.mediaProvider.uploadContext;
    const { view, allowsUploads } = this;

    // make sure editable DOM node is mounted
    if (!this.destroyed && view.dom.parentNode) {
      // make PM plugin aware of the state change to update UI during 'apply' hook
      view.dispatch(view.state.tr.setMeta(stateKey, { allowsUploads }));
    }

    if (this.allowsUploads) {
      this.uploadContext = await this.mediaProvider.uploadContext;

      if (this.mediaProvider.uploadParams && this.uploadContext) {
        await this.initPickers(
          this.mediaProvider.uploadParams,
          this.uploadContext,
          PickerFacade,
          this.reactContext,
        );
      } else {
        this.destroyPickers();
      }
    } else {
      this.destroyPickers();
    }
  };

  getMediaOptions = () => this.options;

  updateElement(): void {
    let newElement;
    const selectedContainer = this.selectedMediaContainerNode();
    const { mediaSingle } = this.view.state.schema.nodes;

    if (selectedContainer && selectedContainer.type === mediaSingle) {
      newElement = this.getDomElement(this.view.domAtPos.bind(this.view));
    }
    if (this.element !== newElement) {
      this.element = newElement;
    }
  }

  private getDomElement(domAtPos: EditorView['domAtPos']) {
    const { selection, schema } = this.view.state;
    if (!(selection instanceof NodeSelection)) {
      return;
    }

    if (selection.node.type !== schema.nodes.mediaSingle) {
      return;
    }

    const node = findDomRefAtPos(selection.from, domAtPos);
    if (node) {
      if (!node.childNodes.length) {
        return node.parentNode as HTMLElement | undefined;
      }

      const target = (node as HTMLElement).querySelector('.wrapper') || node;
      return target;
    }
  }

  /**
   * we insert a new file by inserting a initial state for that file.
   *
   * called when we insert a new file via the picker (connected via pickerfacade)
   */
  insertFile = (
    mediaState: MediaState,
    onMediaStateChanged: MediaStateEventSubscriber,
  ) => {
    const { mediaSingle } = this.view.state.schema.nodes;
    const collection = this.collectionFromProvider();
    if (collection === undefined) {
      return;
    }

    this.allUploadsFinished = false;

    if (mediaSingle && isImage(mediaState.fileMimeType)) {
      insertMediaSingleNode(this.view, mediaState, collection);
    } else {
      insertMediaGroupNode(this.view, [mediaState], collection);
    }

    // do events when media state changes
    onMediaStateChanged(this.handleMediaState);

    // handle waiting for upload complete
    const isEndState = (state: MediaState) =>
      state.status && MEDIA_RESOLVED_STATES.indexOf(state.status) !== -1;

    if (!isEndState(mediaState)) {
      const updater = promise => {
        // Chain the previous promise with a new one for this media item
        return new Promise<MediaState | null>((resolve, reject) => {
          const onStateChange: MediaStateEventListener = newState => {
            // When media item reaches its final state, remove listener and resolve
            if (isEndState(newState)) {
              resolve(newState);
            }
          };

          onMediaStateChanged(onStateChange);
        }).then(() => promise);
      };
      this.pendingTask = updater(this.pendingTask);

      this.pendingTask.then(() => {
        this.allUploadsFinished = true;
      });
    }

    // refocus the view
    const { view } = this;
    if (!view.hasFocus()) {
      view.focus();
    }
  };

  splitMediaGroup = (): boolean => splitMediaGroup(this.view);

  insertFileFromDataUrl = (url: string, fileName: string) => {
    const { binaryPicker } = this;
    assert(
      binaryPicker,
      'Unable to insert file because media pickers have not been initialized yet',
    );

    binaryPicker!.upload(url, fileName);
  };

  // TODO [MSW-454]: remove this logic from Editor
  onPopupPickerClose = () => {
    if (
      this.dropzonePicker &&
      this.popupPicker &&
      this.popupPicker.type === 'popup'
    ) {
      this.dropzonePicker.activate();
    }
  };

  showMediaPicker = () => {
    if (!this.popupPicker) {
      return;
    }
    if (this.dropzonePicker && this.popupPicker.type === 'popup') {
      this.dropzonePicker.deactivate();
    }
    this.popupPicker.show();
  };

  /**
   * Returns a promise that is resolved after all pending operations have been finished.
   * An optional timeout will cause the promise to reject if the operation takes too long
   *
   * NOTE: The promise will resolve even if some of the media have failed to process.
   */
  waitForPendingTasks = (
    timeout?: number,
    lastTask?: Promise<MediaState | null>,
  ) => {
    if (lastTask && this.pendingTask === lastTask) {
      return lastTask;
    }

    const chainedPromise = this.pendingTask.then(() =>
      // Call ourselves to make sure that no new pending tasks have been
      // added before the current promise has resolved.
      this.waitForPendingTasks(undefined, this.pendingTask!),
    );

    if (!timeout) {
      return chainedPromise;
    }

    let rejectTimeout: number;
    const timeoutPromise = new Promise((resolve, reject) => {
      rejectTimeout = window.setTimeout(
        () =>
          reject(new Error(`Media operations did not finish in ${timeout} ms`)),
        timeout,
      );
    });

    return Promise.race([
      timeoutPromise,
      chainedPromise.then(() => {
        clearTimeout(rejectTimeout);
      }),
    ]);
  };

  setView(view: EditorView) {
    this.view = view;
  }

  /**
   * Called from React UI Component when user clicks on "Delete" icon
   * inside of it
   */
  handleMediaNodeRemoval = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    let getNode = node;
    if (!getNode) {
      getNode = this.view.state.doc.nodeAt(getPos()) as PMNode;
    }
    removeMediaNode(this.view, getNode, getPos);
  };

  /**
   * Called from React UI Component on componentDidMount
   */
  handleMediaNodeMount = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    this.mediaNodes.unshift({ node, getPos });
  };

  /**
   * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
   * when React component's underlying node property is replaced with a new node
   */
  handleMediaNodeUnmount = (oldNode: PMNode) => {
    this.mediaNodes = this.mediaNodes.filter(({ node }) => oldNode !== node);
  };

  openMediaEditor = () => {
    const { state } = this.view;
    const { mediaSingle } = state.schema.nodes;

    if (
      !(state.selection instanceof NodeSelection) ||
      state.selection.node.type !== mediaSingle
    ) {
      return;
    }

    this.editingMediaSinglePos = state.selection.from;
    this.showEditingDialog = true;

    this.view.dispatch(this.view.state.tr.setMeta(stateKey, 'edit'));
  };

  closeMediaEditor = () => {
    this.showEditingDialog = false;
    this.view.dispatch(this.view.state.tr.setMeta(stateKey, 'close-edit'));
  };

  replaceEditingMedia = (
    fileIdentifier: FileIdentifier,
    dimensions: Dimensions,
  ) => {
    if (typeof this.editingMediaSinglePos !== 'number') {
      return;
    }

    const { state, dispatch } = this.view;
    const { doc, schema } = state;

    const mediaPos = this.editingMediaSinglePos + 1;
    const oldMediaNode = doc.nodeAt(mediaPos);
    if (!oldMediaNode) {
      return;
    }

    const newMediaNodeAttrs: MediaBaseAttributes = {
      ...oldMediaNode.attrs,

      id: fileIdentifier.id as string,
      collection:
        fileIdentifier.collectionName || oldMediaNode.attrs.collection,
      occurrenceKey: fileIdentifier.occurrenceKey,

      width: dimensions.width,
      height: dimensions.height,
    };

    const tr = state.tr.replaceWith(
      mediaPos,
      mediaPos + oldMediaNode.nodeSize,
      schema.nodes.media!.createChecked(newMediaNodeAttrs),
    );

    this.editingMediaSinglePos = undefined;
    dispatch(tr.setMeta('addToHistory', false));
  };

  align = (layout: MediaSingleLayout, gridSize: number = 12): boolean => {
    const { mediaSingle } = this.view.state.schema.nodes;

    const mediaSingleNode = this.selectedMediaContainerNode();
    if (!mediaSingleNode || mediaSingleNode.type !== mediaSingle) {
      return false;
    }

    const {
      selection: { from },
      tr,
      schema,
    } = this.view.state;

    let width = mediaSingleNode.attrs.width;
    const oldLayout: MediaSingleLayout = mediaSingleNode.attrs.layout;
    const wrappedLayouts: MediaSingleLayout[] = ['wrap-left', 'wrap-right'];

    if (width) {
      const cols = Math.round((width / 100) * gridSize);
      let targetCols = cols;

      const nonWrappedLayouts: MediaSingleLayout[] = [
        'center',
        'wide',
        'full-width',
      ];

      if (
        wrappedLayouts.indexOf(oldLayout) > -1 &&
        nonWrappedLayouts.indexOf(layout) > -1
      ) {
        // wrap -> center needs to align to even grid
        targetCols = Math.floor(targetCols / 2) * 2;
      } else if (
        nonWrappedLayouts.indexOf(oldLayout) > -1 &&
        wrappedLayouts.indexOf(layout) > -1
      ) {
        // cannot resize to full column width, and cannot resize to 1 column

        if (cols <= 1) {
          targetCols = 2;
        } else if (cols >= gridSize) {
          targetCols = 10;
        }
      }

      if (targetCols !== cols) {
        width = (targetCols / gridSize) * 100;
      }
    }

    this.view.dispatch(
      tr.setNodeMarkup(from, schema.nodes.mediaSingle, {
        ...mediaSingleNode.attrs,
        layout,
        width,
      }),
    );
    return true;
  };

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const { mediaNodes } = this;
    mediaNodes.splice(0, mediaNodes.length);

    this.removeOnCloseListener();
    this.destroyPickers();
  }

  findMediaNode = (id: string): MediaNodeWithPosHandler | null => {
    const { mediaNodes } = this;

    // Array#find... no IE support
    return mediaNodes.reduce(
      (
        memo: MediaNodeWithPosHandler | null,
        nodeWithPos: MediaNodeWithPosHandler,
      ) => {
        if (memo) {
          return memo;
        }

        const { node } = nodeWithPos;
        if (node.attrs.id === id) {
          return nodeWithPos;
        }

        return memo;
      },
      null,
    );
  };

  private destroyPickers = () => {
    const { pickers } = this;

    pickers.forEach(picker => picker.destroy());
    pickers.splice(0, pickers.length);

    this.popupPicker = undefined;
    this.binaryPicker = undefined;
    this.clipboardPicker = undefined;
    this.dropzonePicker = undefined;
    this.customPicker = undefined;
  };

  private async initPickers(
    uploadParams: UploadParams,
    context: Context,
    Picker: typeof PickerFacade,
    reactContext: () => {},
  ) {
    if (this.destroyed) {
      return;
    }
    const { errorReporter, pickers } = this;
    // create pickers if they don't exist, re-use otherwise
    if (!pickers.length) {
      const pickerFacadeConfig: PickerFacadeConfig = {
        context,
        errorReporter,
      };
      const defaultPickerConfig = {
        uploadParams,
        proxyReactContext: reactContext(),
      };

      if (this.options.customMediaPicker) {
        pickers.push(
          (this.customPicker = await new Picker(
            'customMediaPicker',
            pickerFacadeConfig,
            this.options.customMediaPicker,
          ).init()),
        );
      } else {
        pickers.push(
          (this.popupPicker = await new Picker(
            // Fallback to browser picker for unauthenticated users
            context.config.userAuthProvider ? 'popup' : 'browser',
            pickerFacadeConfig,
            defaultPickerConfig,
          ).init()),
        );

        pickers.push(
          (this.binaryPicker = await new Picker(
            'binary',
            pickerFacadeConfig,
            defaultPickerConfig,
          ).init()),
        );

        pickers.push(
          (this.clipboardPicker = await new Picker(
            'clipboard',
            pickerFacadeConfig,
            defaultPickerConfig,
          ).init()),
        );

        pickers.push(
          (this.dropzonePicker = await new Picker(
            'dropzone',
            pickerFacadeConfig,
            {
              container: this.options.customDropzoneContainer,
              headless: true,
              ...defaultPickerConfig,
            },
          ).init()),
        );

        this.dropzonePicker.onDrag(this.handleDrag);
        this.removeOnCloseListener = this.popupPicker.onClose(
          this.onPopupPickerClose,
        );
      }

      pickers.forEach(picker => {
        picker.onNewMedia(this.insertFile);
        picker.onNewMedia(this.trackNewMediaEvent(picker.type));
      });
    }

    // set new upload params for the pickers
    pickers.forEach(picker => picker.setUploadParams(uploadParams));
  }

  private trackNewMediaEvent(pickerType) {
    return (mediaState: MediaState) => {
      analyticsService.trackEvent(
        `atlassian.editor.media.file.${pickerType}`,
        mediaState.fileMimeType
          ? { fileMimeType: mediaState.fileMimeType }
          : {},
      );
    };
  }

  updateMediaNodeAttrs = (
    id: string,
    attrs: object,
    isMediaSingle: boolean,
  ) => {
    const { view } = this;
    if (!view) {
      return;
    }

    const mediaNodeWithPos = isMediaSingle
      ? this.findMediaNode(id)
      : this.mediaGroupNodes[id];

    if (!mediaNodeWithPos) {
      return;
    }

    view.dispatch(
      view.state.tr
        .step(new SetAttrsStep(mediaNodeWithPos.getPos(), attrs))
        .setMeta('addToHistory', false),
    );
  };

  private collectionFromProvider(): string | undefined {
    return (
      this.mediaProvider &&
      this.mediaProvider.uploadParams &&
      this.mediaProvider.uploadParams.collection
    );
  }

  private handleMediaState: MediaStateEventListener = state => {
    switch (state.status) {
      case 'error':
        const { uploadErrorHandler } = this.options;
        if (uploadErrorHandler) {
          uploadErrorHandler(state);
        }
        break;

      case 'mobile-upload-end':
        const isMediaSingle =
          isImage(state.fileMimeType) &&
          !!this.view.state.schema.nodes.mediaSingle;

        let attrs: { id?: string; collection?: string } = {
          id: state.publicId || state.id,
        };

        if (typeof state.collection === 'string') {
          attrs.collection = state.collection;
        }

        this.updateMediaNodeAttrs(state.id, attrs, isMediaSingle);
        delete this.mediaGroupNodes[state.id];
        break;
    }
  };

  removeNodeById = (state: MediaState) => {
    const { id } = state;
    const mediaNodeWithPos = isImage(state.fileMimeType)
      ? this.findMediaNode(id)
      : this.mediaGroupNodes[id];
    if (mediaNodeWithPos) {
      removeMediaNode(
        this.view,
        mediaNodeWithPos.node,
        mediaNodeWithPos.getPos,
      );
    }
  };

  removeSelectedMediaContainer = (): boolean => {
    const { view } = this;

    const selectedNode = this.selectedMediaContainerNode();
    if (!selectedNode) {
      return false;
    }

    let { from } = view.state.selection;
    removeMediaNode(view, selectedNode.firstChild!, () => from + 1);
    return true;
  };

  selectedMediaContainerNode = (): Node | undefined => {
    const { selection, schema } = this.view.state;
    if (
      selection instanceof NodeSelection &&
      (selection.node.type === schema.nodes.mediaSingle ||
        selection.node.type === schema.nodes.mediaGroup)
    ) {
      return selection.node;
    }
  };

  private handleDrag = (dragState: 'enter' | 'leave') => {
    const isActive = dragState === 'enter';
    if (this.showDropzone === isActive) {
      return;
    }
    this.showDropzone = isActive;

    const { dispatch, state } = this.view;
    // Trigger state change to be able to pick it up in the decorations handler
    dispatch(state.tr);
  };
}

const createDropPlaceholder = (editorAppearance?: EditorAppearance) => {
  const dropPlaceholder = document.createElement('div');
  if (editorAppearance === 'full-page') {
    ReactDOM.render(
      React.createElement(DropPlaceholder, { type: 'single' } as {
        type: PlaceholderType;
      }),
      dropPlaceholder,
    );
  } else {
    ReactDOM.render(React.createElement(DropPlaceholder), dropPlaceholder);
  }
  return dropPlaceholder;
};

export const stateKey = new PluginKey('mediaPlugin');
export const getMediaPluginState = (state: EditorState) =>
  stateKey.getState(state) as MediaPluginState;

export const createPlugin = (
  schema: Schema,
  options: MediaPluginOptions,
  reactContext: () => {},
  dispatch?: Dispatch,
  editorAppearance?: EditorAppearance,
) => {
  const dropPlaceholder = createDropPlaceholder(editorAppearance);

  return new Plugin({
    state: {
      init(config, state) {
        return new MediaPluginState(
          state,
          options,
          reactContext,
          editorAppearance,
        );
      },
      apply(tr, pluginState: MediaPluginState, oldState, newState) {
        // remap editing media single position if we're in collab
        if (typeof pluginState.editingMediaSinglePos === 'number') {
          pluginState.editingMediaSinglePos = tr.mapping.map(
            pluginState.editingMediaSinglePos,
          );
        }

        const meta = tr.getMeta(stateKey);
        if (meta && dispatch) {
          const { showMediaPicker } = pluginState;
          const { allowsUploads } = meta;

          dispatch(stateKey, {
            ...pluginState,
            allowsUploads:
              typeof allowsUploads === 'undefined'
                ? pluginState.allowsUploads
                : allowsUploads,
            showMediaPicker,
          });
        }

        // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
        //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
        //       transformations from within the plugin state (i.e. when adding a new file).
        return pluginState;
      },
    },
    key: stateKey,
    view: view => {
      const pluginState = getMediaPluginState(view.state);
      pluginState.setView(view);
      pluginState.updateElement();

      return {
        update: () => {
          pluginState.updateElement();
        },
      };
    },
    props: {
      decorations: state => {
        const pluginState = getMediaPluginState(state);
        if (!pluginState.showDropzone) {
          return;
        }

        const {
          schema,
          selection: { $anchor },
        } = state;

        // When a media is already selected
        if (state.selection instanceof NodeSelection) {
          const node = state.selection.node;

          if (node.type === schema.nodes.mediaSingle) {
            const deco = Decoration.node(
              state.selection.from,
              state.selection.to,
              {
                class: 'mediaSingle-selected',
              },
            );

            return DecorationSet.create(state.doc, [deco]);
          }

          return;
        }

        let pos: number | null | void = $anchor.pos;
        if (
          $anchor.parent.type !== schema.nodes.paragraph &&
          $anchor.parent.type !== schema.nodes.codeBlock
        ) {
          pos = insertPoint(state.doc, pos, schema.nodes.mediaGroup);
        }

        if (pos === null || pos === undefined) {
          return;
        }

        const dropPlaceholders: Decoration[] = [
          Decoration.widget(pos, dropPlaceholder, { key: 'drop-placeholder' }),
        ];
        return DecorationSet.create(state.doc, dropPlaceholders);
      },
      nodeViews: options.nodeViews,
      handleTextInput(view: EditorView): boolean {
        getMediaPluginState(view.state).splitMediaGroup();
        return false;
      },
    },
  });
};
