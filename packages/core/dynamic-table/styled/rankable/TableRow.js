import styled, { css } from 'styled-components';
import { colors, elevation } from '@findable/theme';
import { TableBodyRow } from '../TableRow';
var rankingStyles = css(["\n  display: block;\n"]);
/**
 * TODO: Pass the props here to get particular theme for the table
 * Skipping it for now as it may impact migration as util-shared-styles does not support this feature
 */

var rankingItemStyles = css(["\n  background-color: ", ";\n  ", " border-radius: 2px;\n"], colors.N20, elevation.e500());

var draggableStyles = function draggableStyles(_ref) {
  var isRanking = _ref.isRanking,
      isRankingItem = _ref.isRankingItem;
  return css(["\n  ", " ", " &:focus {\n    outline-style: solid;\n    outline-color: ", ";\n    outline-width: 2px;\n  }\n"], isRanking && rankingStyles, isRankingItem && rankingItemStyles, colors.B100);
};

export var RankableTableBodyRow = styled(TableBodyRow).withConfig({
  displayName: "TableRow__RankableTableBodyRow",
  componentId: "sc-1a4wxxd-0"
})(["\n  ", ";\n"], draggableStyles);