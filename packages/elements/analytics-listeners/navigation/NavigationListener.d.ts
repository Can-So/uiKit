import * as React from 'react';
import { ListenerProps } from '../types';
import { UIAnalyticsEventHandlerSignature } from '@findable/analytics-next-types';
export default class NavigationListener extends React.Component<ListenerProps> {
    listenerHandler: UIAnalyticsEventHandlerSignature;
    render(): JSX.Element;
}
