import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { gridSize } from '@atlaskit/theme';

export const ColorCardWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  padding: 1px;
  margin: 2px;
`;

export const ColorPaletteContainer: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  padding: 0 ${gridSize()}px;
  display: flex;
  flex-wrap: wrap;
`;
