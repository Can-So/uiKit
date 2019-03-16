import { PureComponent } from 'react';
import { EmojiId } from '@atlaskit/emoji';
import { ProviderFactory } from '@atlaskit/editor-common';
export interface EmojiProps extends EmojiId {
    allowTextFallback?: boolean;
    providers?: ProviderFactory;
    fitToHeight?: number;
}
export default class EmojiNode extends PureComponent<EmojiProps, {}> {
    private providerFactory;
    constructor(props: EmojiProps);
    componentWillUnmount(): void;
    private renderWithProvider;
    render(): JSX.Element;
}
