// @flow

import React from 'react';
import { mount } from 'enzyme';
import Flag from '../src';
import Actions from '../src/components/FlagActions';
import { Action } from '../src/components/FlagActions/styledFlagActions';

describe('actions prop', () => {
  const generateFlag = extraProps => (
    <Flag id="" icon={<div />} title="Flag" {...extraProps} />
  );
  let flag;
  let actionSpy;

  beforeEach(() => {
    actionSpy = jest.fn();
    flag = mount(
      generateFlag({
        actions: [
          { content: 'Hello!', onClick: actionSpy },
          { content: 'Goodbye!', onClick: actionSpy },
        ],
      }),
    );
  });

  it('actions should be rendered', () => {
    const actionItems = flag.find(Action);
    expect(actionItems.length).toBe(2);
    expect(actionItems.at(0).text()).toBe('Hello!');
    expect(actionItems.at(1).text()).toBe('Goodbye!');
  });

  it('action onClick should be triggered on click', () => {
    flag
      .find('button')
      .first()
      .simulate('click');
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('should pass appearance value on to styled sub-components', () => {
    // creating flag with appearance prop
    flag = mount(generateFlag({ appearance: 'info', isDismissAllowed: true }));
    flag.setState({ isExpanded: true });
    flag.setProps({
      actions: [{ content: 'Hello!', onClick: () => {} }],
      description: 'Hi there',
    });
    expect(flag.find(Actions).prop('appearance')).toBe('info');
  });
});
