// @flow

import React from 'react';
import { mount } from 'enzyme';
import { colors } from '@atlaskit/theme';

import sinon from 'sinon';
import Spinner from '../';
import Container, { getContainerAnimation } from '../styledContainer';
import Svg, { svgStyles, getStrokeColor } from '../styledSvg';

beforeEach(() => {
  sinon.stub(console, 'error');
});

afterEach(() => {
  console.error.restore(); // eslint-disable-line no-console
});

describe('Spinner', () => {
  it('should be possible to create a component', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper).not.toBe(undefined);
  });

  it('should be active by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.prop('isCompleting')).toBe(false);
  });

  it('should not use the inverted color scheme by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.prop('invertColor')).toBe(false);
    expect(wrapper.find(Svg).prop('invertColor')).toBe(false);
  });

  it('should start in the DELAY phase by default', () => {
    const wrapper = mount(<Spinner />);
    expect(wrapper.find(Container).prop('phase')).toBe('DELAY');
  });

  it('should leave the DELAY state after some time', () => {
    const wrapper = mount(<Spinner />);
    wrapper.find(Container).simulate('animationEnd');
    setTimeout(() =>
      expect(wrapper.find(Container).prop('phase')).not.toBe('DELAY'),
    );
  });

  describe('delay prop', () => {
    it('should be reflected to the DELAY phase animation', () => {
      const delayProp = 1234;
      const container = mount(<Spinner delay={delayProp} />).find(Container);
      const animation = getContainerAnimation(container.props());
      const animationMatch = animation.match(/animation: (([0-9]|\.*)*)/);
      const animationDelay = animationMatch
        ? parseFloat(animationMatch[1]) * 1000
        : null;
      expect(animationDelay).toBe(delayProp);
    });
  });

  describe('isCompleting prop', () => {
    it('should add a spinner container when not set', () => {
      const wrapper = mount(<Spinner />);
      expect(wrapper.find(Container).length).toBe(1);
    });

    it('should remove the spinner container when set to true', () => {
      const wrapper = mount(<Spinner isCompleting />);
      expect(wrapper.find(Container).length).toBe(0);
    });
  });

  describe('onComplete prop', () => {
    it('should be called after isCompleting prop is set', () => {
      const spy = jest.fn();
      const wrapper = mount(<Spinner delay={0} onComplete={spy} />);
      const transitionContainerNode = wrapper.find(Container).getDOMNode();

      wrapper.setProps({ isCompleting: true });
      transitionContainerNode.dispatchEvent(new Event('animationend'));

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not be called if isCompleting is not set', () => {
      const spy = jest.fn();
      const wrapper = mount(<Spinner delay={0} onComplete={spy} />);
      const transitionContainerNode = wrapper.find(Container).getDOMNode();

      transitionContainerNode.dispatchEvent(new Event('animationend'));

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('size prop', () => {
    it('should render tee-shirt sizes with the proper heights/widths', () => {
      const small = mount(<Spinner size="small" />);
      const medium = mount(<Spinner size="medium" />);
      const large = mount(<Spinner size="large" />);
      const xlarge = mount(<Spinner size="xlarge" />);

      expect(small.find(Svg).prop('height')).toBe(20);
      expect(small.find(Svg).prop('width')).toBe(20);

      expect(medium.find(Svg).prop('height')).toBe(30);
      expect(medium.find(Svg).prop('width')).toBe(30);

      expect(large.find(Svg).prop('height')).toBe(50);
      expect(large.find(Svg).prop('height')).toBe(50);

      expect(xlarge.find(Svg).prop('width')).toBe(100);
      expect(xlarge.find(Svg).prop('width')).toBe(100);
    });

    it('should render the spinner with a custom size', () => {
      const custom = mount(<Spinner size={72} />);

      expect(custom.find(Svg).prop('height')).toBe(72);
      expect(custom.find(Svg).prop('width')).toBe(72);
    });

    it('should render the spinner with the default size if an unsupported value is provided', () => {
      // $FlowFixMe
      const custom = mount(<Spinner size={{ something: 'weird' }} />);
      expect(custom.find(Svg).prop('height')).toBe(20);
      expect(custom.find(Svg).prop('width')).toBe(20);
    });
  });

  describe('invertColor prop', () => {
    it('should set the invertColor prop on Svg when set to true', () => {
      const wrapper = mount(<Spinner invertColor />);
      expect(wrapper.find(Svg).prop('invertColor')).toBe(true);
    });

    it('should be colors.N500 by default', () => {
      expect(getStrokeColor({})).toBe(colors.N500);
      expect(getStrokeColor({ invertColor: false })).toBe(colors.N500);
    });

    it('should be colors.N0 when set to true', () => {
      expect(getStrokeColor({ invertColor: true })).toBe(colors.N0);
    });
  });

  describe('svg', () => {
    let styles;

    beforeEach(() => {
      const svg = mount(<Spinner />).find(Svg);
      const svgInterpolatedStyles: Object => Array<
        string,
      > = (svgStyles[1]: any);
      styles = svgInterpolatedStyles(svg.props()).join('');
    });

    it('should have expected svg stroke keys', () => {
      expect(/stroke-dashoffset/.test(styles)).toBe(true);
      expect(/stroke-dasharray/.test(styles)).toBe(true);
    });

    it('should have strokeDashoffset in px with no space before', () => {
      const dashOffsetMatch = styles.match(/stroke-dashoffset: [0-9.]+px;/);
      expect(dashOffsetMatch).not.toBe(null);
    });
  });
});
