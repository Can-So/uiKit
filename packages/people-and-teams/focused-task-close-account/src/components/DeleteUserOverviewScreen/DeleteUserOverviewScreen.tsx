import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@atlaskit/button';
import SectionMessage from '@atlaskit/section-message';
import InfoIcon from '@atlaskit/icon/glyph/info';

import { commonMessages, overviewMessages } from '../../messages';
import StatefulInlineDialog from '../StatefulInlineDialog';
import UserInfo from '../UserInfo';
import { DeleteUserOverviewScreenProps } from './types';
import * as Styled from './styled';

/**
 * Copy not final - ROCKET-1610
 * i18n yet to be applied - ROCKET-1610
 */

export class DeleteUserOverviewScreen extends React.Component<
  DeleteUserOverviewScreenProps
> {
  static defaultProps: Partial<DeleteUserOverviewScreenProps> = {
    isCurrentUser: false,
  };

  selectAdminOrSelfCopy = (adminCopy, selfCopy) => {
    return this.props.isCurrentUser ? selfCopy : adminCopy;
  };

  render() {
    const { accessibleSites, user, deactivateUserHandler } = this.props;

    return (
      <Styled.Screen>
        <Styled.Title>
          <FormattedMessage {...overviewMessages.heading} />
        </Styled.Title>
        <Styled.FirstLine>
          <FormattedMessage
            {...this.selectAdminOrSelfCopy(
              overviewMessages.firstLineAdmin,
              overviewMessages.firstLineSelf,
            )}
          />
        </Styled.FirstLine>
        <UserInfo user={user} />
        <FormattedMessage
          {...this.selectAdminOrSelfCopy(
            overviewMessages.paragraphAboutToDeleteAdmin,
            overviewMessages.paragraphAboutToDeleteSelf,
          )}
        />
        <Styled.MainInformationList>
          <li>
            <Styled.ListItems>
              {!accessibleSites || accessibleSites.length === 0 ? (
                <FormattedMessage
                  {...this.selectAdminOrSelfCopy(
                    overviewMessages.paragraphLoseAccessAdminNoSites,
                    overviewMessages.paragraphLoseAccessSelfNoSites,
                  )}
                />
              ) : (
                <>
                  <FormattedMessage
                    {...this.selectAdminOrSelfCopy(
                      overviewMessages.paragraphLoseAccessAdmin,
                      overviewMessages.paragraphLoseAccessSelf,
                    )}
                    values={{ fullName: user.fullName }}
                  />
                  <Styled.AccessibleSitesList>
                    {accessibleSites.map((url, idx) => (
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
            </Styled.ListItems>
          </li>
          <li>
            <Styled.ListItems>
              <FormattedMessage
                {...this.selectAdminOrSelfCopy(
                  overviewMessages.paragraphPersonalDataWillBeDeletedAdmin,
                  overviewMessages.paragraphPersonalDataWillBeDeletedSelf,
                )}
              />
              <Styled.InfoIconWrapper>
                <StatefulInlineDialog
                  placement="auto-start"
                  content={
                    <div>
                      <FormattedMessage
                        {...this.selectAdminOrSelfCopy(
                          overviewMessages.inlineDialogDataWillBeDeletedP1Admin,
                          overviewMessages.inlineDialogDataWillBeDeletedP1Self,
                        )}
                        tagName="p"
                      />
                      <Styled.ListItems>
                        <FormattedMessage
                          {...this.selectAdminOrSelfCopy(
                            overviewMessages.inlineDialogDataWillBeDeletedLi1Admin,
                            overviewMessages.inlineDialogDataWillBeDeletedLi1Self,
                          )}
                          tagName="li"
                        />
                        <FormattedMessage
                          {...this.selectAdminOrSelfCopy(
                            overviewMessages.inlineDialogDataWillBeDeletedLi2Admin,
                            overviewMessages.inlineDialogDataWillBeDeletedLi2Self,
                          )}
                          tagName="li"
                        />
                        <FormattedMessage
                          {...this.selectAdminOrSelfCopy(
                            overviewMessages.inlineDialogDataWillBeDeletedLi3Admin,
                            overviewMessages.inlineDialogDataWillBeDeletedLi3Self,
                          )}
                          tagName="li"
                        />
                      </Styled.ListItems>
                      <FormattedMessage
                        {...this.selectAdminOrSelfCopy(
                          overviewMessages.inlineDialogDataWillBeDeletedP2Admin,
                          overviewMessages.inlineDialogDataWillBeDeletedP2Self,
                        )}
                        tagName="p"
                      />
                      <FormattedMessage
                        {...this.selectAdminOrSelfCopy(
                          overviewMessages.inlineDialogDataWillBeDeletedP3Admin,
                          overviewMessages.inlineDialogDataWillBeDeletedP3Self,
                        )}
                        tagName="p"
                      />
                    </div>
                  }
                >
                  <InfoIcon label="" size="small" />
                </StatefulInlineDialog>
              </Styled.InfoIconWrapper>
            </Styled.ListItems>
            <Styled.ListItems>
              <FormattedMessage
                {...this.selectAdminOrSelfCopy(
                  overviewMessages.paragraphPersonalDataWillBeDeletedFootnoteAdmin,
                  overviewMessages.paragraphPersonalDataWillBeDeletedFootnoteSelf,
                )}
              />{' '}
              <Styled.InfoIconWrapper>
                <StatefulInlineDialog
                  placement="auto-start"
                  content={
                    <div>
                      <FormattedMessage
                        {...this.selectAdminOrSelfCopy(
                          overviewMessages.inlineDialogDataAppsAdmin,
                          overviewMessages.inlineDialogDataAppsSelf,
                        )}
                        tagName="p"
                      />
                    </div>
                  }
                >
                  <InfoIcon label="" size="small" />
                </StatefulInlineDialog>
              </Styled.InfoIconWrapper>
            </Styled.ListItems>
          </li>
          <li>
            <Styled.ListItems>
              <FormattedMessage
                {...this.selectAdminOrSelfCopy(
                  overviewMessages.paragraphContentCreatedAdmin,
                  overviewMessages.paragraphContentCreatedSelf,
                )}
              />{' '}
              <Styled.InfoIconWrapper>
                <StatefulInlineDialog
                  placement="auto-start"
                  content={
                    <FormattedMessage
                      {...this.selectAdminOrSelfCopy(
                        overviewMessages.inlineDialogContentCreatedAdmin,
                        overviewMessages.inlineDialogContentCreatedSelf,
                      )}
                    />
                  }
                >
                  <InfoIcon label="" size="small" />
                </StatefulInlineDialog>
              </Styled.InfoIconWrapper>
            </Styled.ListItems>
          </li>
        </Styled.MainInformationList>
        {deactivateUserHandler && (
          <Styled.SectionMessageOuter>
            <SectionMessage appearance="warning">
              <FormattedMessage {...overviewMessages.warningSectionBody} />
              <p>
                <Button
                  appearance="link"
                  spacing="none"
                  onClick={deactivateUserHandler}
                >
                  <FormattedMessage {...commonMessages.deactivateAccount} />
                </Button>
              </p>
            </SectionMessage>
          </Styled.SectionMessageOuter>
        )}
      </Styled.Screen>
    );
  }
}

export default DeleteUserOverviewScreen;
