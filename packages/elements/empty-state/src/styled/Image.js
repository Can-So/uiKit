// @flow

import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

const Image = styled.img`
  max-width: ${props => props.maxWidth}px;
  max-height: ${props => props.maxHeight}px;
  margin: 0 auto ${gridSize() * 3}px;
  display: block;
`;

export default Image;
