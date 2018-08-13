import { StatelessComponent } from 'react';
import createNamespaceContext, { Props } from './lib/createNamespaceContext';

export const ELEMENTS_CONTEXT = 'fabricElementsCtx';

export const FabricElementsAnalyticsContext: StatelessComponent<
  Props
> = createNamespaceContext(ELEMENTS_CONTEXT, 'FabricElementsAnalyticsContext');
