import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { gridSize } from '@atlaskit/theme';
import styled from 'styled-components';
import SearchIcon from '@atlaskit/icon/glyph/search';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';
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
  onAdvancedSearchChange?(entity: JiraEntityTypes): void;
  showKeyboardLozenge?: boolean;
  showSearchIcon?: boolean;
  analyticsData?: object;
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
  JiraEntityTypes.People,
  JiraEntityTypes.Projects,
  JiraEntityTypes.Filters,
  JiraEntityTypes.Boards,
];

const getI18nItemName = (i18nKeySuffix: string) => {
  const id = `jira_advanced_search_${i18nKeySuffix}`;
  return <FormattedMessage {...messages[id]} />;
};

export default class JiraAdvancedSearch extends React.Component<Props> {
  static defaultProps = {
    showKeyboardLozenge: false,
    showSearchIcon: false,
  };

  renderDropdownItems = () =>
    itemI18nKeySuffix.map(item => (
      <DropdownItem
        href={getJiraAdvancedSearchUrl(item, this.props.query)}
        onClick={e => e.stopPropagation()}
        key={item}
      >
        {getI18nItemName(item)}
      </DropdownItem>
    ));

  render() {
    const {
      query,
      showKeyboardLozenge,
      showSearchIcon,
      analyticsData,
    } = this.props;

    return (
      <AdvancedSearchResult
        href={getJiraAdvancedSearchUrl(JiraEntityTypes.Issues, query)}
        key="search_jira"
        resultId={ADVANCED_JIRA_SEARCH_RESULT_ID}
        text={
          <Container>
            <TextContainer>
              <FormattedMessage {...messages.jira_advanced_search} />
            </TextContainer>
            <span
              onClick={e => {
                // we need to cancel on click event on the dropdown to stop navigation
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <DropdownMenu
                trigger={getI18nItemName(JiraEntityTypes.Issues)}
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
        analyticsData={analyticsData}
      />
    );
  }
}
