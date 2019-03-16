import * as tslib_1 from "tslib";
import * as React from 'react';
import * as uuid from 'uuid';
import { Plugin, PluginKey } from 'prosemirror-state';
import MentionIcon from '@findable/icon/glyph/editor/mention';
import { MentionItem, isSpecialMention, ELEMENTS_CHANNEL, } from '@findable/mention';
import { mention } from '@findable/adf-schema';
import { analyticsService } from '../../analytics';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as typeAheadPluginKey, createInitialPluginState, } from '../type-ahead/pm-plugins/main';
import { messages } from '../insert-block/ui/ToolbarInsertBlock';
import { ReactNodeView } from '../../nodeviews';
import ToolbarMention from './ui/ToolbarMention';
import mentionNodeView from './nodeviews/mention';
import { buildTypeAheadInsertedPayload, buildTypeAheadCancelPayload, buildTypeAheadRenderedPayload, } from './analytics';
import { addAnalytics, analyticsPluginKey, analyticsEventKey, } from '../analytics';
var mentionsPlugin = function (createAnalyticsEvent) {
    var sessionId = uuid();
    var fireEvent = function (payload) {
        if (createAnalyticsEvent) {
            if (payload.attributes && !payload.attributes.sessionId) {
                payload.attributes.sessionId = sessionId;
            }
            createAnalyticsEvent(payload).fire(ELEMENTS_CHANNEL);
        }
    };
    return {
        nodes: function () {
            return [{ name: 'mention', node: mention }];
        },
        pmPlugins: function () {
            return [
                {
                    name: 'mention',
                    plugin: function (_a) {
                        var providerFactory = _a.providerFactory, dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI, props = _a.props;
                        return mentionPluginFactory(dispatch, providerFactory, portalProviderAPI, fireEvent, props.appearance);
                    },
                },
            ];
        },
        secondaryToolbarComponent: function (_a) {
            var editorView = _a.editorView, disabled = _a.disabled;
            return (React.createElement(WithPluginState, { editorView: editorView, plugins: {
                    typeAheadState: typeAheadPluginKey,
                    mentionState: mentionPluginKey,
                }, render: function (_a) {
                    var _b = _a.typeAheadState, typeAheadState = _b === void 0 ? createInitialPluginState() : _b, _c = _a.mentionState, mentionState = _c === void 0 ? {} : _c;
                    return !mentionState.mentionProvider ? null : (React.createElement(ToolbarMention, { editorView: editorView, isDisabled: disabled || !typeAheadState.isAllowed }));
                } }));
        },
        pluginsOptions: {
            quickInsert: function (_a) {
                var formatMessage = _a.formatMessage;
                return [
                    {
                        title: formatMessage(messages.mention),
                        priority: 400,
                        icon: function () { return React.createElement(MentionIcon, { label: formatMessage(messages.mention) }); },
                        action: function (insert, state) {
                            var mark = state.schema.mark('typeAheadQuery', {
                                trigger: '@',
                            });
                            var mentionText = state.schema.text('@', [mark]);
                            var tr = insert(mentionText);
                            return addAnalytics(tr, {
                                action: "invoked" /* INVOKED */,
                                actionSubject: "typeAhead" /* TYPEAHEAD */,
                                actionSubjectId: "mentionTypeAhead" /* TYPEAHEAD_MENTION */,
                                attributes: { inputMethod: "quickInsert" /* QUICK_INSERT */ },
                                eventType: "ui" /* UI */,
                            });
                        },
                    },
                ];
            },
            typeAhead: {
                trigger: '@',
                // Custom regex must have a capture group around trigger
                // so it's possible to use it without needing to scan through all triggers again
                customRegex: '\\(?(@)',
                getItems: function (query, state, _intl, _a, tr, dispatch) {
                    var prevActive = _a.prevActive, queryChanged = _a.queryChanged;
                    if (!prevActive && queryChanged) {
                        analyticsService.trackEvent('atlassian.fabric.mention.picker.trigger.shortcut');
                        if (!tr.getMeta(analyticsPluginKey)) {
                            dispatch(analyticsEventKey, {
                                payload: {
                                    action: "invoked" /* INVOKED */,
                                    actionSubject: "typeAhead" /* TYPEAHEAD */,
                                    actionSubjectId: "mentionTypeAhead" /* TYPEAHEAD_MENTION */,
                                    attributes: { inputMethod: "keyboard" /* KEYBOARD */ },
                                    eventType: "ui" /* UI */,
                                },
                            });
                        }
                    }
                    var pluginState = getMentionPluginState(state);
                    var mentions = !prevActive && queryChanged ? [] : pluginState.mentions || [];
                    var mentionContext = tslib_1.__assign({}, pluginState.contextIdentifierProvider, { sessionId: sessionId });
                    if (queryChanged && pluginState.mentionProvider) {
                        pluginState.mentionProvider.filter(query || '', mentionContext);
                    }
                    return mentions.map(function (mention) { return ({
                        title: mention.id,
                        render: function (_a) {
                            var isSelected = _a.isSelected, onClick = _a.onClick, onMouseMove = _a.onMouseMove;
                            return (React.createElement(MentionItem, { mention: mention, selected: isSelected, onMouseMove: onMouseMove, onSelection: onClick }));
                        },
                        mention: mention,
                    }); });
                },
                selectItem: function (state, item, insert, _a) {
                    var mode = _a.mode;
                    var pluginState = getMentionPluginState(state);
                    var mentionProvider = pluginState.mentionProvider;
                    var _b = item.mention, id = _b.id, name = _b.name, nickname = _b.nickname, accessLevel = _b.accessLevel, userType = _b.userType;
                    var renderName = nickname ? nickname : name;
                    var typeAheadPluginState = typeAheadPluginKey.getState(state);
                    var mentionContext = tslib_1.__assign({}, pluginState.contextIdentifierProvider, { sessionId: sessionId });
                    if (mentionProvider) {
                        mentionProvider.recordMentionSelection(item.mention, mentionContext);
                    }
                    var pickerElapsedTime = typeAheadPluginState.queryStarted
                        ? Date.now() - typeAheadPluginState.queryStarted
                        : 0;
                    analyticsService.trackEvent('atlassian.fabric.mention.picker.insert', tslib_1.__assign({ mode: mode, isSpecial: isSpecialMention(item.mention) || false, accessLevel: accessLevel || '', mentionee: id, duration: pickerElapsedTime, queryLength: (typeAheadPluginState.query || '').length }, pluginState.contextIdentifierProvider));
                    fireEvent(buildTypeAheadInsertedPayload(pickerElapsedTime, typeAheadPluginState.upKeyCount, typeAheadPluginState.downKeyCount, sessionId, mode, item.mention, pluginState.mentions, typeAheadPluginState.query || ''));
                    sessionId = uuid();
                    return insert(state.schema.nodes.mention.createChecked({
                        text: "@" + renderName,
                        id: id,
                        accessLevel: accessLevel,
                        userType: userType === 'DEFAULT' ? null : userType,
                    }));
                },
                dismiss: function (state) {
                    var typeAheadPluginState = typeAheadPluginKey.getState(state);
                    var pickerElapsedTime = typeAheadPluginState.queryStarted
                        ? Date.now() - typeAheadPluginState.queryStarted
                        : 0;
                    fireEvent(buildTypeAheadCancelPayload(pickerElapsedTime, typeAheadPluginState.upKeyCount, typeAheadPluginState.downKeyCount, sessionId, typeAheadPluginState.query || ''));
                    sessionId = uuid();
                },
            },
        },
    };
};
export default mentionsPlugin;
/**
 * Actions
 */
