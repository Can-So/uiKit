import * as tslib_1 from "tslib";
import * as React from 'react';
import * as classnames from 'classnames';
import { withTheme } from 'styled-components';
import { PluginKey } from 'prosemirror-state';
import { akEditorFullPageMaxWidth, akEditorBreakoutPadding, breakoutWideScaleRatio, } from '@findable/editor-common';
import { pluginKey as widthPlugin } from '../width/index';
import WithPluginState from '../../ui/WithPluginState';
import { createDispatch } from '../../event-dispatcher';
export var stateKey = new PluginKey('gridPlugin');
export var GRID_SIZE = 12;
export var createDisplayGrid = function (eventDispatcher) {
    var dispatch = createDispatch(eventDispatcher);
    return function (show, type, highlight) {
        if (highlight === void 0) { highlight = []; }
        return dispatch(stateKey, {
            visible: show,
            gridType: type,
            highlight: highlight,
        });
    };
};
export var gridTypeForLayout = function (layout) {
    return layout === 'wrap-left' || layout === 'wrap-right' ? 'wrapped' : 'full';
};
var sides = ['left', 'right'];
var overflowHighlight = function (highlights, side, start, size) {
    if (!highlights.length) {
        return false;
    }
    var minHighlight = highlights.reduce(function (prev, cur) {
        return Math.min(prev, cur);
    });
    var maxHighlight = highlights.reduce(function (prev, cur) {
        return Math.max(prev, cur);
    });
    if (side === 'left') {
        return (minHighlight < 0 &&
            minHighlight <= -start &&
            (typeof size === 'number' ? minHighlight >= -(start + size) : true));
    }
    else {
        return (maxHighlight > GRID_SIZE &&
            maxHighlight >= GRID_SIZE + start &&
            (typeof size === 'number' ? maxHighlight <= GRID_SIZE + size : true));
    }
};
var gutterGridLines = function (appearance, editorMaxWidth, editorWidth, highlights) {
    var gridLines = [];
    if (appearance !== 'full-page') {
        return gridLines;
    }
    var wideSpacing = (editorMaxWidth * breakoutWideScaleRatio - editorMaxWidth) / 2;
    sides.forEach(function (side) {
        var _a, _b;
        gridLines.push(React.createElement("div", { key: side, className: classnames('gridLine', overflowHighlight(highlights, side, 0, 4) ? 'highlight' : ''), style: (_a = { position: 'absolute' }, _a[side] = "-" + wideSpacing + "px", _a) }));
        gridLines.push(React.createElement("div", { key: side + '-bk', className: classnames('gridLine', highlights.indexOf('full-width') > -1 ? 'highlight' : ''), style: (_b = {
                    position: 'absolute'
                },
                _b[side] = "-" + (editorWidth - editorMaxWidth - akEditorBreakoutPadding) /
                    2 + "px",
                _b) }));
    });
    return gridLines;
};
var lineLengthGridLines = function (highlights) {
    var gridLines = [];
    var gridSpacing = 100 / GRID_SIZE;
    for (var i = 0; i <= GRID_SIZE; i++) {
        var style = {
            paddingLeft: gridSpacing + "%",
        };
        gridLines.push(React.createElement("div", { key: i, className: classnames('gridLine', highlights.indexOf(i) > -1 ? 'highlight' : ''), style: i < GRID_SIZE ? style : undefined }));
    }
    return gridLines;
};
var Grid = /** @class */ (function (_super) {
    tslib_1.__extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        var _a = this.props, highlight = _a.highlight, appearance = _a.appearance, theme = _a.theme, containerElement = _a.containerElement, editorWidth = _a.editorWidth, gridType = _a.gridType, visible = _a.visible;
        var editorMaxWidth = theme.layoutMaxWidth;
        var gridLines = tslib_1.__spread(lineLengthGridLines(highlight), gutterGridLines(appearance, editorMaxWidth, editorWidth, highlight));
        return (React.createElement("div", { className: "gridParent" },
            React.createElement("div", { className: classnames('gridContainer', gridType, !visible ? 'hidden' : ''), style: {
                    height: containerElement.scrollHeight + "px",
                } }, gridLines)));
    };
    return Grid;
}(React.Component));
var ThemedGrid = withTheme(Grid);
var gridPlugin = {
    contentComponent: function (_a) {
        var editorView = _a.editorView, appearance = _a.appearance;
        return (React.createElement(WithPluginState, { plugins: {
                grid: stateKey,
                widthState: widthPlugin,
            }, render: function (_a) {
                var grid = _a.grid, _b = _a.widthState, widthState = _b === void 0 ? { width: akEditorFullPageMaxWidth } : _b;
                if (!grid) {
                    return null;
                }
                return (React.createElement(ThemedGrid, tslib_1.__assign({ appearance: appearance, editorWidth: widthState.width, containerElement: editorView.dom }, grid)));
            } }));
    },
};
export default gridPlugin;
export { GRID_GUTTER } from './styles';
//# sourceMappingURL=index.js.map