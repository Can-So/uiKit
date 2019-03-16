import * as React from 'react';
import { CancelableEvent } from '@atlaskit/quick-search';
export interface Props {
    query: string;
    onClick?: (e: CancelableEvent, entity: string) => void;
}
export default class NoResultsState extends React.Component<Props> {
    render(): JSX.Element;
}
