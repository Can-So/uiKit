import { ContextIdentifierProvider } from '@atlaskit/editor-common';

export function storyContextIdentifierProviderFactory(
  config = { objectId: 'DUMMY-OBJECT-ID', containerId: 'DUMMY-CONTAINER-ID' },
) {
  return Promise.resolve<ContextIdentifierProvider>({
    objectId: config.objectId,
    containerId: config.containerId,
  });
}
