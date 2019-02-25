import { mount } from 'enzyme';
import * as React from 'react';
import MobileRenderer from '../../../renderer/mobile-renderer-element';

const initialDocument = JSON.stringify({
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is the mobile renderer',
        },
      ],
    },
  ],
});

describe('renderer bridge', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  it('should call renderBridge.onContentRendered() once rendered', () => {
    const onContentRendered = jest.fn();
    window.renderBridge = { onContentRendered };

    const mobileRenderer = mount(<MobileRenderer document={initialDocument} />);
    expect(onContentRendered).toHaveBeenCalled();
    mobileRenderer.unmount();
  });
});
