import * as React from 'react';
import { mount } from 'enzyme';
import { EditorView } from 'prosemirror-view';
import { mediaGroup, media } from '@atlaskit/editor-test-helpers';
import { defaultSchema } from '@atlaskit/adf-schema';
import {
  MediaPluginState,
  stateKey as mediaStateKey,
} from '../../../../../../plugins/media/pm-plugins/main';
import MediaGroup from '../../../../../../plugins/media/nodeviews/mediaGroup';

import { EditorAppearance } from '../../../../../../types';

describe('nodeviews/mediaGroup', () => {
  let pluginState: MediaPluginState;
  const mediaNode = media({
    id: 'foo',
    type: 'file',
    collection: 'collection',
  })();
  const view = {} as EditorView;
  beforeEach(() => {
    pluginState = {} as MediaPluginState;
    pluginState.getMediaOptions = () => ({} as any);
    pluginState.mediaGroupNodes = {};
    pluginState.handleMediaNodeRemoval = () => {};
    jest.spyOn(mediaStateKey, 'getState').mockImplementation(() => pluginState);
  });

  it('should re-render for custom media picker with no thumb', () => {
    pluginState.getMediaOptions = () => ({ customMediaPicker: {} } as any);

    const mediaGroupNode = mediaGroup(mediaNode);
    const props = {
      view: view,
      node: mediaGroupNode(defaultSchema),
      getPos: () => 1,
      selected: null,
      editorAppearance: 'full-page' as EditorAppearance,
    };

    const wrapper = mount(<MediaGroup {...props} />);

    expect(wrapper.length).toEqual(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
