import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Item, { itemThemeNamespace } from '@atlaskit/item';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { gridSize, colors, elevation } from '@atlaskit/theme';

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${4 * gridSize()}px;
  height: ${4 * gridSize()}px;
  border-radius: ${gridSize() / 2}px;
  ${elevation.e100}
  background-color: ${props => (props.isAdmin ? colors.DN70 : colors.B400)}
`;

const IconWithBackground = ({ isAdmin, icon: Icon = WorldIcon }) => (
  <Background isAdmin={isAdmin}>
    <Icon primaryColor={colors.N0} />
  </Background>
);

const itemTheme = {
  padding: {
    default: {
      bottom: gridSize(),
      left: gridSize(),
      top: gridSize(),
      right: gridSize(),
    },
  },
};

export default ({ isAdmin, icon, ...rest }) => (
  <ThemeProvider theme={{ [itemThemeNamespace]: itemTheme }}>
    <Item
      elemBefore={<IconWithBackground isAdmin={isAdmin} icon={icon} />}
      {...rest}
    />
  </ThemeProvider>
);
