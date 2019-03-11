import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Item, { itemThemeNamespace } from '@atlaskit/item';
import { gridSize } from '@atlaskit/theme';
import {
  createAndFireNavigationEvent,
  withAnalyticsEvents,
  UI_EVENT_TYPE,
  SWITCHER_ITEM_SUBJECT,
} from '../utils/analytics';
import { FadeIn } from './fade-in';

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

type SwitcherItemProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  description?: React.ReactNode;
  onClick?: Function;
  href?: string;
  isDisabled?: boolean;
};
class SwitcherItem extends React.Component<SwitcherItemProps> {
  render() {
    const { icon, description, ...rest } = this.props;

    return (
      <FadeIn>
        <ThemeProvider theme={{ [itemThemeNamespace]: itemTheme }}>
          <Item elemBefore={icon} description={description} {...rest} />
        </ThemeProvider>
      </FadeIn>
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
