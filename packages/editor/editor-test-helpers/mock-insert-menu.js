var _this = this;
import * as tslib_1 from "tslib";
import * as React from 'react';
import { bodiedExtensionData } from './mock-extension-data';
import DevIcon from '@findable/icon/glyph/editor/code';
export var customInsertMenuItems = [
    {
        content: 'Import',
        value: { name: 'import' },
        tooltipDescription: 'import',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "dev" }),
        onClick: function (editorActions) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var input;
            return tslib_1.__generator(this, function (_a) {
                input = prompt('Import from?');
                if (input !== null) {
                    editorActions.replaceDocument(input);
                }
                return [2 /*return*/];
            });
        }); },
    },
    {
        content: 'Inline macro (EH)',
        value: { name: 'inline-eh' },
        tooltipDescription: 'Inline macro (Using extension handlers)',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "Inline macro (EH)" }),
        onClick: function (editorActions) {
            editorActions.replaceSelection({
                type: 'inlineExtension',
                attrs: {
                    extensionType: 'com.atlassian.confluence.macro.core',
                    extensionKey: 'inline-eh',
                    text: 'Inline extension demo',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
            });
        },
    },
    {
        content: 'Block macro (EH)',
        value: { name: 'block-eh' },
        tooltipDescription: 'Block macro (Using extension handlers)',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "Block macro (EH)" }),
        className: 'block-macro',
        onClick: function (editorActions) {
            editorActions.replaceSelection({
                type: 'extension',
                attrs: {
                    extensionType: 'com.atlassian.confluence.macro.core',
                    extensionKey: 'block-eh',
                    text: 'Block extension demo',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
            });
        },
    },
    {
        content: 'Bodied macro (EH)',
        value: { name: 'bodied-eh' },
        tooltipDescription: 'Bodied macro (Using extension handlers)',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "Bodied macro (EH)" }),
        className: 'bodied-macro',
        onClick: function (editorActions) {
            editorActions.replaceSelection({
                type: 'bodiedExtension',
                attrs: {
                    extensionType: 'com.atlassian.confluence.macro.core',
                    extensionKey: 'bodied-eh',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
                content: [
                    {
                        type: 'paragraph',
                        content: [],
                    },
                ],
            });
        },
    },
    {
        content: 'Bodied macro (NON-EH)',
        value: { name: 'bodied-non-eh' },
        tooltipDescription: 'Bodied macro',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "Bodied macro (NON-EH)" }),
        onClick: function (editorActions) {
            editorActions.replaceSelection({
                type: 'bodiedExtension',
                attrs: {
                    extensionType: 'com.atlassian.confluence.macro.core',
                    extensionKey: 'bodied-non-eh',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            macroId: { value: new Date().valueOf() },
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
                content: [
                    {
                        type: 'paragraph',
                        content: [],
                    },
                ],
            });
        },
    },
    {
        content: 'Lorem ipsum',
        value: { name: 'lorem-ipsum' },
        tooltipDescription: 'Insert lorem ipsum text',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "dev" }),
        onClick: function (editorActions) {
            editorActions.appendText('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mi nisl, venenatis eget auctor vitae, venenatis quis lorem. Suspendisse maximus tortor vel dui tincidunt cursus. Vestibulum magna nibh, auctor non auctor id, finibus vitae orci. Nulla viverra ipsum et nunc fringilla ultricies. Pellentesque vitae felis molestie justo finibus accumsan. Suspendisse potenti. Nulla facilisi. Integer dignissim quis velit quis elementum. Sed sit amet varius ante. Duis vestibulum porta augue eu laoreet. Morbi id risus et augue sollicitudin aliquam. In et ligula dolor. Nam ac aliquet diam.');
        },
    },
    {
        content: 'Info macro',
        value: { name: 'info' },
        tooltipDescription: 'Insert info macro',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "dev" }),
        onClick: function (editorActions) {
            editorActions.replaceSelection({
                type: 'inlineExtension',
                attrs: {
                    extensionType: 'com.atlassian.confluence.macro.core',
                    extensionKey: 'info',
                    parameters: {
                        macroParams: {},
                        macroMetadata: {
                            macroId: { value: new Date().valueOf() },
                            placeholder: [
                                {
                                    data: { url: '' },
                                    type: 'icon',
                                },
                            ],
                        },
                    },
                },
            });
        },
    },
    {
        content: 'Open macro browser',
        value: { name: 'macro-browser' },
        tooltipDescription: 'Open macro browser',
        tooltipPosition: 'right',
        elemBefore: React.createElement(DevIcon, { label: "dev" }),
        onClick: function (editorActions) {
            // tslint:disable-next-line:no-console
            console.log('Fake promise that simulates the macro browser opening. Will resolve in 1 sec with a selected macro to be inserted.');
            var openMacroBrowser = new Promise(function (resolve) {
                window.setTimeout(function () {
                    resolve(bodiedExtensionData[0]);
                }, 1000);
            });
            openMacroBrowser.then(function (macro) { return editorActions.replaceSelection(macro); });
        },
    },
];
//# sourceMappingURL=mock-insert-menu.js.map