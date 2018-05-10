// @flow

import React, { PureComponent, type ComponentType } from 'react';
import { css } from 'emotion';

import { light, styleReducerNoOp, withTheme } from '../../theme';
import type { ItemPrimitiveProps, ItemRenderComponentProps } from './types';

const getItemBase = (
  itemProps: ItemPrimitiveProps,
): ComponentType<ItemRenderComponentProps> => {
  const { component: CustomComponent, href, onClick, target } = itemProps;

  if (CustomComponent) {
    // The custom component gets passed all of the item's props
    return props => <CustomComponent {...itemProps} {...props} />;
  }

  if (href) {
    // We have to specifically destructure children here or else eslint
    // complains about the <a> not having content
    return ({ children, ...props }: ItemRenderComponentProps) => (
      <a href={href} onClick={onClick} target={target} {...props}>
        {children}
      </a>
    );
  }

  if (onClick) {
    return props => <button {...props} onClick={onClick} />;
  }

  return props => <span {...props} />;
};

class NavigationItemPrimitive extends PureComponent<ItemPrimitiveProps> {
  static defaultProps = {
    isActive: false,
    isHover: false,
    isSelected: false,
    spacing: 'default',
    styles: styleReducerNoOp,
    text: '',
  };

  ItemBase: ComponentType<ItemRenderComponentProps> = getItemBase(this.props);

  componentWillReceiveProps(nextProps: ItemPrimitiveProps) {
    if (
      nextProps.component !== this.props.component ||
      nextProps.href !== this.props.href ||
      nextProps.onClick !== this.props.onClick ||
      nextProps.target !== this.props.target
    ) {
      this.ItemBase = getItemBase(nextProps);
    }
  }

  render() {
    const { ItemBase } = this;
    const {
      after: After,
      before: Before,
      styles: styleReducer,
      isActive,
      isHover,
      isSelected,
      spacing,
      subText,
      text,
      theme,
    } = this.props;

    const { mode, context } = theme;
    const presentationProps = { isActive, isHover, isSelected, spacing };
    const defaultStyles = mode.item(presentationProps)[context];
    const styles = styleReducer(defaultStyles, presentationProps);

    return (
      <ItemBase className={css({ '&&': styles.itemBase })}>
        {!!Before && (
          <div css={styles.beforeWrapper}>
            <Before {...presentationProps} />
          </div>
        )}
        <div css={styles.contentWrapper}>
          <div css={styles.textWrapper}>{text}</div>
          {!!subText && <div css={styles.subTextWrapper}>{subText}</div>}
        </div>
        {!!After && (
          <div css={styles.afterWrapper}>
            <After {...presentationProps} />
          </div>
        )}
      </ItemBase>
    );
  }
}

export default withTheme({ mode: light, context: 'container' })(
  NavigationItemPrimitive,
);
