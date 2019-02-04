import * as React from 'react';
import { shallow } from 'enzyme';
import { expectToEqual } from '@atlaskit/media-test-helpers';

import { UploadingView } from '../../uploadingView';
import { MediaImage, CardActionsView } from '../..';

describe('UploadingView', () => {
  it('should render card actions with provided actions', () => {
    const actions = [
      {
        label: 'Delete',
        handler: () => {},
      },
    ];
    const card = shallow(<UploadingView progress={0} actions={actions} />);

    expect(card.find(CardActionsView).prop('actions')).toEqual(actions);
  });

  it('should not render the image when dataURI is not provided', () => {
    const card = shallow(<UploadingView progress={0} />);
    expect(card.find(MediaImage)).toHaveLength(0);
  });

  it('should render the image when dataURI is provided', () => {
    const card = shallow(
      <UploadingView
        progress={0}
        dataURI="data:png"
        previewOrientation={6}
        stretch={true}
        crop={true}
      />,
    );
    const mediaImage = card.find(MediaImage);
    expect(mediaImage).toHaveLength(1);
    expectToEqual(mediaImage.props(), {
      dataURI: 'data:png',
      previewOrientation: 6,
      stretch: true,
      crop: true,
    });
  });
});
