import * as React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

import { deactivateUserOverviewMessages } from '../../messages';
import UserInfo from '../UserInfo';
import { DeactivateUserOverviewScreenProps } from './types';
import * as Styled from './styled';
import { DropdownList } from '../DropdownList';
import MessagesIntlProvider from '../MessagesIntlProvider';

export class DeactivateUserOverviewScreen extends React.Component<
  DeactivateUserOverviewScreenProps
> {
  static defaultProps: Partial<DeactivateUserOverviewScreenProps> = {
    isCurrentUser: false,
  };

  selectAdminOrSelfCopy = (adminCopy, selfCopy) => {
    return this.props.isCurrentUser ? selfCopy : adminCopy;
  };

  displayFirstListElement = () => {
    const { accessibleSites, user } = this.props;
    const hasAccessibleSites = accessibleSites && accessibleSites.length > 0;
    return (
      <li>
        {!hasAccessibleSites && (
          <FormattedHTMLMessage
            {...this.selectAdminOrSelfCopy(
              deactivateUserOverviewMessages.paragraphLoseAccessAdminNoSites,
              deactivateUserOverviewMessages.paragraphLoseAccessSelfNoSites,
            )}
            values={{ fullName: user.fullName }}
          />
        )}
        {hasAccessibleSites && (
          <>
            <FormattedHTMLMessage
              {...this.selectAdminOrSelfCopy(
                deactivateUserOverviewMessages.paragraphLoseAccessAdmin,
                deactivateUserOverviewMessages.paragraphLoseAccessSelf,
              )}
              values={{ fullName: user.fullName }}
              tagName={'p'}
            />
            <DropdownList accessibleSites={accessibleSites} />
          </>
        )}
      </li>
    );
  };

  displaySecondListElement = () => {
    return (
      <li>
        <FormattedHTMLMessage
          {...this.selectAdminOrSelfCopy(
            deactivateUserOverviewMessages.paragraphPersonalDataAdmin,
            deactivateUserOverviewMessages.paragraphPersonalDataSelf,
          )}
        />
      </li>
    );
  };

  displayThirdListElement = () => {
    return (
      <li>
        <FormattedMessage
          {...this.selectAdminOrSelfCopy(
            deactivateUserOverviewMessages.paragraphBillingAdmin,
            deactivateUserOverviewMessages.paragraphBillingSelf,
          )}
        />
      </li>
    );
  };

  render() {
    const { user } = this.props;

    return (
      <MessagesIntlProvider>
        <Styled.Screen>
          <Styled.Title>
            <FormattedMessage
              {...this.selectAdminOrSelfCopy(
                deactivateUserOverviewMessages.headingAdmin,
                deactivateUserOverviewMessages.headingSelf,
              )}
            />
          </Styled.Title>
          <FormattedMessage
            {...this.selectAdminOrSelfCopy(
              deactivateUserOverviewMessages.firstLineAdmin,
              deactivateUserOverviewMessages.firstLineSelf,
            )}
            tagName="p"
          />
          <UserInfo user={user} />
          <FormattedMessage
            {...this.selectAdminOrSelfCopy(
              deactivateUserOverviewMessages.paragraphAboutToDeactivateAdmin,
              deactivateUserOverviewMessages.paragraphAboutToDeactivateSelf,
            )}
          />
          <Styled.MainInformationList>
            {this.displayFirstListElement()}
            {this.displaySecondListElement()}
            {this.displayThirdListElement()}
          </Styled.MainInformationList>
          <FormattedMessage
            {...this.selectAdminOrSelfCopy(
              deactivateUserOverviewMessages.lastLineAdmin,
              deactivateUserOverviewMessages.lastLineSelf,
            )}
            tagName="p"
          />
        </Styled.Screen>
      </MessagesIntlProvider>
    );
  }
}

export default DeactivateUserOverviewScreen;
