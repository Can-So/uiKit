import * as React from 'react';
import { Card } from '@findable/smart-card';
import { EventHandlers } from '@findable/editor-common';

import { getEventHandler } from '../../utils';

export default function InlineCard(props: {
  url?: string;
  data?: object;
  eventHandlers?: EventHandlers;
}) {
  const { url, data, eventHandlers } = props;
  const handler = getEventHandler(eventHandlers, 'smartCard');
  const onClick = url && handler ? () => handler(url) : undefined;
  return <Card appearance="inline" url={url} data={data} onClick={onClick} />;
}
