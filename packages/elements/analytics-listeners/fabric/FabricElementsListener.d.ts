import * as React from 'react';
import { ListenerProps } from '../types';
import { UIAnalyticsEventHandlerSignature } from '@findable/analytics-next-types';
export declare const ELEMENTS_TAG = "fabricElements";
export default class FabricElementsListener extends React.Component<ListenerProps> {
    handleEventWrapper: UIAnalyticsEventHandlerSignature;
    render(): JSX.Element;
}
