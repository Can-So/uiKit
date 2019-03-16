import * as React from 'react';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import { media, mediaGroup, mediaSingle } from '@atlaskit/adf-schema';
import { SmartMediaEditor } from '@atlaskit/media-editor';
import { stateKey as pluginKey, createPlugin, } from './pm-plugins/main';
import keymapMediaSinglePlugin from './pm-plugins/keymap-media-single';
import keymapPlugin from './pm-plugins/keymap';
import ToolbarMedia from './ui/ToolbarMedia';
import { ReactMediaGroupNode } from './nodeviews/mediaGroup';
import { ReactMediaSingleNode } from './nodeviews/mediaSingle';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { floatingToolbar } from './toolbar';
import { addAnalytics, } from '../analytics';
import WithPluginState from '../../ui/WithPluginState';
export var renderSmartMediaEditor = function (mediaState) {
    var node = mediaState.selectedMediaContainerNode();
    if (!node) {
        return null;
    }
    var id = node.firstChild.attrs.id;
    if (mediaState.uploadContext && mediaState.showEditingDialog) {
        var identifier = {
            id: id,
            mediaItemType: 'file',
            collectionName: node.firstChild.attrs.collection,
        };
        return (React.createElement(SmartMediaEditor, { identifier: identifier, context: mediaState.uploadContext, onUploadStart: function (newFileIdentifier, dimensions) {
                mediaState.closeMediaEditor();
                mediaState.replaceEditingMedia(newFileIdentifier, dimensions);
            }, onFinish: mediaState.closeMediaEditor }));
    }
    return null;
};
var mediaPlugin = function (options, appearance) { return ({
    nodes: function () {
        return [
            { name: 'mediaGroup', node: mediaGroup },
            { name: 'mediaSingle', node: mediaSingle },
            { name: 'media', node: media },
        ].filter(function (node) {
            var _a = options || {}, _b = _a.allowMediaGroup, allowMediaGroup = _b === void 0 ? true : _b, _c = _a.allowMediaSingle, allowMediaSingle = _c === void 0 ? false : _c;
            if (node.name === 'mediaGroup') {
                return allowMediaGroup;
            }
            if (node.name === 'mediaSingle') {
                return allowMediaSingle;
            }
            return true;
        });
    },
    pmPlugins: function () {
        return [
            {
                name: 'media',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props, dispatch = _a.dispatch, eventDispatcher = _a.eventDispatcher, providerFactory = _a.providerFactory, errorReporter = _a.errorReporter, portalProviderAPI = _a.portalProviderAPI, reactContext = _a.reactContext;
                    return createPlugin(schema, {
                        providerFactory: providerFactory,
                        nodeViews: {
                            mediaGroup: ReactMediaGroupNode(portalProviderAPI, props.appearance),
                            mediaSingle: ReactMediaSingleNode(portalProviderAPI, eventDispatcher, props.appearance),
                        },
                        errorReporter: errorReporter,
                        uploadErrorHandler: props.uploadErrorHandler,
                        waitForMediaUpload: props.waitForMediaUpload,
                        customDropzoneContainer: options && options.customDropzoneContainer,
                        customMediaPicker: options && options.customMediaPicker,
                        appearance: props.appearance,
                        allowResizing: !!(options && options.allowResizing),
                    }, reactContext, dispatch, props.appearance);
                },
            },
            {
                name: 'mediaKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymapPlugin();
                },
            },
        ].concat(options && options.allowMediaSingle
            ? {
                name: 'mediaSingleKeymap',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return keymapMediaSinglePlugin(schema);
                },
            }
            : []);
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView;
        return (React.createElement(WithPluginState, { editorView: editorView, plugins: {
                mediaState: pluginKey,
            }, render: function (_a) {
                var mediaState = _a.mediaState;
                return renderSmartMediaEditor(mediaState);
            } }));
    },
    secondaryToolbarComponent: function (_a) {
        var editorView = _a.editorView, eventDispatcher = _a.eventDispatcher, disabled = _a.disabled;
        return (React.createElement(ToolbarMedia, { editorView: editorView, eventDispatcher: eventDispatcher, pluginKey: pluginKey, isDisabled: disabled, isReducedSpacing: true }));
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.filesAndImages),
                    priority: 400,
                    keywords: ['media'],
                    icon: function () { return (React.createElement(EditorImageIcon, { label: formatMessage(messages.filesAndImages) })); },
                    action: function (insert, state) {
                        var pluginState = pluginKey.getState(state);
                        pluginState.showMediaPicker();
                        var tr = insert('');
                        return addAnalytics(tr, {
                            action: "opened" /* OPENED */,
                            actionSubject: "picker" /* PICKER */,
                            actionSubjectId: "cloudPicker" /* PICKER_CLOUD */,
                            attributes: { inputMethod: "quickInsert" /* QUICK_INSERT */ },
                            eventType: "ui" /* UI */,
                        });
                    },
                },
            ];
        },
        floatingToolbar: function (state, intl) {
            return floatingToolbar(state, intl, options && options.allowResizing, options && options.allowAnnotation, appearance);
        },
    },
}); };
export default mediaPlugin;
//# sourceMappingURL=index.js.map