import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { gridSize } from '@atlaskit/theme';
import styled from 'styled-components';
import SearchIcon from '@atlaskit/icon/glyph/search';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';
import { CancelableEvent } from '@atlaskit/quick-search';
import { messages } from '../../messages';
import AdvancedSearchResult from '../AdvancedSearchResult';
import { AnalyticsType } from '../../model/Result';
import {
  getJiraAdvancedSearchUrl,
  JiraEntityTypes,
  ADVANCED_JIRA_SEARCH_RESULT_ID,
} from '../SearchResultsUtil';

export interface Props {
  query: string;
  showKeyboardLozenge?: boolean;
  showSearchIcon?: boolean;
  analyticsData?: object;
  onClick?: (e: CancelableEvent, entity: JiraEntityTypes) => void;
}

interface State {
  entity: JiraEntityTypes;
}

const TextContainer = styled.div`
  padding: ${gridSize()}px 0;
  margin-right: ${gridSize()}px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const itemI18nKeySuffix = [
  JiraEntityTypes.Issues,
  JiraEntityTypes.Boards,
  JiraEntityTypes.Projects,
  JiraEntityTypes.Filters,
  JiraEntityTypes.People,
];

const getI18nItemName = (i18nKeySuffix: string) => {
  const id = `jira_advanced_search_${i18nKeySuffix}`;
  return <FormattedMessage {...messages[id]} />;
};

export default class JiraAdvancedSearch extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.enrichedAnalyticsData = props.analyticsData;
  }
  static defaultProps = {
    showKeyboardLozenge: false,
    showSearchIcon: false,
  };

  state = {
    entity: JiraEntityTypes.Issues,
  };

  renderDropdownItems = () =>
    itemI18nKeySuffix.map(item => (
      <DropdownItem
        onClick={() => (this.selectedItem = item)}
        key={item}
        href={getJiraAdvancedSearchUrl(item, this.props.query)}
      >
        {getI18nItemName(item)}
      </DropdownItem>
    ));

  selectedItem?: JiraEntityTypes;
  nextSelectedItem?: JiraEntityTypes;

  enrichedAnalyticsData?: object;

  render() {
    const { query, showKeyboardLozenge, showSearchIcon, onClick } = this.props;

    return (
      <AdvancedSearchResult
        onClick={e => {
          if (onClick) {
            const selectedEntity = this.nextSelectedItem || this.state.entity;
            onClick(e.event, selectedEntity);
            this.nextSelectedItem = undefined;
          }
        }}
        href={getJiraAdvancedSearchUrl(this.state.entity, query)}
        key={`search-jira-${Date.now()}`}
        resultId={ADVANCED_JIRA_SEARCH_RESULT_ID}
        text={
          <Container>
            <TextContainer>
              <FormattedMessage {...messages.jira_advanced_search} />
            </TextContainer>
            <span
              onClick={e => {
                if (this.selectedItem) {
                  const entity = this.selectedItem;
                  this.nextSelectedItem = entity;
                  this.setState({
                    entity,
                  });
                  this.enrichedAnalyticsData = {
                    ...this.props.analyticsData,
                    contentType: this.selectedItem,
                  };
                  this.selectedItem = undefined;
                } else {
                  // we need to cancel on click event on the dropdown to stop navigation
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
            >
              <DropdownMenu
                trigger={getI18nItemName(this.state.entity)}
                triggerType="button"
                shouldFlip={false}
                position="right bottom"
              >
                <DropdownItemGroup>
                  {this.renderDropdownItems()}
                </DropdownItemGroup>
              </DropdownMenu>
            </span>
          </Container>
        }
        icon={
          showSearchIcon ? (
            <SearchIcon size="medium" label="Advanced search" />
          ) : (
            undefined
          )
        }
        type={AnalyticsType.AdvancedSearchJira}
        showKeyboardLozenge={showKeyboardLozenge}
        // lazily pass analytics data because the analytic event fired as part of onclick handle
        // i.e. before the component update the new state, so can not add contentType from state
        analyticsData={() => this.enrichedAnalyticsData}
      />
    );
  }
}
