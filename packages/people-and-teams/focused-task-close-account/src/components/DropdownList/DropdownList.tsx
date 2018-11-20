import Button from '@atlaskit/button';
import { FormattedMessage } from 'react-intl';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import * as React from 'react';

import * as Styled from './styled';
import { DropDownListProps } from './types';
import { overviewMessages, dropDownListMessages } from '../../messages';

type State = {
  isExpanded: boolean;
};

export class DropdownList extends React.Component<DropDownListProps, State> {
  state = {
    isExpanded: false,
  };

  showDropdownList = () => {
    this.setState({ isExpanded: true });
  };

  hideDropdownList = () => {
    this.setState({ isExpanded: false });
  };

  render() {
    const { accessibleSites } = this.props;
    const { isExpanded } = this.state;

    return accessibleSites.length < 4 ? (
      <>
        <Styled.AccessibleSitesList>
          {accessibleSites.map((url, idx) => (
            <li key={idx}>{url}</li>
          ))}
        </Styled.AccessibleSitesList>
        <Styled.AccessibleSitesListFootnote>
          <FormattedMessage {...overviewMessages.paragraphLoseAccessFootnote} />
        </Styled.AccessibleSitesListFootnote>
      </>
    ) : (
      <>
        <Styled.AccessibleSitesList>
          {accessibleSites.slice(0, 3).map((url, idx) => (
            <li key={idx}>{url}</li>
          ))}
        </Styled.AccessibleSitesList>
        {isExpanded && (
          <>
            <Styled.AccessibleSitesList>
              {accessibleSites
                .slice(3, accessibleSites.length)
                .map((url, idx) => (
                  <li key={idx}>{url}</li>
                ))}
            </Styled.AccessibleSitesList>
            <Styled.AccessibleSitesListFootnote>
              <FormattedMessage
                {...overviewMessages.paragraphLoseAccessFootnote}
              />
            </Styled.AccessibleSitesListFootnote>
          </>
        )}
        {!isExpanded ? (
          <Styled.ButtonWrapper>
            <Button
              onClick={this.showDropdownList}
              appearance="link"
              spacing="none"
              iconBefore={<ChevronDownIcon label="expand" />}
            >
              <FormattedMessage
                {...dropDownListMessages.expandButton}
                values={{ num: accessibleSites.length - 3 }}
              />
            </Button>
          </Styled.ButtonWrapper>
        ) : (
          <Styled.ButtonWrapper>
            <Button
              onClick={this.hideDropdownList}
              appearance="link"
              spacing="none"
              iconBefore={<ChevronUpIcon label="collapse" />}
            >
              <FormattedMessage {...dropDownListMessages.collapseButton} />
            </Button>
          </Styled.ButtonWrapper>
        )}
      </>
    );
  }
}
