import { AnalyticsViewerContainer } from '@atlaskit/analytics-viewer';
import * as React from 'react';

export type Props = {
  children: React.ReactNode;
};

export const ExampleWrapper = ({ children }: Props) => (
  <AnalyticsViewerContainer>{children}</AnalyticsViewerContainer>
);
