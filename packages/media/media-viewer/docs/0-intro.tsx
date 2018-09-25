import { md } from '@atlaskit/docs';

export default md`
  # @atlaskit/media-viewer

  ## Installation

  ~~~sh
  yarn add @atlaskit/media-viewer
  ~~~

  ## Using a collection as data source

  ~~~js
  import { MediaViewer } from '../src';
  import {
    createStorybookContext,
    defaultCollectionName,
  } from '@atlaskit/media-test-helpers';

  const context = createStorybookContext();
  const selectedItem = {
    id: 'some-valid-id',
    occurrenceKey: '',
    type: 'file',
  };

  // if you use the CardList component, use the same pagination here
  const pageSize = 30;

  const dataSource = {
    collectionName: defaultCollectionName,
  };

  export default () => (
    <MediaViewer
      pageSize={pageSize}
      context={context}
      selectedItem={selectedItem}
      dataSource={dataSource}
      collectionName={defaultCollectionName}
    />
  );
  ~~~

  ## Using a list of media items as data source

  ~~~js
  import { MediaViewer } from '../src';
  import {
    createStorybookContext,
    defaultCollectionName,
  } from '@atlaskit/media-test-helpers';

  const context = createStorybookContext();

  const items = [
    {
      id: 'some-valid-id-1',
      occurrenceKey: 'key1',
      type: 'file',
    },
    {
      id: 'some-valid-id-2',
      occurrenceKey: 'item-1',
      type: 'file',
    },
    {
      id: 'some-valid-id-2',
      occurrenceKey: 'item-2',
      type: 'file',
    },
  ];

  const selectedItem = items[1];

  const dataSource = {
    list: items,
  };

  export default () => (
    <MediaViewer
      context={context}
      selectedItem={selectedItem}
      dataSource={dataSource}
      collectionName={defaultCollectionName}
    />
  );
  ~~~

  ## About the collectionName parameter

  The collection name can be provided as top level prop \`collectionName\` for authentcation purposes
  (for collection scoped permissions) and / or as a \`dataSource\` for collection scoped navigation.
`;
