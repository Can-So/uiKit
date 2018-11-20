//@flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import type { EliipsisPropType } from '../../types';

const StyledEllipsis = styled.span`
  display: inline-flex;
  text-align: center;
  align-items: center;
  padding: 0 8px;
`;

export default function renderEllipsis({ key }: EliipsisPropType): Node {
  return <StyledEllipsis key={key}>...</StyledEllipsis>;
}
