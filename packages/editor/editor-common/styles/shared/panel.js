import * as tslib_1 from "tslib";
// @ts-ignore: unused variable
// prettier-ignore
import { css } from 'styled-components';
import { gridSize, borderRadius } from '@findable/theme';
import { relativeSize, akEditorTableCellMinWidth } from '../consts';
export var PanelSharedCssClassName = {
    PANEL_CONTAINER: 'ak-editor-panel',
};
export var panelSharedStyles = css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  & .", " {\n    border-radius: ", "px;\n    margin: ", "px 0;\n    padding: ", "px;\n    min-width: ", "px;\n    display: flex;\n    align-items: baseline;\n    word-break: break-word;\n\n    .ak-editor-panel__icon {\n      display: block;\n      flex-shrink: 0;\n      height: ", "px;\n      width: ", "px;\n      box-sizing: content-box;\n      padding-right: ", "px;\n\n      > span {\n        vertical-align: middle;\n        display: inline;\n      }\n    }\n\n    .ak-editor-panel__content {\n      margin: 1px 0 1px;\n      flex: 1 0 0;\n    }\n  }\n"], ["\n  & .", " {\n    border-radius: ", "px;\n    margin: ", "px 0;\n    padding: ", "px;\n    min-width: ", "px;\n    display: flex;\n    align-items: baseline;\n    word-break: break-word;\n\n    .ak-editor-panel__icon {\n      display: block;\n      flex-shrink: 0;\n      height: ", "px;\n      width: ", "px;\n      box-sizing: content-box;\n      padding-right: ", "px;\n\n      > span {\n        vertical-align: middle;\n        display: inline;\n      }\n    }\n\n    .ak-editor-panel__content {\n      margin: 1px 0 1px;\n      flex: 1 0 0;\n    }\n  }\n"])), PanelSharedCssClassName.PANEL_CONTAINER, borderRadius(), relativeSize(1.142), gridSize(), akEditorTableCellMinWidth, gridSize() * 3, gridSize() * 3, gridSize());
var templateObject_1;
//# sourceMappingURL=panel.js.map