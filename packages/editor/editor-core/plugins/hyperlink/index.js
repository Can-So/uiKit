import * as React from 'react';
import { link } from '@atlaskit/adf-schema';
import { createInputRulePlugin } from './pm-plugins/input-rule';
import { createKeymapPlugin } from './pm-plugins/keymap';
import { plugin, stateKey, LinkAction } from './pm-plugins/main';
import fakeCursorToolbarPlugin from './pm-plugins/fake-cursor-for-toolbar';
import EditorSuccessIcon from '@atlaskit/icon/glyph/editor/success';
import { addAnalytics, } from '../analytics';
import { getToolbarConfig } from './Toolbar';
var hyperlinkPlugin = {
    marks: function () {
        return [{ name: 'link', mark: link }];
    },
    pmPlugins: function () {
        return [
            { name: 'hyperlink', plugin: function (_a) {
                    var dispatch = _a.dispatch;
                    return plugin(dispatch);
                } },
            {
                name: 'fakeCursorToolbarPlugin',
                plugin: function () { return fakeCursorToolbarPlugin; },
            },
            {
                name: 'hyperlinkInputRule',
                plugin: function (_a) {
                    var schema = _a.schema;
                    return createInputRulePlugin(schema);
                },
            },
            {
                name: 'hyperlinkKeymap',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return createKeymapPlugin(schema, props);
                },
            },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: 'Hyperlink',
                    keywords: ['url', 'link', 'hyperlink'],
                    priority: 1200,
                    icon: function () { return React.createElement(EditorSuccessIcon, { label: 'Hyperlink' }); },
                    action: function (insert, state) {
                        var pos = state.selection.from;
                        var nodeBefore = state.selection.$from.nodeBefore;
                        if (!nodeBefore) {
                            return false;
                        }
                        var tr = state.tr
                            .setMeta(stateKey, LinkAction.SHOW_INSERT_TOOLBAR)
                            .delete(pos - nodeBefore.nodeSize, pos);
                        return addAnalytics(tr, {
                            action: "invoked" /* INVOKED */,
                            actionSubject: "typeAhead" /* TYPEAHEAD */,
                            actionSubjectId: "linkTypeAhead" /* TYPEAHEAD_LINK */,
                            attributes: { inputMethod: "quickInsert" /* QUICK_INSERT */ },
                            eventType: "ui" /* UI */,
                        });
                    },
                },
            ];
        },
        floatingToolbar: getToolbarConfig,
    },
};
export default hyperlinkPlugin;
//# sourceMappingURL=index.js.map