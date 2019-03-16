import { PureComponent } from 'react';
import { ActionMarkAttributes } from '@atlaskit/adf-schema';
import { EventHandlers } from '@atlaskit/editor-common';
export interface Props extends ActionMarkAttributes {
    markKey?: string;
    eventHandlers?: EventHandlers;
    children?: any;
}
export default class Action extends PureComponent<Props, {}> {
    onClick: () => void;
    render(): JSX.Element;
}
