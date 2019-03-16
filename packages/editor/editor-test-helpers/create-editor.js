import * as tslib_1 from "tslib";
import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { CellSelection } from 'prosemirror-tables';
import { findCellClosestToPos } from 'prosemirror-utils';
import { ReactEditorView, setTextSelection, getDefaultPluginsList, PortalProvider, PortalRenderer, } from '@atlaskit/editor-core';
import { ProviderFactory } from '@atlaskit/editor-common';
import { mount } from 'enzyme';
import patchEditorViewForJSDOM from './jsdom-fixtures';
var TestReactEditorView = /** @class */ (function (_super) {
    tslib_1.__extends(TestReactEditorView, _super);
    function TestReactEditorView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestReactEditorView.prototype.getPlugins = function (editorProps) {
        return (this.props.plugins ||
            _super.prototype.getPlugins.call(this, editorProps, this.props.createAnalyticsEvent));
    };
    return TestReactEditorView;
}(ReactEditorView));
export default function createEditorFactoryForTests() {
    var place;
    var wrapper;
    afterEach(function () {
        if (wrapper) {
            if (wrapper.length > 0) {
                wrapper.unmount();
            }
            wrapper.detach();
        }
        if (place && place.parentNode) {
            place.parentNode.removeChild(place);
        }
    });
    return function (_a) {
        var doc = _a.doc, _b = _a.editorProps, editorProps = _b === void 0 ? {} : _b, editorPlugins = _a.editorPlugins, providerFactory = _a.providerFactory, pluginKey = _a.pluginKey, createAnalyticsEvent = _a.createAnalyticsEvent;
        var portalProviderAPI;
        var plugins = editorPlugins
            ? tslib_1.__spread(getDefaultPluginsList(editorProps, createAnalyticsEvent), editorPlugins) : undefined;
        place = document.body.appendChild(document.createElement('div'));
        wrapper = mount(React.createElement(PortalProvider, { render: function (portalProvider) {
                portalProviderAPI = portalProvider;
                return (React.createElement(IntlProvider, { locale: "en" },
                    React.createElement(React.Fragment, null,
                        React.createElement(TestReactEditorView, { editorProps: editorProps, createAnalyticsEvent: createAnalyticsEvent, allowAnalyticsGASV3: editorProps.allowAnalyticsGASV3, portalProviderAPI: portalProvider, providerFactory: providerFactory ? providerFactory : new ProviderFactory(), onEditorCreated: function () { }, onEditorDestroyed: function () { }, plugins: plugins }),
                        React.createElement(PortalRenderer, { portalProviderAPI: portalProviderAPI }))));
            } }), { attachTo: place });
        var editor = wrapper.find(TestReactEditorView);
        // Work around JSDOM/Node not supporting DOM Selection API
        if (!('getSelection' in window)) {
            // TODO JEST-23
            patchEditorViewForJSDOM(editor.instance().view);
        }
        var _c = editor.instance(), editorView = _c.view, eventDispatcher = _c.eventDispatcher, _d = _c.config, contentComponents = _d.contentComponents, primaryToolbarComponents = _d.primaryToolbarComponents, secondaryToolbarComponents = _d.secondaryToolbarComponents;
        var refs;
        if (doc && editorView) {
            var dispatch = editorView.dispatch;
            var defaultDoc = doc(editorView.state.schema);
            var tr = editorView.state.tr.replaceWith(0, editorView.state.doc.nodeSize - 2, defaultDoc.content);
            tr.setMeta('addToHistory', false);
            editorView.dispatch(tr);
            refs = defaultDoc.refs;
            if (refs) {
                // Collapsed selection.
                if ('<>' in refs) {
                    setTextSelection(editorView, refs['<>']);
                    // Expanded selection
                }
                else if ('<' in refs || '>' in refs) {
                    if ('<' in refs === false) {
                        throw new Error('A `<` ref must complement a `>` ref.');
                    }
                    if ('>' in refs === false) {
                        throw new Error('A `>` ref must complement a `<` ref.');
                    }
                    setTextSelection(editorView, refs['<'], refs['>']);
                }
                // CellSelection
                else if (refs['<cell'] && refs['cell>']) {
                    var state = editorView.state;
                    var anchorCell = findCellClosestToPos(state.doc.resolve(refs['<cell']));
                    var headCell = findCellClosestToPos(state.doc.resolve(refs['cell>']));
                    if (anchorCell && headCell) {
                        dispatch(state.tr.setSelection(new CellSelection(state.doc.resolve(anchorCell.pos), state.doc.resolve(headCell.pos))));
                    }
                }
            }
        }
        var plugin;
        var pluginState;
        if (pluginKey) {
            plugin = pluginKey.get(editorView.state);
            pluginState = pluginKey.getState(editorView.state);
        }
        return {
            portalProviderAPI: portalProviderAPI,
            editorView: editorView,
            eventDispatcher: eventDispatcher,
            contentComponents: contentComponents,
            primaryToolbarComponents: primaryToolbarComponents,
            secondaryToolbarComponents: secondaryToolbarComponents,
            refs: refs,
            sel: refs ? refs['<>'] : 0,
            plugin: plugin,
            pluginState: pluginState,
        };
    };
}
//# sourceMappingURL=create-editor.js.map