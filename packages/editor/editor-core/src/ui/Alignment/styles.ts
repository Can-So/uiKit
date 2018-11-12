import styled from 'styled-components';
// @ts-ignore: unused variable
// prettier-ignore
import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import { gridSize } from '@atlaskit/theme';

export const AlignmentWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  padding: 0 ${gridSize()}px;
  display: flex;
  flex-wrap: wrap;
`;
