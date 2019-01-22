import React, { Children, cloneElement } from 'react';
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

export default ({ title, isAdmin = false, children }) => {
  const childrenWithIsAdmin = Children.map(children, child =>
    cloneElement(child, { isAdmin }),
  );

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {childrenWithIsAdmin}
    </Section>
  );
};
