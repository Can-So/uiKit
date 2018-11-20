// @flow
import React from 'react';
import { shallow } from 'enzyme';
import mockdate from 'mockdate';
import RelativeDate from '../../components/RelativeDate';

describe('RelativeDate', () => {
  const TODAY = new Date(2018, 10, 20, 17, 30, 0, 0);
  const TODAY_2 = new Date(new Date(TODAY).setHours(5));
  const YESTERDAY = new Date(new Date(TODAY).setDate(19));
  const THIS_WEEK = new Date(new Date(TODAY).setDate(18));
  const THIS_MONTH = new Date(new Date(TODAY).setDate(1));
  const LAST_MONTH = new Date(new Date(TODAY).setMonth(9));
  const A_FEW_MONTHS = new Date(new Date(TODAY).setMonth(8));
  const SEVERAL_MONTHS = new Date(new Date(TODAY).setMonth(2));
  const MORE_THAN_A_YEAR = new Date(new Date(TODAY).setMonth(-3));
  const INVALID_DATE = new Date('');
  const FUTURE_DATE = new Date(new Date(TODAY).setMonth(11));

  const renderShallow = (props = {}) =>
    shallow(<RelativeDate date={TODAY} {...props} />);

  beforeEach(() => {
    mockdate.set(TODAY);
  });

  afterEach(() => {
    mockdate.reset();
  });

  it('should match snapshot when date prop is today', () => {
    const wrapper = renderShallow({
      date: TODAY_2,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is yesterday', () => {
    const wrapper = renderShallow({
      date: YESTERDAY,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is in this week', () => {
    const wrapper = renderShallow({
      date: THIS_WEEK,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is in this month', () => {
    const wrapper = renderShallow({
      date: THIS_MONTH,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is in last month', () => {
    const wrapper = renderShallow({
      date: LAST_MONTH,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is a few months ago', () => {
    const wrapper = renderShallow({
      date: A_FEW_MONTHS,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is several months ago', () => {
    const wrapper = renderShallow({
      date: SEVERAL_MONTHS,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is more than a year ago', () => {
    const wrapper = renderShallow({
      date: MORE_THAN_A_YEAR,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is invalid date', () => {
    const wrapper = renderShallow({
      date: INVALID_DATE,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when date prop is a future date', () => {
    const wrapper = renderShallow({
      date: FUTURE_DATE,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
