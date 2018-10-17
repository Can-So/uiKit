// @flow
import React from 'react';
import { md, Props } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';

export default md`
  ${(
    <SectionMessage appearance="error">
      <p>
        <strong>Note: @atlaskit/navigation is now deprecated.</strong>
      </p>
      <p>We recommend upgrading to @atlaskit/navigation-next</p>
    </SectionMessage>
  )}

  The components provided here are designed to be used within the container
  navigation to ensure the correct stylistic behaviour for items within them.

  \`AkNavigationItem\` is designed to be the basic item within the container
  navigation, and can be wrapped in \`AkNavigationItemGroup\` to help
  differentiate items.

  ${(
    <Props
      shouldCollapseProps
      heading="AkNavigationItem"
      props={require('!!extract-react-types-loader!../src/components/js/NavigationItem.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkNavigationItemGroup"
      props={require('!!extract-react-types-loader!../src/components/js/NavigationItemGroup.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkContainerTitle"
      props={require('!!extract-react-types-loader!../src/components/js/ContainerTitle.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkContainerLogo"
      props={require('!!extract-react-types-loader!../src/components/js/ContainerLogo.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkContainerTitleDropdown"
      props={require('!!extract-react-types-loader!../src/components/js/ContainerTitleDropdown.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkContainerNavigation"
      props={require('!!extract-react-types-loader!../src/components/js/ContainerNavigation.js')}
    />
  )}

  ${(
    <Props
      shouldCollapseProps
      heading="AkContainerNavigationNested"
      props={require('!!extract-react-types-loader!../src/components/js/nested/ContainerNavigationNested.js')}
    />
  )}
`;
