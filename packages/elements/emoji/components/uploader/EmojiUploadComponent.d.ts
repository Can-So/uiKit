import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { EmojiProvider } from '../../api/EmojiResource';
import { FireAnalyticsEvent } from '@findable/analytics';
export interface UploadRefHandler {
    (ref: HTMLDivElement): void;
}
export interface Props {
    emojiProvider: EmojiProvider;
    onUploaderRef?: UploadRefHandler;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}
export interface State {
    uploadErrorMessage?: FormattedMessage.MessageDescriptor;
}
export default class EmojiUploadComponent extends PureComponent<Props, State> {
    private ref?;
    constructor(props: Props);
    private onUploadEmoji;
    private prepareForUpload;
    private onUploaderRef;
    render(): JSX.Element;
}
