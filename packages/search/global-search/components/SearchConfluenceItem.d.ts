import * as React from 'react';
import { ResultData } from '@atlaskit/quick-search';
export interface Props {
    query: string;
    text: JSX.Element | string;
    icon?: JSX.Element;
    showKeyboardLozenge?: boolean;
    analyticsData?: object;
    isCompact?: boolean;
    onClick?: (resultData: ResultData) => void;
}
export default class SearchConfluenceItem extends React.Component<Props> {
    static defaultProps: {
        showKeyboardLozenge: boolean;
    };
    render(): JSX.Element;
}
