import * as React from 'react';
import { ResultData } from '@atlaskit/quick-search';
export interface Props {
    onClick?: (resultData: ResultData) => void;
}
export default class AdvancedIssueSearchLink extends React.Component<Props> {
    render(): JSX.Element;
}
