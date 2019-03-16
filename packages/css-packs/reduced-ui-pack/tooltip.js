import { colors, gridSize } from '@findable/theme';
import css from './utils/evaluate-inner';
var grid = gridSize() / 2;
var fontSize = 3 * grid;
var lineHeight = 4 * grid / fontSize;
var fontColor = 'white';
var maxWidth = 105 * grid; // ~420px

var borderRadius = '3px';
var leftAndRightTextPadding = 2 * grid;
var topAndBottomPadding = grid / 2;
var marginDistance = 2 * grid;
export default css(["\n  a[href][data-ak-tooltip],\n  button[data-ak-tooltip] {\n    overflow: visible;\n    position: relative;\n  }\n  a[href][data-ak-tooltip]:hover::after,\n  button[data-ak-tooltip]:hover::after,\n  a[href][data-ak-tooltip]:focus::after,\n  button[data-ak-tooltip]:focus::after {\n    background-color: ", ";\n    border-radius: ", ";\n    box-sizing: border-box;\n    color: ", ";\n    content: attr(data-ak-tooltip);\n    display: inline-block;\n    font-size: ", "px;\n    line-height: ", ";\n    max-width: ", "px;\n    overflow: hidden;\n    padding: ", "px ", "px;\n    pointer-events: none;\n    position: absolute;\n    text-decoration: none;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    z-index: 10000;\n  }\n  a[href][data-ak-tooltip][data-ak-tooltip-position='top']::after,\n  button[data-ak-tooltip][data-ak-tooltip-position='top']::after {\n    bottom: 100%;\n    left: 50%;\n    transform: translateX(-50%) translateY(-", "px);\n  }\n  a[href][data-ak-tooltip][data-ak-tooltip-position='right']::after,\n  button[data-ak-tooltip][data-ak-tooltip-position='right']::after {\n    left: 100%;\n    top: 50%;\n    transform: translateY(-50%) translateX(", "px);\n  }\n  a[href][data-ak-tooltip][data-ak-tooltip-position='bottom']::after,\n  button[data-ak-tooltip][data-ak-tooltip-position='bottom']::after {\n    left: 50%;\n    top: 100%;\n    transform: translateX(-50%) translateY(", "px);\n  }\n  a[href][data-ak-tooltip][data-ak-tooltip-position='left']::after,\n  button[data-ak-tooltip][data-ak-tooltip-position='left']::after {\n    top: 50%;\n    transform: translateY(-50%) translateX(-", "px);\n    right: 100%;\n  }\n"], colors.N900, borderRadius, fontColor, fontSize, lineHeight, maxWidth, topAndBottomPadding, leftAndRightTextPadding, marginDistance, marginDistance, marginDistance, marginDistance);