// @flow
import styled from 'styled-components';
import { gridSize } from '@findable/theme';

const ElemBefore = styled.div`
  display: flex;
  padding-right: ${gridSize}px;
`;

ElemBefore.displayName = 'TriggerElemBefore';

export default ElemBefore;
