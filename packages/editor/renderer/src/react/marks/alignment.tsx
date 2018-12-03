import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  alignmentPositionMap,
  AlignmentAttributes,
} from '@atlaskit/editor-common';

export interface Props extends AlignmentAttributes {
  children: React.Props<any>;
}

const MarkWrapper = styled.div`
  ${props =>
    props['data-align'] &&
    css`
      text-align: ${alignmentPositionMap[props['data-align']]};
    `};
`;

export default function Alignment(props: Props) {
  return (
    <MarkWrapper className="fabric-editor-block-mark" data-align={props.align}>
      {props.children}
    </MarkWrapper>
  );
}
