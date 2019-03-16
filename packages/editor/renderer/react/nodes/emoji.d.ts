import { EmojiAttributes } from '@findable/adf-schema';
import { PureComponent } from 'react';
import { ProviderFactory } from '@findable/editor-common';
export interface EmojiProps extends EmojiAttributes {
    providers?: ProviderFactory;
    fitToHeight?: number;
}
export default class EmojiItem extends PureComponent<EmojiProps, {}> {
    render(): JSX.Element;
}
