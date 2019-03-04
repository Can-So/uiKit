import * as React from 'react';
import Switcher from './switcher';
import { CustomLinksProvider as JiraCustomLinksProvider } from '../providers/jira-data-providers';
import { CustomLinksProvider as ConfluenceCustomLinksProvider } from '../providers/confluence-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import {
  getSuggestedProductLink,
  getProductIsActive,
  ProductKey,
} from '../utils/links';

interface GenericSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
}

export default (props: GenericSwitcherProps) => (
  <CommonDataProvider cloudId={props.cloudId}>
    {({ licenseInformation, ...dataProps }) => {
      const hasConfluence =
        licenseInformation.data &&
        getProductIsActive(licenseInformation.data, ProductKey.CONFLUENCE);

      const hasJira =
        licenseInformation.data &&
        [
          ProductKey.JIRA_CORE,
          ProductKey.JIRA_OPS,
          ProductKey.JIRA_SERVICE_DESK,
          ProductKey.JIRA_SOFTWARE,
        ].some(product =>
          getProductIsActive(licenseInformation.data!, product),
        );

      if (hasConfluence || hasJira) {
        const CustomLinksProvider = hasJira
          ? JiraCustomLinksProvider
          : ConfluenceCustomLinksProvider;

        return (
          <CustomLinksProvider>
            {customLinks => (
              <Switcher
                {...props}
                {...dataProps}
                licenseInformation={licenseInformation}
                suggestedProductLink={getSuggestedProductLink(
                  licenseInformation.data,
                )}
                customLinks={customLinks}
              />
            )}
          </CustomLinksProvider>
        );
      }

      return (
        <Switcher
          {...props}
          {...dataProps}
          licenseInformation={licenseInformation}
          suggestedProductLink={getSuggestedProductLink(
            licenseInformation.data,
          )}
          customLinks={{
            data: null,
            isLoading: licenseInformation.isLoading,
            error: null,
          }}
        />
      );
    }}
  </CommonDataProvider>
);
