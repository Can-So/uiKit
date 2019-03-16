import styled from 'styled-components';
import { gridSize, fontSize } from '@findable/theme';
var height = gridSize() * 3 / parseInt(fontSize(), 10);
var BreadcrumbsItemElement = styled.div.withConfig({
  displayName: "BreadcrumbsItem__BreadcrumbsItemElement",
  componentId: "sc-1hh8yo5-0"
})(["\n  display: flex;\n  flex-direction: row;\n  height: ", "em;\n  line-height: ", "em;\n  padding: 0;\n  box-sizing: border-box;\n  max-width: 100%;\n"], height, height);
BreadcrumbsItemElement.displayName = 'BreadcrumbsItemElement';
export default BreadcrumbsItemElement;