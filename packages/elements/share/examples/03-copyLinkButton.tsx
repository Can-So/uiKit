import * as React from 'react';
import styled from 'styled-components';
import { CopyLinkButton } from '../src/components/CopyLinkButton';

const Container = styled.div`
  margin-top: 100px;
`;

export default () => (
  <Container>
    <CopyLinkButton onLinkCopy={console.log} link={'Testing Copy Link'} />
  </Container>
);
