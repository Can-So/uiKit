import * as React from 'react';
import styled, { css } from 'styled-components';

export type Props = {
  align: 'start' | 'end' | 'center';
  children: React.Props<any>;
};

/** TODO: Flip these positions for RTL */
const positionMap = {
  start: 'left',
  end: 'right',
  center: 'center',
};

const MarkWrapper: React.ComponentClass<
  React.HTMLAttributes<{}> & Props
> = styled.div`
  ${({ align }) =>
    align &&
    css`
      text-align: ${positionMap[align]};
    `};
`;

export default function Alignment(props: Props) {
  return <MarkWrapper align={props.align}>{props.children}</MarkWrapper>;
}
