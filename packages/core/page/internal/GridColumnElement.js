import styled from 'styled-components';
import { spacing } from './vars';

var getColumnRatio = function getColumnRatio(props) {
  if (props.medium === props.theme.columns) {
    return '100%';
  }

  return "99.9999% / ".concat(props.theme.columns, " * ").concat(props.medium);
};

var getColumnWidth = function getColumnWidth(props) {
  return props.medium > 0 ? "calc(".concat(getColumnRatio(props), " - ").concat(spacing[props.theme.spacing], "px)") : 'auto';
};

var availableColumns = function availableColumns(props) {
  return props.theme.columns;
};

var specifiedColumns = function specifiedColumns(props) {
  return props.medium ? props.medium : availableColumns(props);
};

var columns = function columns(props) {
  return Math.min(availableColumns(props), specifiedColumns(props));
};

var gridSpacing = function gridSpacing(props) {
  return spacing[props.theme.spacing];
};

var getMaxWidthColumnRatio = function getMaxWidthColumnRatio(props) {
  if (columns(props) >= availableColumns(props)) {
    return '100%';
  }

  return "99.9999% / ".concat(availableColumns(props), " * ").concat(columns(props));
}; // Unable to use the flexbox shorthand rules because Styled Components doesn't
// handle them correctly for IE11.
// Also IE11 and Edge both have rounding issues for flexbox which is why a width of
// 99.9999% is used. Using 100% here causes columns to wrap prematurely.


var GridColumn = styled.div.withConfig({
  displayName: "GridColumnElement__GridColumn",
  componentId: "sc-57x38k-0"
})(["\n  flex-grow: 1;\n  flex-shrink: 0;\n  flex-basis: ", ";\n  margin: 0 ", "px;\n  max-width: calc(", " - ", "px);\n  min-width: calc(99.9999% / ", " - ", "px);\n  word-wrap: break-word;\n"], getColumnWidth, function (props) {
  return spacing[props.theme.spacing] / 2;
}, getMaxWidthColumnRatio, gridSpacing, availableColumns, gridSpacing);
export default GridColumn;
export { getColumnWidth };