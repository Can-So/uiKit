import * as React from 'react';
import { Result } from '../model/Result';
export interface Props {
    title: JSX.Element | string;
    results: Result[];
    sectionIndex: number;
    analyticsData?: {};
}
export default class ResultGroup extends React.Component<Props> {
    render(): JSX.Element | null;
}
