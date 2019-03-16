import * as React from 'react';
import { CancelableEvent } from '@atlaskit/quick-search';
export interface Props {
    query: string;
    analyticsData?: object;
    onClick?: (e: CancelableEvent, entity: string) => void;
}
export default class AdvancedSearchGroup extends React.Component<Props> {
    render(): JSX.Element[];
}
