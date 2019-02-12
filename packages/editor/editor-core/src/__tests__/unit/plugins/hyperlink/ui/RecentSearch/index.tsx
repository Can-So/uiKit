import { ReactWrapper } from 'enzyme';
import * as React from 'react';
import RecentSearch from '../../../../../../plugins/hyperlink/ui/RecentSearch/LinkAddToolbar';
import RecentItem from '../../../../../../plugins/hyperlink/ui/RecentSearch/RecentItem';
import { MockActivityResource } from '../../utils';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';

const timeout = () => new Promise(resolve => window.setTimeout(resolve, 1));

function pressDownArrowInputField(recentSearch: ReactWrapper<any, any>) {
  recentSearch.find('input').simulate('keydown', { keyCode: 40 });
}

function pressReturnInputField(recentSearch: ReactWrapper<any, any>) {
  recentSearch.find('input').simulate('keydown', { keyCode: 13 });
}

describe('@atlaskit/editor-core/ui/RecentSearch', () => {
  it('should render a list of recent activity items', async () => {
    const wrapper = mountWithIntl(
      <RecentSearch provider={Promise.resolve(new MockActivityResource())} />,
    );
    await timeout();
    wrapper.update();

    expect(wrapper.find(RecentItem)).toHaveLength(3);
    wrapper.unmount();
  });

  it('should filter recent activity items by input text', async () => {
    const wrapper = mountWithIntl(
      <RecentSearch provider={Promise.resolve(new MockActivityResource())} />,
    );
    await timeout();
    wrapper.update();

    (wrapper.instance() as any).updateInput('recent item 1');
    await timeout();
    wrapper.update();

    expect(wrapper.find(RecentItem)).toHaveLength(1);
    expect(
      wrapper
        .find(RecentItem)
        .at(0)
        .prop('item'),
    ).toHaveProperty('name', 'recent item 1');
    wrapper.unmount();
  });

  it('should submit with selected activity item when clicked', async () => {
    const onSubmit = jest.fn();
    const wrapper = mountWithIntl(
      <RecentSearch
        onSubmit={onSubmit}
        provider={Promise.resolve(new MockActivityResource())}
      />,
    );
    await timeout();
    wrapper.update();

    wrapper
      .find(RecentItem)
      .at(1)
      .simulate('mousedown');

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('recent2-url.com', 'recent item 2');
    wrapper.unmount();
  });

  it('should submit with selected activity item when enter is pressed', async () => {
    const onSubmit = jest.fn();
    const wrapper = mountWithIntl(
      <RecentSearch
        onSubmit={onSubmit}
        provider={Promise.resolve(new MockActivityResource())}
      />,
    );
    await timeout();
    wrapper.update();

    (wrapper.instance() as any).updateInput('recent');
    await timeout();
    pressReturnInputField(wrapper);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('recent1-url.com', 'recent item 1');
    wrapper.unmount();
  });

  it('should submit with selected activity item when navigated to via keyboard and enter pressed', async () => {
    const onSubmit = jest.fn();
    const wrapper = mountWithIntl(
      <RecentSearch
        onSubmit={onSubmit}
        provider={Promise.resolve(new MockActivityResource())}
      />,
    );
    await timeout();
    wrapper.update();

    pressDownArrowInputField(wrapper);
    pressDownArrowInputField(wrapper);
    pressReturnInputField(wrapper);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('recent2-url.com', 'recent item 2');
    wrapper.unmount();
  });

  it('should submit arbitrary link', async () => {
    const onSubmit = jest.fn();
    const wrapper = mountWithIntl(
      <RecentSearch
        provider={Promise.resolve(new MockActivityResource())}
        onSubmit={onSubmit}
      />,
    );
    await timeout();
    wrapper.update();

    (wrapper.instance() as any).updateInput('example.com');
    pressReturnInputField(wrapper);
    await timeout();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith('example.com');
    wrapper.unmount();
  });
});
