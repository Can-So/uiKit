import { shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { MultiValue, scrollToValue } from '../../../components/MultiValue';
import { SizeableAvatar } from '../../../components/SizeableAvatar';
import { renderProp } from '../_testUtils';

const mockHtmlElement = (rect: Partial<DOMRect>): HTMLElement =>
  ({
    getBoundingClientRect: jest.fn(() => rect),
    scrollIntoView: jest.fn(),
  } as any);

describe('MultiValue', () => {
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
  ) => shallow(<MultiValue data={data} removeProps={{ onClick }} {...props} />);

  afterEach(() => {
    onClick.mockClear();
  });

  it('should render Tag', () => {
    const component = shallowMultiValue();
    const tag = renderProp(
      component.find(FormattedMessage),
      'children',
      'remove',
    );
    expect(tag.props()).toMatchObject({
      appearance: 'rounded',
      text: 'Jace Beleren',
      elemBefore: (
        <SizeableAvatar
          appearance="compact"
          src="http://avatars.atlassian.com/jace.png"
          name="Jace Beleren"
        />
      ),
      removeButtonText: 'remove',
    });
  });

  it('should use blueLight color when focused', () => {
    const component = shallowMultiValue({ isFocused: true });
    const tag = renderProp(
      component.find(FormattedMessage),
      'children',
      'remove',
    );
    expect(tag.props()).toMatchObject({
      appearance: 'rounded',
      text: 'Jace Beleren',
      elemBefore: (
        <SizeableAvatar
          appearance="compact"
          src="http://avatars.atlassian.com/jace.png"
          name="Jace Beleren"
        />
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

  it('should scroll to open from bottom', () => {
    const current: HTMLElement = mockHtmlElement({ top: 10, height: 20 });
    const parent: HTMLElement = mockHtmlElement({ height: 100 });
    scrollToValue(current, parent);
    expect(current.scrollIntoView).toHaveBeenCalled();
    expect(current.scrollIntoView).toHaveBeenCalledWith();
  });

  it('should scroll to open from top', () => {
    const current: HTMLElement = mockHtmlElement({ top: 90, height: 20 });
    const parent: HTMLElement = mockHtmlElement({ height: 100 });
    scrollToValue(current, parent);
    expect(current.scrollIntoView).toHaveBeenCalled();
    expect(current.scrollIntoView).toHaveBeenCalledWith(false);
  });
});
