// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { typography, gridSize, math, colors } from '@atlaskit/theme';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';

const Message = styled.div`
  ${typography.h200} font-weight: normal;
  color: ${props => {
    if (props.error) {
      return colors.R400;
    } else if (props.valid) {
      return colors.G400;
    }
    return colors.N200;
  }};
  margin-top: ${math.multiply(gridSize, 0.5)}px;
  display: flex;
  justify-content: baseline;
`;

const IconWrapper = styled.span`
  display: flex;
`;

type Props = {
  fieldId?: string,
  children: Node,
};

export const HelperMessage = ({ children, fieldId }: Props) => {
  const id = fieldId ? `${fieldId}-helper` : null;
  return <Message id={id}>{children}</Message>;
};

export const ErrorMessage = ({ children, fieldId }: Props) => {
  const id = fieldId ? `${fieldId}-error` : null;
  return (
    <Message error id={id}>
      <IconWrapper>
        <ErrorIcon size="small" />
      </IconWrapper>
      {children}
    </Message>
  );
};

export const ValidMessage = ({ children, fieldId }: Props) => {
  const id = fieldId ? `${fieldId}-valid` : null;
  return (
    <Message valid id={id}>
      <IconWrapper>
        <SuccessIcon size="small" />
      </IconWrapper>
      {children}
    </Message>
  );
};
