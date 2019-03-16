import styled, { css } from 'styled-components';
import { onClickStyle, truncateStyle, arrowsStyle, cellStyle } from './constants';
import { head } from '../theme';
var rankingStyles = css(["\n  display: block;\n"]);
export var Head = styled.thead.withConfig({
  displayName: "TableHead__Head",
  componentId: "jor6xq-0"
})(["\n  border-bottom: 2px solid ", ";\n\n  ", ";\n"], head.borderColor, function (_ref) {
  var isRanking = _ref.isRanking;
  return isRanking && rankingStyles;
});
export var HeadCell = styled.th.withConfig({
  displayName: "TableHead__HeadCell",
  componentId: "jor6xq-1"
})(["\n  ", " ", " ", " ", " border: none;\n  color: ", ";\n  box-sizing: border-box;\n  font-size: 12px;\n  font-weight: 600;\n  position: relative;\n  text-align: left;\n  vertical-align: top;\n"], function (p) {
  return onClickStyle(p);
}, function (p) {
  return truncateStyle(p);
}, function (p) {
  return arrowsStyle(p);
}, cellStyle, head.textColor);