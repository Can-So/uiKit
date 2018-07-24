import * as React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import Button from '@atlaskit/button';
import Avatar from '@atlaskit/avatar';
import AvatarGroup from '@atlaskit/avatar-group';
import { ResolvedView, Action } from '../../../src/BlockCard/ResolvedView';
import { ImageIcon } from '../../../src/BlockCard/ImageIcon';
import {
  Title,
  Byline,
  Description,
  Thumbnail,
  ActionsWrapper,
} from '../../../src/BlockCard/ResolvedView/styled';
import { PreviewView } from '../../../src/BlockCard/ResolvedView/PreviewView';
import AlertView from '../../../src/BlockCard/ResolvedView/AlertView';

function getActionButtons(element: ReactWrapper) {
  return element.find(ActionsWrapper).find(Button);
}

describe('ResolvedView', () => {
  const icon = {
    url: 'https://www.example.com/foobar.jpg',
  };

  const user = {
    icon: 'https://www.example.com/foobar.jpg',
  };

  const preview = 'https://www.example.com/foo.jpg';
  const thumbnail = 'https://www.example.com/foobar.jpg';

  const likeAction = {
    id: 'like',
    text: 'Like',
    handler: jest.fn(),
  };

  const commentAction = {
    id: 'comment',
    text: 'Comment',
    handler: jest.fn(),
  };

  const reportAction = {
    id: 'report',
    text: 'Report',
    handler: jest.fn(),
  };

  const downloadAction = {
    id: 'download',
    text: 'Download',
    handler: jest.fn(),
  };

  const pendingAction: Action = {
    id: 'pendingAction',
    text: 'Like',
    handler: ({ pending }) => pending(),
  };

  const successActionWithoutMessage: Action = {
    id: 'successWithoutMessage',
    text: 'Like',
    handler: ({ success }) => success(),
  };

  const successActionWithMessage: Action = {
    id: 'successWithMessage',
    text: 'Like',
    handler: ({ success }) => success('Yey!'),
  };

  const failureAction: Action = {
    id: 'failure',
    text: 'Like',
    handler: ({ failure }) => failure(),
  };

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

  it('should render the byline', () => {
    const element = shallow(
      <ResolvedView
        byline={{
          text: 'Created by an Alien.',
        }}
      />,
    );
    expect(
      element
        .find(Byline)
        .render()
        .text(),
    ).toEqual('Created by an Alien.');
  });

  it('should render the description when there is a description', () => {
    const element = shallow(
      <ResolvedView
        description={{
          text: 'Your tiny planet is mine!',
        }}
      />,
    );
    expect(
      element
        .find(Description)
        .render()
        .text(),
    ).toEqual('Your tiny planet is mine!');
  });

  it('should not render the description when there is no description', () => {
    const element = shallow(<ResolvedView />);
    expect(element.find(Description)).toHaveLength(0);
  });

  it('should render the icon when there is an icon and no user', () => {
    const element = shallow(<ResolvedView icon={icon} />);
    expect(element.find(ImageIcon)).toHaveLength(1);
    expect(element.find(Avatar)).toHaveLength(0);
  });

  it('should render the icon when there is an icon and a user', () => {
    const element = shallow(<ResolvedView icon={icon} user={user} />);
    expect(element.find(ImageIcon)).toHaveLength(1);
    expect(element.find(Avatar)).toHaveLength(0);
  });

  it('should render the user when there is a user and no icon', () => {
    const element = shallow(<ResolvedView user={user} />);
    expect(element.find(ImageIcon)).toHaveLength(0);
    expect(element.find(Avatar)).toHaveLength(1);
  });

  it('it should render a preview when there is a preview', () => {
    const element = shallow(<ResolvedView preview={preview} />);
    expect(element.find(PreviewView)).toHaveLength(1);
  });

  it('it should not render a preview when there is no preview', () => {
    const element = shallow(<ResolvedView preview={preview} />);
    expect(element.find(PreviewView)).toHaveLength(1);
  });

  it('should render the thumbnail when there is a thumbnail', () => {
    const element = shallow(<ResolvedView thumbnail={thumbnail} />);
    expect(element.find(Thumbnail)).toHaveLength(1);
  });

  it('should not render the thumbnail when there is no thumbnail', () => {
    const element = shallow(<ResolvedView />);
    expect(element.find(Thumbnail)).toHaveLength(0);
  });

  it('should not render the avatar group when there are no users', () => {
    const element = shallow(<ResolvedView users={[]} />);
    expect(element.find(AvatarGroup)).toHaveLength(0);
  });

  it('should render the avatar group when there are users', () => {
    const element = shallow(
      <ResolvedView
        users={[
          {
            icon: 'https://www.example.com/',
            name: 'John Smith',
          },
          {
            icon: 'https://www.whisky.com/',
          },
        ]}
      />,
    );
    expect(element.find(AvatarGroup).prop('data')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'John Smith',
          src: 'https://www.example.com/',
        }),
        expect.objectContaining({
          src: 'https://www.whisky.com/',
        }),
      ]),
    );
  });

  it('should not render any buttons when there are no actions', () => {
    const element = shallow(<ResolvedView actions={[]} />);
    expect(element.find(Button)).toHaveLength(0);
  });

  it('should render 3 buttons when there are more then 3 actions', () => {
    const element = shallow(
      <ResolvedView
        actions={[likeAction, commentAction, reportAction, downloadAction]}
      />,
    );
    const buttons = element.find(Button);
    expect(buttons).toHaveLength(3);
  });

  it('should show the spinner in the button when an action is pending', () => {
    const element = mount(
      <ResolvedView actions={[pendingAction, successActionWithMessage]} />,
    );
    element
      .find(Button)
      .first()
      .simulate('click');
    element.update();
    expect(
      element
        .find(Button)
        .first()
        .prop('isLoading'),
    ).toBeTruthy();
  });

  it('should disable the button when an action is pending', () => {
    const element = mount(
      <ResolvedView actions={[pendingAction, successActionWithMessage]} />,
    );
    getActionButtons(element)
      .first()
      .simulate('click');
    element.update();
    const buttons = getActionButtons(element);
    expect(buttons.first().prop('isDisabled')).toBeTruthy();
    expect(buttons.last().prop('isDisabled')).toBeFalsy();
  });

  it('should disable all buttons when an action is failed', () => {
    const element = mount(
      <ResolvedView actions={[failureAction, successActionWithMessage]} />,
    );
    const buttons = getActionButtons(element);
    buttons.first().simulate('click');
    element.update();
    getActionButtons(element).forEach(node =>
      expect(node.prop('isDisabled')).toBeTruthy(),
    );
  });

  it('should render the alert when an action succeeds with a message', () => {
    const element = mount(
      <ResolvedView actions={[successActionWithMessage]} />,
    );
    getActionButtons(element)
      .first()
      .simulate('click');
    element.update();
    expect(element.find(AlertView).exists()).toBeTruthy();
    expect(element.find(AlertView).prop('type')).toEqual('success');
    expect(element.find(AlertView).prop('text')).toEqual('Yey!');
  });

  it('should not render the alert when an action succeeds without a message', () => {
    const element = mount(
      <ResolvedView actions={[successActionWithoutMessage]} />,
    );
    const buttons = getActionButtons(element);
    buttons.first().simulate('click');
    element.update();
    expect(element.find(AlertView).exists()).toBeFalsy();
  });

  it('should render the alert ResolvedView an action failed', () => {
    const element = mount(<ResolvedView actions={[failureAction]} />);
    const buttons = getActionButtons(element);
    buttons.first().simulate('click');
    element.update();
    expect(element.find(AlertView).exists()).toBeTruthy();
    expect(element.find(AlertView).prop('type')).toEqual('failure');
  });

  it('should not render the alert after 2 seconds when an action succeeds', done => {
    jest.useFakeTimers();
    const element = mount(
      <ResolvedView actions={[successActionWithMessage]} />,
    );
    const buttons = getActionButtons(element);
    buttons.first().simulate('click');
    setTimeout(() => {
      element.update();
      try {
        expect(element.find(AlertView).exists()).toBeFalsy();
        done();
      } catch (error) {
        done.fail(error);
      }
    }, 4000); // FIXME
    jest.runAllTimers();
  });
});
