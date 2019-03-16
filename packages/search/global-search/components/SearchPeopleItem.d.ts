import * as React from 'react';
import { ResultData } from '@atlaskit/quick-search';
export interface Props {
    query: string;
    text: JSX.Element | string;
    icon?: JSX.Element;
    analyticsData?: object;
    isCompact?: boolean;
    onClick?: (resultData: ResultData) => void;
}
export default class SearchPeopleItem extends React.Component<Props> {
    render(): JSX.Element;
}
