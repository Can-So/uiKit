import * as React from 'react';
import { Result } from '../model/Result';
export interface Props {
    results: Result[];
    sectionIndex: number;
    analyticsData?: {};
}
export declare const getUniqueResultId: (result: Result) => string;
export default class ResultList extends React.Component<Props> {
    render(): JSX.Element[];
}
