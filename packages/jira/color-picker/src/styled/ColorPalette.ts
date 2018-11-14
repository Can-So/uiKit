import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import { gridSize } from '@atlaskit/theme';

export const ColorCardWrapper: ComponentClass<HTMLAttributes<{}>> = styled.div`
  display: flex;
  margin: 2px;
`;

const palettePadding = `padding: ${gridSize() / 2}px ${gridSize()}px`;

export const ColorPaletteContainer: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${palettePadding};
`;
