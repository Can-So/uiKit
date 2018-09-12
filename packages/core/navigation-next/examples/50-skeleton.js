// @flow

import React, { Component, Fragment } from 'react';
import DashboardIcon from '@atlaskit/icon/glyph/dashboard';
import BacklogIcon from '@atlaskit/icon/glyph/backlog';
import IssuesIcon from '@atlaskit/icon/glyph/issue';
import ReportsIcon from '@atlaskit/icon/glyph/graph-line';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import {
  GlobalNav,
  LayoutManager,
  NavigationProvider,
  Section,
  SkeletonContainerHeader,
  SkeletonItem,
  light,
  dark,
  settings,
  ContainerHeader,
  ItemAvatar,
  Item,
  ThemeProvider,
} from '../src';

const gridSize = gridSizeFn();
const themeModes = { light, dark, settings };

const GlobalNavigation = () => (
  <GlobalNav primaryItems={[]} secondaryItems={[]} />
);

type State = {
  themeMode: 'light' | 'dark' | 'settings',
  shouldShowContainer: boolean,
  shouldRenderIcons: boolean,
  shouldRenderSkeleton: boolean,
};
export default class Example extends Component<{}, State> {
  state = {
    themeMode: 'light',
    shouldShowContainer: true,
    shouldRenderIcons: false,
    shouldRenderSkeleton: true,
  };

  renderNavigation = () => {
    const { shouldRenderIcons } = this.state;
    return (
      <Fragment>
        <Section>
          {({ css }) => (
            <div
              css={{
                ...css,
                paddingTop: gridSize * 2.5,
                paddingBottom: gridSize * 2.5,
              }}
            >
              <ContainerHeader
                before={itemState => (
                  <ItemAvatar
                    itemState={itemState}
                    appearance="square"
                    size="large"
                  />
                )}
                text="Container title"
                subText="Container description"
              />
            </div>
          )}
        </Section>
        <Section>
          {({ css }) => (
            <div css={css}>
              <Item
                before={shouldRenderIcons ? DashboardIcon : undefined}
                text="Dashboards"
              />
              <Item
                before={shouldRenderIcons ? BacklogIcon : undefined}
                text="Backlog"
              />
              <Item
                before={shouldRenderIcons ? IssuesIcon : undefined}
                text="Issues and filters"
              />
              <Item
                before={shouldRenderIcons ? ReportsIcon : undefined}
                text="Reports"
              />
            </div>
          )}
        </Section>
      </Fragment>
    );
  };

  renderSkeleton = () => {
    const { shouldRenderIcons } = this.state;
    return (
      <Fragment>
        <Section>
          {({ css }) => (
            <div
              css={{
                ...css,
                paddingTop: gridSize * 2.5,
                paddingBottom: gridSize * 2.5,
              }}
            >
              <SkeletonContainerHeader hasBefore />
            </div>
          )}
        </Section>
        <Section>
          {({ css }) => (
            <div css={css}>
              <SkeletonItem hasBefore={shouldRenderIcons} />
              <SkeletonItem hasBefore={shouldRenderIcons} />
              <SkeletonItem hasBefore={shouldRenderIcons} />
            </div>
          )}
        </Section>
      </Fragment>
    );
  };

  handleThemeModeChange = ({ target: { value: themeMode } }: any) => {
    this.setState({ themeMode });
  };

  handleShowContainerChange = () => {
    this.setState({ shouldShowContainer: !this.state.shouldShowContainer });
  };

  handleRenderSkeletonChange = () => {
    this.setState({ shouldRenderSkeleton: !this.state.shouldRenderSkeleton });
  };

  handleRenderIconsChange = () => {
    this.setState({ shouldRenderIcons: !this.state.shouldRenderIcons });
  };

  render() {
    const {
      shouldRenderIcons,
      shouldRenderSkeleton,
      shouldShowContainer,
      themeMode,
    } = this.state;
    const renderer = shouldRenderSkeleton
      ? this.renderSkeleton
      : this.renderNavigation;
    return (
      <NavigationProvider>
        <ThemeProvider
          theme={theme => ({
            ...theme,
            mode: themeModes[themeMode],
          })}
        >
          <LayoutManager
            globalNavigation={GlobalNavigation}
            productNavigation={renderer}
            containerNavigation={shouldShowContainer ? renderer : null}
          >
            <div css={{ padding: 30 }}>
              <p>
                <label htmlFor="should-render-skeleton-toggle">
                  <input
                    checked={shouldRenderSkeleton}
                    id="should-render-skeleton-toggle"
                    onChange={this.handleRenderSkeletonChange}
                    type="checkbox"
                  />{' '}
                  Render skeleton
                </label>
              </p>
              <p>
                <label htmlFor="should-show-container-toggle">
                  <input
                    checked={shouldShowContainer}
                    id="should-show-container-toggle"
                    onChange={this.handleShowContainerChange}
                    type="checkbox"
                  />{' '}
                  Show container navigation
                </label>
              </p>
              <p>
                <label htmlFor="should-render-icons-toggle">
                  <input
                    checked={shouldRenderIcons}
                    id="should-render-icons-toggle"
                    onChange={this.handleRenderIconsChange}
                    type="checkbox"
                  />{' '}
                  Render icons
                </label>
              </p>
              <p>
                <select onChange={this.handleThemeModeChange} value={themeMode}>
                  <option value="light">Light mode</option>
                  <option value="dark">Dark mode</option>
                  <option value="settings">Settings mode</option>
                </select>
              </p>
            </div>
          </LayoutManager>
        </ThemeProvider>
      </NavigationProvider>
    );
  }
}
