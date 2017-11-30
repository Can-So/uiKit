// @flow

import React from 'react';
import type { Node } from 'react';

import Spinner from '@atlaskit/spinner';

import {
  ActionsContainer,
  ButtonGroup,
  Container,
  Description,
  Header,
  Image,
  SpinnerContainer,
} from '../styled';

type Props = {
  /** Title that briefly describes the page to the user. */
  header: string,
  /** The main block of text that holds some additional information. */
  description?: string,
  /** It affects the width of the main container of this component, "wide" is a default one. */
  size?: 'wide' | 'narrow',
  /** Image that will be shown above the title. The larger side of this image will be shrunk to 160px. */
  imageUrl?: string,
  /** Maximum width (in pixels) of the image, default value is 160. */
  maxImageWidth?: number,
  /** Maximum height (in pixels) of the image, default value is 160. */
  maxImageHeight?: number,
  /** Primary action button for the page, usually it will be something like "Create" (or "Retry" for error pages). */
  primaryAction?: Node,
  /** Secondary action button for the page. */
  secondaryAction?: Node,
  /** Button with link to some external resource like documentation or tutorial, it will be opened in a new tab. */
  tertiaryAction?: Node,
  /** Shows spinner next to the action buttons. Primary and secondary action buttons are disabled when this prop is set to true. */
  isLoading?: boolean,
};

export default class EmptyState extends React.Component<Props> {
  static defaultProps: $Shape<Props> = {
    size: 'wide',
    maxImageWidth: 160,
    maxImageHeight: 160,
  };

  render() {
    const {
      header,
      description,
      size,
      imageUrl,
      maxImageWidth,
      maxImageHeight,
      primaryAction,
      secondaryAction,
      tertiaryAction,
      isLoading,
    } = this.props;

    const actionsContainer =
      primaryAction || secondaryAction || isLoading ? (
        <ActionsContainer>
          <ButtonGroup>
            {primaryAction}
            {secondaryAction}
          </ButtonGroup>
          <SpinnerContainer>{isLoading && <Spinner />}</SpinnerContainer>
        </ActionsContainer>
      ) : null;

    return (
      <Container size={size}>
        {imageUrl && (
          <Image
            src={imageUrl}
            maxWidth={maxImageWidth}
            maxHeight={maxImageHeight}
          />
        )}
        <Header>{header}</Header>
        {description && <Description>{description}</Description>}
        {actionsContainer}
        {tertiaryAction}
      </Container>
    );
  }
}
