import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
/**
 * Provide a styled container for form headers.
 */

export var FormFooterWrapper = styled.footer.withConfig({
  displayName: "FormFooter__FormFooterWrapper",
  componentId: "jnns5q-0"
})(["\n  margin-top: ", "px;\n  display: flex;\n  justify-content: flex-end;\n"], math.multiply(gridSize, 3));