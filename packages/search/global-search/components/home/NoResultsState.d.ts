import * as React from 'react';
export interface Props {
    query: string;
}
export default class NoResultsState extends React.Component<Props> {
    render(): JSX.Element[];
}
