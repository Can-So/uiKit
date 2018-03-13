import * as React from 'react';
import { shallow } from 'enzyme';
import { Wrapper } from '../../src/utils/lazyContent/styled';

describe('Lazy Content styled', () => {
  it('should override LazilyRender with a 100% dimensions', () => {
    const wrapper = shallow(<Wrapper />);

    expect(wrapper).toMatchSnapshot();
  });
});
