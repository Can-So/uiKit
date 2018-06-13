import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { ResultItemGroup } from '@atlaskit/quick-search';
import {
  ConfluenceQuickSearchContainer,
  Props,
} from '../src/components/confluence/ConfluenceQuickSearchContainer';
import {
  ResultType,
  Result,
  PersonResult,
  ContentType,
} from '../src/model/Result';
import GlobalQuickSearch from '../src/components/GlobalQuickSearch';
import { Scope } from '../src/api/CrossProductSearchClient';
import SearchError from '../src/components/SearchError';
import {
  delay,
  makeConfluenceObjectResult,
  makeConfluenceContainerResult,
  makePersonResult,
} from './_test-util';
import {
  noResultsCrossProductSearchClient,
  errorCrossProductSearchClient,
  singleResultCrossProductSearchClient,
  makeSingleResultCrossProductSearchResponse,
} from './mocks/_mockCrossProductSearchClient';
import {
  noResultsPeopleSearchClient,
  errorPeopleSearchClient,
} from './mocks/_mockPeopleSearchClient';
import { noResultsConfluenceClient } from './mocks/_mockConfluenceClient';

function searchFor(query: string, wrapper: ShallowWrapper) {
  const quicksearch = wrapper.find(GlobalQuickSearch);
  const onSearchFn = quicksearch.prop('onSearch') as Function;
  onSearchFn(query);
  wrapper.update();
}

/**
 * This component uses a lot of internal state and async calls.
 * Make sure we wait for next tick and then force render update for React 16.
 */
async function waitForRender(wrapper: ShallowWrapper, millis?: number) {
  await delay(millis);
  wrapper.update();
}

enum Group {
  Objects = 'objects',
  Spaces = 'spaces',
  People = 'people',
}

function findGroup(group: Group, wrapper: ShallowWrapper) {
  return wrapper
    .find(ResultItemGroup)
    .findWhere(n => n.key() === group.valueOf());
}

function render(partialProps?: Partial<Props>) {
  const props: Props = {
    confluenceClient: noResultsConfluenceClient,
    crossProductSearchClient: noResultsCrossProductSearchClient,
    peopleSearchClient: noResultsPeopleSearchClient,
    ...partialProps,
  };

  return shallow<Props>(<ConfluenceQuickSearchContainer {...props} />);
}

