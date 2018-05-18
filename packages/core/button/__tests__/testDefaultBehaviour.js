// @flow
import { mount, shallow } from 'enzyme';
import React from 'react';
import Spinner from '@atlaskit/spinner';
import {
  UIAnalyticsEvent,
  AnalyticsContext,
  AnalyticsListener,
} from '@atlaskit/analytics-next';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

import { name, version } from '../package.json';
import Button, { ButtonBase } from '../src/components/Button';
import IconWrapper from '../src/styled/IconWrapper';
import ButtonContent from '../src/styled/ButtonContent';

describe('ak-button/default-behaviour', () => {
  it('button should have type="button" by default', () =>
    expect(
      mount(<Button />)
        .find(ButtonBase)
        .props().type,
    ).toBe('button'));

  it('should render button if there is no href property', () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('a').length).toBe(0);
  });

  it('should render link if href property is set', () => {
    const wrapper = mount(<Button href="test" />);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should not render link without href prop, even if the target prop is set', () => {
    const wrapper = mount(<Button target="something" />);
    expect(wrapper.find('a').length).toBe(0);
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should render span when the button is disabled and has href property', () => {
    const wrapper = mount(<Button isDisabled href="test" />);
    expect(wrapper.find('StyledSpan').length).toBe(1);
    expect(wrapper.find('button').length).toBe(0);
    expect(wrapper.find('a').length).toBe(0);
  });

  it("should not render span when the button is disabled, but doesn't have href", () => {
    const wrapper = mount(<Button isDisabled />);
    expect(wrapper.find('StyledSpan').length).toBe(0);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('a').length).toBe(0);
  });

  it('should render icon if the prop iconBefore is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconBefore={Icon} />);
    expect(wrapper.contains(Icon)).toBe(true);
  });

  it('should render iconBefore before children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(
      <Button href="test" iconBefore={Icon}>
        button
      </Button>,
    );
    expect(wrapper.text()).toBe('iconbutton');
  });

  it('should render icon if the prop iconAfter is set', () => {
    const Icon = <div id="icon" />;
    const wrapper = mount(<Button href="test" iconAfter={Icon} />);
    expect(wrapper.contains(Icon)).toBe(true);
  });

  it('should render iconAfter after children', () => {
    const Icon = <div id="icon">icon</div>;
    const wrapper = mount(
      <Button href="test" iconAfter={Icon}>
        button
      </Button>,
    );
    expect(wrapper.text()).toBe('buttonicon');
  });

  it('should render button with full container width', () => {
    const wrapper = mount(<Button shouldFitContainer />);
    expect(wrapper.find('ButtonWrapper').prop('fit')).toBe(true);
  });

  it('should render button without full container width', () => {
    const wrapper = mount(<Button />);
    expect(wrapper.find('ButtonWrapper').prop('fit')).toBe(false);
  });

  it('should be able to render both of the icons', () => {
    const Icon1 = <div id="icon">icon1</div>;
    const Icon2 = <div id="icon">icon2</div>;
    const wrapper = mount(
      <Button href="test" iconBefore={Icon1} iconAfter={Icon2}>
        button
      </Button>,
    );
    expect(wrapper.contains(Icon1)).toBe(true);
    expect(wrapper.contains(Icon2)).toBe(true);
    expect(wrapper.text()).toBe('icon1buttonicon2');
  });

  it('should call onClick handler when link is clicked', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <Button href="test" onClick={spy}>
        button
      </Button>,
    );
    wrapper.find('a').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call onClick handler when button is clicked', () => {
    const spy = jest.fn();
    const wrapper = mount(<Button onClick={spy}>button</Button>);
    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should pass analytics event as last argument to onClick handler', () => {
    const spy = jest.fn();
    const wrapper = mount(<Button onClick={spy}>button</Button>);
    wrapper.find('button').simulate('click');

    const analyticsEvent = spy.mock.calls[0][1];
    expect(analyticsEvent).toEqual(expect.any(UIAnalyticsEvent));
    expect(analyticsEvent.payload).toEqual(
      expect.objectContaining({
        action: 'click',
      }),
    );
  });

  it('should render tabIndex attribute when the tabIndex property is set', () => {
    let wrapper = mount(<Button tabIndex={0}>button</Button>);
    expect(wrapper.find('button').is('[tabIndex=0]')).toBe(true);
    wrapper = mount(
      <Button href="#" tabIndex={0}>
        link
      </Button>,
    );
    expect(wrapper.find('a').is('[tabIndex=0]')).toBe(true);
    wrapper = mount(
      <Button tabIndex={0} isDisabled>
        span
      </Button>,
    );
    expect(wrapper.find('button').is('[tabIndex=0]')).toBe(true);
  });

  it('should set accessibility attributes', () => {
    expect(mount(<Button />).find('button[aria-haspopup]').length).toBe(0);
    expect(mount(<Button />).find('button[aria-expanded]').length).toBe(0);
    expect(mount(<Button />).find('button[aria-controls]').length).toBe(0);
    expect(mount(<Button />).find('button[aria-label]').length).toBe(0);
    expect(mount(<Button />).find('button[id]').length).toBe(0);
    expect(
      mount(<Button ariaHaspopup />).find('button[aria-haspopup=true]').length,
    ).toBe(1);
    expect(
      mount(<Button ariaExpanded />).find('button[aria-expanded=true]').length,
    ).toBe(1);
    expect(
      mount(<Button ariaControls="test" />).find('button[aria-controls="test"]')
        .length,
    ).toBe(1);
    expect(
      mount(<Button ariaLabel="test" />).find('button[aria-label="test"]')
        .length,
    ).toBe(1);
    expect(mount(<Button id="test" />).find('button[id="test"]').length).toBe(
      1,
    );
  });

  it('should provide analytics context with component, package and version fields', () => {
    const wrapper = shallow(<Button />);

    expect(wrapper.find(AnalyticsContext).prop('data')).toEqual({
      component: 'button',
      package: name,
      version,
    });
  });

  it('should fire an atlaskit analytics event on click', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <AnalyticsListener onEvent={spy} channel="atlaskit">
        <Button />
      </AnalyticsListener>,
    );

    wrapper.find(Button).simulate('click');
    const [analyticsEvent, channel] = spy.mock.calls[0];

    expect(channel).toBe('atlaskit');
    expect(analyticsEvent.payload).toEqual({ action: 'click' });
    expect(analyticsEvent.context).toEqual([
      {
        component: 'button',
        package: name,
        version,
      },
    ]);
  });

  it('should trigger onFocus handler on focus', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <Button tabIndex={0} onFocus={spy}>
        button
      </Button>,
    );
    const button = wrapper.find('StyledButton');
    button.prop('onFocus')();
    expect(spy).toHaveBeenCalled();
  });

  it('should respect autofocus', () => {
    const wrapper = mount(
      <Button id="testID123" tabIndex={0} autoFocus>
        button
      </Button>,
    );
    const id = document.activeElement ? document.activeElement.id : null;
    expect(wrapper.find('button').prop('id')).toEqual(id);
  });

  describe('isLoading', () => {
    it('should render the loading spinner when isLoading is true', () => {
      const wrapper = mount(<Button isLoading>Some text</Button>);
      expect(wrapper.find(Spinner).length).toEqual(1);
    });
    it('should not render the loading spinner when isLoading is false', () => {
      const wrapper = mount(<Button>Some text</Button>);
      expect(wrapper.find(Spinner).length).toEqual(0);
    });
    it('set the opacity of the text to 0 when isLoading is true', () => {
      const wrapper = mount(<Button isLoading>Some text</Button>);
      expect(
        wrapper
          .find(ButtonContent)
          .find('span')
          .get(0).props.style.opacity,
      ).toEqual(0);
    });
    it('set the iconBefore opacity to 0 when isLoading', () => {
      const wrapper = mount(
        <Button isLoading iconBefore={<AtlassianIcon />}>
          Some text
        </Button>,
      );
      expect(
        wrapper
          .find(IconWrapper)
          .find('span')
          .get(0).props.style.opacity,
      ).toEqual(0);
    });
    it('set the iconAfter opacity to 0 when isLoading', () => {
      const wrapper = mount(
        <Button isLoading iconAfter={<AtlassianIcon />}>
          Some text
        </Button>,
      );
      expect(
        wrapper
          .find(IconWrapper)
          .find('span')
          .get(0).props.style.opacity,
      ).toEqual(0);
    });
    it('set the opacity of the text to undefined when isLoading is false', () => {
      const wrapper = mount(<Button>Some text</Button>);
      expect(
        wrapper
          .find(ButtonContent)
          .find('span')
          .get(0).props.style.opacity,
      ).toEqual(1);
    });
  });

  it('should trigger onBlur handler on blur', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <Button tabIndex={0} onBlur={spy}>
        button
      </Button>,
    );
    const button = wrapper.find('StyledButton');
    button.prop('onBlur')();
    expect(spy).toHaveBeenCalled();
  });
});