export var ACTIONS = {
    SET_PROVIDER: 'SET_PROVIDER',
    SET_RESULTS: 'SET_RESULTS',
    SET_CONTEXT: 'SET_CONTEXT',
};
export var setProvider = function (provider) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(mentionPluginKey, {
            action: ACTIONS.SET_PROVIDER,
            params: { provider: provider },
        }));
    }
    return true;
}; };
export var setResults = function (results) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(mentionPluginKey, {
            action: ACTIONS.SET_RESULTS,
            params: { results: results },
        }));
    }
    return true;
}; };
export var setContext = function (context) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(mentionPluginKey, {
            action: ACTIONS.SET_CONTEXT,
            params: { context: context },
        }));
    }
    return true;
}; };
/**
 *
 * ProseMirror Plugin
 *
 */
export var mentionPluginKey = new PluginKey('mentionPlugin');
export function getMentionPluginState(state) {
    return mentionPluginKey.getState(state);
}
function mentionPluginFactory(dispatch, providerFactory, portalProviderAPI, fireEvent, editorAppearance) {
    var mentionProvider;
    return new Plugin({
        key: mentionPluginKey,
        state: {
            init: function () {
                return {};
            },
            apply: function (tr, pluginState) {
                var _a = tr.getMeta(mentionPluginKey) || {
                    action: null,
                    params: null,
                }, action = _a.action, params = _a.params;
                var newPluginState = pluginState;
                switch (action) {
                    case ACTIONS.SET_PROVIDER:
                        newPluginState = tslib_1.__assign({}, pluginState, { mentionProvider: params.provider });
                        dispatch(mentionPluginKey, newPluginState);
                        return newPluginState;
                    case ACTIONS.SET_RESULTS:
                        newPluginState = tslib_1.__assign({}, pluginState, { mentions: params.results });
                        dispatch(mentionPluginKey, newPluginState);
                        return newPluginState;
                    case ACTIONS.SET_CONTEXT:
                        newPluginState = tslib_1.__assign({}, pluginState, { contextIdentifierProvider: params.context });
                        dispatch(mentionPluginKey, newPluginState);
                        return newPluginState;
                }
                return newPluginState;
            },
        },
        props: {
            nodeViews: {
                mention: ReactNodeView.fromComponent(mentionNodeView, portalProviderAPI, { providerFactory: providerFactory, editorAppearance: editorAppearance }),
            },
        },
        view: function (editorView) {
            var providerHandler = function (name, providerPromise) {
                switch (name) {
                    case 'mentionProvider':
                        if (!providerPromise) {
                            return setProvider(undefined)(editorView.state, editorView.dispatch);
                        }
                        providerPromise
                            .then(function (provider) {
                            if (mentionProvider) {
                                mentionProvider.unsubscribe('mentionPlugin');
                            }
                            mentionProvider = provider;
                            setProvider(provider)(editorView.state, editorView.dispatch);
                            provider.subscribe('mentionPlugin', function (mentions, query, stats) {
                                setResults(mentions)(editorView.state, editorView.dispatch);
                                fireEvent(buildTypeAheadRenderedPayload(stats && stats.duration, mentions.map(function (mention) { return mention.id; }), query || ''));
                            });
                        })
                            .catch(function () {
                            return setProvider(undefined)(editorView.state, editorView.dispatch);
                        });
                        break;
                    case 'contextIdentifierProvider':
                        if (!providerPromise) {
                            return setContext(undefined)(editorView.state, editorView.dispatch);
                        }
                        providerPromise.then(function (provider) {
                            setContext(provider)(editorView.state, editorView.dispatch);
                        });
                        break;
                }
                return;
            };
            providerFactory.subscribe('mentionProvider', providerHandler);
            providerFactory.subscribe('contextIdentifierProvider', providerHandler);
            return {
                destroy: function () {
                    if (providerFactory) {
                        providerFactory.unsubscribe('mentionProvider', providerHandler);
                        providerFactory.unsubscribe('contextIdentifierProvider', providerHandler);
                    }
                    if (mentionProvider) {
                        mentionProvider.unsubscribe('mentionPlugin');
                    }
                },
            };
        },
    });
}
//# sourceMappingURL=index.js.map