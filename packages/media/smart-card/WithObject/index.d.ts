import * as React from 'react';
import { Client, ObjectState } from '../Client';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
export interface WithObjectRenderProps {
    state: ObjectState;
    reload: () => void;
}
export declare type WithObjectProps = {
    client?: Client;
    isSelected?: boolean;
    appearance: 'block' | 'inline';
    url: string;
    children: (props: WithObjectRenderProps) => React.ReactNode;
} & WithAnalyticsEventProps;
export declare function WithObject(props: WithObjectProps): JSX.Element;
