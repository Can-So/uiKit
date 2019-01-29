import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { expectToEqual } from '@atlaskit/media-test-helpers';

import { FileCardImageView } from '../..';
import { CardOverlay, CardOverlayProps } from '../../cardImageView/cardOverlay';
import { FileIcon } from '../../../utils';
import { UploadingView } from '../../../utils/uploadingView';
import { Wrapper } from '../../cardImageView/styled';
import { CardAction } from '../../../actions';
import { CardContent } from '../../cardImageView/cardContent';
import { CardStatus } from '../../../index';

describe('FileCardView', () => {
  it('should render card with non-persisting overlay when supplied mediaType is "image" and dataUri string is supplied', function() {
    const card = mount(
      <FileCardImageView mediaType="image" dataURI="data" status="complete" />,
    );
    expect(card.find(CardOverlay).props().persistent).toEqual(false);
  });

  it('should render empty wrapper when error prop is true', function() {
    const card = mount(
      <FileCardImageView error="Some random error occurred" status="error" />,
    );
    expect(card.find('.wrapper').children()).toHaveLength(0);
  });

  it('should render card overlay with the error prop true when supplied error prop is true', function() {
    const errorStr = 'Some random error occurred';
    const card = mount(<FileCardImageView error={errorStr} status="error" />);
    expect(card.find(CardOverlay).props().error).toEqual(errorStr);
  });

  it('should render persistent card overlay with all details when status is "failed"', () => {
    const actions: CardAction[] = [
      {
        handler: () => {},
      },
    ];
    const card = mount(
      <FileCardImageView
        mediaName="some-media-name"
        mediaType="image"
        actions={actions}
        status="failed-processing"
        fileSize="some-size"
      />,
    );
    expect(card.find(CardOverlay).props()).toEqual({
      noHover: true,
      persistent: true,
      mediaName: 'some-media-name',
      mediaType: 'image',
      actions,
      subtitle: 'some-size',
    } as CardOverlayProps);
  });

  it('should NOT render an overlay when loading prop is true', function() {
    const card = mount(<FileCardImageView status="loading" />);
    expect(card.find(CardOverlay)).toHaveLength(0);
  });

  it('should render default icon according to mediaType', () => {
    const card = mount(
      <FileCardImageView mediaType="audio" status="complete" />,
    );
    expect(card.find(FileIcon).props().mediaType).toBe('audio');
  });

  it('should render subtitle when provided', function() {
    const subtitle = 'Software Development and Collaboration Tools';
    const card = mount(
      <FileCardImageView fileSize={subtitle} status="complete" />,
    );

    expect(card.find(CardOverlay).props().subtitle).toBe(subtitle);
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "video"', function() {
    const card = shallow(
      <FileCardImageView
        mediaType="video"
        dataURI="some-data-uri"
        status="complete"
      />,
    );

    expect(card.find(CardOverlay).props().persistent).toBe(false);
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "audio"', function() {
    const card = shallow(
      <FileCardImageView
        mediaType="audio"
        dataURI="some-data-uri"
        status="complete"
      />,
    );

    expect(card.find(CardOverlay).props().persistent).toBe(false);
  });

  it('should render the overlay as NOT persistent when dataURI is a string and mediaType is "image"', function() {
    const card = shallow(
      <FileCardImageView
        mediaType="image"
        dataURI="some-data-uri"
        status="complete"
      />,
    );

    expect(card.find(CardOverlay).props().persistent).toBe(false);
  });

  it('should render the overlay as persistent when dataURI is a string and mediaType is "doc"', function() {
    const card = shallow(
      <FileCardImageView
        mediaType="doc"
        dataURI="some-data-uri"
        status="complete"
      />,
    );

    expect(card.find(CardOverlay).props().persistent).toBe(true);
  });

  it('should render the overlay as persistent when dataURI is undefined', function() {
    const card = shallow(
      <FileCardImageView mediaType="video" status="complete" />,
    );

    expect(card.find(CardOverlay).props().persistent).toBe(true);
  });

  it('should render the UploadView with no overlay when status=uploading and card is NOT selectable', () => {
    const card = shallow(
      <FileCardImageView status="uploading" mediaName="foo" progress={90} />,
    );
    const uploadView = card.find(UploadingView);
    expect(uploadView).toHaveLength(1);
    expect(uploadView.props()).toMatchObject({
      title: 'foo',
      progress: 90,
    });

    const overlay = card.find(CardOverlay);
    expect(overlay).toHaveLength(0);
  });

  it('should render the UploadView with an overlay when status=uploading and card is selectable', () => {
    const card = shallow(
      <FileCardImageView
        status="uploading"
        mediaName="foo"
        progress={90}
        selectable={true}
      />,
    );
    const uploadView = card.find(UploadingView);
    expect(uploadView).toHaveLength(1);
    expect(uploadView.props()).toMatchObject({
      title: 'foo',
      progress: 90,
    });

    const overlay = card.find(CardOverlay);
    expect(overlay).toHaveLength(1);
    expect(overlay.props()).toMatchObject({
      persistent: true,
      selectable: true,
      selected: undefined,
    });
  });

  it('should NOT render the overlay when "disableOverlay" is true', function() {
    const card = shallow(
      <FileCardImageView
        mediaType="video"
        status="complete"
        disableOverlay={true}
      />,
    );

    expect(card.find(CardOverlay)).toHaveLength(0);
  });

  it('should pass "disableOverlay" to the root Wrapper component', function() {
    const card = shallow(
      <FileCardImageView
        mediaType="video"
        status="complete"
        disableOverlay={true}
      />,
    );

    expect(card.props().disableOverlay).toEqual(true);
  });

  it('should pass "selectable" to the root Wrapper component', function() {
    const card = shallow(
      <FileCardImageView
        mediaType="video"
        status="complete"
        selectable={true}
      />,
    );

    expect(card.props().selectable).toEqual(true);
  });

  it('should pass "selected" to the root Wrapper component', function() {
    const card = shallow(
      <FileCardImageView mediaType="video" status="complete" selected={true} />,
    );

    expect(card.props().selected).toEqual(true);
  });

  it('should render correct background based on mediaType"', function() {
    const wrapperAsImage = shallow(<Wrapper mediaType="image" />);
    const wrapperNotImage = shallow(<Wrapper />);

    expect(wrapperAsImage).toMatchSnapshot();
    expect(wrapperNotImage).toMatchSnapshot();
  });

  it('should render CardContent for image with some default values', () => {
    const card = mount(
      <FileCardImageView mediaType="image" dataURI="data" status="complete" />,
    );
    expect(card.find(CardContent)).toHaveLength(1);
    expectToEqual(card.find(CardContent).props(), {
      loading: false,
      mediaItemType: 'file',
      mediaType: 'image',
      dataURI: 'data',
      // Default values
      crop: true,
      stretch: false,
      previewOrientation: undefined,
    });
  });

  it('should render CardContent for image with all props defined', () => {
    const card = mount(
      <FileCardImageView
        mediaType="image"
        dataURI="data"
        status="complete"
        previewOrientation={6}
        resizeMode={'stretchy-fit'}
      />,
    );
    expectToEqual(card.find(CardContent).props(), {
      loading: false,
      mediaItemType: 'file',
      mediaType: 'image',
      dataURI: 'data',
      crop: false,
      stretch: true,
      previewOrientation: 6,
    });
  });

  test.each(['loading', 'processing'] as CardStatus[])(
    'should render CardContent with loading flag when status is %s and no data present',
    (status: CardStatus) => {
      const card = mount(
        <FileCardImageView mediaType="image" status={status} progress={0.5} />,
      );
      expectToEqual(card.find(CardContent).props().loading, true);
    },
  );

  it('should render CardContent with loading flag when status is complete but no dataURI', () => {
    const card = mount(
      <FileCardImageView mediaType="image" status="complete" progress={1} />,
    );
    expectToEqual(card.find(CardContent).props().loading, true);
  });

  it('should render CardContent with no loading flag when progress is 100%', () => {
    const card = mount(
      <FileCardImageView
        mediaType="image"
        dataURI="data"
        status="loading"
        progress={1}
      />,
    );
    expectToEqual(card.find(CardContent).props().loading, false);
  });
});
