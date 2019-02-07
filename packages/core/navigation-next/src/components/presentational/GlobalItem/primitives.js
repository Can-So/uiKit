// @flow

import React, { Fragment, Component } from 'react';
import { css } from 'emotion';
import Tooltip from '@atlaskit/tooltip';

import { styleReducerNoOp, withGlobalTheme } from '../../../theme';
import type {
  GlobalItemPresentationProps,
  GlobalItemStyles,
  GlobalItemPrimitiveProps,
  InjectedGlobalItemPrimitiveProps,
} from './types';

class GlobalNavigationItemPrimitive extends Component<GlobalItemPrimitiveProps> {
  static defaultProps = {
    isActive: false,
    isHover: false,
    isSelected: false,
    isFocused: false,
    size: 'large',
    styles: styleReducerNoOp,
  };

  renderIconAndBadge = (badgeWrapper: {}) => {
    const { icon: Icon, badge: Badge, label, tooltip } = this.props;
    const presentationProps = this.getPresentationProps();
    if (!Icon && !Badge) return null;
    const iconLabel = label || (typeof tooltip === 'string' ? tooltip : '');
    return (
      <Fragment>
        {!!Icon && (
          <div css={{ pointerEvents: 'none' }}>
            <Icon label={iconLabel} secondaryColor="inherit" />
          </div>
        )}
        {!!Badge && (
          <div css={badgeWrapper}>
            <Badge {...presentationProps} />
          </div>
        )}
      </Fragment>
    );
  };

  getGlobalItemExternalProps = (): $Diff<
    GlobalItemPrimitiveProps,
    InjectedGlobalItemPrimitiveProps,
  > => {
    const {
      isActive,
      isFocused,
      isHover,
      theme,
      ...externalProps
    } = this.props;

    return externalProps;
  };

  getPresentationProps = (): GlobalItemPresentationProps => {
    const { isActive, isFocused, isHover, isSelected, size } = this.props;

    return { isActive, isFocused, isHover, isSelected, size };
  };

  generateStyles = (): GlobalItemStyles => {
    const {
      isActive,
      isHover,
      isSelected,
      size,
      styles: styleReducer,
      theme,
    } = this.props;
    const { mode } = theme;
    const presentationProps = { isActive, isHover, isSelected, size };
    const defaultStyles = mode.globalItem(presentationProps);
    return styleReducer(defaultStyles, presentationProps);
  };

  renderChildren = (styles: GlobalItemStyles) => {
    const {
      href,
      onClick,
      id,
      target,
      component: CustomComponent,
    } = this.props;
    const globalID = id && `${id}GlobalItem`;

    let itemBase;

    if (CustomComponent) {
      itemBase = (
        <CustomComponent
          {...this.getGlobalItemExternalProps()}
          className={css({ '&&': styles.itemBase })}
        >
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </CustomComponent>
      );
    } else if (href) {
      itemBase = (
        <a
          href={href}
          id={globalID}
          onClick={onClick}
          target={target}
          className={css({ '&&': styles.itemBase })}
        >
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </a>
      );
    } else if (onClick) {
      itemBase = (
        <button
          id={globalID}
          onClick={onClick}
          className={css({ '&&': styles.itemBase })}
        >
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </button>
      );
    } else {
      itemBase = (
        <span id={globalID} className={css({ '&&': styles.itemBase })}>
          {this.renderIconAndBadge(styles.badgeWrapper)}
        </span>
      );
    }

    return itemBase;
  };

  render() {
    const { isSelected, tooltip } = this.props;
    const styles = this.generateStyles();
    return (
      <Tooltip
        delay={0}
        content={isSelected ? undefined : tooltip}
        position="right"
        hideTooltipOnClick
        hideTooltipOnMouseDown
      >
        <div className={css({ display: 'inline-block' })}>
          {this.renderChildren(styles)}
        </div>
      </Tooltip>
    );
  }
}

export { GlobalNavigationItemPrimitive as BaseGlobalNavigationItemPrimitive };

export default withGlobalTheme(GlobalNavigationItemPrimitive);
