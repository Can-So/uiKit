import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Item, { itemThemeNamespace } from '@atlaskit/item';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { gridSize, colors, elevation } from '@atlaskit/theme';
import {
  withAnalyticsEvents,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import { withAnalyticsContextData } from '../utils/analytics';

const Background = styled.div<{ isAdmin: boolean; isCustom: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${4 * gridSize()}px;
  height: ${4 * gridSize()}px;
  border-radius: ${gridSize() / 2}px;
  ${elevation.e100}
  background-color: ${({ isAdmin, isCustom }) =>
    isAdmin ? colors.DN70 : isCustom ? colors.N0 : colors.B400}
  overflow: hidden;
`;

const ImgIcon = styled.img`
  width: ${gridSize() * 4}px;
  height: ${gridSize() * 4}px;
`;

type Props = {
  isAdmin?: boolean;
  isCustom?: boolean;
  icon?: React.ReactType;
  iconUrl?: string;
  href?: string;
};

type IconWithBackgroundProps = {
  isAdmin?: boolean;
  isCustom?: boolean;
  iconUrl?: string;
  icon?: React.ReactType;
};
const IconWithBackground = ({
  isAdmin = false,
  isCustom = false,
  iconUrl,
  icon: Icon = WorldIcon,
}: IconWithBackgroundProps) => (
  <Background isAdmin={isAdmin} isCustom={isCustom}>
    {iconUrl ? (
      <ImgIcon src={iconUrl} />
    ) : (
      <Icon primaryColor={isCustom ? colors.DN70 : colors.N0} />
    )}
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

type SwitcherItemProps = Props & {
  id: string;
  type: 'product' | 'try' | 'administration' | 'recentContainer' | 'customLink';
  children: React.ReactNode;
  onClick?: () => void;
};

const SwitcherItem = ({
  isAdmin,
  isCustom,
  icon,
  iconUrl,
  ...rest
}: SwitcherItemProps) => (
  <ThemeProvider theme={{ [itemThemeNamespace]: itemTheme }}>
    <Item
      elemBefore={
        <IconWithBackground
          isAdmin={isAdmin}
          isCustom={isCustom}
          icon={icon}
          iconUrl={iconUrl}
        />
      }
      {...rest}
    />
  </ThemeProvider>
);

const SwitcherItemWithEvents = withAnalyticsEvents({
  onClick: createAndFireEvent('atlaskit')({
    eventType: 'ui',
    action: 'clicked',
    actionSubject: 'atlassianSwitcherItem',
  }),
})(SwitcherItem);

type SwitcherItemAnalyticsContext = {
  itemId?: string;
  itemType?: string;
};
const SwitcherItemWithContext = withAnalyticsContextData<
  SwitcherItemProps,
  SwitcherItemAnalyticsContext
>(props => ({
  itemId: props.id,
  itemType: props.type,
}))(SwitcherItemWithEvents);

export default SwitcherItemWithContext;
