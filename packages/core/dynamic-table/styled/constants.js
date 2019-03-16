import { css } from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
import { ASC, DESC } from '../internal/constants';
import { arrow } from '../theme';
export var truncateStyle = function truncateStyle(_ref) {
  var width = _ref.width,
      isFixedSize = _ref.isFixedSize,
      shouldTruncate = _ref.shouldTruncate;
  return css(["\n  ", " ", ";\n  ", ";\n"], width ? css(["\n        width: ", "%;\n      "], width) : '', isFixedSize ? css(["\n        overflow: hidden;\n      "]) : '', isFixedSize && shouldTruncate ? css(["\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      "]) : '');
};
export var onClickStyle = function onClickStyle(_ref2) {
  var onClick = _ref2.onClick;
  return onClick && css(["\n    &:hover {\n      cursor: pointer;\n    }\n  "]);
};
export var arrowsStyle = function arrowsStyle(props) {
  var isSortable = props.isSortable,
      sortOrder = props.sortOrder;
  if (!isSortable) return '';
  var pseudoBase = css(["\n    border: 3px solid transparent;\n    display: block;\n    height: 0;\n    position: absolute;\n    right: -", "px;\n    width: 0;\n  "], gridSize);
  return css(["\n    & > span {\n      position: relative;\n      &::before {\n        ", ";\n        border-bottom: 3px solid\n          ", ";\n        bottom: 8px;\n        content: ' ';\n      }\n      &::after {\n        ", ";\n        border-top: 3px solid\n          ", ";\n        bottom: 0;\n        content: ' ';\n      }\n    }\n\n    &:hover > span {\n      &::before {\n        border-bottom: 3px solid\n          ", ";\n      }\n      &::after {\n        border-top: 3px solid\n          ", ";\n      }\n    }\n  "], pseudoBase, sortOrder === ASC ? arrow.selectedColor(props) : arrow.defaultColor(props), pseudoBase, sortOrder === DESC ? arrow.selectedColor(props) : arrow.defaultColor(props), sortOrder === ASC ? arrow.selectedColor(props) : arrow.hoverColor(props), sortOrder === DESC ? arrow.selectedColor(props) : arrow.hoverColor(props));
};
export var cellStyle = css(["\n  border: none;\n  padding: ", "px ", "px;\n  text-align: left;\n\n  &:first-child {\n    padding-left: 0;\n  }\n  &:last-child {\n    padding-right: 0;\n  }\n"], math.divide(gridSize, 2), gridSize);