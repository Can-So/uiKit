import * as React from 'react';
import { shallow, mount } from 'enzyme';
import {
  inlineExtensionData,
  bodiedExtensionData,
} from '@atlaskit/editor-test-helpers';

import Lozenge, {
  ICON_SIZE,
} from '../../../../../plugins/extension/ui/Extension/Lozenge';
import { PlaceholderFallback } from '../../../../../plugins/extension/ui/Extension/styles';

describe('@atlaskit/editor-core/ui/Extension/Lozenge', () => {
  it('should render image if extension has an image param', () => {
    const lozenge = shallow(<Lozenge node={inlineExtensionData[0] as any} />);
    expect(lozenge.find('img')).toHaveLength(1);
  });

  it('should render icon with fallback width and height', () => {
    const lozenge = shallow(<Lozenge node={inlineExtensionData[2] as any} />);
    const img = lozenge.find('img');
    expect(img).toHaveLength(1);
    expect(img.props()).toHaveProperty('height', ICON_SIZE);
    expect(img.props()).toHaveProperty('width', ICON_SIZE);
  });

  it('should have title when title is provided', () => {
    const lozenges = mount(<Lozenge node={bodiedExtensionData[1] as any} />);
    const extTitleWrapper = lozenges.find('.extension-title');
    const extTitle = extTitleWrapper.text();
    expect(extTitleWrapper).toHaveLength(1);
    expect(extTitle).toEqual('Expand');
  });

  it("should render PlaceholderFallback if extension doesn't have an image param", () => {
    const lozenge = shallow(<Lozenge node={inlineExtensionData[1] as any} />);
    expect(lozenge.find(PlaceholderFallback)).toHaveLength(1);
  });
});
