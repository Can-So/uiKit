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
  children: React.ReactElement<any>[] | React.ReactElement<any> | null;
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
      React.cloneElement(child as React.ReactElement<any>, {
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
