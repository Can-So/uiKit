// @flow

import type { ElementConfig } from 'react';
import ConnectedItem from '../ConnectedItem';

// TODO: Figure out why this isn't appearing in 10-ui-components prop docs
export type BackItemProps = ElementConfig<$Supertype<typeof ConnectedItem>>;
