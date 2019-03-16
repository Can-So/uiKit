import styled from 'styled-components';
import { colors, themed } from '@findable/theme';
var Required = styled.span.withConfig({
  displayName: 'Required',
  componentId: 'sc-3x36v2-0',
})(
  ['\n  color: ', ';\n'],
  themed({
    light: colors.R500,
    dark: colors.R300,
  }),
);
export default Required;
