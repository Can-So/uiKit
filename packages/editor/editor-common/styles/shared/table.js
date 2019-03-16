import * as tslib_1 from "tslib";
import { css } from 'styled-components';
import { fontSize, themed } from '@findable/theme';
import { akEditorTableBorder, akEditorTableBorderDark, akEditorTableToolbar, akEditorTableToolbarDark, akEditorWideLayoutWidth, akEditorTableNumberColumnWidth, akEditorFullWidthLayoutWidth, akEditorBreakoutPadding, } from '../consts';
import { PanelSharedCssClassName } from './panel';
export var tableMarginTop = 24;
export var tableMarginBottom = 16;
export var tableMarginSides = 8;
export var tableCellMinWidth = 48;
export var tableNewColumnMinWidth = 140;
export var tableCellBorderWidth = 1;
var clPrefix = 'pm-table-';
export var TableSharedCssClassName = {
    TABLE_CONTAINER: clPrefix + "container",
    TABLE_NODE_WRAPPER: clPrefix + "wrapper",
    TABLE_LEFT_SHADOW: clPrefix + "with-left-shadow",
    TABLE_RIGHT_SHADOW: clPrefix + "with-right-shadow",
    TABLE_CELL_NODEVIEW_CONTENT_DOM: clPrefix + "cell-nodeview-content-dom",
};
var tableSharedStyle = css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .", " {\n    position: relative;\n    margin: 0 auto ", "px;\n    box-sizing: border-box;\n\n    /**\n     * Fix block top alignment inside table cells.\n     */\n    .code-block,\n    .", ",\n    .taskItemView-content-wrap > div,\n    .decisionItemView-content-wrap > div {\n      margin-top: 0;\n    }\n  }\n  .", "[data-number-column='true'] {\n    padding-left: ", "px;\n  }\n  /* avoid applying styles to nested tables (possible via extensions) */\n  .", " > table,\n  .", " > table {\n    border-collapse: collapse;\n    margin: ", "px ", "px 0;\n    border: ", "px solid ", ";\n    table-layout: fixed;\n    font-size: ", "px;\n    width: 100%;\n\n    &[data-autosize='true'] {\n      table-layout: auto;\n    }\n\n    & {\n      * {\n        box-sizing: border-box;\n      }\n\n      tbody {\n        border-bottom: none;\n      }\n      th td {\n        background-color: white;\n        font-weight: normal;\n      }\n      th,\n      td {\n        min-width: ", "px;\n        height: 3em;\n        vertical-align: top;\n        border: 1px solid ", ";\n        border-right-width: 0;\n        border-bottom-width: 0;\n        padding: 10px;\n        /* https://stackoverflow.com/questions/7517127/borders-not-shown-in-firefox-with-border-collapse-on-table-position-relative-o */\n        background-clip: padding-box;\n\n        th p:not(:first-of-type),\n        td p:not(:first-of-type) {\n          margin-top: 12px;\n        }\n      }\n      th {\n        background-color: ", ";\n        text-align: left;\n        & *:not(strong) {\n          font-weight: normal;\n        }\n        & .", " > p {\n          font-weight: bold;\n        }\n      }\n    }\n  }\n"], ["\n  .", " {\n    position: relative;\n    margin: 0 auto ", "px;\n    box-sizing: border-box;\n\n    /**\n     * Fix block top alignment inside table cells.\n     */\n    .code-block,\n    .", ",\n    .taskItemView-content-wrap > div,\n    .decisionItemView-content-wrap > div {\n      margin-top: 0;\n    }\n  }\n  .", "[data-number-column='true'] {\n    padding-left: ", "px;\n  }\n  /* avoid applying styles to nested tables (possible via extensions) */\n  .", " > table,\n  .", " > table {\n    border-collapse: collapse;\n    margin: ", "px ", "px 0;\n    border: ", "px solid ",
    ";\n    table-layout: fixed;\n    font-size: ", "px;\n    width: 100%;\n\n    &[data-autosize='true'] {\n      table-layout: auto;\n    }\n\n    & {\n      * {\n        box-sizing: border-box;\n      }\n\n      tbody {\n        border-bottom: none;\n      }\n      th td {\n        background-color: white;\n        font-weight: normal;\n      }\n      th,\n      td {\n        min-width: ", "px;\n        height: 3em;\n        vertical-align: top;\n        border: 1px solid ",
    ";\n        border-right-width: 0;\n        border-bottom-width: 0;\n        padding: 10px;\n        /* https://stackoverflow.com/questions/7517127/borders-not-shown-in-firefox-with-border-collapse-on-table-position-relative-o */\n        background-clip: padding-box;\n\n        th p:not(:first-of-type),\n        td p:not(:first-of-type) {\n          margin-top: 12px;\n        }\n      }\n      th {\n        background-color: ",
    ";\n        text-align: left;\n        & *:not(strong) {\n          font-weight: normal;\n        }\n        & .", " > p {\n          font-weight: bold;\n        }\n      }\n    }\n  }\n"])), TableSharedCssClassName.TABLE_CONTAINER, tableMarginBottom, PanelSharedCssClassName.PANEL_CONTAINER, TableSharedCssClassName.TABLE_CONTAINER, akEditorTableNumberColumnWidth - 1, TableSharedCssClassName.TABLE_CONTAINER, TableSharedCssClassName.TABLE_NODE_WRAPPER, tableMarginTop, tableMarginSides, tableCellBorderWidth, themed({
    light: akEditorTableBorder,
    dark: akEditorTableBorderDark,
}), fontSize(), tableCellMinWidth, themed({
    light: akEditorTableBorder,
    dark: akEditorTableBorderDark,
}), themed({
    light: akEditorTableToolbar,
    dark: akEditorTableToolbarDark,
}), TableSharedCssClassName.TABLE_CELL_NODEVIEW_CONTENT_DOM);
export var calcTableWidth = function (layout, containerWidth, addControllerPadding) {
    if (addControllerPadding === void 0) { addControllerPadding = true; }
    switch (layout) {
        case 'full-width':
            return containerWidth
                ? Math.min(containerWidth -
                    (addControllerPadding ? akEditorBreakoutPadding : 0), akEditorFullWidthLayoutWidth) + "px"
                : akEditorFullWidthLayoutWidth + "px";
        case 'wide':
            if (containerWidth) {
                return Math.min(containerWidth - (addControllerPadding ? akEditorBreakoutPadding : 0), akEditorWideLayoutWidth) + "px";
            }
            return akEditorWideLayoutWidth + "px";
        default:
            return 'inherit';
    }
};
export { tableSharedStyle };
var templateObject_1;
//# sourceMappingURL=table.js.map