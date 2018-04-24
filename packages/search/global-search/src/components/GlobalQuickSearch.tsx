import * as React from 'react';
import * as debounce from 'lodash.debounce';
import { QuickSearch } from '@atlaskit/quick-search';

export interface Props {
  onMount();
  onSearch(query: string);

  isLoading: boolean;
  query: string;
  children: React.ReactNode;
}

/**
 * Presentational component that renders the search input and search results.
 */
export default class GlobalQuickSearch extends React.Component<Props> {
  componentDidMount() {
    this.props.onMount();
  }

  handleSearchInput = ({ target }) => {
    const query = target.value;
    this.debouncedSearch(query);
  };

  debouncedSearch = debounce(this.doSearch, 350);

  doSearch(query: string) {
    this.props.onSearch(query);
  }

  render() {
    const { query, isLoading, children } = this.props;

    return (
      <QuickSearch
        isLoading={isLoading}
        onSearchInput={this.handleSearchInput}
        value={query}
      >
        {children}
      </QuickSearch>
    );
  }
}
