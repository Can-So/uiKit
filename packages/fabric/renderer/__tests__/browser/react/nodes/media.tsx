import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Media from '../../../../src/react/nodes/media';
import { MediaType, MediaItem } from '@atlaskit/editor-common';

describe('Media', () => {
  const mediaNode = {
    type: 'media',
    attrs: {
      type: 'file',
      id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
      collection: 'MediaServicesSample',
    },
  };

  it('should render a media component with the proper props', async () => {
    const mediaComponent = mount(
      <Media
        type={mediaNode.attrs.type as MediaType}
        id={mediaNode.attrs.id}
        collection={mediaNode.attrs.collection}
      />,
    );

    expect(mediaComponent.find(MediaItem).length).to.equal(1);
    mediaComponent.unmount();
  });
});
