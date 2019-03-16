import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { findDomRefAtPos, getSelectionRect, findCellRectClosestToPos, isCellSelection, } from 'prosemirror-utils';
import { Popup, akEditorFloatingOverlapPanelZIndex, } from '@atlaskit/editor-common';
import ContextualMenu from './ContextualMenu';
import { contextualMenuTriggerSize, tablePopupStyles } from '../styles';
import { pluginKey } from '../../pm-plugins/main';
var MenuWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), tablePopupStyles);
// offset of the contextual menu dropdown
var calculateOffset = function (targetCellRef, state) {
    var tableRef = pluginKey.getState(state).tableRef;
    var top = -contextualMenuTriggerSize;
    if (tableRef && targetCellRef) {
        var targetOffset = targetCellRef.getBoundingClientRect();
        var tableOffset = tableRef.getBoundingClientRect();
        var topDiff = targetOffset.top - tableOffset.top;
        if (topDiff < 200) {
            top -= topDiff + 2;
        }
    }
    return [1, top];
};
var FloatingContextualMenu = function (_a) {
    var mountPoint = _a.mountPoint, boundariesElement = _a.boundariesElement, scrollableElement = _a.scrollableElement, editorView = _a.editorView, isOpen = _a.isOpen, targetCellPosition = _a.targetCellPosition, pluginConfig = _a.pluginConfig;
    if (!isOpen || !targetCellPosition) {
        return null;
    }
    var selection = editorView.state.selection;
    var selectionRect = isCellSelection(selection)
        ? getSelectionRect(selection)
        : findCellRectClosestToPos(selection.$from);
    if (!selectionRect) {
        return null;
    }
    var domAtPos = editorView.domAtPos.bind(editorView);
    var targetCellRef = findDomRefAtPos(targetCellPosition, domAtPos);
    if (!targetCellRef) {
        return null;
    }
    return (React.createElement(Popup, { alignX: "right", alignY: "top", target: targetCellRef, mountTo: mountPoint, boundariesElement: boundariesElement, scrollableElement: scrollableElement, fitHeight: 100, fitWidth: 200, 
        // z-index value below is to ensure that this menu is above other floating menu
        // in table, but below floating dialogs like typeaheads, pickers, etc.
        zIndex: akEditorFloatingOverlapPanelZIndex },
        React.createElement(MenuWrapper, null,
            React.createElement(ContextualMenu, { editorView: editorView, offset: calculateOffset(targetCellRef, editorView.state), isOpen: isOpen, targetCellPosition: targetCellPosition, allowMergeCells: pluginConfig.allowMergeCells, allowBackgroundColor: pluginConfig.allowBackgroundColor, selectionRect: selectionRect }))));
};
export default FloatingContextualMenu;
var templateObject_1;
//# sourceMappingURL=index.js.map