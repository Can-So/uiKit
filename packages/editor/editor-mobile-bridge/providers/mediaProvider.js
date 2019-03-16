import * as tslib_1 from "tslib";
import { ContextFactory as MediaContextFactory, } from '@atlaskit/media-core';
import { createPromise } from '../cross-platform-promise';
var getMediaToken = function (context) {
    return createPromise('getAuth', 
    // if collectionName exists in media's AuthContext, pass it along
    // otherwise pass an empty string (note that undefined doesn't work well with native promises)
    context && context.collectionName ? context.collectionName : '').submit();
};
function createMediaProvider() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mediaContext;
        return tslib_1.__generator(this, function (_a) {
            mediaContext = Promise.resolve(MediaContextFactory.create({
                authProvider: function (context) { return getMediaToken(context); },
            }));
            return [2 /*return*/, {
                    uploadContext: mediaContext,
                    viewContext: mediaContext,
                    uploadParams: {
                        collection: '',
                    },
                }];
        });
    });
}
export default createMediaProvider();
//# sourceMappingURL=mediaProvider.js.map