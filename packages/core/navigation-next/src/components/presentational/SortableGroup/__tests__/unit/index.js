// @flow

import React from 'react';
import { shallow } from 'enzyme';
import { Droppable } from 'react-beautiful-dnd';

import Group from '../../../Group';
import SortableGroup from '../../index';

jest.mock('react-beautiful-dnd', () => {
  const MockDroppable: any = jest.fn();
  MockDroppable.displayName = 'MockDroppable';
  return {
    Droppable: MockDroppable,
  };
});

describe('SortableGroup', () => {
  let baseProps;
  let droppableRenderArg;
  const droppableRef = {};
  beforeEach(() => {
    jest.clearAllMocks();
    droppableRenderArg = {
      droppableProps: {
        mySpecialProp: 'foo',
      },
      placeholder: () => <span>Placeholder</span>,
      innerRef: droppableRef,
    };
    Droppable.mockImplementation(({ children }) =>
      children(droppableRenderArg),
    );
    baseProps = {
      heading: 'My group',
      id: 'my-group',
    };
  });

  it('should render a Group component', () => {
    const wrapper = shallow(
      <SortableGroup {...baseProps}>Group children</SortableGroup>,
    ).dive();

    const group = wrapper.find(Group);

    expect(group).toHaveLength(1);
    expect(group.props()).toEqual({
      hasSeparator: false,
      heading: 'My group',
      id: 'my-group',
      children: ['Group children', droppableRenderArg.placeholder],
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should wrap Group with a Droppable Component', () => {
    const wrapper = shallow(
      <SortableGroup {...baseProps}>Group children</SortableGroup>,
    );

    const droppable = wrapper.find(Droppable);
    expect(droppable).toHaveLength(1);
    expect(droppable.props()).toEqual({
      children: expect.any(Function),
      droppableId: baseProps.id,
    });
    expect(droppable).toMatchSnapshot();
  });

  it('should spread droppable provided props onto div wrapper around Group', () => {
    const wrapper = shallow(
      <SortableGroup {...baseProps}>Group children</SortableGroup>,
    ).dive();

    expect(wrapper.is('div')).toBe(true);
    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        ...droppableRenderArg.droppableProps,
      }),
    );
  });

  it('should style the div wrapper with default styles and `innerStyle` prop', () => {
    const wrapper = shallow(
      <SortableGroup {...baseProps} innerStyle={{ paddingTop: 400 }}>
        Group children
      </SortableGroup>,
    ).dive();

    expect(wrapper).toMatchSnapshot();
  });
});
