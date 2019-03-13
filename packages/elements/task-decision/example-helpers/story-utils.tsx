import * as React from 'react';
import styled from 'styled-components';

import { taskDecision } from '@atlaskit/util-data-test';

export const {
  getMockTaskDecisionResource,
  document,
  getParticipants,
} = taskDecision;

export const MessageContainer: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  border: 10px solid #fcc;
  width: 585px;
`;

export const SidebarContainer: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  border: 10px solid #fcc;
  width: 240px;
  overflow-x: hidden;
`;

export const Grid: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Item: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  flex: 1 1 0;
  margin: 10px;
`;

export const dumpRef = (ref: HTMLElement | null) => {
  // tslint:disable-next-line:no-console
  console.log('Content HTML', ref && ref.outerHTML);
};

export const action = (action: string) => () => {
  // tslint:disable-next-line:no-console
  console.log({ action });
};
