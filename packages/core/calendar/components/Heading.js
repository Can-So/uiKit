import ArrowleftIcon from '@findable/icon/glyph/chevron-left-large';
import ArrowrightIcon from '@findable/icon/glyph/chevron-right-large';
import { colors } from '@findable/theme';
import React from 'react';
import styled from 'styled-components';
import { getMonthName } from '../util';
import Btn from './Btn';
import { Heading, MonthAndYear } from '../styled/Heading';
var ArrowLeft = styled.div.withConfig({
  displayName: "Heading__ArrowLeft",
  componentId: "sc-1wqpjt8-0"
})(["\n  margin-left: 8px;\n"]);
var ArrowRight = styled.div.withConfig({
  displayName: "Heading__ArrowRight",
  componentId: "sc-1wqpjt8-1"
})(["\n  margin-right: 8px;\n"]);
export default (function (props) {
  return React.createElement(Heading, {
    "aria-hidden": "true"
  }, React.createElement(ArrowLeft, null, React.createElement(Btn, {
    onClick: props.handleClickPrev
  }, React.createElement(ArrowleftIcon, {
    label: "Last month",
    size: "medium",
    primaryColor: colors.N70
  }))), React.createElement(MonthAndYear, null, "".concat(getMonthName(props.month), " ").concat(props.year)), React.createElement(ArrowRight, null, React.createElement(Btn, {
    onClick: props.handleClickNext
  }, React.createElement(ArrowrightIcon, {
    label: "Next month",
    size: "medium",
    primaryColor: colors.N70
  }))));
});