// @flow

import React, { Component, Fragment, type ElementRef } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { colors } from '@atlaskit/theme';

import {
  name as packageName,
  version as packageVersion,
} from '../../../../package.json';
import { Shadow } from '../../../common/primitives';
import { light, ThemeProvider } from '../../../theme';
import ContentNavigation from '../ContentNavigation';
import PageContent from '../PageContent';
import ResizeTransition, {
  isTransitioning,
  type TransitionState,
} from '../ResizeTransition';
import ResizeControl from './ResizeControl';
import { LayoutContainer, NavigationContainer } from './primitives';
import type { LayoutManagerProps } from './types';
import {
  ContainerNavigationMask,
  ContentNavigationWrapper,
} from '../ContentNavigation/primitives';

import {
  CONTENT_NAV_WIDTH_COLLAPSED,
  CONTENT_NAV_WIDTH_FLYOUT,
  GLOBAL_NAV_WIDTH,
  FLYOUT_DELAY,
} from '../../../common/constants';
import RenderBlocker from '../../common/RenderBlocker';
import { LayoutEventListener } from './LayoutEvent';

type RenderContentNavigationArgs = {
  isDragging: boolean,
  transitionState: TransitionState,
  transitionStyle: Object,
  width: number,
};
type State = {
  flyoutIsOpen: boolean,
  mouseIsOverNavigation: boolean,
  itemIsDragging: boolean,
};

function defaultTooltipContent(isCollapsed: boolean) {
  return isCollapsed
    ? { text: 'Expand', char: '[' }
    : { text: 'Collapse', char: '[' };
}

/* NOTE: experimental props use an underscore */

export default class LayoutManager extends Component<
  LayoutManagerProps,
  State,
