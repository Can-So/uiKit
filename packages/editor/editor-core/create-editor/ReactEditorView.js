import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditorState, Selection } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { intlShape } from 'react-intl';
import { EventDispatcher, createDispatch } from '../event-dispatcher';
import { processRawValue } from '../utils';
import { findChangedNodesFromTransaction, validateNodes } from '../utils/nodes';
import createPluginList from './create-plugins-list';
import { analyticsEventKey, fireAnalyticsEvent, } from '../plugins/analytics';
import { pluginKey as editorDisabledPluginKey, } from '../plugins/editor-disabled';
import { analyticsService } from '../analytics';
import { processPluginsList, createSchema, createErrorReporter, createPMPlugins, initAnalytics, } from './create-editor';
import { analyticsPluginKey } from '../plugins/analytics/plugin';
import { getDocStructure } from '../utils/document-logger';
var ReactEditorView = /** @class */ (function (_super) {
    tslib_1.__extends(ReactEditorView, _super);
    function ReactEditorView(props) {
        var _this = _super.call(this, props) || this;
        _this.broadcastDisabled = function (disabled) {
            var editorView = _this.view;
            if (editorView) {
                var tr = editorView.state.tr.setMeta(editorDisabledPluginKey, {
                    editorDisabled: disabled,
                });
                tr.setMeta('isLocal', true);
                editorView.dispatch(tr);
            }
        };
        _this.createEditorState = function (options) {
            if (_this.view) {
                /**
                 * There's presently a number of issues with changing the schema of a
                 * editor inflight. A significant issue is that we lose the ability
                 * to keep track of a user's history as the internal plugin state
                 * keeps a list of Steps to undo/redo (which are tied to the schema).
                 * Without a good way to do work around this, we prevent this for now.
                 */
                // tslint:disable-next-line:no-console
                console.warn('The editor does not support changing the schema dynamically.');
                return _this.editorState;
            }
            _this.config = processPluginsList(_this.getPlugins(options.props.editorProps, options.props.createAnalyticsEvent), options.props.editorProps);
            var schema = createSchema(_this.config);
            var _a = options.props.editorProps, contentTransformerProvider = _a.contentTransformerProvider, defaultValue = _a.defaultValue, errorReporterHandler = _a.errorReporterHandler;
            _this.eventDispatcher = new EventDispatcher();
            var dispatch = createDispatch(_this.eventDispatcher);
            var errorReporter = createErrorReporter(errorReporterHandler);
            var plugins = createPMPlugins({
                schema: schema,
                dispatch: dispatch,
                errorReporter: errorReporter,
                editorConfig: _this.config,
                props: options.props.editorProps,
                eventDispatcher: _this.eventDispatcher,
                providerFactory: options.props.providerFactory,
                portalProviderAPI: _this.props.portalProviderAPI,
                reactContext: function () { return _this.context; },
            });
            _this.contentTransformer = contentTransformerProvider
                ? contentTransformerProvider(schema)
                : undefined;
            var doc;
            if (options.replaceDoc) {
                doc =
                    _this.contentTransformer && typeof defaultValue === 'string'
                        ? _this.contentTransformer.parse(defaultValue)
                        : processRawValue(schema, defaultValue);
            }
            var selection;
            if (doc) {
                // ED-4759: Don't set selection at end for full-page editor - should be at start
                selection =
                    options.props.editorProps.appearance === 'full-page'
                        ? Selection.atStart(doc)
                        : Selection.atEnd(doc);
            }
            // Workaround for ED-3507: When media node is the last element, scrollIntoView throws an error
            var patchedSelection = selection
                ? Selection.findFrom(selection.$head, -1, true) || undefined
                : undefined;
            return EditorState.create({
                schema: schema,
                plugins: plugins,
                doc: doc,
                selection: patchedSelection,
            });
        };
        _this.createEditorView = function (node) {
            // Creates the editor-view from this.editorState. If an editor has been mounted
            // previously, this will contain the previous state of the editor.
            _this.view = new EditorView({ mount: node }, {
                state: _this.editorState,
                dispatchTransaction: function (transaction) {
                    if (!_this.view) {
                        return;
                    }
                    var nodes = findChangedNodesFromTransaction(transaction);
                    if (validateNodes(nodes)) {
                        // go ahead and update the state now we know the transaction is good
                        var editorState = _this.view.state.apply(transaction);
                        _this.view.updateState(editorState);
                        if (_this.props.editorProps.onChange && transaction.docChanged) {
                            _this.props.editorProps.onChange(_this.view);
                        }
                        _this.editorState = editorState;
                    }
                    else {
                        var documents = {
                            new: getDocStructure(transaction.doc),
                            prev: getDocStructure(transaction.docs[0]),
                        };
                        analyticsService.trackEvent('atlaskit.fabric.editor.invalidtransaction', { documents: JSON.stringify(documents) });
                        _this.eventDispatcher.emit(analyticsEventKey, {
                            payload: {
                                action: 'dispatchedInvalidTransaction',
                                actionSubject: 'editor',
                                eventType: 'operational',
                                attributes: {
                                    analyticsEventPayloads: transaction.getMeta(analyticsPluginKey),
                                    documents: documents,
                                },
                            },
                        });
                    }
                },
                // Disables the contentEditable attribute of the editor if the editor is disabled
                editable: function (_state) { return !_this.props.editorProps.disabled; },
                attributes: { 'data-gramm': 'false' },
            });
        };
        _this.handleEditorViewRef = function (node) {
            if (!_this.view && node) {
                _this.createEditorView(node);
                _this.props.onEditorCreated({
                    view: _this.view,
                    config: _this.config,
                    eventDispatcher: _this.eventDispatcher,
                    transformer: _this.contentTransformer,
                });
                // Set the state of the EditorDisabled plugin to the current value
                _this.broadcastDisabled(!!_this.props.editorProps.disabled);
                // Force React to re-render so consumers get a reference to the editor view
                _this.forceUpdate();
            }
            else if (_this.view && !node) {
                // When the appearance is changed, React will call handleEditorViewRef with node === null
                // to destroy the old EditorView, before calling this method again with node === div to
                // create the new EditorView
                _this.props.onEditorDestroyed({
                    view: _this.view,
                    config: _this.config,
                    eventDispatcher: _this.eventDispatcher,
                    transformer: _this.contentTransformer,
                });
                _this.view.destroy(); // Destroys the dom node & all node views
                _this.view = undefined;
            }
        };
        _this.dispatchAnalyticsEvent = function (payload) {
            if (_this.props.allowAnalyticsGASV3 && _this.eventDispatcher) {
                var dispatch = createDispatch(_this.eventDispatcher);
                dispatch(analyticsEventKey, {
                    payload: payload,
                });
            }
        };
        _this.editorState = _this.createEditorState({ props: props, replaceDoc: true });
        var createAnalyticsEvent = props.createAnalyticsEvent, allowAnalyticsGASV3 = props.allowAnalyticsGASV3;
        if (allowAnalyticsGASV3) {
            _this.activateAnalytics(createAnalyticsEvent);
        }
        _this.eventDispatcher.emit(analyticsEventKey, {
            payload: {
                action: 'started',
                actionSubject: 'editor',
                attributes: { platform: 'web' },
                eventType: 'ui',
            },
        });
        initAnalytics(props.editorProps.analyticsHandler);
        return _this;
    }
    ReactEditorView.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.view &&
            this.props.editorProps.disabled !== nextProps.editorProps.disabled) {
            this.broadcastDisabled(!!nextProps.editorProps.disabled);
            // Disables the contentEditable attribute of the editor if the editor is disabled
            this.view.setProps({
                editable: function (_state) { return !nextProps.editorProps.disabled; },
            });
        }
        // Activate or deactivate analytics if change property
        if (this.props.allowAnalyticsGASV3 !== nextProps.allowAnalyticsGASV3) {
            if (nextProps.allowAnalyticsGASV3) {
                this.activateAnalytics(nextProps.createAnalyticsEvent);
            }
            else {
                this.deactivateAnalytics();
            }
        }
        else {
            // Allow analytics is the same, check if we receive a new create analytics prop
            if (this.props.allowAnalyticsGASV3 &&
                nextProps.createAnalyticsEvent !== this.props.createAnalyticsEvent) {
                this.deactivateAnalytics(); // Deactivate the old one
                this.activateAnalytics(nextProps.createAnalyticsEvent); // Activate the new one
            }
        }
    };
    /**
     * Deactivate analytics event handler, if exist any.
     */
    ReactEditorView.prototype.deactivateAnalytics = function () {
        if (this.analyticsEventHandler) {
            this.eventDispatcher.off(analyticsEventKey, this.analyticsEventHandler);
        }
    };
    /**
     * Create analytics event handler, if createAnalyticsEvent exist
     * @param createAnalyticsEvent
     */
    ReactEditorView.prototype.activateAnalytics = function (createAnalyticsEvent) {
        if (createAnalyticsEvent) {
            this.analyticsEventHandler = fireAnalyticsEvent(createAnalyticsEvent);
            this.eventDispatcher.on(analyticsEventKey, this.analyticsEventHandler);
        }
    };
    /**
     * Clean up any non-PM resources when the editor is unmounted
     */
    ReactEditorView.prototype.componentWillUnmount = function () {
        this.eventDispatcher.destroy();
        if (this.view) {
            // Destroy the state if the Editor is being unmounted
            var editorState_1 = this.view.state;
            editorState_1.plugins.forEach(function (plugin) {
                var state = plugin.getState(editorState_1);
                if (state && state.destroy) {
                    state.destroy();
                }
            });
        }
        // this.view will be destroyed when React unmounts in handleEditorViewRef
    };
    // Helper to allow tests to inject plugins directly
    ReactEditorView.prototype.getPlugins = function (editorProps, createAnalyticsEvent) {
        return createPluginList(editorProps, createAnalyticsEvent);
    };
    ReactEditorView.prototype.render = function () {
        var editor = React.createElement("div", { key: "ProseMirror", ref: this.handleEditorViewRef });
        return this.props.render
            ? this.props.render({
                editor: editor,
                view: this.view,
                config: this.config,
                eventDispatcher: this.eventDispatcher,
                transformer: this.contentTransformer,
                dispatchAnalyticsEvent: this.dispatchAnalyticsEvent,
            })
            : editor;
    };
    ReactEditorView.contextTypes = {
        getAtlaskitAnalyticsEventHandlers: PropTypes.func,
        intl: intlShape,
    };
    return ReactEditorView;
}(React.Component));
export default ReactEditorView;
//# sourceMappingURL=ReactEditorView.js.map