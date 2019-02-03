import * as React from 'react';
import { gridSize, typography } from '@atlaskit/theme';
import styled from 'styled-components';

const Section = styled.section`
  padding: ${gridSize()}px 0;
`;

const SectionTitle = styled.h1`
  ${typography.h100};
  text-transform: uppercase;
  margin-bottom: ${gridSize()}px;
`;

type Props = {
  title: string;
  isAdmin?: boolean;
  isCustom?: boolean;
  children: (JSX.Element | null)[] | JSX.Element | null;
};
export default ({
  title,
  isAdmin = false,
  isCustom = false,
  children,
}: Props) => {
  const childrenWithAddedProps = React.Children.map(
    children,
    child =>
      React.isValidElement(child) &&
      React.cloneElement(child as JSX.Element, {
        isAdmin,
        isCustom,
      }),
  );

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {childrenWithAddedProps}
    </Section>
  );
};
