import * as React from 'react';
export interface Props {
    title: JSX.Element | string;
    body: JSX.Element | string;
}
export default class NoResults extends React.Component<Props> {
    render(): JSX.Element;
}
