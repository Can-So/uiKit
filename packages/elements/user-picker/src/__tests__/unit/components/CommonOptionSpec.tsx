import { AvatarItem } from '@atlaskit/avatar';
import { shallow } from 'enzyme';
import * as React from 'react';
import { SizeableAvatar } from '../../../components/SizeableAvatar';

import { OptionTextWrapper } from '../../../components/styles';

import {
  CommonOption,
  CommonOptionProps,
} from '../../../components/CommonOption';

describe('Common Option', () => {
  const getByLine = () => <OptionTextWrapper>This is byline</OptionTextWrapper>;

  const getPrimaryText = () => (
    <OptionTextWrapper>This is primary text</OptionTextWrapper>
  );

  const shallowOption = (props: Partial<CommonOptionProps> = {}) =>
    shallow(
      <CommonOption
        avatarUrl="http://avatars.atlassian.com/jace.png"
        name="Awesome option"
        presence="present"
        getByline={getByLine}
        getPrimaryText={getPrimaryText}
        {...props}
      />,
    );

  it('should render Common Option component', () => {
    const component = shallowOption();
    const avatarItem = component.find(AvatarItem);
    expect(avatarItem.props()).toMatchObject({
      backgroundColor: 'transparent',
      avatar: (
        <SizeableAvatar
          appearance="big"
          src="http://avatars.atlassian.com/jace.png"
          presence="present"
          name="Awesome option"
        />
      ),
      primaryText: <OptionTextWrapper>This is primary text</OptionTextWrapper>,
      secondaryText: <OptionTextWrapper>This is byline</OptionTextWrapper>,
    });
  });
});
