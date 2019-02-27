// @flow

import React, { Component } from 'react';

import Section from '../Section';
import SkeletonContainerHeader from '../SkeletonContainerHeader';
import SkeletonItem from '../SkeletonItem';
import type { SkeletonContainerViewProps } from './types';

import {
  ProductNavigationTheme,
  ContainerNavigationTheme,
} from '../ContentNavigation/primitives';

import { Container, HeaderContainer } from './primitives';

export default class SkeletonContainerView extends Component<SkeletonContainerViewProps> {
  static defaultProps = {
    dataset: {
      'data-test-id': 'ContextualNavigationSkeleton',
    },
  };

  render() {
    const { dataset, type, ...props } = this.props;

    if (!type) {
      return null;
    }

    const Theme =
      type === 'product' ? ProductNavigationTheme : ContainerNavigationTheme;

    return (
      <Theme>
        <Container {...dataset} {...props}>
          <Section>
            {({ css }) => (
              <HeaderContainer styles={css}>
                <SkeletonContainerHeader hasBefore />
              </HeaderContainer>
            )}
          </Section>
          <Section>
            {({ className }) => (
              <div className={className}>
                <SkeletonItem hasBefore />
                <SkeletonItem hasBefore />
                <SkeletonItem hasBefore />
                <SkeletonItem hasBefore />
                <SkeletonItem hasBefore />
              </div>
            )}
          </Section>
        </Container>
      </Theme>
    );
  }
}
