import * as React from 'react';
import { gridSize, typography } from '@atlaskit/theme';
import styled from 'styled-components';
import {
  analyticsAttributes,
  withAnalyticsContextData,
} from '../utils/analytics';

const SectionContainer = styled.section`
  padding: ${gridSize()}px 0;
`;

const SectionTitle = styled.h1`
  ${typography.h100};
  text-transform: uppercase;
  margin-bottom: ${gridSize()}px;
`;

type SectionProps = {
  sectionId: string;
  title: string;
  isAdmin?: boolean;
  isCustom?: boolean;
  children?: React.ReactNode;
};

type SectionAnalyticsContext = {
  attributes: {
    group: string;
    groupItemsCount: number;
  };
};

const Section = (props: SectionProps) => {
  const { title, isAdmin = false, isCustom = false, children } = props;

  const childrenWithAddedProps = React.Children.map(
    children,
    child =>
      React.isValidElement(child) &&
      React.cloneElement(child as JSX.Element, {
        isAdmin,
        isCustom,
      }),
  );

  return childrenWithAddedProps.length ? (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {childrenWithAddedProps}
    </SectionContainer>
  ) : null;
};

export default withAnalyticsContextData<SectionProps, SectionAnalyticsContext>(
  props =>
    analyticsAttributes({
      group: props.sectionId,
      groupItemsCount: React.Children.count(props.children),
    }),
)(Section);
