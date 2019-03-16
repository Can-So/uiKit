import styled from 'styled-components';
import { colors, themed } from '@findable/theme';
var ThemeColor = themed({
  light: colors.N300,
  dark: colors.N300
});
var BreadcrumbsContainer = styled.div.withConfig({
  displayName: "BreadcrumbsContainer",
  componentId: "tgj96-0"
})(["\n  color: ", ";\n  display: flex;\n  flex-wrap: wrap;\n"], ThemeColor);
BreadcrumbsContainer.displayName = 'BreadcrumbsContainer';
export default BreadcrumbsContainer;