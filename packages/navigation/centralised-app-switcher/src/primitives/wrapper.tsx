import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  border: 1px solid;
  min-height: 100vh;
`;

export default ({ children }) => <Wrapper>{children}</Wrapper>;
