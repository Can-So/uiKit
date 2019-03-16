import { ContextFactory } from '@atlaskit/media-core';
import { defaultCollectionName, userAuthProvider, mediaPickerAuthProvider, defaultMediaPickerAuthProvider, } from '@atlaskit/media-test-helpers';
/**
 * Add "import * as mediaTestHelpers from '@atlaskit/media-test-helpers'"
 * at the beginning of your file and pass "mediaTestHelpers" into this function
 */
export function storyMediaProviderFactory(mediaProviderFactoryConfig) {
    if (mediaProviderFactoryConfig === void 0) { mediaProviderFactoryConfig = {}; }
    var collectionName = mediaProviderFactoryConfig.collectionName, includeUploadContext = mediaProviderFactoryConfig.includeUploadContext, includeUserAuthProvider = mediaProviderFactoryConfig.includeUserAuthProvider, _a = mediaProviderFactoryConfig.useMediaPickerAuthProvider, useMediaPickerAuthProvider = _a === void 0 ? true : _a;
    var collection = collectionName || defaultCollectionName;
    var context = ContextFactory.create({
        authProvider: useMediaPickerAuthProvider
            ? mediaPickerAuthProvider()
            : defaultMediaPickerAuthProvider,
        userAuthProvider: includeUserAuthProvider === false ? undefined : userAuthProvider,
    });
    return Promise.resolve({
        featureFlags: {},
        uploadParams: { collection: collection },
        viewContext: Promise.resolve(context),
        uploadContext: includeUploadContext === false
            ? undefined
            : Promise.resolve(context),
    });
}
export function fileToBase64(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new window.FileReader();
        reader.onloadend = function () {
            resolve(reader.result);
        };
        reader.onabort = function () {
            reject('abort');
        };
        reader.onerror = function (err) {
            reject(err);
        };
        reader.readAsDataURL(blob);
    });
}
export function isImage(type) {
    return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}
//# sourceMappingURL=media-provider.js.map