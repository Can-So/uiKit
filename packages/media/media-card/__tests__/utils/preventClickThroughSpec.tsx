import { mount } from 'enzyme';
import * as React from 'react';

import { PreventClickThrough } from '../../src/utils/preventClickThrough';

describe('<PreventClickThrough />', () => {
  it('should prevent outer on click handler to be called', () => {
    const onOuterClick = jest.fn();
    const onInnerClick = jest.fn();

    const wrapper = mount(
      <div id="outer" onClick={onOuterClick}>
        <PreventClickThrough>
          <div id="inner" onClick={onInnerClick} />
        </PreventClickThrough>
      </div>,
    );

    const innerElement = wrapper.find('#inner');
    innerElement.simulate('click');

    expect(onInnerClick).toBeCalled();
    expect(onOuterClick).not.toBeCalled();
  });
});
