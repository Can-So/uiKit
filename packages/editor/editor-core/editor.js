import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { intlShape, IntlProvider } from 'react-intl';
import { ProviderFactory, BaseTheme, WidthProvider, } from '@atlaskit/editor-common';
import { Context as CardContext } from '@atlaskit/smart-card';
import { getUiComponent } from './create-editor';
import EditorActions from './actions';
import { ReactEditorView } from './create-editor';
import EditorContext from './ui/EditorContext';
import { WithCreateAnalyticsEvent } from './ui/WithCreateAnalyticsEvent';
import { PortalProvider, PortalRenderer } from './ui/PortalProvider';
import { nextMajorVersion } from './version-wrapper';
import { createContextAdapter } from './nodeviews';
// allows connecting external React.Context through to nodeviews
var ContextAdapter = createContextAdapter({
    card: CardContext,
});
var Editor = /** @class */ (function (_super) {
    tslib_1.__extends(Editor, _super);
    function Editor(props, context) {
        var _this = _super.call(this, props) || this;
        _this.handleSave = function (view) {
            if (!_this.props.onSave) {
                return;
            }
            // ED-4021: if you type a short amount of content
            // inside a content-editable on Android, Chrome only sends a
            // compositionend when it feels like it.
            //
            // to work around the PM editable being out of sync with
            // the document, force a DOM sync before calling onSave
            // if we've already started typing
            // @ts-ignore
            if (view['inDOMChange']) {
                // @ts-ignore
                view['inDOMChange'].finish(true);
            }
            return _this.props.onSave(view);
        };
        _this.providerFactory = new ProviderFactory();
        _this.deprecationWarnings(props);
        _this.onEditorCreated = _this.onEditorCreated.bind(_this);
        _this.onEditorDestroyed = _this.onEditorDestroyed.bind(_this);
        _this.editorActions = (context || {}).editorActions || new EditorActions();
        return _this;
    }
    Editor.prototype.componentDidMount = function () {
        this.handleProviders(this.props);
    };
    Editor.prototype.componentWillReceiveProps = function (nextProps) {
        this.handleProviders(nextProps);
    };
    Editor.prototype.componentWillUnmount = function () {
        this.unregisterEditorFromActions();
        this.providerFactory.destroy();
    };
    Editor.prototype.onEditorCreated = function (instance) {
        this.registerEditorForActions(instance.view, instance.eventDispatcher, instance.transformer);
        if (this.props.shouldFocus) {
            if (!instance.view.hasFocus()) {
                window.setTimeout(function () {
                    instance.view.focus();
                }, 0);
            }
        }
    };
    Editor.prototype.deprecationWarnings = function (props) {
        var nextVersion = nextMajorVersion();
        var deprecatedProperties = {
            mediaProvider: {
                message: 'To pass media provider use media property – <Editor media={{ provider }} />',
                type: 'removed',
            },
            allowTasksAndDecisions: {
                message: 'To allow tasks and decisions use taskDecisionProvider – <Editor taskDecisionProvider={{ provider }} />',
                type: 'removed',
            },
            allowPlaceholderCursor: {
                type: 'removed',
            },
            allowInlineAction: {
                type: 'removed',
            },
            allowConfluenceInlineComment: {
                type: 'removed',
            },
            addonToolbarComponents: {
                type: 'removed',
            },
            cardProvider: {
                type: 'removed',
            },
            allowCodeBlocks: {
                message: 'To disable codeBlocks use - <Editor allowBlockTypes={{ exclude: ["codeBlocks"] }} />',
            },
            allowLists: {},
            allowHelpDialog: {},
            allowGapCursor: {
                type: 'removed',
            },
            allowUnsupportedContent: {
                message: 'Deprecated. Defaults to true.',
                type: 'removed',
            },
        };
        Object.keys(deprecatedProperties).forEach(function (property) {
            if (props.hasOwnProperty(property)) {
                var meta = deprecatedProperties[property];
                var type = meta.type || 'enabled by default';
                // tslint:disable-next-line:no-console
                console.warn(property + " property is deprecated. " + (meta.message ||
                    '') + " [Will be " + type + " in editor-core@" + nextVersion + "]");
            }
        });
        if (props.hasOwnProperty('quickInsert') &&
            typeof props.quickInsert === 'boolean') {
            // tslint:disable-next-line:no-console
            console.warn("quickInsert property is deprecated. [Will be enabled by default in editor-core@" + nextVersion + "]");
        }
        if (props.hasOwnProperty('allowTables') &&
            typeof props.allowTables !== 'boolean' &&
            (!props.allowTables || !props.allowTables.advanced)) {
            // tslint:disable-next-line:no-console
            console.warn("Advanced table options are deprecated (except isHeaderRowRequired) to continue using advanced table features use - <Editor allowTables={{ advanced: true }} /> [Will be changed in editor-core@" + nextVersion + "]");
        }
    };
    Editor.prototype.onEditorDestroyed = function (instance) {
        this.unregisterEditorFromActions();
    };
    Editor.prototype.registerEditorForActions = function (editorView, eventDispatcher, contentTransformer) {
        this.editorActions._privateRegisterEditor(editorView, eventDispatcher, contentTransformer);
    };
    Editor.prototype.unregisterEditorFromActions = function () {
        if (this.editorActions) {
            this.editorActions._privateUnregisterEditor();
        }
    };
    Editor.prototype.handleProviders = function (props) {
        var emojiProvider = props.emojiProvider, mentionProvider = props.mentionProvider, mediaProvider = props.mediaProvider, taskDecisionProvider = props.taskDecisionProvider, contextIdentifierProvider = props.contextIdentifierProvider, collabEditProvider = props.collabEditProvider, activityProvider = props.activityProvider, presenceProvider = props.presenceProvider, macroProvider = props.macroProvider, legacyImageUploadProvider = props.legacyImageUploadProvider, media = props.media, collabEdit = props.collabEdit, quickInsert = props.quickInsert, UNSAFE_cards = props.UNSAFE_cards;
        this.providerFactory.setProvider('emojiProvider', emojiProvider);
        this.providerFactory.setProvider('mentionProvider', mentionProvider);
        this.providerFactory.setProvider('taskDecisionProvider', taskDecisionProvider);
        this.providerFactory.setProvider('contextIdentifierProvider', contextIdentifierProvider);
        this.providerFactory.setProvider('mediaProvider', media && media.provider ? media.provider : mediaProvider);
        this.providerFactory.setProvider('imageUploadProvider', legacyImageUploadProvider);
        this.providerFactory.setProvider('collabEditProvider', collabEdit && collabEdit.provider
            ? collabEdit.provider
            : collabEditProvider);
        this.providerFactory.setProvider('activityProvider', activityProvider);
        this.providerFactory.setProvider('presenceProvider', presenceProvider);
        this.providerFactory.setProvider('macroProvider', macroProvider);
        if (UNSAFE_cards && UNSAFE_cards.provider) {
            this.providerFactory.setProvider('cardProvider', UNSAFE_cards.provider);
        }
        if (quickInsert && typeof quickInsert !== 'boolean') {
            this.providerFactory.setProvider('quickInsertProvider', quickInsert.provider);
        }
    };
    Editor.prototype.render = function () {
        var _this = this;
        var Component = getUiComponent(this.props.appearance);
        var overriddenEditorProps = tslib_1.__assign({}, this.props, { onSave: this.props.onSave ? this.handleSave : undefined });
        var editor = (React.createElement(WidthProvider, null,
            React.createElement(EditorContext, { editorActions: this.editorActions },
                React.createElement(WithCreateAnalyticsEvent, { render: function (createAnalyticsEvent) { return (React.createElement(ContextAdapter, null,
                        React.createElement(PortalProvider, { render: function (portalProviderAPI) { return (React.createElement(React.Fragment, null,
                                React.createElement(ReactEditorView, { editorProps: overriddenEditorProps, createAnalyticsEvent: createAnalyticsEvent, portalProviderAPI: portalProviderAPI, providerFactory: _this.providerFactory, onEditorCreated: _this.onEditorCreated, onEditorDestroyed: _this.onEditorDestroyed, allowAnalyticsGASV3: _this.props.allowAnalyticsGASV3, disabled: _this.props.disabled, render: function (_a) {
                                        var editor = _a.editor, view = _a.view, eventDispatcher = _a.eventDispatcher, config = _a.config, dispatchAnalyticsEvent = _a.dispatchAnalyticsEvent;
                                        return (React.createElement(BaseTheme, { dynamicTextSizing: _this.props.allowDynamicTextSizing },
                                            React.createElement(Component, { disabled: _this.props.disabled, editorActions: _this.editorActions, editorDOMElement: editor, editorView: view, providerFactory: _this.providerFactory, eventDispatcher: eventDispatcher, dispatchAnalyticsEvent: dispatchAnalyticsEvent, maxHeight: _this.props.maxHeight, onSave: _this.props.onSave ? _this.handleSave : undefined, onCancel: _this.props.onCancel, popupsMountPoint: _this.props.popupsMountPoint, popupsBoundariesElement: _this.props.popupsBoundariesElement, contentComponents: config.contentComponents, primaryToolbarComponents: config.primaryToolbarComponents, secondaryToolbarComponents: config.secondaryToolbarComponents, insertMenuItems: _this.props.insertMenuItems, customContentComponents: _this.props.contentComponents, customPrimaryToolbarComponents: _this.props.primaryToolbarComponents, customSecondaryToolbarComponents: _this.props.secondaryToolbarComponents, addonToolbarComponents: _this.props.addonToolbarComponents, collabEdit: _this.props.collabEdit })));
                                    } }),
                                React.createElement(PortalRenderer, { portalProviderAPI: portalProviderAPI }))); } }))); } }))));
        return this.context.intl ? (editor) : (React.createElement(IntlProvider, { locale: "en" }, editor));
    };
    Editor.defaultProps = {
        appearance: 'comment',
        disabled: false,
        extensionHandlers: {},
    };
    Editor.contextTypes = {
        editorActions: PropTypes.object,
        intl: intlShape,
    };
    return Editor;
}(React.Component));
export default Editor;
//# sourceMappingURL=editor.js.map