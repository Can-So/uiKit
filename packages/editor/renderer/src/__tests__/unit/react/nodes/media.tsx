import * as React from 'react';
import { mount } from 'enzyme';
import { MediaType } from '@atlaskit/adf-schema';
import { Card } from '@atlaskit/media-card';
import { MediaCard, MediaCardInternal } from '../../../../ui/MediaCard';
import Media from '../../../../react/nodes/media';

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

    expect(mediaComponent.find(MediaCard).length).toEqual(1);
    mediaComponent.unmount();
  });

  it('should render a media component with external image', async () => {
    const mediaComponent = mount(
      <Media type="external" url="http://image.jpg" />,
    );

    expect(mediaComponent.find(MediaCard).length).toEqual(1);
    mediaComponent.unmount();
  });

  describe('<MediaCard />', () => {
    it('should pass shouldOpenMediaViewer=true if there is no onClick callback', () => {
      const cardWithOnClick = mount(
        <MediaCard
          type="file"
          id="1"
          eventHandlers={{ media: { onClick: jest.fn() } }}
        />,
      );
      const cardWithoutOnClick = mount(<MediaCard type="file" id="1" />);

      // force media context to be resolved
      cardWithOnClick.find(MediaCardInternal).setState({ context: {} });
      cardWithoutOnClick.find(MediaCardInternal).setState({ context: {} });

      expect(
        cardWithOnClick.find(Card).prop('shouldOpenMediaViewer'),
      ).toBeFalsy();
      expect(
        cardWithoutOnClick.find(Card).prop('shouldOpenMediaViewer'),
      ).toBeTruthy();
    });
  });
});
