import * as editorCommon from '@atlaskit/editor-common';

export enum Platforms {
  Mac,
  Window,
}

export default function simulatePlatform(platform: Platforms) {
  const originaBrowser = editorCommon.browser;
  let spyNavigator: jest.SpyInstance;
  beforeAll(() => {
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

  afterAll(() => {
    // @ts-ignore: read-only
    editorCommon.browser = originaBrowser;
    spyNavigator.mockRestore();
  });
}
