/* eslint no-confusing-arrow: 0 */
import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
var wrapperBackgroundColor = themed({
  light: colors.N0,
  dark: colors.N700
});
var getCalendarThColor = themed({
  light: colors.N200,
  dark: colors.N200
});
export var Announcer = styled.div.withConfig({
  displayName: "Calendar__Announcer",
  componentId: "sc-3j1sll-0"
})(["\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n"]);
export var CalendarTable = styled.table.withConfig({
  displayName: "Calendar__CalendarTable",
  componentId: "sc-3j1sll-1"
})(["\n  display: inline-block;\n  margin: 0;\n  text-align: center;\n"]);
export var CalendarTbody = styled.tbody.withConfig({
  displayName: "Calendar__CalendarTbody",
  componentId: "sc-3j1sll-2"
})(["\n  border: 0;\n"]); // FIXME: first-child
// @atlaskit/css-reset should adjust default behaviours

var thSpacing = css(["\n  padding: 8px 8px;\n  min-width: 40px;\n  box-sizing: border-box;\n"]);
export var CalendarTh = styled.th.withConfig({
  displayName: "Calendar__CalendarTh",
  componentId: "sc-3j1sll-3"
})(["\n  border: 0;\n  color: ", ";\n  font-size: 11px;\n  ", ";\n  text-transform: uppercase;\n  text-align: center;\n\n  &:last-child,\n  &:first-child {\n    ", ";\n  }\n"], getCalendarThColor, thSpacing, thSpacing);
export var CalendarThead = styled.thead.withConfig({
  displayName: "Calendar__CalendarThead",
  componentId: "sc-3j1sll-4"
})(["\n  border: 0;\n"]);
export var Wrapper = styled.div.withConfig({
  displayName: "Calendar__Wrapper",
  componentId: "sc-3j1sll-5"
})(["\n  background-color: ", ";\n  color: ", ";\n  display: inline-block;\n  padding: 16px;\n  user-select: none;\n  box-sizing: border-box;\n  outline: none;\n"], wrapperBackgroundColor, colors.text);