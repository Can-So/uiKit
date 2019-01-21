import * as React from 'react';
import { mount } from 'enzyme';
import { ResourcedMention } from '@atlaskit/mention';
import MentionNode from '../../../../react/nodes/mention';
import { Mention } from '@atlaskit/editor-common';

describe('Renderer - React/Nodes/Mention', () => {
  it('should render UI mention component', () => {
    const mention = mount(
      <MentionNode id="abcd-abcd-abcd" text="@Oscar Wallhult" />,
    );
    expect(mention.find(Mention)).toHaveLength(1);
    mention.unmount();
  });

  it('should render with access level if prop exists', () => {
    const mention = mount(
      <MentionNode
        id="abcd-abcd-abcd"
        text="@Oscar Wallhult"
        accessLevel="APPLICATION"
      />,
    );
    expect(mention.find(Mention).prop('accessLevel')).toEqual('APPLICATION');
    mention.unmount();
  });

  it('should pass event handlers into resourced mention', () => {
    const onClick = () => {};

    const eventHandlers = {
      mention: {
        onClick,
        onMouseEnter: () => {},
        onMouseLeave: () => {},
      },
    };

    const mention = mount(
      <MentionNode
        id="abcd-abcd-abcd"
        text="@Oscar Wallhult"
        eventHandlers={eventHandlers}
      />,
    );
    const resourcedMention = mention.find(ResourcedMention);

    expect(resourcedMention.prop('onClick')).toEqual(onClick);
    mention.unmount();
  });
});
