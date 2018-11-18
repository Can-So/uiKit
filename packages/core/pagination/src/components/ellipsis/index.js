//@flow
import React from 'react';
import styled from 'styled-components';
import type { EliipsisPropType } from '../../types';

const StyledEllipsis = styled.span`
  display: inline-flex;
  text-align: center;
  align-items: center;
  padding: 0 8px;
`;

export default function Ellipsis({ key }: EliipsisPropType) {
  return <StyledEllipsis key={key}>...</StyledEllipsis>;
}
