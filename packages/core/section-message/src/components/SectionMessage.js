// @flow
import React, { Component, type Node, type ElementType } from 'react';
import Button from '@atlaskit/button';
import { baseAppearanceObj } from '../theme';
import type { Appearance } from '../types';

import {
  Container,
  Title,
  Description,
  Actions,
  Action,
  IconWrapper,
} from './styled';

// There is a bug in eslint react with flow types being spread in function.
// See https://github.com/yannickcr/eslint-plugin-react/issues/1764 for context
// eslint-disable-next-line react/no-unused-prop-types
type ActionType = { text: string, onClick?: () => void, href?: string };

type Props = {
  /* The appearance styling to use for the section message. */
  appearance: Appearance,
  /*
    The main content of the section message. This accepts a react node, although
    we recommend that this should be a paragraph.
  */
  children: Node,
  /*
    The heading of the section message.
  */
  title?: string,
  /*
    Actions to be taken from the section message. These accept an object which
    are applied to @atlaskit/button components. Middots are automatically added
    between the items. We generally recommend using no more than two actions.
  */
  actions?: Array<ActionType>,
  /*
    An Icon component to be rendered instead of the default icon for the component.
    This should only be an `@atlaskit/icon` icon. You can check out [this example](/packages/core/section-message/example/custom-icon)
    to see how to provide this icon.
  */
  icon?: ElementType,
  /*
    A custom link component. This prop is designed to allow a custom link
    component to be passed to the link button being rendered by actions. The
    intended use-case is for when a custom router component such as react router
    is being used within the application.

    This component will only be used if a href is passed to the action.

    All actions provided will automatically have the linkcomponent passed to them.
  */
  linkComponent?: ElementType,
};

export default class SectionMessage extends Component<Props, *> {
  static defaultProps = {
    appearance: 'info',
  };

  renderAction = ({
    text,
    onClick,
    href,
    linkComponent,
  }: ActionType & { linkComponent?: ElementType }) => {
    if (onClick || href) {
      return (
        <Action key={text}>
          <Button
            appearance="link"
            spacing="none"
            onClick={onClick}
            href={href}
            component={linkComponent}
          >
            {text}
          </Button>
        </Action>
      );
    }
    return <Action key={text}>{text}</Action>;
  };

  render() {
    const {
      children,
      title,
      actions,
      appearance,
      icon,
      linkComponent,
    } = this.props;
    const appearanceObj =
      baseAppearanceObj[appearance] || baseAppearanceObj.info;
    const Icon = icon || appearanceObj.Icon;

    return (
      <Container backgroundColor={appearanceObj.backgroundColor}>
        <IconWrapper>
          <Icon
            primaryColor={appearanceObj.primaryIconColor}
            secondaryColor={appearanceObj.backgroundColor}
          />
        </IconWrapper>
        <div>
          {title ? <Title>{title}</Title> : null}
          {children ? <Description>{children}</Description> : null}
          {actions && actions.length > 0 ? (
            <Actions>
              {actions.map(action =>
                this.renderAction({ ...action, linkComponent }),
              )}
            </Actions>
          ) : null}
        </div>
      </Container>
    );
  }
}
