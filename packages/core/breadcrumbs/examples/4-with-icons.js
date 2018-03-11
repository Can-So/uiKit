// @flow
import React from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';

import Breadcrumbs, { BreadcrumbsItem } from '../src';

const TestIcon = <AtlassianIcon label="Test icon" />;

export default () => (
  // with icons
  <div>
    <p>Using itemBefore and itemAfter API</p>
    <Breadcrumbs>
      <BreadcrumbsItem href="/item" text="No icon" />
      <BreadcrumbsItem href="/item" iconBefore={TestIcon} text="Before" />
      <BreadcrumbsItem href="/item" iconAfter={TestIcon} text="After" />
      <BreadcrumbsItem
        href="/item"
        iconBefore={TestIcon}
        iconAfter={TestIcon}
        text="Before and after"
      />
      <BreadcrumbsItem
        href="/item"
        iconBefore={TestIcon}
        iconAfter={TestIcon}
        text="Long content, icons before and after"
      />
    </Breadcrumbs>
  </div>
);
