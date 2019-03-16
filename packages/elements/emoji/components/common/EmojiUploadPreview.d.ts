import { PureComponent } from 'react';
import { Message } from '../../types';
import { UploadStatus } from './internal-types';
export interface EmojiUploadPreviewProps {
    name: string;
    previewImage: string;
    uploadStatus?: UploadStatus;
    errorMessage?: Message;
    onUploadCancelled: () => void;
    onAddEmoji: () => void;
}
export default class EmojiUploadPreview extends PureComponent<EmojiUploadPreviewProps, {}> {
    render(): JSX.Element;
}
