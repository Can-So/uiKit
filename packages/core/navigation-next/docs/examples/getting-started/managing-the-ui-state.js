// @flow

import React, { Fragment } from 'react';
import GlobalNavigation from '@findable/global-navigation';
import ShortcutIcon from '@findable/icon/glyph/shortcut';
import { AtlassianIcon, AtlassianWordmark } from '@findable/logo';
import Button from '@findable/button';
import ChevronLeft from '@findable/icon/glyph/chevron-left';
import ChevronRight from '@findable/icon/glyph/chevron-right';
import {
  ContainerHeader,
  GroupHeading,
  HeaderSection,
  Item,
  ItemAvatar,
  LayoutManager,
  MenuSection,
  NavigationProvider,
  Separator,
  UIControllerSubscriber,
  Wordmark,
} from '../../../src';

const MyGlobalNavigation = () => (
  <GlobalNavigation
    productIcon={() => <AtlassianIcon size="medium" />}
    onProductClick={() => {}}
  />
);

const MyProductNavigation = () => (
  <Fragment>
    <HeaderSection>
      {({ className }) => (
        <div className={className}>
          <Wordmark wordmark={AtlassianWordmark} />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item text="Dashboard" />
          <Item text="Things" />
          <Item text="Settings" />
          <Separator />
          <GroupHeading>Add-ons</GroupHeading>
          <Item text="My plugin" />
        </div>
      )}
    </MenuSection>
  </Fragment>
);

const MyContainerNavigation = () => (
  <Fragment>
    <HeaderSection>
      {({ css }) => (
        <div css={{ ...css, paddingBottom: 20 }}>
          <ContainerHeader
            before={itemState => (
              <ItemAvatar
                itemState={itemState}
                appearance="square"
                size="large"
              />
            )}
            text="Container name"
            subText="Container description"
          />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item text="Things in this container" />
          <Item text="Reports" />
          <Item text="Some other thing selected" isSelected />
          <Separator />
          <GroupHeading>Shortcuts</GroupHeading>
          <Item before={ShortcutIcon} text="Team space" />
        </div>
      )}
    </MenuSection>
  </Fragment>
);

const ExpandToggleButton = () => (
  <UIControllerSubscriber>
    {navigationUIController => (
      <Button
        iconBefore={
          navigationUIController.state.isCollapsed ? (
            <ChevronRight />
          ) : (
            <ChevronLeft />
          )
        }
        onClick={navigationUIController.toggleCollapse}
      >
        {navigationUIController.state.isCollapsed ? 'Expand' : 'Collapse'}{' '}
        navigation
      </Button>
    )}
  </UIControllerSubscriber>
);

export default () => (
  <NavigationProvider>
    <LayoutManager
      globalNavigation={MyGlobalNavigation}
      productNavigation={MyProductNavigation}
      containerNavigation={MyContainerNavigation}
    >
      <div css={{ padding: '32px 40px' }}>
        <ExpandToggleButton />
      </div>
    </LayoutManager>
  </NavigationProvider>
);
