// @flow
import React from 'react';
import { md, Props } from '@findable/docs';
import SectionMessage from '@findable/section-message';

export default md`
  ${(
    <SectionMessage appearance="error">
      <p>
        <strong>Note: @findable/navigation is now deprecated.</strong>
      </p>
      <p>We recommend upgrading to @findable/navigation-next</p>
    </SectionMessage>
  )}

  There is a specific \`AkGlobalItem\` component that is designed to be used in the
  \`globalSecondaryActions\` prop for navigation. Wrapping an icon, possibly
  with a tooltip insie a \`AkGlobalItem\` component will ensure the correct
  styling behaviour for the item.

  ${(
    <Props
      shouldCollapseProps
      heading="Global Navigation Item Props"
      props={require('!!extract-react-types-loader!../src/components/js/GlobalItem.js')}
    />
  )}

  If you want to render GlobalNavigation only, it is exported as \`AkGlobalNavigation\`.

  ${(
    <Props
      shouldCollapseProps
      heading="Global Navigation Props"
      props={require('!!extract-react-types-loader!../src/components/js/GlobalNavigation.js')}
    />
  )}


`;
