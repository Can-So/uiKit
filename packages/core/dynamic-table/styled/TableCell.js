import styled from 'styled-components';
import { onClickStyle, truncateStyle, cellStyle } from './constants';
export var TableBodyCell = styled.td.withConfig({
  displayName: "TableCell__TableBodyCell",
  componentId: "sc-1mgclzx-0"
})(["\n  ", " ", " ", ";\n"], function (props) {
  return onClickStyle(props);
}, function (props) {
  return truncateStyle(props);
}, cellStyle);