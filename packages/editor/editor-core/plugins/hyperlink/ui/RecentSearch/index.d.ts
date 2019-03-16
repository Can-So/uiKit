import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
export interface Props {
    providerFactory: ProviderFactory;
    onBlur?: (text: string) => void;
    onSubmit?: (href: string, text?: string) => void;
}
export default class HyperlinkAddToolbar extends React.PureComponent<Props, {}> {
    render(): JSX.Element;
}
