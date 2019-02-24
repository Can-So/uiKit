import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Item, { itemThemeNamespace } from '@atlaskit/item';
import WorldIcon from '@atlaskit/icon/glyph/world';
import { gridSize, colors, elevation } from '@atlaskit/theme';
import {
  createAndFireNavigationEvent,
  withAnalyticsEvents,
  UI_EVENT_TYPE,
  SWITCHER_ITEM_SUBJECT,
} from '../utils/analytics';

const Background = styled.div<{ isAdmin: boolean; isCustom: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${4 * gridSize()}px;
  height: ${4 * gridSize()}px;
  border-radius: ${gridSize() / 2}px;
  ${elevation.e100};
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
  children: React.ReactNode;
  onClick?: () => void;
};
class SwitcherItem extends React.Component<SwitcherItemProps> {
  render() {
    const { isAdmin, isCustom, icon, iconUrl, ...rest } = this.props;

    return (
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
  }
}

const SwitcherItemWithEvents = withAnalyticsEvents({
  onClick: createAndFireNavigationEvent({
    eventType: UI_EVENT_TYPE,
    action: 'clicked',
    actionSubject: SWITCHER_ITEM_SUBJECT,
  }),
})(SwitcherItem);

export default SwitcherItemWithEvents;
