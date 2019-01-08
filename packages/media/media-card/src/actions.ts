import { MediaItem } from '@atlaskit/media-core';
import { ReactNode } from 'react';

export interface CardAction {
  label?: string;
  handler: CardEventHandler;
  icon?: ReactNode;
}

export type CardEventHandler = (item?: MediaItem, event?: Event) => void;
