import { shallow, mount } from 'enzyme';
import * as React from 'react';
import Spinner from '@atlaskit/spinner';
import { FlagGroup } from '@atlaskit/flag';
import { Card, CardView } from '@atlaskit/media-card';
import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';

import { State, CollectionItem } from '../../../../domain';
import {
  mockStore,
  mockState,
  mockContext,
  getComponentClassWithStore,
  mockIsWebGLNotAvailable,
} from '../../../../mocks';

mockIsWebGLNotAvailable(); // mock WebGL fail check before StatelessUploadView is imported
import { isWebGLAvailable } from '../../../../tools/webgl';
import { StatelessUploadView, default as ConnectedUploadView } from '../upload';
import { fileClick } from '../../../../actions/fileClick';
import { editorShowImage } from '../../../../actions/editorShowImage';
import { editRemoteImage } from '../../../../actions/editRemoteImage';

import { Dropzone } from '../dropzone';

import { SpinnerWrapper, Wrapper } from '../styled';

const ConnectedUploadViewWithStore = getComponentClassWithStore(
  ConnectedUploadView,
);

const createConnectedComponent = (
  state: State,
  enzymeMethod: Function = shallow,
) => {
  const context = mockContext();
  const store = mockStore(state);
  const dispatch = store.dispatch;
  const root = enzymeMethod(
    <ConnectedUploadViewWithStore
      store={store}
      mpBrowser={{} as any}
      context={context}
      recentsCollection="some-collection-name"
    />,
  );
  const component = root.find(StatelessUploadView);
  return { component, dispatch, root };
};

describe('<StatelessUploadView />', () => {
  const getUploadViewElement = (
    isLoading: boolean,
    recentItems: CollectionItem[] = [],
  ) => {
    const context = mockContext();
    const { selectedItems, uploads, apiUrl } = mockState;

    const recents = {
      items: recentItems,
      nextKey: '',
    };

    return (
      <StatelessUploadView
        mpBrowser={{} as any}
        context={context}
        recentsCollection="some-collection-name"
        apiUrl={apiUrl}
        isLoading={isLoading}
        recents={recents}
        uploads={uploads}
        selectedItems={selectedItems}
        onFileClick={() => {}}
        onEditorShowImage={() => {}}
        onEditRemoteImage={() => {}}
      />
    );
  };

  it('should render the loading state when "isLoading" is true', () => {
    const component = shallow(getUploadViewElement(true));

    expect(component.find(SpinnerWrapper)).toHaveLength(1);
    expect(component.find(Spinner)).toHaveLength(1);
  });

  it('should render the empty state when there are NO recent items and NO local uploads inflight', () => {
    const component = shallow(getUploadViewElement(false));

    expect(component.find(Wrapper)).toHaveLength(1);
    expect(component.find(Wrapper).props().className).toEqual('empty');
    expect(component.find(Dropzone)).toHaveLength(1);
  });

  it('should render cards and dropzone when there are recent items', () => {
    const recentItem = {
      type: 'file',
      id: 'some-file-id',
      insertedAt: 0,
      occurrenceKey: 'some-occurrence-key',
      details: { name: 'some-file-name', size: 1000 },
    };
    const recentItems = [recentItem, recentItem, recentItem];

    const component = shallow(getUploadViewElement(false, recentItems));

    expect(component.find(Wrapper)).toHaveLength(1);
    expect(component.find(Wrapper).props().className).toEqual(undefined);
    expect(component.find(Dropzone)).toHaveLength(1);

    expect(component.find(Card)).toHaveLength(3);
  });
});

describe('<UploadView />', () => {
  let state: State;
  beforeEach(() => {
    state = {
      ...mockState,
      recents: {
        ...mockState.recents,
        items: [
          {
            type: 'some-type',
            id: 'some-id',
            insertedAt: 0,
            occurrenceKey: 'some-occurrence-key',
            details: {
              name: 'some-name',
              size: 100,
            },
          },
        ],
      },
      view: {
        ...mockState.view,
      },
      uploads: {
        'some-id': {
          file: {
            metadata: {
              id: 'some-id',
              name: 'some-name',
              size: 1000,
              mimeType: 'image/png',
            },
            dataURI: 'some-data-uri',
          },
          index: 0,
          events: [],
          tenant: {
            auth: {
              clientId: 'some-tenant-client-id',
              token: 'some-tenant-client-token',
            },
            uploadParams: {},
          },
          progress: 0,
        },
      },
    };
  });

  it('should deliver all required props to stateless component', () => {
    const { component } = createConnectedComponent(state);
    const props = component.props();
    expect(props.recents).toEqual(state.recents);
    expect(props.uploads).toEqual(state.uploads);
    expect(props.selectedItems).toEqual(state.selectedItems);
    expect(props.apiUrl).toEqual(state.apiUrl);
  });

  it('should dispatch fileClick action when onFileClick called', () => {
    const { component, dispatch } = createConnectedComponent(state);
    const props = component.props();
    const metadata = {
      id: 'some-id',
      mimeType: 'some-mime-type',
      name: 'some-name',
      size: 42,
    };
    props.onFileClick(metadata, 'google');
    expect(dispatch).toBeCalledWith(
      fileClick(
        {
          id: 'some-id',
          mimeType: 'some-mime-type',
          name: 'some-name',
          size: 42,
          date: 0,
        },
        'google',
      ),
    );
  });

  it('should dispatch editorShowImage action when onEditorShowImage called', () => {
    const { component, dispatch } = createConnectedComponent(state);
    const props = component.props();
    const fileRef = { id: 'some-id', name: 'some-name' };
    const dataUri = 'some-data-uri';

    props.onEditorShowImage(fileRef, dataUri);
    expect(dispatch).toHaveBeenCalledWith(editorShowImage(dataUri, fileRef));
  });

  it('should dispatch editRemoteImage action when onEditRemoteImage called', () => {
    const { component, dispatch } = createConnectedComponent(state);
    const props = component.props();
    const fileRef = { id: 'some-id', name: 'some-name' };
    const collectionName = 'some-collection-name';

    props.onEditRemoteImage(fileRef, collectionName);
    expect(dispatch).toHaveBeenCalledWith(
      editRemoteImage(fileRef, collectionName),
    );
  });

  it('should display a flag if WebGL is not available', () => {
    const { component, root } = createConnectedComponent(state, mount);
    const mockAnnotationClick = component
      .instance()
      .onAnnotateActionClick(() => {});

    root.update();

    expect(isWebGLAvailable).not.toHaveBeenCalled();
    expect(root.find(FlagGroup)).toHaveLength(0);
    mockAnnotationClick();

    root.update();

    expect(root.find(FlagGroup)).toHaveLength(1);
    expect(isWebGLAvailable).toHaveBeenCalled();
  });

  it('should render annotate card action with annotate icon', () => {
    const { component } = createConnectedComponent(state, mount);
    expect(
      component
        .find(CardView)
        .first()
        .props().actions,
    ).toContainEqual({
      label: 'Annotate',
      icon: expect.objectContaining({
        type: AnnotateIcon,
      }),
      handler: expect.any(Function),
    });
  });
});
