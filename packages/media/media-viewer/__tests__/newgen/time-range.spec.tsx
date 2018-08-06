import * as React from 'react';
import { shallow } from 'enzyme';
import {
  TimeRange,
  TimeRangeProps,
} from '../../src/newgen/viewers/video/TimeRange';
import {
  CurrentTimeLine,
  BufferedTime,
  CurrentTimeTooltip,
  Thumb,
  TimeRangeWrapper,
} from '../../src/newgen/viewers/video/styled';

describe('<TimeRange />', () => {
  const setup = (props?: Partial<TimeRangeProps>) => {
    const onChange = jest.fn();
    const component = shallow(
      <TimeRange
        currentTime={10}
        duration={20}
        bufferedTime={5}
        onChange={onChange}
        {...props}
      />,
    );

    return {
      component,
      onChange,
    };
  };

  it('should render the current time', () => {
    const { component } = setup();

    expect(component.find(CurrentTimeLine).prop('style')).toEqual({
      width: `50%`,
    });
  });

  it('should render the buffered time', () => {
    const { component } = setup();

    expect(component.find(BufferedTime).prop('style')).toEqual({
      width: `25%`,
    });
  });

  it('should render the thumb element', () => {
    const { component } = setup();

    expect(component.find(Thumb)).toHaveLength(1);
  });

  it('should render the current time with the right format', () => {
    const { component } = setup();

    expect(
      component
        .find(CurrentTimeTooltip)
        .dive()
        .text(),
    ).toEqual('0:10');
  });

  it('should notify changes when user clicks on the timeline', () => {
    const { component, onChange } = setup();

    (component as any).instance()['wrapperElementWidth'] = 100;
    component.find(TimeRangeWrapper).simulate('click', {
      target: {},
      nativeEvent: {
        x: 5,
      },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).lastCalledWith(-0.6);
  });
});
