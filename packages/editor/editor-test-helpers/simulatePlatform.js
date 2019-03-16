import * as editorCommon from '@atlaskit/editor-common';
export var Platforms;
(function (Platforms) {
    Platforms[Platforms["Mac"] = 0] = "Mac";
    Platforms[Platforms["Window"] = 1] = "Window";
})(Platforms || (Platforms = {}));
export default function simulatePlatform(platform) {
    var originaBrowser = editorCommon.browser;
    var spyNavigator;
    beforeAll(function () {
        spyNavigator = jest.spyOn(window.navigator, 'platform', 'get');
        if (platform === Platforms.Mac) {
            // @ts-ignore: read-only
            // TODO: Find a way to mock browser without readonly error
            editorCommon.browser = {
                mac: true,
            };
            spyNavigator.mockReturnValue('MacIntel');
            return;
        }
        // @ts-ignore: read-only
        editorCommon.browser = {
            mac: false,
        };
        spyNavigator.mockReturnValue('Other');
    });
    afterAll(function () {
        // @ts-ignore: read-only
        editorCommon.browser = originaBrowser;
        spyNavigator.mockRestore();
    });
}
//# sourceMappingURL=simulatePlatform.js.map