import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Lozenge from '@atlaskit/lozenge';
import { ResolvedView } from '../../../src/inline/ResolvedView/index';
import { Icon } from '../../../src/inline/ResolvedView/styled';

describe('ResolvedView', () => {
  it('should render the title', () => {
    const element = mount(<ResolvedView title="some text content" />);
    expect(element.text()).toContain('some text content');
  });

  it('should render an icon when one is provided', () => {
    const element = mount(
      <ResolvedView icon="some-link-to-icon" title="some text content" />,
    );
    expect(element.find(Icon)).toHaveLength(1);
    expect(element.find(Icon).props()).toEqual(
      expect.objectContaining({
        src: 'some-link-to-icon',
      }),
    );
  });

  it('should not render an icon when one is not provided', () => {
    const element = mount(<ResolvedView title="some text content" />);
    expect(element.find(Icon)).toHaveLength(0);
  });

  it('should render a lozenge when one is provided', () => {
    const lozenge = {
      text: 'some-lozenge-text',
      isBold: true,
      appearance: 'inprogress' as 'inprogress',
    };
    const element = shallow(
      <ResolvedView title="some text content" lozenge={lozenge} />,
    );
    expect(element.find(Lozenge)).toHaveLength(1);
    expect(element.find(Lozenge).props()).toEqual(
      expect.objectContaining({
        appearance: 'inprogress',
        isBold: true,
        children: 'some-lozenge-text',
      }),
    );
  });

  it('should not render a lozenge when one is not provided', () => {
    const element = shallow(<ResolvedView title="some text content" />);
    expect(element.find(Lozenge)).toHaveLength(0);
  });
});
