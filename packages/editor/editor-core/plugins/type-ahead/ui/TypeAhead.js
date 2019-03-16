import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { borderRadius, colors, gridSize, math } from '@atlaskit/theme';
import { Popup, akEditorFloatingDialogZIndex } from '@atlaskit/editor-common';
import { TypeAheadItemsList } from './TypeAheadItemsList';
import { selectByIndex } from '../commands/select-item';
import { setCurrentIndex } from '../commands/set-current-index';
export var TypeAheadContent = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background: ", ";\n  border-radius: ", "px;\n  box-shadow: 0 0 1px ", ", 0 4px 8px -2px ", ";\n  padding: ", "px 0;\n  width: 300px;\n  max-height: 264px; /* 48px(item height) * 5.5(visible items) = 264 */\n  overflow-y: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n  position: relative;\n"], ["\n  background: ", ";\n  border-radius: ", "px;\n  box-shadow: 0 0 1px ", ", 0 4px 8px -2px ", ";\n  padding: ", "px 0;\n  width: 300px;\n  max-height: 264px; /* 48px(item height) * 5.5(visible items) = 264 */\n  overflow-y: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n  position: relative;\n"])), colors.N0, borderRadius(), colors.N60A, colors.N50A, math.divide(gridSize, 2));
export function TypeAhead(_a) {
    var active = _a.active, items = _a.items, isLoading = _a.isLoading, anchorElement = _a.anchorElement, currentIndex = _a.currentIndex, editorView = _a.editorView, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement;
    if (!active || !anchorElement || !items || !items.length) {
        return null;
    }
    return (React.createElement(Popup, { zIndex: akEditorFloatingDialogZIndex, target: anchorElement, mountTo: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, fitHeight: 300, fitWidth: 340, offset: [0, 8] },
        React.createElement(TypeAheadContent, { className: "fabric-editor-typeahead" }, Array.isArray(items) ? (React.createElement(TypeAheadItemsList, { insertByIndex: function (index) {
                return selectByIndex(index)(editorView.state, editorView.dispatch);
            }, setCurrentIndex: function (index) {
                return setCurrentIndex(index)(editorView.state, editorView.dispatch);
            }, items: items, currentIndex: currentIndex })) : !items && isLoading ? ('loading...') : ('no items'))));
}
var templateObject_1;
//# sourceMappingURL=TypeAhead.js.map