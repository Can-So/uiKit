// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { typography, gridSize, math, colors } from '@atlaskit/theme';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';
import { FieldId } from './Field';

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
  /** The content of the message */
  children: Node,
};

export const HelperMessage = ({ children }: Props) => (
  <FieldId.Consumer>
    {fieldId => (
      <Message id={fieldId ? `${fieldId}-helper` : null}>{children}</Message>
    )}
  </FieldId.Consumer>
);

export const ErrorMessage = ({ children }: Props) => (
  <FieldId.Consumer>
    {fieldId => (
      <Message error id={fieldId ? `${fieldId}-error` : null}>
        <IconWrapper>
          <ErrorIcon size="small" />
        </IconWrapper>
        {children}
      </Message>
    )}
  </FieldId.Consumer>
);

export const ValidMessage = ({ children }: Props) => (
  <FieldId.Consumer>
    {fieldId => (
      <Message valid id={fieldId ? `${fieldId}-valid` : null}>
        <IconWrapper>
          <SuccessIcon size="small" />
        </IconWrapper>
        {children}
      </Message>
    )}
  </FieldId.Consumer>
);
