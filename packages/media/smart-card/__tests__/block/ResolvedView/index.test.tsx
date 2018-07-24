import * as React from 'react';
import { shallow } from 'enzyme';
import Avatar from '@atlaskit/avatar';
import { IconImage } from '@atlaskit/media-ui';
import { ResolvedView } from '../../../src/block/DetailView';
import {
  Title,
  Description,
  BottomWrapper,
  Thumbnail,
} from '../../../src/block/DetailView/styled';

describe('DetailView', () => {
  const icon = {
    url: 'https://www.example.com/foobar.jpg',
  };

  const user = {
    icon: 'https://www.example.com/foobar.jpg',
  };

  const thumbnail = 'https://www.example.com/foobar.jpg';

  it('should render the title', () => {
    const element = shallow(
      <ResolvedView
        title={{
          text: 'Hello World!',
        }}
      />,
    );
    expect(
      element
        .find(Title)
        .render()
        .text(),
    ).toEqual('Hello World!');
  });

  it('should render the description', () => {
    const element = shallow(
      <ResolvedView
        description={{
          text: 'Your world is small.',
        }}
      />,
    );
    expect(
      element
        .find(Description)
        .render()
        .text(),
    ).toEqual('Your world is small.');
  });

  it('should render the icon when there is an icon, a user and a thumbnail', () => {
    const element = shallow(
      <ResolvedView icon={icon} user={user} thumbnail={thumbnail} />,
    );
    expect(element.find(IconImage)).toHaveLength(1);
    expect(element.find(Avatar)).toHaveLength(0);
    expect(element.find(Thumbnail)).toHaveLength(0);
  });

  it('should render the user when there is a user and a thumbnail', () => {
    const element = shallow(<ResolvedView user={user} thumbnail={thumbnail} />);
    expect(element.find(IconImage)).toHaveLength(0);
    expect(element.find(Avatar)).toHaveLength(1);
    expect(element.find(Thumbnail)).toHaveLength(0);
  });

  it('should render the user when there is a user', () => {
    const element = shallow(<ResolvedView user={user} />);
    expect(element.find(IconImage)).toHaveLength(0);
    expect(element.find(Avatar)).toHaveLength(1);
    expect(element.find(Thumbnail)).toHaveLength(0);
  });

  it('should render the thumbnail when there is a thumbnail', () => {
    const element = shallow(<ResolvedView thumbnail={thumbnail} />);
    expect(element.find(IconImage)).toHaveLength(0);
    expect(element.find(Avatar)).toHaveLength(0);
    expect(element.find(Thumbnail)).toHaveLength(1);
  });

  it('should render the icon when there is an icon and a user', () => {
    const element = shallow(<ResolvedView icon={icon} user={user} />);
    expect(element.find(IconImage)).toHaveLength(1);
    expect(element.find(Avatar)).toHaveLength(0);
    expect(element.find(Thumbnail)).toHaveLength(0);
  });

  it('should render the icon when there is an icon and a thumbnail', () => {
    const element = shallow(<ResolvedView icon={icon} thumbnail={thumbnail} />);
    expect(element.find(IconImage)).toHaveLength(1);
    expect(element.find(Avatar)).toHaveLength(0);
    expect(element.find(Thumbnail)).toHaveLength(0);
  });

  it('should render the icon when there is an icon', () => {
    const element = shallow(<ResolvedView icon={icon} thumbnail={thumbnail} />);
    expect(element.find(IconImage)).toHaveLength(1);
    expect(element.find(Avatar)).toHaveLength(0);
    expect(element.find(Thumbnail)).toHaveLength(0);
  });

  it('should padLeft when there is an icon', () => {
    const element = shallow(<ResolvedView icon={icon} />);
    expect(element.find(BottomWrapper).prop('padLeft')).toBeTruthy();
  });

  it('should padLeft when there is a user', () => {
    const element = shallow(<ResolvedView user={user} />);
    expect(element.find(BottomWrapper).prop('padLeft')).toBeTruthy();
  });

  it('should padLeft when there is a thumbnail', () => {
    const element = shallow(<ResolvedView thumbnail={thumbnail} />);
    expect(element.find(BottomWrapper).prop('padLeft')).toBeTruthy();
  });

  it('should not padLeft when there is no icon, user or preview', () => {
    const element = shallow(<ResolvedView />);
    expect(element.find(BottomWrapper).prop('padLeft')).toBeFalsy();
  });
});
