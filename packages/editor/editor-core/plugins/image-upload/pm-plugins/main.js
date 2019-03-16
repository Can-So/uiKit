var _this = this;
import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { isPastedFile } from '../../../utils/clipboard';
import { isDroppedFile } from '../../../utils/drag-drop';
import { analyticsService } from '../../../analytics';
import { canInsertMedia, isMediaSelected } from '../utils';
import { startImageUpload, insertExternalImage } from './commands';
var createDOMHandler = function (pred, eventName) { return function (view, event) {
    if (!pred(event)) {
        return false;
    }
    event.preventDefault();
    event.stopPropagation();
    if (startImageUpload(event)(view.state, view.dispatch)) {
        analyticsService.trackEvent(eventName);
    }
    return true;
}; };
export var stateKey = new PluginKey('imageUploadPlugin');
var getNewActiveUpload = function (tr, pluginState) {
    var meta = tr.getMeta(stateKey);
    if (meta && meta.name === 'START_UPLOAD') {
        return {
            event: meta.event,
        };
    }
    return pluginState.activeUpload;
};
export var createPlugin = function (_a) {
    var dispatch = _a.dispatch, providerFactory = _a.providerFactory;
    var uploadHandler;
    return new Plugin({
        state: {
            init: function (_config, state) {
                return {
                    active: false,
                    enabled: canInsertMedia(state),
                    hidden: !state.schema.nodes.media || !state.schema.nodes.mediaSingle,
                };
            },
            apply: function (tr, pluginState, _oldState, newState) {
                var newActive = isMediaSelected(newState);
                var newEnabled = canInsertMedia(newState);
                var newActiveUpload = getNewActiveUpload(tr, pluginState);
                if (newActive !== pluginState.active ||
                    newEnabled !== pluginState.enabled ||
                    newActiveUpload !== pluginState.activeUpload) {
                    var newPluginState = tslib_1.__assign({}, pluginState, { active: newActive, enabled: newEnabled, activeUpload: newActiveUpload });
                    dispatch(stateKey, newPluginState);
                    return newPluginState;
                }
                return pluginState;
            },
        },
        key: stateKey,
        view: function () {
            var handleProvider = function (name, provider) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var e_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (name !== 'imageUploadProvider' || !provider) {
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, provider];
                        case 2:
                            uploadHandler = _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            uploadHandler = undefined;
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            providerFactory.subscribe('imageUploadProvider', handleProvider);
            return {
                update: function (view, prevState) {
                    var editorState = view.state;
                    var currentState = stateKey.getState(editorState);
                    // if we've add a new upload to the state, execute the uploadHandler
                    var oldState = stateKey.getState(prevState);
                    if (currentState.activeUpload !== oldState.activeUpload &&
                        currentState.activeUpload &&
                        uploadHandler) {
                        uploadHandler(currentState.activeUpload.event, function (options) {
                            return insertExternalImage(options)(view.state, view.dispatch);
                        });
                    }
                },
                destroy: function () {
                    providerFactory.unsubscribe('imageUploadProvider', handleProvider);
                },
            };
        },
        props: {
            handleDOMEvents: {
                drop: createDOMHandler(isDroppedFile, 'atlassian.editor.image.drop'),
                paste: createDOMHandler(isPastedFile, 'atlassian.editor.image.paste'),
            },
        },
    });
};
//# sourceMappingURL=main.js.map