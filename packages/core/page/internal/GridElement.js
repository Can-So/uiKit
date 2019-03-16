import styled from 'styled-components';
import { defaultGridColumnWidth, spacing } from './vars';

var getMargin = function getMargin(props) {
  return props.theme.isNestedGrid ? "-".concat(spacing[props.theme.spacing], "px") : 'auto';
};

var getMaxWidth = function getMaxWidth(props) {
  return props.layout === 'fixed' ? "".concat(defaultGridColumnWidth * props.theme.columns, "px") : '100%';
};

var getPadding = function getPadding(props) {
  return "".concat(spacing[props.theme.spacing] / 2, "px");
};

var Grid = styled.div.withConfig({
  displayName: "GridElement__Grid",
  componentId: "sc-6y1aox-0"
})(["\n  align-items: flex-start;\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 ", ";\n  max-width: ", ";\n  padding: 0 ", ";\n  position: relative;\n"], getMargin, getMaxWidth, getPadding);
export default Grid;
export { getMargin, getMaxWidth, getPadding };