import * as React from 'react';

import { InlineCardResolvedViewProps } from '@atlaskit/media-ui';
import { extractPropsFromObject } from './extractPropsFromObject';
import Task16Icon from '@atlaskit/icon-object/glyph/task/16';

export function extractInlineViewPropsFromTask(
  json: any,
): InlineCardResolvedViewProps {
  const props = extractPropsFromObject(json);

  props.icon = <Task16Icon label={json.provider ? json.provider.name : ''} />;

  if (json.tag && json.tag.name) {
    props.lozenge = {
      appearance: 'success',
      text: json.tag.name,
    };
  }

  return props;
}