> {
  state = {
    flyoutIsOpen: false,
    mouseIsOverNavigation: false,
    itemIsDragging: false,
  };
  productNavRef: HTMLElement;
  pageRef: HTMLElement;
  containerRef: HTMLElement;
  flyoutMouseOverTimeout: TimeoutID;

  static defaultProps = {
    collapseToggleTooltipContent: defaultTooltipContent,
    // eslint-disable-next-line camelcase
    experimental_flyoutOnHover: false,
  };

  static getDerivedStateFromProps(props: LayoutManagerProps, state: State) {
    // kill the flyout when the user commits to expanding navigation
    if (!props.navigationUIController.state.isCollapsed && state.flyoutIsOpen) {
      return { flyoutIsOpen: false };
    }

    return null;
  }

  nodeRefs = {
    expandCollapseAffordance: React.createRef(),
  };

  componentDidMount() {
    this.publishRefs();
  }

  componentDidUpdate() {
    this.publishRefs();
  }

  publishRefs() {
    const { getRefs } = this.props;
    if (typeof getRefs === 'function') {
      getRefs(this.nodeRefs);
    }
  }

  getContainerRef = (ref: ElementRef<*>) => {
    this.containerRef = ref;
  };
  getNavRef = (ref: ElementRef<*>) => {
    this.productNavRef = ref;
  };
  getPageRef = (ref: ElementRef<*>) => {
    this.pageRef = ref;
  };

  mouseOutFlyoutArea = ({ currentTarget, relatedTarget }: *) => {
    if (currentTarget.contains(relatedTarget)) return;
    clearTimeout(this.flyoutMouseOverTimeout);
    this.setState({ flyoutIsOpen: false });
  };
  mouseOverFlyoutArea = ({ currentTarget, target }: *) => {
    if (!currentTarget.contains(target)) return;
    clearTimeout(this.flyoutMouseOverTimeout);

    this.flyoutMouseOverTimeout = setTimeout(() => {
      this.setState({ flyoutIsOpen: true });
    }, FLYOUT_DELAY);
  };
  closeFlyout = (e: SyntheticMouseEvent<>) => {
    e.stopPropagation();
    clearTimeout(this.flyoutMouseOverTimeout);
    this.setState({ flyoutIsOpen: false });
  };

  mouseEnter = () => {
    this.setState({ mouseIsOverNavigation: true });
  };
  mouseLeave = () => {
    clearTimeout(this.flyoutMouseOverTimeout);
    this.setState({ mouseIsOverNavigation: false });
  };

  onItemDragStart = () => {
    this.setState({ itemIsDragging: true });
  };

  onItemDragEnd = () => {
    this.setState({ itemIsDragging: false });
  };

  renderGlobalNavigation = () => {
    const {
      containerNavigation,
      globalNavigation: GlobalNavigation,
    } = this.props;
    return (
      <div onMouseOver={this.closeFlyout}>
        <ThemeProvider
          theme={theme => ({
            mode: light, // If no theme already exists default to light mode
            ...theme,
          })}
        >
          <Fragment>
            <Shadow
              isBold={!!containerNavigation}
              isOverDarkBg
              style={{ marginLeft: GLOBAL_NAV_WIDTH }}
            />
            <GlobalNavigation />
          </Fragment>
        </ThemeProvider>
      </div>
    );
  };

  renderContentNavigation = (args: RenderContentNavigationArgs) => {
    const { transitionState, transitionStyle } = args;
    const {
      containerNavigation,
      // eslint-disable-next-line camelcase
      experimental_flyoutOnHover: EXPERIMENTAL_FLYOUT_ON_HOVER,
      navigationUIController,
      productNavigation,
    } = this.props;
    const { isCollapsed, isResizing } = navigationUIController.state;

    const isVisible = transitionState !== 'exited';
    const shouldDisableInteraction =
      isResizing || isTransitioning(transitionState);

    return (
      <ContentNavigationWrapper
        key="product-nav-wrapper"
        innerRef={this.getNavRef}
        disableInteraction={shouldDisableInteraction}
        style={transitionStyle}
      >
        <ContentNavigation
          container={containerNavigation}
          isVisible={isVisible}
          key="product-nav"
          product={productNavigation}
        />
        {isCollapsed && !EXPERIMENTAL_FLYOUT_ON_HOVER ? (
          <div
            aria-label="Click to expand the navigation"
            role="button"
            onClick={navigationUIController.expand}
            css={{
              cursor: 'pointer',
              height: '100%',
              outline: 0,
              position: 'absolute',
              transition: 'background-color 100ms',
              width: CONTENT_NAV_WIDTH_COLLAPSED,

              ':hover': {
                backgroundColor: containerNavigation
                  ? colors.N30
                  : 'rgba(255, 255, 255, 0.08)',
              },
              ':active': {
                backgroundColor: colors.N40A,
              },
            }}
            tabIndex="0"
          />
        ) : null}
      </ContentNavigationWrapper>
    );
  };

  renderNavigation = () => {
    const {
      navigationUIController,
      // eslint-disable-next-line camelcase
      experimental_flyoutOnHover: EXPERIMENTAL_FLYOUT_ON_HOVER,
      collapseToggleTooltipContent,
    } = this.props;
    const { flyoutIsOpen, mouseIsOverNavigation, itemIsDragging } = this.state;
    const {
      isCollapsed,
      isResizeDisabled,
      isResizing,
      productNavWidth,
    } = navigationUIController.state;

    return (
      <LayoutEventListener
        onItemDragStart={this.onItemDragStart}
        onItemDragEnd={this.onItemDragEnd}
      >
        <NavigationAnalyticsContext
          data={{
            attributes: {
              isExpanded: !isCollapsed,
              flyoutOnHoverEnabled: EXPERIMENTAL_FLYOUT_ON_HOVER,
            },
            componentName: 'navigation',
            packageName,
            packageVersion,
          }}
        >
          <ResizeTransition
            from={[CONTENT_NAV_WIDTH_COLLAPSED]}
            in={!isCollapsed || flyoutIsOpen}
            properties={['width']}
            to={[flyoutIsOpen ? CONTENT_NAV_WIDTH_FLYOUT : productNavWidth]}
            userIsDragging={isResizing}
            // only apply listeners to the NAV resize transition
            productNavWidth={productNavWidth}
          >
            {({ transitionStyle, transitionState }) => {
              const onMouseOut =
                isCollapsed && EXPERIMENTAL_FLYOUT_ON_HOVER && flyoutIsOpen
                  ? this.mouseOutFlyoutArea
                  : null;
              const onMouseOver =
                isCollapsed && EXPERIMENTAL_FLYOUT_ON_HOVER && !flyoutIsOpen
                  ? this.mouseOverFlyoutArea
                  : null;
              return (
                <NavigationContainer
                  innerRef={this.getContainerRef}
                  onMouseEnter={this.mouseEnter}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  onMouseLeave={this.mouseLeave}
                >
                  <ResizeControl
                    collapseToggleTooltipContent={collapseToggleTooltipContent}
                    expandCollapseAffordanceRef={
                      this.nodeRefs.expandCollapseAffordance
                    }
                    // eslint-disable-next-line camelcase
                    experimental_flyoutOnHover={EXPERIMENTAL_FLYOUT_ON_HOVER}
                    isDisabled={isResizeDisabled}
                    flyoutIsOpen={flyoutIsOpen}
                    isGrabAreaDisabled={itemIsDragging}
                    mouseIsOverNavigation={mouseIsOverNavigation}
                    onMouseOverButtonBuffer={this.closeFlyout}
                    mutationRefs={[
                      { ref: this.pageRef, property: 'padding-left' },
                      { ref: this.productNavRef, property: 'width' },
                    ]}
                    navigation={navigationUIController}
                  >
                    {({ isDragging, width }) => {
                      return (
                        <ContainerNavigationMask
                          disableInteraction={itemIsDragging}
                        >
                          <RenderBlocker
                            blockOnChange
                            itemIsDragging={itemIsDragging}
                          >
                            {this.renderGlobalNavigation()}
                            {this.renderContentNavigation({
                              isDragging,
                              transitionState,
                              transitionStyle,
                              width,
                            })}
                          </RenderBlocker>
                        </ContainerNavigationMask>
                      );
                    }}
                  </ResizeControl>
                </NavigationContainer>
              );
            }}
          </ResizeTransition>
        </NavigationAnalyticsContext>
      </LayoutEventListener>
    );
  };

  renderPageContent = () => {
    const {
      navigationUIController,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      children,
    } = this.props;
    const { flyoutIsOpen } = this.state;
    const {
      isResizing,
      isCollapsed,
      productNavWidth,
    } = navigationUIController.state;

    return (
      <PageContent
        flyoutIsOpen={flyoutIsOpen}
        innerRef={this.getPageRef}
        isResizing={isResizing}
        isCollapsed={isCollapsed}
        productNavWidth={productNavWidth}
        onExpandStart={onExpandStart}
        onExpandEnd={onExpandEnd}
        onCollapseStart={onCollapseStart}
        onCollapseEnd={onCollapseEnd}
      >
        {children}
      </PageContent>
    );
  };

  render() {
    return (
      <LayoutContainer>
        {this.renderNavigation()}
        {this.renderPageContent()}
      </LayoutContainer>
    );
  }
}
