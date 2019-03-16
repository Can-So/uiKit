import * as React from 'react';
import InfoIcon from '@findable/icon/glyph/editor/info';
import EditorWarningIcon from '@findable/icon/glyph/editor/warning';
import EditorErrorIcon from '@findable/icon/glyph/editor/error';
import EditorSuccessIcon from '@findable/icon/glyph/editor/success';
import EditorNoteIcon from '@findable/icon/glyph/editor/note';
import { panel } from '@findable/adf-schema';
import { messages } from '../block-type/types';
import { createPlugin } from './pm-plugins/main';
import { getToolbarConfig } from './toolbar';
import keymap from './pm-plugins/keymaps';
import { addAnalytics, } from '../analytics';
var insertPanelTypeWithAnalytics = function (panelType, state, insert) {
    var tr = insert(insertPanelType(panelType, state));
    if (tr) {
        addAnalytics(tr, {
            action: "inserted" /* INSERTED */,
            actionSubject: "document" /* DOCUMENT */,
            actionSubjectId: "panel" /* PANEL */,
            attributes: {
                inputMethod: "quickInsert" /* QUICK_INSERT */,
                panelType: panelType,
            },
            eventType: "track" /* TRACK */,
        });
    }
    return tr;
};
var insertPanelType = function (panelType, state) {
    return state.schema.nodes.panel.createChecked({ panelType: panelType }, state.schema.nodes.paragraph.createChecked());
};
var panelPlugin = {
    nodes: function () {
        return [{ name: 'panel', node: panel }];
    },
    pmPlugins: function () {
        return [
            { name: 'panel', plugin: createPlugin },
            {
                name: 'panelKeyMap',
                plugin: function () { return keymap(); },
            },
        ];
    },
    pluginsOptions: {
        quickInsert: function (_a) {
            var formatMessage = _a.formatMessage;
            return [
                {
                    title: formatMessage(messages.panel),
                    keywords: ['info'],
                    priority: 900,
                    icon: function () { return React.createElement(InfoIcon, { label: formatMessage(messages.panel) }); },
                    action: function (insert, state) {
                        return insertPanelTypeWithAnalytics("info" /* INFO */, state, insert);
                    },
                },
                {
                    title: formatMessage(messages.notePanel),
                    keywords: ['note'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorNoteIcon, { label: formatMessage(messages.notePanel) })); },
                    action: function (insert, state) {
                        return insertPanelTypeWithAnalytics("note" /* NOTE */, state, insert);
                    },
                },
                {
                    title: formatMessage(messages.successPanel),
                    keywords: ['success', 'tip'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorSuccessIcon, { label: formatMessage(messages.successPanel) })); },
                    action: function (insert, state) {
                        return insertPanelTypeWithAnalytics("success" /* SUCCESS */, state, insert);
                    },
                },
                {
                    title: formatMessage(messages.warningPanel),
                    keywords: ['warning'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorWarningIcon, { label: formatMessage(messages.warningPanel) })); },
                    action: function (insert, state) {
                        return insertPanelTypeWithAnalytics("warning" /* WARNING */, state, insert);
                    },
                },
                {
                    title: formatMessage(messages.errorPanel),
                    keywords: ['error'],
                    priority: 1000,
                    icon: function () { return (React.createElement(EditorErrorIcon, { label: formatMessage(messages.errorPanel) })); },
                    action: function (insert, state) {
                        return insertPanelTypeWithAnalytics("error" /* ERROR */, state, insert);
                    },
                },
            ];
        },
        floatingToolbar: getToolbarConfig,
    },
};
export default panelPlugin;
//# sourceMappingURL=index.js.map