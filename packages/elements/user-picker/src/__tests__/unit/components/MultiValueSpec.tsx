import Avatar from '@atlaskit/avatar';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { MultiValue } from '../../../components/MultiValue';

const renderProp = (wrapper: ShallowWrapper, renderProp: string, ...args) => {
  const prop = wrapper.prop(renderProp);
  if (prop && typeof prop === 'function') {
    const Wrapper = () => prop(...args);
    return shallow(<Wrapper />);
  }
  throw new Error('renderProp is not a function');
};

describe('MultiValue', () => {
  const Container = props => <div {...props} />;
  const data = {
    label: 'Jace Beleren',
    user: {
      id: 'abc-123',
      name: 'Jace Beleren',
      nickname: 'jbeleren',
      avatarUrl: 'http://avatars.atlassian.com/jace.png',
    },
  };
  const onClick = jest.fn();
  const shallowMultiValue = (
    { components, ...props }: any = { components: {} },
  ) =>
    shallow(
      <MultiValue
        data={data}
        components={{ Container, ...components }}
        removeProps={{ onClick }}
        {...props}
      />,
    );

  afterEach(() => {
    onClick.mockClear();
  });

  it('should render the Container with a Tag', () => {
    const component = shallowMultiValue();
    expect(component.find(Container)).toHaveLength(1);
    const tag = renderProp(
      component.find(FormattedMessage),
      'children',
      'remove',
    );
    expect(tag.props()).toMatchObject({
      appearance: 'rounded',
      text: 'Jace Beleren',
      elemBefore: (
        <Avatar size="xsmall" src="http://avatars.atlassian.com/jace.png" />
      ),
      removeButtonText: 'remove',
    });
  });

  it('should use blueLight color when focused', () => {
    const component = shallowMultiValue({ isFocused: true });
    expect(component.find(Container)).toHaveLength(1);
    const tag = renderProp(
      component.find(FormattedMessage),
      'children',
      'remove',
    );
    expect(tag.props()).toMatchObject({
      appearance: 'rounded',
      text: 'Jace Beleren',
      elemBefore: (
        <Avatar size="xsmall" src="http://avatars.atlassian.com/jace.png" />
      ),
      removeButtonText: 'remove',
      color: 'blueLight',
    });
  });

  it('should call onClick onAfterRemoveAction', () => {
    const component = shallowMultiValue();
    const tag = renderProp(
      component.find(FormattedMessage),
      'children',
      'remove',
    );
    tag.simulate('afterRemoveAction');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not render remove button for fixed value', () => {
    const component = shallowMultiValue({
      data: { ...data, user: { ...data.user, fixed: true } },
    });
    const tag = renderProp(
      component.find(FormattedMessage),
      'children',
      'remove',
    );
    expect(tag.prop('removeButtonText')).toBeUndefined();
  });
});
