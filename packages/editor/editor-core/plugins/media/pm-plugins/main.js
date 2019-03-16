import * as tslib_1 from "tslib";
import * as assert from 'assert';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { insertPoint } from 'prosemirror-transform';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { NodeSelection, Plugin, PluginKey, } from 'prosemirror-state';
import { ErrorReporter } from '@atlaskit/editor-common';
import analyticsService from '../../../analytics/service';
import { isImage, SetAttrsStep } from '../../../utils';
import DropPlaceholder from '../ui/Media/DropPlaceholder';
import { insertMediaGroupNode } from '../utils/media-files';
import { removeMediaNode, splitMediaGroup } from '../utils/media-common';
import PickerFacade from '../picker-facade';
import { insertMediaSingleNode } from '../utils/media-single';
import { findDomRefAtPos } from 'prosemirror-utils';
var MEDIA_RESOLVED_STATES = ['ready', 'error', 'cancelled'];
var MediaPluginState = /** @class */ (function () {
    function MediaPluginState(state, options, reactContext, editorAppearance) {
        var _this = this;
        this.allowsUploads = false;
        this.ignoreLinks = false;
        this.waitForMediaUpload = true;
        this.allUploadsFinished = true;
        this.showDropzone = false;
        this.layout = 'center';
        this.mediaNodes = [];
        this.mediaGroupNodes = {};
        this.pendingTask = Promise.resolve(null);
        this.destroyed = false;
        this.pickers = [];
        this.removeOnCloseListener = function () { };
        this.setMediaProvider = function (mediaProvider) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var resolvedMediaProvider, _a, err_1, wrappedError, _b, _c, view, allowsUploads, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!mediaProvider) {
                            this.destroyPickers();
                            this.allowsUploads = false;
                            if (!this.destroyed) {
                                this.view.dispatch(this.view.state.tr.setMeta(stateKey, {
                                    allowsUploads: this.allowsUploads,
                                }));
                            }
                            return [2 /*return*/];
                        }
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, mediaProvider];
                    case 2:
                        resolvedMediaProvider = (_a.mediaProvider = _e.sent());
                        assert(resolvedMediaProvider && resolvedMediaProvider.viewContext, "MediaProvider promise did not resolve to a valid instance of MediaProvider - " + resolvedMediaProvider);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _e.sent();
                        wrappedError = new Error("Media functionality disabled due to rejected provider: " + err_1.message);
                        this.errorReporter.captureException(wrappedError);
                        this.destroyPickers();
                        this.allowsUploads = false;
                        if (!this.destroyed) {
                            this.view.dispatch(this.view.state.tr.setMeta(stateKey, {
                                allowsUploads: this.allowsUploads,
                            }));
                        }
                        return [2 /*return*/];
                    case 4:
                        _b = this;
                        return [4 /*yield*/, this.mediaProvider.viewContext];
                    case 5:
                        _b.mediaContext = _e.sent();
                        this.allowsUploads = !!this.mediaProvider.uploadContext;
                        _c = this, view = _c.view, allowsUploads = _c.allowsUploads;
                        // make sure editable DOM node is mounted
                        if (!this.destroyed && view.dom.parentNode) {
                            // make PM plugin aware of the state change to update UI during 'apply' hook
                            view.dispatch(view.state.tr.setMeta(stateKey, { allowsUploads: allowsUploads }));
                        }
                        if (!this.allowsUploads) return [3 /*break*/, 10];
                        _d = this;
                        return [4 /*yield*/, this.mediaProvider.uploadContext];
                    case 6:
                        _d.uploadContext = _e.sent();
                        if (!(this.mediaProvider.uploadParams && this.uploadContext)) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.initPickers(this.mediaProvider.uploadParams, this.uploadContext, PickerFacade, this.reactContext)];
                    case 7:
                        _e.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        this.destroyPickers();
                        _e.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        this.destroyPickers();
                        _e.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        }); };
        this.getMediaOptions = function () { return _this.options; };
        /**
         * we insert a new file by inserting a initial state for that file.
         *
         * called when we insert a new file via the picker (connected via pickerfacade)
         */
        this.insertFile = function (mediaState, onMediaStateChanged) {
            var mediaSingle = _this.view.state.schema.nodes.mediaSingle;
            var collection = _this.collectionFromProvider();
            if (collection === undefined) {
                return;
            }
            _this.allUploadsFinished = false;
            if (mediaSingle && isImage(mediaState.fileMimeType)) {
                insertMediaSingleNode(_this.view, mediaState, collection);
            }
            else {
                insertMediaGroupNode(_this.view, [mediaState], collection);
            }
            // do events when media state changes
            onMediaStateChanged(_this.handleMediaState);
            // handle waiting for upload complete
            var isEndState = function (state) {
                return state.status && MEDIA_RESOLVED_STATES.indexOf(state.status) !== -1;
            };
            if (!isEndState(mediaState)) {
                var updater = function (promise) {
                    // Chain the previous promise with a new one for this media item
                    return new Promise(function (resolve, reject) {
                        var onStateChange = function (newState) {
                            // When media item reaches its final state, remove listener and resolve
                            if (isEndState(newState)) {
                                resolve(newState);
                            }
                        };
                        onMediaStateChanged(onStateChange);
                    }).then(function () { return promise; });
                };
                _this.pendingTask = updater(_this.pendingTask);
                _this.pendingTask.then(function () {
                    _this.allUploadsFinished = true;
                });
            }
            // refocus the view
            var view = _this.view;
            if (!view.hasFocus()) {
                view.focus();
            }
        };
        this.splitMediaGroup = function () { return splitMediaGroup(_this.view); };
        this.insertFileFromDataUrl = function (url, fileName) {
            var binaryPicker = _this.binaryPicker;
            assert(binaryPicker, 'Unable to insert file because media pickers have not been initialized yet');
            binaryPicker.upload(url, fileName);
        };
        // TODO [MSW-454]: remove this logic from Editor
        this.onPopupPickerClose = function () {
            if (_this.dropzonePicker &&
                _this.popupPicker &&
                _this.popupPicker.type === 'popup') {
                _this.dropzonePicker.activate();
            }
        };
        this.showMediaPicker = function () {
            if (!_this.popupPicker) {
                return;
            }
            if (_this.dropzonePicker && _this.popupPicker.type === 'popup') {
                _this.dropzonePicker.deactivate();
            }
            _this.popupPicker.show();
        };
        /**
         * Returns a promise that is resolved after all pending operations have been finished.
         * An optional timeout will cause the promise to reject if the operation takes too long
         *
         * NOTE: The promise will resolve even if some of the media have failed to process.
         */
        this.waitForPendingTasks = function (timeout, lastTask) {
            if (lastTask && _this.pendingTask === lastTask) {
                return lastTask;
            }
            var chainedPromise = _this.pendingTask.then(function () {
                // Call ourselves to make sure that no new pending tasks have been
                // added before the current promise has resolved.
                return _this.waitForPendingTasks(undefined, _this.pendingTask);
            });
            if (!timeout) {
                return chainedPromise;
            }
            var rejectTimeout;
            var timeoutPromise = new Promise(function (resolve, reject) {
                rejectTimeout = window.setTimeout(function () {
                    return reject(new Error("Media operations did not finish in " + timeout + " ms"));
                }, timeout);
            });
            return Promise.race([
                timeoutPromise,
                chainedPromise.then(function () {
                    clearTimeout(rejectTimeout);
                }),
            ]);
        };
        /**
         * Called from React UI Component when user clicks on "Delete" icon
         * inside of it
         */
        this.handleMediaNodeRemoval = function (node, getPos) {
            var getNode = node;
            if (!getNode) {
                getNode = _this.view.state.doc.nodeAt(getPos());
            }
            removeMediaNode(_this.view, getNode, getPos);
        };
        /**
         * Called from React UI Component on componentDidMount
         */
        this.handleMediaNodeMount = function (node, getPos) {
            _this.mediaNodes.unshift({ node: node, getPos: getPos });
        };
        /**
         * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
         * when React component's underlying node property is replaced with a new node
         */
        this.handleMediaNodeUnmount = function (oldNode) {
            _this.mediaNodes = _this.mediaNodes.filter(function (_a) {
                var node = _a.node;
                return oldNode !== node;
            });
        };
        this.openMediaEditor = function () {
            var state = _this.view.state;
            var mediaSingle = state.schema.nodes.mediaSingle;
            if (!(state.selection instanceof NodeSelection) ||
                state.selection.node.type !== mediaSingle) {
                return;
            }
            _this.editingMediaSinglePos = state.selection.from;
            _this.showEditingDialog = true;
            _this.view.dispatch(_this.view.state.tr.setMeta(stateKey, 'edit'));
        };
        this.closeMediaEditor = function () {
            _this.showEditingDialog = false;
            _this.view.dispatch(_this.view.state.tr.setMeta(stateKey, 'close-edit'));
        };
        this.replaceEditingMedia = function (fileIdentifier, dimensions) {
            if (typeof _this.editingMediaSinglePos !== 'number') {
                return;
            }
            var _a = _this.view, state = _a.state, dispatch = _a.dispatch;
            var doc = state.doc, schema = state.schema;
            var mediaPos = _this.editingMediaSinglePos + 1;
            var oldMediaNode = doc.nodeAt(mediaPos);
            if (!oldMediaNode) {
                return;
            }
            var newMediaNodeAttrs = tslib_1.__assign({}, oldMediaNode.attrs, { id: fileIdentifier.id, collection: fileIdentifier.collectionName || oldMediaNode.attrs.collection, occurrenceKey: fileIdentifier.occurrenceKey, width: dimensions.width, height: dimensions.height });
            var tr = state.tr.replaceWith(mediaPos, mediaPos + oldMediaNode.nodeSize, schema.nodes.media.createChecked(newMediaNodeAttrs));
            _this.editingMediaSinglePos = undefined;
            dispatch(tr.setMeta('addToHistory', false));
        };
        this.align = function (layout, gridSize) {
            if (gridSize === void 0) { gridSize = 12; }
            var mediaSingle = _this.view.state.schema.nodes.mediaSingle;
            var mediaSingleNode = _this.selectedMediaContainerNode();
            if (!mediaSingleNode || mediaSingleNode.type !== mediaSingle) {
                return false;
            }
            var _a = _this.view.state, from = _a.selection.from, tr = _a.tr, schema = _a.schema;
            var width = mediaSingleNode.attrs.width;
            var oldLayout = mediaSingleNode.attrs.layout;
            var wrappedLayouts = ['wrap-left', 'wrap-right'];
            if (width) {
                var cols = Math.round((width / 100) * gridSize);
                var targetCols = cols;
                var nonWrappedLayouts = [
                    'center',
                    'wide',
                    'full-width',
                ];
                if (wrappedLayouts.indexOf(oldLayout) > -1 &&
                    nonWrappedLayouts.indexOf(layout) > -1) {
                    // wrap -> center needs to align to even grid
                    targetCols = Math.floor(targetCols / 2) * 2;
                }
                else if (nonWrappedLayouts.indexOf(oldLayout) > -1 &&
                    wrappedLayouts.indexOf(layout) > -1) {
                    // cannot resize to full column width, and cannot resize to 1 column
                    if (cols <= 1) {
                        targetCols = 2;
                    }
                    else if (cols >= gridSize) {
                        targetCols = 10;
                    }
                }
                if (targetCols !== cols) {
                    width = (targetCols / gridSize) * 100;
                }
            }
            _this.view.dispatch(tr.setNodeMarkup(from, schema.nodes.mediaSingle, tslib_1.__assign({}, mediaSingleNode.attrs, { layout: layout,
                width: width })));
            return true;
        };
        this.findMediaNode = function (id) {
            var mediaNodes = _this.mediaNodes;
            // Array#find... no IE support
            return mediaNodes.reduce(function (memo, nodeWithPos) {
                if (memo) {
                    return memo;
                }
                var node = nodeWithPos.node;
                if (node.attrs.id === id) {
                    return nodeWithPos;
                }
                return memo;
            }, null);
        };
        this.destroyPickers = function () {
            var pickers = _this.pickers;
            pickers.forEach(function (picker) { return picker.destroy(); });
            pickers.splice(0, pickers.length);
            _this.popupPicker = undefined;
            _this.binaryPicker = undefined;
            _this.clipboardPicker = undefined;
            _this.dropzonePicker = undefined;
            _this.customPicker = undefined;
        };
        this.updateMediaNodeAttrs = function (id, attrs, isMediaSingle) {
            var view = _this.view;
            if (!view) {
                return;
            }
            var mediaNodeWithPos = isMediaSingle
                ? _this.findMediaNode(id)
                : _this.mediaGroupNodes[id];
            if (!mediaNodeWithPos) {
                return;
            }
            view.dispatch(view.state.tr
                .step(new SetAttrsStep(mediaNodeWithPos.getPos(), attrs))
                .setMeta('addToHistory', false));
        };
        this.handleMediaState = function (state) {
            switch (state.status) {
                case 'error':
                    var uploadErrorHandler = _this.options.uploadErrorHandler;
                    if (uploadErrorHandler) {
                        uploadErrorHandler(state);
                    }
                    break;
                case 'mobile-upload-end':
                    var isMediaSingle = isImage(state.fileMimeType) &&
                        !!_this.view.state.schema.nodes.mediaSingle;
                    var attrs = {
                        id: state.publicId || state.id,
                    };
                    if (typeof state.collection === 'string') {
                        attrs.collection = state.collection;
                    }
                    _this.updateMediaNodeAttrs(state.id, attrs, isMediaSingle);
                    delete _this.mediaGroupNodes[state.id];
                    break;
            }
        };
        this.removeNodeById = function (state) {
            var id = state.id;
            var mediaNodeWithPos = isImage(state.fileMimeType)
                ? _this.findMediaNode(id)
                : _this.mediaGroupNodes[id];
            if (mediaNodeWithPos) {
                removeMediaNode(_this.view, mediaNodeWithPos.node, mediaNodeWithPos.getPos);
            }
        };
        this.removeSelectedMediaContainer = function () {
            var view = _this.view;
            var selectedNode = _this.selectedMediaContainerNode();
            if (!selectedNode) {
                return false;
            }
            var from = view.state.selection.from;
            removeMediaNode(view, selectedNode.firstChild, function () { return from + 1; });
            return true;
        };
        this.selectedMediaContainerNode = function () {
            var _a = _this.view.state, selection = _a.selection, schema = _a.schema;
            if (selection instanceof NodeSelection &&
                (selection.node.type === schema.nodes.mediaSingle ||
                    selection.node.type === schema.nodes.mediaGroup)) {
                return selection.node;
            }
        };
        this.handleDrag = function (dragState) {
            var isActive = dragState === 'enter';
            if (_this.showDropzone === isActive) {
                return;
            }
            _this.showDropzone = isActive;
            var _a = _this.view, dispatch = _a.dispatch, state = _a.state;
            // Trigger state change to be able to pick it up in the decorations handler
            dispatch(state.tr);
        };
        this.reactContext = reactContext;
        this.options = options;
        this.editorAppearance = editorAppearance;
        this.waitForMediaUpload =
            options.waitForMediaUpload === undefined
                ? true
                : options.waitForMediaUpload;
        var nodes = state.schema.nodes;
        assert(nodes.media && (nodes.mediaGroup || nodes.mediaSingle), 'Editor: unable to init media plugin - media or mediaGroup/mediaSingle node absent in schema');
        options.providerFactory.subscribe('mediaProvider', function (name, provider) {
            return _this.setMediaProvider(provider);
        });
        this.errorReporter = options.errorReporter || new ErrorReporter();
    }
    MediaPluginState.prototype.updateElement = function () {
        var newElement;
        var selectedContainer = this.selectedMediaContainerNode();
        var mediaSingle = this.view.state.schema.nodes.mediaSingle;
        if (selectedContainer && selectedContainer.type === mediaSingle) {
            newElement = this.getDomElement(this.view.domAtPos.bind(this.view));
        }
        if (this.element !== newElement) {
            this.element = newElement;
        }
    };
    MediaPluginState.prototype.getDomElement = function (domAtPos) {
        var _a = this.view.state, selection = _a.selection, schema = _a.schema;
        if (!(selection instanceof NodeSelection)) {
            return;
        }
        if (selection.node.type !== schema.nodes.mediaSingle) {
            return;
        }
        var node = findDomRefAtPos(selection.from, domAtPos);
        if (node) {
            if (!node.childNodes.length) {
                return node.parentNode;
            }
            var target = node.querySelector('.wrapper') || node;
            return target;
        }
    };
    MediaPluginState.prototype.setView = function (view) {
        this.view = view;
    };
    MediaPluginState.prototype.destroy = function () {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        var mediaNodes = this.mediaNodes;
        mediaNodes.splice(0, mediaNodes.length);
        this.removeOnCloseListener();
        this.destroyPickers();
    };
    MediaPluginState.prototype.initPickers = function (uploadParams, context, Picker, reactContext) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, errorReporter, pickers, pickerFacadeConfig, defaultPickerConfig, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
            var _this = this;
            return tslib_1.__generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        if (this.destroyed) {
                            return [2 /*return*/];
                        }
                        _a = this, errorReporter = _a.errorReporter, pickers = _a.pickers;
                        if (!!pickers.length) return [3 /*break*/, 8];
                        pickerFacadeConfig = {
                            context: context,
                            errorReporter: errorReporter,
                        };
                        defaultPickerConfig = {
                            uploadParams: uploadParams,
                            proxyReactContext: reactContext(),
                        };
                        if (!this.options.customMediaPicker) return [3 /*break*/, 2];
                        _c = (_b = pickers).push;
                        _d = this;
                        return [4 /*yield*/, new Picker('customMediaPicker', pickerFacadeConfig, this.options.customMediaPicker).init()];
                    case 1:
                        _c.apply(_b, [(_d.customPicker = _s.sent())]);
                        return [3 /*break*/, 7];
                    case 2:
                        _f = (_e = pickers).push;
                        _g = this;
                        return [4 /*yield*/, new Picker(
                            // Fallback to browser picker for unauthenticated users
                            context.config.userAuthProvider ? 'popup' : 'browser', pickerFacadeConfig, defaultPickerConfig).init()];
                    case 3:
                        _f.apply(_e, [(_g.popupPicker = _s.sent())]);
                        _j = (_h = pickers).push;
                        _k = this;
                        return [4 /*yield*/, new Picker('binary', pickerFacadeConfig, defaultPickerConfig).init()];
                    case 4:
                        _j.apply(_h, [(_k.binaryPicker = _s.sent())]);
                        _m = (_l = pickers).push;
                        _o = this;
                        return [4 /*yield*/, new Picker('clipboard', pickerFacadeConfig, defaultPickerConfig).init()];
                    case 5:
                        _m.apply(_l, [(_o.clipboardPicker = _s.sent())]);
                        _q = (_p = pickers).push;
                        _r = this;
                        return [4 /*yield*/, new Picker('dropzone', pickerFacadeConfig, tslib_1.__assign({ container: this.options.customDropzoneContainer, headless: true }, defaultPickerConfig)).init()];
                    case 6:
                        _q.apply(_p, [(_r.dropzonePicker = _s.sent())]);
                        this.dropzonePicker.onDrag(this.handleDrag);
                        this.removeOnCloseListener = this.popupPicker.onClose(this.onPopupPickerClose);
                        _s.label = 7;
                    case 7:
                        pickers.forEach(function (picker) {
                            picker.onNewMedia(_this.insertFile);
                            picker.onNewMedia(_this.trackNewMediaEvent(picker.type));
                        });
                        _s.label = 8;
                    case 8:
                        // set new upload params for the pickers
                        pickers.forEach(function (picker) { return picker.setUploadParams(uploadParams); });
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaPluginState.prototype.trackNewMediaEvent = function (pickerType) {
        return function (mediaState) {
            analyticsService.trackEvent("atlassian.editor.media.file." + pickerType, mediaState.fileMimeType
                ? { fileMimeType: mediaState.fileMimeType }
                : {});
        };
    };
    MediaPluginState.prototype.collectionFromProvider = function () {
        return (this.mediaProvider &&
            this.mediaProvider.uploadParams &&
            this.mediaProvider.uploadParams.collection);
    };
    return MediaPluginState;
}());
export { MediaPluginState };
var createDropPlaceholder = function (editorAppearance) {
    var dropPlaceholder = document.createElement('div');
    if (editorAppearance === 'full-page') {
        ReactDOM.render(React.createElement(DropPlaceholder, { type: 'single' }), dropPlaceholder);
    }
    else {
        ReactDOM.render(React.createElement(DropPlaceholder), dropPlaceholder);
    }
    return dropPlaceholder;
};
export var stateKey = new PluginKey('mediaPlugin');
export var getMediaPluginState = function (state) {
    return stateKey.getState(state);
};
export var createPlugin = function (schema, options, reactContext, dispatch, editorAppearance) {
    var dropPlaceholder = createDropPlaceholder(editorAppearance);
    return new Plugin({
        state: {
            init: function (config, state) {
                return new MediaPluginState(state, options, reactContext, editorAppearance);
            },
            apply: function (tr, pluginState, oldState, newState) {
                // remap editing media single position if we're in collab
                if (typeof pluginState.editingMediaSinglePos === 'number') {
                    pluginState.editingMediaSinglePos = tr.mapping.map(pluginState.editingMediaSinglePos);
                }
                var meta = tr.getMeta(stateKey);
                if (meta && dispatch) {
                    var showMediaPicker = pluginState.showMediaPicker;
                    var allowsUploads = meta.allowsUploads;
                    dispatch(stateKey, tslib_1.__assign({}, pluginState, { allowsUploads: typeof allowsUploads === 'undefined'
                            ? pluginState.allowsUploads
                            : allowsUploads, showMediaPicker: showMediaPicker }));
                }
                // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
                //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
                //       transformations from within the plugin state (i.e. when adding a new file).
                return pluginState;
            },
        },
        key: stateKey,
        view: function (view) {
            var pluginState = getMediaPluginState(view.state);
            pluginState.setView(view);
            pluginState.updateElement();
            return {
                update: function () {
                    pluginState.updateElement();
                },
            };
        },
        props: {
            decorations: function (state) {
                var pluginState = getMediaPluginState(state);
                if (!pluginState.showDropzone) {
                    return;
                }
                var schema = state.schema, $anchor = state.selection.$anchor;
                // When a media is already selected
                if (state.selection instanceof NodeSelection) {
                    var node = state.selection.node;
                    if (node.type === schema.nodes.mediaSingle) {
                        var deco = Decoration.node(state.selection.from, state.selection.to, {
                            class: 'mediaSingle-selected',
                        });
                        return DecorationSet.create(state.doc, [deco]);
                    }
                    return;
                }
                var pos = $anchor.pos;
                if ($anchor.parent.type !== schema.nodes.paragraph &&
                    $anchor.parent.type !== schema.nodes.codeBlock) {
                    pos = insertPoint(state.doc, pos, schema.nodes.mediaGroup);
                }
                if (pos === null || pos === undefined) {
                    return;
                }
                var dropPlaceholders = [
                    Decoration.widget(pos, dropPlaceholder, { key: 'drop-placeholder' }),
                ];
                return DecorationSet.create(state.doc, dropPlaceholders);
            },
            nodeViews: options.nodeViews,
            handleTextInput: function (view) {
                getMediaPluginState(view.state).splitMediaGroup();
                return false;
            },
        },
    });
};
//# sourceMappingURL=main.js.map