import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
} from 'react';
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
  children: ReactElement<any>[] | null;
};
export default ({ title, isAdmin = false, children }: Props) => {
  const childrenWithIsAdmin = Children.map(
    children,
    child =>
      isValidElement(child) &&
      cloneElement(child as ReactElement<any>, { isAdmin: isAdmin }),
  );

  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {childrenWithIsAdmin}
    </Section>
  );
};
