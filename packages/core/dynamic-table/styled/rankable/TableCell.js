import styled, { css } from 'styled-components';
import { TableBodyCell } from '../TableCell';
var rankingStyles = css(["\n  box-sizing: border-box;\n"]);
export var RankableTableBodyCell = styled(TableBodyCell).withConfig({
  displayName: "TableCell__RankableTableBodyCell",
  componentId: "sc-28lmst-0"
})(["\n  ", ";\n"], function (_ref) {
  var isRanking = _ref.isRanking;
  return isRanking && rankingStyles;
});