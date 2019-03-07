import * as React from 'react';
import 'whatwg-fetch';
import GlobalQuickSearch from '../../components/GlobalQuickSearchWrapper';
import { HomeQuickSearchContainer } from '../../components/home/HomeQuickSearchContainer';
import { ConfluenceQuickSearchContainer } from '../../components/confluence/ConfluenceQuickSearchContainer';
import { mountWithIntl } from './helpers/_intl-enzyme-test-helper';
import { JiraQuickSearchContainer } from '../../components/jira/JiraQuickSearchContainer';

it('should render the home container with context home', () => {
  const wrapper = mountWithIntl(
    <GlobalQuickSearch cloudId="123" context="home" />,
  );

  expect(wrapper.find(HomeQuickSearchContainer).exists()).toBe(true);
});

it('should render the confluence container with context confluence', () => {
  const wrapper = mountWithIntl(
    <GlobalQuickSearch cloudId="123" context="confluence" />,
  );

  expect(wrapper.find(ConfluenceQuickSearchContainer).exists()).toBe(true);
});

const MyLinkComponent = class extends React.Component<{
  className: string;
  children: React.ReactNode;
}> {
  render() {
    return <div />;
  }
};

it('should pass through the linkComponent prop', () => {
  const wrapper = mountWithIntl(
    <GlobalQuickSearch
      cloudId="123"
      context="confluence"
      linkComponent={MyLinkComponent}
    />,
  );

  expect(
    wrapper.find(ConfluenceQuickSearchContainer).prop('linkComponent'),
  ).toBe(MyLinkComponent);
});

describe('advanced search callback', () => {
  [
    {
      product: 'jira',
      Component: JiraQuickSearchContainer,
      category: 'issues',
    },
    {
      product: 'confluence',
      Component: ConfluenceQuickSearchContainer,
      category: 'conent',
    },
  ].forEach(({ product, Component, category }) => {
    it(`should call on advnaced callback on ${product} component`, () => {
      const spy = jest.fn();
      const wrapper = mountWithIntl(
        <GlobalQuickSearch
          cloudId="123"
          context={product as 'jira' | 'confluence'}
          onAdvancedSearch={spy}
        />,
      );

      const component = wrapper.find(Component);
      expect(component.exists()).toBe(true);

      const callback = component.prop('onAdvancedSearch');
      expect(callback).toBeInstanceOf(Function);

      const event = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      };

      if (callback) {
        callback(event, category, 'query');
      }

      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith({
        category,
        query: 'query',
        preventDefault: expect.any(Function),
        originalEvent: event,
      });
    });

    it('should call prevent default and stop propagation', () => {
      const spy = jest.fn(e => {
        e.preventDefault();
      });
      const wrapper = mountWithIntl(
        <GlobalQuickSearch
          cloudId="123"
          context={product as 'jira' | 'confluence'}
          onAdvancedSearch={spy}
        />,
      );
      const mockedEvent = {
        stopPropagation: jest.fn(),
        preventDefault: jest.fn(),
      };
      const callback = wrapper.find(Component).prop('onAdvancedSearch');
      if (callback) {
        callback(mockedEvent, category, 'query');
      }

      expect(mockedEvent.preventDefault).toBeCalledTimes(1);
      expect(mockedEvent.stopPropagation).toBeCalledTimes(1);
    });
  });
});