describe('ConfluenceQuickSearchContainer', () => {
  describe('loading state', () => {
    it.skip('should set loading state when searching', () => {
      const wrapper = render();

      searchFor('dav', wrapper);
      expect(wrapper.find(GlobalQuickSearch).prop('isLoading')).toBe(true);
    });

    it.skip('should unset loading state when search has finished', async () => {
      const wrapper = render();

      searchFor('dav', wrapper);
      await waitForRender(wrapper);

      expect(wrapper.find(GlobalQuickSearch).prop('isLoading')).toBe(false);
    });

    it.skip('should unset loading state when all promises have settled', async () => {
      /**
       * 0. people search errors out immediately, xpsearch takes 5ms
       * 1. Make sure immediately that loading state is set
       * 2. Wait 6ms until xpsearch has finished
       * 3. Make sure loading state is unset
       */
      const wrapper = render({
        peopleSearchClient: errorPeopleSearchClient,
        crossProductSearchClient: {
          search(query: string) {
            return delay(5, new Map());
          },
        },
      });

      searchFor('disco', wrapper);

      await waitForRender(wrapper);
      expect(wrapper.find(GlobalQuickSearch).prop('isLoading')).toBe(true);

      await waitForRender(wrapper, 6);
      expect(wrapper.find(GlobalQuickSearch).prop('isLoading')).toBe(false);
    });
  });

  it('should start searching when a character has been typed', async () => {
    const wrapper = render();

    expect(wrapper.find(GlobalQuickSearch).prop('isLoading')).toBe(false);

    searchFor('x', wrapper);
    expect(wrapper.find(GlobalQuickSearch).prop('isLoading')).toBe(true);
  });

  it('should render recently viewed pages on mount', async () => {
    const mockConfluenceClient = {
      getRecentItems() {
        return Promise.resolve([makeConfluenceObjectResult()]);
      },
      getRecentSpaces() {
        return Promise.resolve([]);
      },
    };

    const wrapper = render({
      confluenceClient: mockConfluenceClient,
    });

    const onMount: Function = wrapper.find(GlobalQuickSearch).prop('onMount');
    onMount();

    await waitForRender(wrapper);

    const group = findGroup(Group.Objects, wrapper);
    expect(group.children()).toHaveLength(1);
  });

  it('should render recently viewed spaces on mount', async () => {
    const mockConfluenceClient = {
      getRecentItems() {
        return Promise.resolve([]);
      },
      getRecentSpaces() {
        return Promise.resolve([makeConfluenceContainerResult()]);
      },
    };

    const wrapper = render({
      confluenceClient: mockConfluenceClient,
    });

    const onMount: Function = wrapper.find(GlobalQuickSearch).prop('onMount');
    onMount();

    await waitForRender(wrapper);

    const group = findGroup(Group.Spaces, wrapper);
    expect(group.children()).toHaveLength(1);
  });

  it('should render object results', async () => {
    const wrapper = render({
      crossProductSearchClient: singleResultCrossProductSearchClient(
        Scope.ConfluencePageBlogAttachment,
      ),
    });

    searchFor('query', wrapper);
    await waitForRender(wrapper);

    const group = findGroup(Group.Objects, wrapper);
    expect(group.children()).toHaveLength(1);
  });

  it('should render space results', async () => {
    const wrapper = render({
      crossProductSearchClient: singleResultCrossProductSearchClient(
        Scope.ConfluenceSpace,
      ),
    });

    searchFor('query', wrapper);
    await waitForRender(wrapper);

    const group = findGroup(Group.Spaces, wrapper);
    expect(group.children()).toHaveLength(1);
  });

  it('should render people results', async () => {
    const wrapper = render({
      peopleSearchClient: {
        search() {
          return Promise.resolve([makePersonResult()]);
        },
        getRecentPeople() {
          return Promise.resolve([]);
        },
      },
    });

    searchFor('query', wrapper);
    await waitForRender(wrapper);

    const group = findGroup(Group.People, wrapper);
    expect(group.children()).toHaveLength(2); // result + search people item
  });

  it('should perform searches in parallel', async () => {
    /*
     1. Delay people search by 5ms
     2. Delay cross product search by 5ms
     3. Search
     4. Wait for 6ms (less than time for both searches combined)
     5. Make sure search results appeared in time
    */

    function searchPeople(query: string): Promise<PersonResult[]> {
      const personResult = makePersonResult();

      return delay(5, [personResult]);
    }

    function searchCrossProduct(query: string): Promise<Map<Scope, Result[]>> {
      return delay(
        5,
        makeSingleResultCrossProductSearchResponse(
          Scope.ConfluencePageBlogAttachment,
          makePersonResult(),
        ),
      );
    }

    const mockCrossProductSearchClient = {
      search: jest.fn(searchCrossProduct),
    };

    const mockPeopleSearchClient = {
      search: jest.fn(searchPeople),
      getRecentPeople() {
        return Promise.resolve([]);
      },
    };

    const wrapper = render({
      crossProductSearchClient: mockCrossProductSearchClient,
      peopleSearchClient: mockPeopleSearchClient,
    });

    searchFor('once', wrapper);
    await waitForRender(wrapper, 6);

    const objectResults = findGroup(Group.Objects, wrapper).children();
    const peopleResults = findGroup(Group.People, wrapper).children();

    expect(objectResults).not.toHaveLength(0);
    expect(peopleResults).not.toHaveLength(0);
  });

  it('should not display outdated results', async () => {
    /*
      1. First search will return a delayed result
      2. Second search will return a fast result
      3. Search twice
      4. Wait until the delayed result has arrived
      5. Make sure the fast result is displayed and not the delayed result
    */

    function searchDelayed(query: string): Promise<Map<Scope, Result[]>> {
      const response = makeSingleResultCrossProductSearchResponse(
        Scope.ConfluencePageBlogAttachment,
        makeConfluenceObjectResult(),
      );

      return delay(5, response);
    }

    function searchCurrent(query: string): Promise<Map<Scope, Result[]>> {
      const response = makeSingleResultCrossProductSearchResponse(
        Scope.ConfluencePageBlogAttachment,
        makeConfluenceObjectResult({
          name: 'current result',
        }),
      );

      return Promise.resolve(response);
    }

    const searchMock = jest
      .fn()
      .mockImplementationOnce(searchDelayed)
      .mockImplementationOnce(searchCurrent);

    const mockSearchClient = {
      search: searchMock,
    };

    const wrapper = render({
      crossProductSearchClient: mockSearchClient,
    });

    searchFor('once - this will return the delayed result', wrapper);
    searchFor('twice - this will return the current fast result', wrapper);
    await waitForRender(wrapper, 10);

    const objectResults = findGroup(Group.Objects, wrapper).children();
    expect(objectResults.first().prop('name')).toBe('current result');
  });

  describe('Analytics', () => {
    it('should log when a request fails', async () => {
      const firePrivateAnalyticsEventMock = jest.fn();

      const wrapper = render({
        peopleSearchClient: {
          search(query: string) {
            return Promise.reject(new TypeError('failed'));
          },
          getRecentPeople() {
            return Promise.resolve([]);
          },
        },
        firePrivateAnalyticsEvent: firePrivateAnalyticsEventMock,
      });

      searchFor('err', wrapper);
      await delay();

      expect(firePrivateAnalyticsEventMock).toHaveBeenCalledWith(
        'atlassian.fabric.global-search.search-error',
        {
          name: 'TypeError',
          message: 'failed',
          source: 'people',
        },
      );
    });
  });

  describe('Error handling', () => {
    it('should show error state when xpsearch fails', async () => {
      const wrapper = render({
        crossProductSearchClient: errorCrossProductSearchClient,
      });

      searchFor('dav', wrapper);
      await waitForRender(wrapper);
      expect(wrapper.find(SearchError).exists()).toBe(true);
    });

    it('should clear error state after subsequent search', async () => {
      const searchMock = jest
        .fn()
        .mockImplementationOnce((query: string) => Promise.reject('error'))
        .mockImplementationOnce((query: string) => Promise.resolve(new Map()));

      const mockSearchClient = {
        search: searchMock,
      };

      const wrapper = render({
        crossProductSearchClient: mockSearchClient,
      });

      searchFor('error state', wrapper);
      await waitForRender(wrapper);
      expect(wrapper.find(SearchError).exists()).toBe(true);

      searchFor('good state', wrapper);
      await waitForRender(wrapper);
      expect(wrapper.find(SearchError).exists()).toBe(false);
    });

    it('should not show the error state when only people search fails', async () => {
      const wrapper = render({
        peopleSearchClient: errorPeopleSearchClient,
      });

      searchFor('dav', wrapper);
      await waitForRender(wrapper);
      expect(wrapper.find(SearchError).exists()).toBe(false);
    });
  });

  it('should pass through the linkComponent prop', async () => {
    const MyLinkComponent = () => <div />;
    const wrapper = render({
      linkComponent: MyLinkComponent,
    });

    expect(wrapper.find(GlobalQuickSearch).prop('linkComponent')).toBe(
      MyLinkComponent,
    );
  });
});
