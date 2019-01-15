import React from 'react';
import styled from 'styled-components';

const Section = styled.div`
  padding: 1rem;
  border: 1px solid;
`;

export default ({ title, children }) => (
  <Section>
    <h1>{title}</h1>
    {children}
  </Section>
);
