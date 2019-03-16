var maxEmojiSizeInBytes = 1048576;
export var getNaturalImageSize = function (dataURL) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.addEventListener('load', function () {
            resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        });
        img.addEventListener('error', reject);
        img.src = dataURL;
    });
};
export var parseImage = function (dataURL) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () { return resolve({ src: img.src }); };
        img.onerror = function () { return reject(); };
        img.src = dataURL;
    });
};
export var hasFileExceededSize = function (file) {
    return file && file.size > maxEmojiSizeInBytes;
};
// Duplicates https://bitbucket.org/atlassian/atlaskit/src/0e843df6df8bcd33fa7fc16cc63f11a0f6094957/packages/media-core/src/utils/checkWebpSupport.ts?at=master&fileviewer=file-view-default
// Didn't want to depend on the whole of media-core just for this util
/**
 * Checks if Webp support is enabled in the browser.
 * We know that creating a new image in memory and checking its height,
 * later on we cache this value forever.
 */
var isWebpSupported;
export var checkWebpSupport = function () {
    if (isWebpSupported !== undefined) {
        return Promise.resolve(isWebpSupported);
    }
    return new Promise(function (resolve) {
        var img = new Image();
        var checkSupport = function () {
            isWebpSupported = img.height === 2;
            resolve(isWebpSupported);
        };
        img.addEventListener('load', checkSupport);
        img.addEventListener('error', checkSupport);
        img.src =
            'data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA';
    });
};
export var imageAcceptHeader = function () {
    return checkWebpSupport().then(function (isWebpSupported) {
        // q=0.8 stands for 'quality factor' => http://stackoverflow.com/a/10496722
        var noWebpAcceptHeader = 'image/*,*/*;q=0.8';
        var webpAcceptHeader = 'image/webp,image/*,*/*;q=0.8';
        return isWebpSupported ? webpAcceptHeader : noWebpAcceptHeader;
    });
};
//# sourceMappingURL=image.js.map