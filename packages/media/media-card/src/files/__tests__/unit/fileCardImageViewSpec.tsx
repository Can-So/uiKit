import * as React from 'react';
import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import { expectToEqual } from '@atlaskit/media-test-helpers';
import { Ellipsify } from '@atlaskit/media-ui';

import { FileCardImageView, FileCardImageViewProps } from '../..';
import { CardOverlay } from '../../cardImageView/cardOverlay';
import {
  Wrapper,
  PlayIconWrapper,
  ProgressBarWrapper,
} from '../../cardImageView/styled';
import { CardLoading, MediaImage } from '../../../utils';
import { ProgressBar } from '../../../utils/progressBar';
import CardActions from '../../../utils/cardActions';

describe('FileCardImageView', () => {
  let onRetry: FileCardImageViewProps['onRetry'];
  let mediaName: FileCardImageViewProps['mediaName'];
  let mediaType: FileCardImageViewProps['mediaType'];
  let actions: FileCardImageViewProps['actions'];
  let fileSize: FileCardImageViewProps['fileSize'];

  beforeEach(() => {
    onRetry = jest.fn();
    mediaName = 'some-media-name';
    mediaType = 'image';
    actions = [
      {
        handler: jest.fn(),
      },
    ];
    fileSize = 'some-KB';
  });

  describe('root Wrapper component', () => {
    let card: ShallowWrapper<FileCardImageViewProps>;
    beforeEach(() => {
      card = shallow(
        <FileCardImageView
          mediaType="video"
          status="complete"
          selectable={true}
          selected={true}
          disableOverlay={true}
        />,
      );
    });

    it('should have "disableOverlay"', () => {
      expectToEqual(card.props().disableOverlay, true);
    });

    it('should have "selectable"', () => {
      expectToEqual(card.props().selectable, true);
    });

    it('should have "selected"', () => {
      expectToEqual(card.props().selected, true);
    });
    it('should have "mediaType"', () => {
      expectToEqual(card.props().mediaType, 'video');
    });
  });

  describe('with "error" status', () => {
    let card: ReactWrapper<FileCardImageViewProps>;
    const errorStr = 'Some random error occurred';

    beforeEach(() => {
      card = mount(
        <FileCardImageView
          error={errorStr}
          status="error"
          onRetry={onRetry}
          mediaName={mediaName}
          mediaType={mediaType}
          actions={actions}
          fileSize={fileSize}
        />,
      );
    });

    it('should render empty wrapper when error prop is true', function() {
      expect(card.find('.wrapper').children()).toHaveLength(0);
    });

    it('should render card overlay', function() {
      expectToEqual(card.find(CardOverlay).props(), {
        error: errorStr,
        onRetry,
        persistent: true,
        mediaName,
        mediaType,
        actions,
        subtitle: fileSize,
      });
    });
  });

  describe('with "failed-processing" status', () => {
    let card: ReactWrapper<FileCardImageViewProps>;

    beforeEach(() => {
      card = mount(
        <FileCardImageView
          status="failed-processing"
          onRetry={onRetry}
          mediaName={mediaName}
          mediaType={mediaType}
          actions={actions}
          fileSize={fileSize}
        />,
      );
    });

    it('should render empty wrapper when error prop is true', function() {
      expect(card.find('.wrapper').children()).toHaveLength(0);
    });

    it('should render "persistent" card overlay', () => {
      expectToEqual(card.find(CardOverlay).props(), {
        noHover: true,
        persistent: true,
        mediaName,
        mediaType,
        actions,
        subtitle: fileSize,
      });
    });
  });

  const renderLoadingContentsCards: {
    [key: string]: () => ShallowWrapper<FileCardImageViewProps>;
  } = {
    'with "loading" status': () =>
      shallow(<FileCardImageView status="loading" />),
    'with "processing" status': () =>
      shallow(<FileCardImageView status="processing" />),
    'with image type and no dataURI': () =>
      shallow(
        <FileCardImageView
          status="complete"
          dataURI={undefined}
          mediaType="image"
        />,
      ),
  };

  Object.keys(renderLoadingContentsCards).forEach(description => {
    describe(description, () => {
      let card: ShallowWrapper<FileCardImageViewProps>;

      beforeEach(() => {
        card = renderLoadingContentsCards[description]();
      });

      it('should not render overlay', () => {
        expect(card.find(CardOverlay)).toHaveLength(0);
      });

      it('should render CardLoading', () => {
        const cardLoadingComponent = card.find(CardLoading);
        expect(cardLoadingComponent).toHaveLength(1);
      });
    });
  });

  describe('with "complete" status', () => {
    it('should render "persistent" card overlay when document and no dataURI', () => {
      const card = shallow(
        <FileCardImageView
          mediaType="doc"
          dataURI={undefined}
          status="complete"
          selected={true}
          selectable={true}
          fileSize={fileSize}
          actions={actions}
          mediaName={mediaName}
        />,
      );
      expectToEqual(card.find(CardOverlay).props(), {
        persistent: true,
        selectable: true,
        selected: true,
        mediaName,
        mediaType: 'doc',
        subtitle: fileSize,
        actions,
      });
    });

    it('should render non-persistent card overlay when its an image with dataURI', () => {
      const card = shallow(
        <FileCardImageView
          mediaType="image"
          dataURI="some-data"
          status="complete"
          selected={false}
          selectable={false}
          fileSize={fileSize}
          actions={actions}
          mediaName={mediaName}
        />,
      );
      expectToEqual(card.find(CardOverlay).props(), {
        persistent: false,
        selectable: false,
        selected: false,
        mediaName,
        mediaType: 'image',
        subtitle: fileSize,
        actions,
      });
    });
  });

  it('should render overlay if dataURI present even if status is "loading"', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="image"
        status="loading"
        dataURI="some-data"
      />,
    );

    expect(card.find(CardOverlay)).toHaveLength(1);
  });

  it('should NOT render the overlay when "disableOverlay" is true', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="video"
        status="complete"
        disableOverlay={true}
      />,
    );

    expect(card.find(CardOverlay)).toHaveLength(0);
  });

  it('should render overlay when its "uploading" and selectable', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="image"
        status="uploading"
        dataURI="some-data"
        selected={false}
        selectable={true}
        fileSize={fileSize}
        actions={actions}
        mediaName={mediaName}
      />,
    );
    expectToEqual(card.find(CardOverlay).props(), {
      persistent: false,
      selectable: true,
      selected: false,
      mediaName: '',
      actions: [],
    });
  });

  it('should render persistent overlay when its "uploading" and selectable', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="doc"
        status="uploading"
        selected={false}
        selectable={true}
        fileSize={fileSize}
        actions={actions}
        mediaName={mediaName}
      />,
    );
    expectToEqual(card.find(CardOverlay).props(), {
      persistent: true,
      selectable: true,
      selected: false,
      mediaName: '',
      actions: [],
    });
  });

  it('should not render overlay when its "uploading" and not selectable', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="image"
        status="uploading"
        dataURI="some-data"
        selected={false}
        selectable={false}
        fileSize={fileSize}
        actions={actions}
        mediaName={mediaName}
      />,
    );
    expect(card.find(CardOverlay)).toHaveLength(0);
  });

  describe('rendered MediaImage', () => {
    let card: ShallowWrapper<FileCardImageViewProps>;

    beforeEach(() => {
      card = shallow(
        <FileCardImageView
          mediaType="image"
          status="uploading"
          dataURI="some-data"
          resizeMode={'stretchy-fit'}
          selected={false}
          selectable={false}
          fileSize={fileSize}
          actions={actions}
          mediaName={mediaName}
          previewOrientation={6}
        />,
      );
    });

    it('should be there', () => {
      expect(card.find(MediaImage)).toHaveLength(1);
    });

    it('should have dataURI', () => {
      expectToEqual(card.find(MediaImage).props().dataURI, 'some-data');
    });

    it('should have crop and stretch props', () => {
      const props = card.find(MediaImage).props();
      expectToEqual(props.crop, false);
      expectToEqual(props.stretch, true);
    });

    it('should have previewOrientation', () => {
      const props = card.find(MediaImage).props();
      expectToEqual(props.previewOrientation, 6);
    });
  });

  it('should not render MediaImage when its a document', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="doc"
        status="uploading"
        dataURI="some-data"
      />,
    );
    expect(card.find(MediaImage)).toHaveLength(0);
  });

  it('should render play button for a video', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="video"
        status="uploading"
        dataURI="some-data"
      />,
    );
    expect(card.find(PlayIconWrapper)).toHaveLength(1);
    expect(card.find(VidPlayIcon)).toHaveLength(1);
  });

  it('should not render progress bar when status is not "uploading"', () => {
    const card = shallow(
      <FileCardImageView mediaType="image" status="complete" progress={0.5} />,
    );
    expect(card.find(ProgressBarWrapper)).toHaveLength(0);
  });

  it('should render progress bar when status is "uploading"', () => {
    const card = shallow(
      <FileCardImageView
        mediaType="image"
        status="uploading"
        progress={0.5}
        dataURI="some-data"
        resizeMode={'stretchy-fit'}
        selected={false}
        selectable={false}
        fileSize={fileSize}
        actions={actions}
        mediaName={mediaName}
        previewOrientation={6}
      />,
    );

    expect(card.find(ProgressBarWrapper)).toHaveLength(1);
    expectToEqual(card.find(Ellipsify).props(), {
      text: mediaName,
      lines: 2,
    });
    expectToEqual(card.find(ProgressBar).props(), {
      progress: 0.5,
    });
    expect(card.find(CardActions)).toHaveLength(1);
    expectToEqual(card.find(CardActions).props(), {
      actions: actions!,
      triggerColor: 'white',
    });
  });

  it('should render correct background based on mediaType"', function() {
    const wrapperAsImage = shallow(<Wrapper mediaType="image" />);
    const wrapperNotImage = shallow(<Wrapper />);

    expect(wrapperAsImage).toMatchSnapshot();
    expect(wrapperNotImage).toMatchSnapshot();
  });
});
