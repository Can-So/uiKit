import * as React from 'react';
import { UIAnalyticsEventHandlerSignature } from '@atlaskit/analytics-next-types';
import { ListenerProps } from '../types';
export default class MediaAnalyticsListener extends React.Component<ListenerProps> {
    listenerHandler: UIAnalyticsEventHandlerSignature;
    render(): JSX.Element;
}
