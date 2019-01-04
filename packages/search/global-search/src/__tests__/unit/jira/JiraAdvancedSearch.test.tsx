import * as React from 'react';
import { shallow } from 'enzyme';
import JiraAdvancedSearch, {
  Props,
} from '../../../components/jira/JiraAdvancedSearch';
import AdvancedSearchResult from '../../../components/AdvancedSearchResult';
import * as Utils from '../../../components/SearchResultsUtil';
import { AnalyticsType } from '../../../model/Result';
import DropdownMenu, { DropdownItem } from '@atlaskit/dropdown-menu';

const defaultProps: Props = {
  query: 'query',
};

const renderComponent = (overriddenProps?: Partial<Props>) => {
  const props = { ...defaultProps, ...overriddenProps };
  return shallow(<JiraAdvancedSearch {...props} />);
};

describe('JiraAdvancedSearch', () => {
  let getJiraAdvancedSearchUrlMock;
  beforeEach(() => {
    getJiraAdvancedSearchUrlMock = jest.spyOn(
      Utils,
      'getJiraAdvancedSearchUrl',
    );
    getJiraAdvancedSearchUrlMock.mockReturnValue('advancedSearchUrl');
  });

  afterEach(() => {
    getJiraAdvancedSearchUrlMock.mockReset();
  });

  it('should default to issues search', () => {
    const wrapper = renderComponent();
    const advancedSearchResult = wrapper.find(AdvancedSearchResult);

    expect(advancedSearchResult.length).toBe(1);
    expect(advancedSearchResult.props()).toMatchObject({
      href: 'advancedSearchUrl',
      icon: undefined,
      type: AnalyticsType.AdvancedSearchJira,
      showKeyboardLozenge: false,
    });
    expect(getJiraAdvancedSearchUrlMock).toHaveBeenCalledWith(
      'issues',
      'query',
    );
  });

  it('should render icon and showKeyboardLonzge', () => {
    const wrapper = renderComponent({
      showSearchIcon: true,
      showKeyboardLozenge: true,
    });
    const advancedSearchResult = wrapper.find(AdvancedSearchResult);
    expect(advancedSearchResult.length).toBe(1);
    expect(advancedSearchResult.props().showKeyboardLozenge).toBe(true);

    const icon = advancedSearchResult.props().icon;
    expect(icon).toBeDefined();
  });

  it('should render dropdown items with possible choices', () => {
    const wrapper = renderComponent({
      showSearchIcon: true,
      showKeyboardLozenge: true,
    });
    const advancedSearchResult = wrapper.find(AdvancedSearchResult);

    const dropDownMenu = shallow(advancedSearchResult.props()
      .text as JSX.Element).find(DropdownMenu);
    expect(dropDownMenu.length).toBe(1);

    const items = dropDownMenu.find(DropdownItem);
    expect(items.length).toBe(5);
    expect(items.map(item => item.key())).toMatchObject([
      'issues',
      'boards',
      'projects',
      'filters',
      'people',
    ]);
  });
});
