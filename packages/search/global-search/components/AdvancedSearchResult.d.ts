import * as React from 'react';
import { ResultBaseProps } from '@atlaskit/quick-search';
export interface Props extends ResultBaseProps {
    showKeyboardLozenge?: boolean;
}
export default class AdvancedSearchResult extends React.Component<Props> {
    static defaultProps: {
        showKeyboardLozenge: boolean;
    };
    getElemAfter(): JSX.Element | null;
    render(): JSX.Element;
}
