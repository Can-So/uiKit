import { supportsUploadFeature } from '../../api/EmojiResource';
import { messages } from '../i18n';
export var uploadEmoji = function (upload, emojiProvider, errorSetter, onSuccess, onFailure) {
    errorSetter(undefined);
    if (supportsUploadFeature(emojiProvider)) {
        emojiProvider
            .uploadCustomEmoji(upload)
            .then(function (emojiDescription) { return onSuccess(emojiDescription); })
            .catch(function (err) {
            errorSetter(messages.emojiUploadFailed);
            // tslint:disable-next-line no-console
            console.error('Unable to upload emoji', err);
            onFailure();
        });
    }
};
//# sourceMappingURL=UploadEmoji.js.map