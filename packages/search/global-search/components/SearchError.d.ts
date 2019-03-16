import * as React from 'react';
export interface Props {
    onRetryClick(): any;
}
export default class SearchError extends React.Component<Props> {
    render(): JSX.Element;
}
