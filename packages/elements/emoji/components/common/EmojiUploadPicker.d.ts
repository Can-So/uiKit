import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { EmojiUpload, Message } from '../../types';
import { UploadStatus } from './internal-types';
export interface OnUploadEmoji {
    (upload: EmojiUpload): void;
}
export interface Props {
    onUploadEmoji: OnUploadEmoji;
    onUploadCancelled: () => void;
    onFileChosen?: (name: string) => void;
    errorMessage?: Message;
    initialUploadName?: string;
}
export interface State {
    previewImage?: string;
    name?: string;
    filename?: string;
    uploadStatus?: UploadStatus;
    chooseEmojiErrorMessage?: FormattedMessage.MessageDescriptor;
}
export default class EmojiUploadPicker extends PureComponent<Props, State> {
    state: State;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    private onNameChange;
    private onAddEmoji;
    private errorOnUpload;
    private onFileLoad;
    private cancelChooseFile;
    private onChooseFile;
    clearUploadPicker: () => void;
    render(): JSX.Element;
}
