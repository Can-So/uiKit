import * as React from 'react';
import { ListenerProps } from '../types';
import { UIAnalyticsEventHandlerSignature } from '@atlaskit/analytics-next-types';
export declare const EDITOR_TAG = "fabricEditor";
export default class FabricEditorListener extends React.Component<ListenerProps> {
    handleEventWrapper: UIAnalyticsEventHandlerSignature;
    render(): JSX.Element;
}
