# @findable/media-card

## 57.0.1
- [patch] [9192df506a](https://github.com/fnamazing/uiKit/commits/9192df506a):

  - Do not call given onClick if it's a video file and inline video player is enabled

## 57.0.0
- [major] [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/checkbox@6.0.1
  - @findable/dropdown-menu@7.0.1
  - @findable/field-radio-group@5.0.1
  - @findable/field-text@8.0.1
  - @findable/icon@16.0.5
  - @findable/spinner@10.0.1
  - @findable/theme@8.0.1
  - @findable/toggle@6.0.1
  - @findable/media-viewer@39.0.0
  - @findable/field-range@6.0.1
  - @findable/button@11.0.0
  - @findable/analytics-next-types@4.0.0
  - @findable/media-core@29.0.0
  - @findable/media-store@11.0.0
  - @findable/media-test-helpers@21.0.0
  - @findable/media-ui@10.0.0

## 56.0.0
- Updated dependencies [7ab3e93996](https://github.com/fnamazing/uiKit/commits/7ab3e93996):
  - @findable/media-test-helpers@20.1.8
  - @findable/media-viewer@38.0.0
  - @findable/media-core@28.0.0
  - @findable/media-store@10.0.0

## 55.0.4
- [patch] [ff3f40bc38](https://github.com/fnamazing/uiKit/commits/ff3f40bc38):

  - Fix remove from cache function, which fixes issue when user is deleting recent image in media picker

## 55.0.3
- [patch] [3591859b2f](https://github.com/fnamazing/uiKit/commits/3591859b2f):

  - use ReactDOM.createPortal to render MediaViewer when shouldOpenMediaViewer=true

## 55.0.2
- Updated dependencies [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):
  - @findable/button@10.1.3
  - @findable/icon@16.0.4
  - @findable/media-core@27.2.3
  - @findable/media-store@9.2.1
  - @findable/media-ui@9.2.1
  - @findable/media-viewer@37.0.1
  - @findable/media-test-helpers@20.1.7
  - @findable/docs@7.0.0
  - @findable/analytics-next@4.0.0
  - @findable/checkbox@6.0.0
  - @findable/dropdown-menu@7.0.0
  - @findable/field-radio-group@5.0.0
  - @findable/field-range@6.0.0
  - @findable/field-text@8.0.0
  - @findable/spinner@10.0.0
  - @findable/theme@8.0.0
  - @findable/toggle@6.0.0

## 55.0.1
- [patch] [d18b085e2a](https://github.com/fnamazing/uiKit/commits/d18b085e2a):

  - Integrating truly upfront ID

## 55.0.0
- [patch] [6bd4c428e2](https://github.com/fnamazing/uiKit/commits/6bd4c428e2):

  - load image preview as soon representation is present instead of waiting for file status to be processed
- Updated dependencies [4aee5f3cec](https://github.com/fnamazing/uiKit/commits/4aee5f3cec):
  - @findable/media-test-helpers@20.1.6
  - @findable/media-core@27.2.0
  - @findable/media-store@9.2.0

## 54.1.0
- [minor] [eda74c4dce](https://github.com/fnamazing/uiKit/commits/eda74c4dce):

  - Add shouldOpenMediaViewer + mediaViewerDataSource optional props to Card api to simplify MediaViewer integration

## 54.0.0
- [major] [190c4b7bd3](https://github.com/fnamazing/uiKit/commits/190c4b7bd3):

  - Remove Identifier type + related utilities and use the one from media-core
- Updated dependencies [fc6164c8c2](https://github.com/fnamazing/uiKit/commits/fc6164c8c2):
  - @findable/media-store@9.1.7
  - @findable/media-test-helpers@20.1.5
  - @findable/media-core@27.1.0

## 53.0.0
- [major] [46dfcfbeca](https://github.com/fnamazing/uiKit/commits/46dfcfbeca):

  - remove Link support from media-card

## 52.0.7
- [patch] [ab6ba14cd3](https://github.com/fnamazing/uiKit/commits/ab6ba14cd3):

  - Fix a bug where droping image with EXIF orientation >= 5 end up screwing up proportions for some of the cases

## 52.0.6
- [patch] [05c5bf7a93](https://github.com/fnamazing/uiKit/commits/05c5bf7a93):

  - Dont user pointer cursor for external images in Cards

## 52.0.5
- [patch] [c415876da9](https://github.com/fnamazing/uiKit/commits/c415876da9):

  - add selected state to InlinePlayer in media-card

## 52.0.4
- Updated dependencies [d5bce1ea15](https://github.com/fnamazing/uiKit/commits/d5bce1ea15):
  - @findable/media-test-helpers@20.1.2
  - @findable/media-ui@9.0.0

## 52.0.3
- [patch] [ef469cbb0b](https://github.com/fnamazing/uiKit/commits/ef469cbb0b):

  - MS-357 replaced @findable/util-shared-styles from media components by @findable/theme

## 52.0.2
- [patch] [0e164e542a](https://github.com/fnamazing/uiKit/commits/0e164e542a):

  - MS-1465: Dont fetch file preview if we already have a local one

## 52.0.1
- [patch] [1d3e336534](https://github.com/fnamazing/uiKit/commits/1d3e336534):

  - Show progress bar while file is uploading

## 52.0.0
- Updated dependencies [69c8d0c19c](https://github.com/fnamazing/uiKit/commits/69c8d0c19c):
  - @findable/media-test-helpers@20.1.0
  - @findable/media-store@9.1.5
  - @findable/media-core@27.0.0

## 51.0.3
- [patch] [a3f8e527aa](https://github.com/fnamazing/uiKit/commits/a3f8e527aa):

  - Take into account if image is on it's side according to orientation tag when deciding how to crop/fit and image

## 51.0.2
- Updated dependencies [07a187bb30](https://github.com/fnamazing/uiKit/commits/07a187bb30):
  - @findable/media-core@26.2.1
  - @findable/media-store@9.1.4
  - @findable/media-ui@8.2.6
  - @findable/media-test-helpers@20.0.0

## 51.0.1
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/dropdown-menu@6.1.26
  - @findable/field-radio-group@4.0.15
  - @findable/toggle@5.0.15
  - @findable/media-test-helpers@19.1.1
  - @findable/media-ui@8.2.5
  - @findable/field-range@5.0.14
  - @findable/icon@16.0.0

## 51.0.0
- [patch] [b1627a5837](https://github.com/fnamazing/uiKit/commits/b1627a5837):

  - Enable inline video player in Editor and Renderer
- Updated dependencies [85d5d168fd](https://github.com/fnamazing/uiKit/commits/85d5d168fd):
  - @findable/media-store@9.1.3
  - @findable/media-test-helpers@19.1.0
  - @findable/media-core@26.2.0

## 50.0.0
- [patch] [5b1e270](https://github.com/fnamazing/uiKit/commits/5b1e270):

  - Minor bug fixes
- Updated dependencies [dadef80](https://github.com/fnamazing/uiKit/commits/dadef80):
- Updated dependencies [3ad16f3](https://github.com/fnamazing/uiKit/commits/3ad16f3):
  - @findable/media-test-helpers@19.0.0
  - @findable/media-core@26.1.0
  - @findable/media-ui@8.2.4

## 49.0.0
- Updated dependencies [cbb8cb5](https://github.com/fnamazing/uiKit/commits/cbb8cb5):
  - @findable/media-test-helpers@18.9.1
  - @findable/media-core@26.0.0

## 48.0.0
- [minor] [72d37fb](https://github.com/fnamazing/uiKit/commits/72d37fb):

  - Remove deprecated methods from media-core
  - Use context.collection methods in MediaViewer
  - Remove link support from media-card
  - Remove legacy services + providers from media-core
  - Remove link related methods from media-core
  - Remove axios dependency
  - Make context.getImage cancelable
- Updated dependencies [72d37fb](https://github.com/fnamazing/uiKit/commits/72d37fb):
  - @findable/media-core@25.0.0
  - @findable/media-test-helpers@18.9.0

## 47.0.0
- [major] [135ed00](https://github.com/fnamazing/uiKit/commits/135ed00):

  - remove "small" appearance from media-card

## 46.0.1
- [patch] [ca16fa9](https://github.com/fnamazing/uiKit/commits/ca16fa9):

  - Add SSR support to media components

## 46.0.0
- Updated dependencies [b3738ea](https://github.com/fnamazing/uiKit/commits/b3738ea):
  - @findable/media-test-helpers@18.7.0
  - @findable/media-core@24.7.0

## 45.0.0
- [minor] [b5ab1a5](https://github.com/fnamazing/uiKit/commits/b5ab1a5):

  - Add stretch as a prop for CardContent and MediaImage; Convert new stretchy-fit resizeMode to stretch=true;
- Updated dependencies [80f765b](https://github.com/fnamazing/uiKit/commits/80f765b):
  - @findable/media-test-helpers@18.6.2
  - @findable/media-core@24.6.0

## 44.2.0
- [minor] [34369e4](https://github.com/fnamazing/uiKit/commits/34369e4):

  - ED-5888 Add dark mode for media-card

## 44.1.4
- [patch] [6f44079](https://github.com/fnamazing/uiKit/commits/6f44079):

  - ED-5612: make image preview display correctly after replacing Card props

## 44.1.3
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/button@10.1.1
  - @findable/dropdown-menu@6.1.25
  - @findable/field-radio-group@4.0.14
  - @findable/field-range@5.0.12
  - @findable/field-text@7.0.18
  - @findable/icon@15.0.2
  - @findable/spinner@9.0.13
  - @findable/toggle@5.0.14
  - @findable/media-core@24.5.2
  - @findable/media-ui@8.1.2
  - @findable/docs@6.0.0

## 44.1.2
- [patch] [676257b](https://github.com/fnamazing/uiKit/commits/676257b):

  - Prepare/fix card to be displayed as video inline player in renderer/editor contexts

## 44.1.1
- [patch] [5de3574](https://github.com/fnamazing/uiKit/commits/5de3574):

  - CustomVideoPlayer is now CustomMediaPlayer and supports audio through type property. Media Viewer now uses custom audio player for audio everywhere except IE11.

## 44.1.0
- [minor] [c1ea81c](https://github.com/fnamazing/uiKit/commits/c1ea81c):

  - use custom video player for inline video in media-card

## 44.0.2
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/dropdown-menu@6.1.23
  - @findable/field-radio-group@4.0.12
  - @findable/toggle@5.0.12
  - @findable/media-test-helpers@18.3.1
  - @findable/media-ui@7.6.2
  - @findable/icon@15.0.0

## 44.0.1
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/dropdown-menu@6.1.22
  - @findable/field-radio-group@4.0.11
  - @findable/field-text@7.0.15
  - @findable/icon@14.6.1
  - @findable/spinner@9.0.11
  - @findable/toggle@5.0.11
  - @findable/media-core@24.5.1
  - @findable/media-ui@7.6.1
  - @findable/field-range@5.0.9
  - @findable/button@10.0.0
  - @findable/analytics-next-types@3.1.2

## 44.0.0
- Updated dependencies [7e8b4b9](https://github.com/fnamazing/uiKit/commits/7e8b4b9):
  - @findable/media-test-helpers@18.3.0
  - @findable/media-core@24.5.0

## 43.0.0
- [minor] [2c21466](https://github.com/fnamazing/uiKit/commits/2c21466):

  - Allow to inline play video files in media-card
- Updated dependencies [2c21466](https://github.com/fnamazing/uiKit/commits/2c21466):
  - @findable/media-test-helpers@18.2.12
  - @findable/media-core@24.4.0

## 42.0.0
- [major] [04c7192](https://github.com/fnamazing/uiKit/commits/04c7192):

  - remove CardList component from media-card

## 41.4.0
- [minor] [abef80b](https://github.com/fnamazing/uiKit/commits/abef80b):

  - ED-5527: apply max-width: 100% and pass container size to Card as dimension

## 41.3.0
- [minor] [4718333](https://github.com/fnamazing/uiKit/commits/4718333):

  - Add play icon for video files in MediaCard

## 41.2.0
- [minor] [439dde6"
d](https://github.com/fnamazing/uiKit/commits/439dde6"
d):

  - rotate local image preview in cards based on the file orientation

## 41.1.2
- [patch] Updated dependencies [ced32d0](https://github.com/fnamazing/uiKit/commits/ced32d0)
  - @findable/media-test-helpers@18.2.10
  - @findable/media-ui@7.0.0
  - @findable/smart-card@8.4.1

## 41.1.1
- [patch] Override css rules for an image inside a cart [20a15ef](https://github.com/fnamazing/uiKit/commits/20a15ef)

## 41.1.0
- [minor] Cleanup media + editor integration 🔥 [2f9d14d](https://github.com/fnamazing/uiKit/commits/2f9d14d)

## 41.0.2
- [patch] Make image in the card non-draggable [615a536](https://github.com/fnamazing/uiKit/commits/615a536)

## 41.0.1
- [patch] User img tag in cards instead of div with background [22ae8bb](https://github.com/fnamazing/uiKit/commits/22ae8bb)

## 41.0.0
- [patch] Split Media + Editor cleanup part 1 [b1ce691](https://github.com/fnamazing/uiKit/commits/b1ce691)
- [major] Updated dependencies [b1ce691](https://github.com/fnamazing/uiKit/commits/b1ce691)
  - @findable/media-core@24.3.0
  - @findable/media-test-helpers@18.2.8

## 40.0.1
- [patch] Code split media list [d101ce1](https://github.com/fnamazing/uiKit/commits/d101ce1)

## 40.0.0
- [major] Remove support for ApplicationCard [6e510d8](https://github.com/fnamazing/uiKit/commits/6e510d8)

## 39.0.1
- [patch] Fix bug with download binary [71ebe0b](https://github.com/fnamazing/uiKit/commits/71ebe0b)

## 39.0.0
- [minor] Media-card: allow to download binary when processing failed, add failed-processing to CardStatus; Media-core: add context.file.downloadBinary, add failed-processing to FileStatus; Media-store: add getFileBinaryURL; [2afa60d](https://github.com/fnamazing/uiKit/commits/2afa60d)
- [major] Updated dependencies [2afa60d](https://github.com/fnamazing/uiKit/commits/2afa60d)
  - @findable/media-test-helpers@18.2.5
  - @findable/media-core@24.2.0

## 38.0.1
- [patch] Add pagination to recents view in MediaPicker [4b3c1f5](https://github.com/fnamazing/uiKit/commits/4b3c1f5)

## 38.0.0
- [patch] Deprecate context.uploadFile & context.getFile. Instead context.file.upload & context.file.getFileState should be used; media-store's uploadFile function now takes MediaStore as a second argument, not MediaApiConfig [8b2c4d3](https://github.com/fnamazing/uiKit/commits/8b2c4d3)
- [patch] Deprecate context.uploadFile & context.getFile. Instead context.file.upload & context.file.getFileState should be used; media-store's uploadFile function now takes MediaStore as a second argument, not MediaApiConfig [3302d51](https://github.com/fnamazing/uiKit/commits/3302d51)
- [major] Updated dependencies [8b2c4d3](https://github.com/fnamazing/uiKit/commits/8b2c4d3)
- [major] Updated dependencies [3302d51](https://github.com/fnamazing/uiKit/commits/3302d51)
  - @findable/media-core@24.1.0
  - @findable/media-test-helpers@18.2.3

## 37.0.1
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/avatar@14.0.11
  - @findable/button@9.0.13
  - @findable/dropdown-menu@6.1.17
  - @findable/field-radio-group@4.0.8
  - @findable/toggle@5.0.9
  - @findable/tooltip@12.1.1
  - @findable/media-test-helpers@18.2.1
  - @findable/media-ui@6.0.1
  - @findable/icon@14.0.0

## 37.0.0
- [major] Add I18n support to media-card [dae7792](https://github.com/fnamazing/uiKit/commits/dae7792)

## 36.1.1
- [patch] Fix rxjs imports to only import what's needed [2e0ce2b](https://github.com/fnamazing/uiKit/commits/2e0ce2b)

## 36.1.0
- [minor] Support external image identifiers in media-card [82c8bb9](https://github.com/fnamazing/uiKit/commits/82c8bb9)

## 36.0.0
- [major] Update RXJS dependency to ^5.5.0 [927ae63](https://github.com/fnamazing/uiKit/commits/927ae63)
- [major] Updated dependencies [927ae63](https://github.com/fnamazing/uiKit/commits/927ae63)
  - @findable/media-core@24.0.0
  - @findable/media-test-helpers@18.0.0

## 35.0.0
- [major] Fix CardView code split + remove private components from public api [1be4bb8](https://github.com/fnamazing/uiKit/commits/1be4bb8)

## 34.1.0
- [minor] Async load media-card modules by default [01416b4](https://github.com/fnamazing/uiKit/commits/01416b4)

## 34.0.4
- [patch] Refetch image when the dimensions change [a0475c2](https://github.com/fnamazing/uiKit/commits/a0475c2)

## 34.0.3
- [patch] Revert fix for MS-667 [43e601f](https://github.com/fnamazing/uiKit/commits/43e601f)

## 34.0.2
- [patch] use new tsconfig for typechecking [09df171](https://github.com/fnamazing/uiKit/commits/09df171)

## 34.0.1
- [patch] Media-card now re-fetches the underlaying image when the dimensions prop changes [59fb6a4](https://github.com/fnamazing/uiKit/commits/59fb6a4)

## 34.0.0
- [major] Updated dependencies [6e1d642](https://github.com/fnamazing/uiKit/commits/6e1d642)
  - @findable/media-core@23.2.0
  - @findable/media-test-helpers@17.1.0

## 33.0.2
- [patch] Update TS to 3.0 [f68d367](https://github.com/fnamazing/uiKit/commits/f68d367)
- [none] Updated dependencies [f68d367](https://github.com/fnamazing/uiKit/commits/f68d367)
  - @findable/media-test-helpers@17.0.2
  - @findable/media-core@23.1.1

## 33.0.1
- [patch] use media tsconfig in media-card [3417d76](https://github.com/fnamazing/uiKit/commits/3417d76)

## 33.0.0
- [minor] Expose upfrontId in MediaPicker [7545979](https://github.com/fnamazing/uiKit/commits/7545979)
- [major] Updated dependencies [7545979](https://github.com/fnamazing/uiKit/commits/7545979)
  - @findable/media-core@23.1.0

## 32.0.6
- [patch] Updated dependencies [911a570](https://github.com/fnamazing/uiKit/commits/911a570)
  - @findable/media-test-helpers@17.0.0
  - @findable/media-core@23.0.2

## 32.0.5
- [patch] Updated dependencies [b12f7e6](https://github.com/fnamazing/uiKit/commits/b12f7e6)
  - @findable/badge@9.1.1
  - @findable/media-ui@5.1.2
  - @findable/smart-card@8.0.1

## 32.0.4


- [patch] Updated dependencies [48b95b0](https://github.com/fnamazing/uiKit/commits/48b95b0)
  - @findable/smart-card@8.0.0
- [none] Updated dependencies [e9b1477](https://github.com/fnamazing/uiKit/commits/e9b1477)
  - @findable/smart-card@8.0.0

## 32.0.3
- [patch] ED-5222: bump react-lazily-render package [5844820](https://github.com/fnamazing/uiKit/commits/5844820)
- [none] Updated dependencies [5844820](https://github.com/fnamazing/uiKit/commits/5844820)
  - @findable/smart-card@7.0.4

## 32.0.2
- [patch] Removing mutational rxjs imports and replace with explicit operators [353f9db](https://github.com/fnamazing/uiKit/commits/353f9db)
- [patch] Removing mutational rxjs imports and replace with explicit operators [56c2df9](https://github.com/fnamazing/uiKit/commits/56c2df9)
- [none] Updated dependencies [353f9db](https://github.com/fnamazing/uiKit/commits/353f9db)
  - @findable/media-core@23.0.1
- [none] Updated dependencies [56c2df9](https://github.com/fnamazing/uiKit/commits/56c2df9)
  - @findable/media-core@23.0.1

## 32.0.1
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/analytics-next-types@3.0.1
  - @findable/tooltip@12.0.5
  - @findable/field-text@7.0.4
  - @findable/analytics-next@3.0.4
  - @findable/toggle@5.0.5
  - @findable/button@9.0.5
  - @findable/lozenge@6.1.4
  - @findable/field-range@5.0.3
  - @findable/badge@9.0.4
  - @findable/spinner@9.0.5
  - @findable/field-radio-group@4.0.4
  - @findable/icon@13.2.4
  - @findable/dropdown-menu@6.1.5
  - @findable/avatar@14.0.6

## 32.0.0
- [patch] Synchronous property "serviceHost" as part of many Interfaces in media components (like MediaApiConfig) is removed and replaced with asynchronous "baseUrl" as part of Auth object. [d02746f](https://github.com/fnamazing/uiKit/commits/d02746f)
- [major] Updated dependencies [d02746f](https://github.com/fnamazing/uiKit/commits/d02746f)
  - @findable/media-test-helpers@16.0.0
  - @findable/media-core@23.0.0

## 31.3.0
- [minor] change file image cards background color to transparent [59ccb09](https://github.com/fnamazing/uiKit/commits/59ccb09)

## 31.2.1
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/smart-card@7.0.2
  - @findable/media-ui@5.0.2
  - @findable/tooltip@12.0.4
  - @findable/icon@13.2.2
  - @findable/toggle@5.0.4
  - @findable/field-radio-group@4.0.3
  - @findable/button@9.0.4
  - @findable/media-core@22.2.1
  - @findable/media-test-helpers@15.2.1
  - @findable/lozenge@6.1.3
  - @findable/field-range@5.0.2
  - @findable/badge@9.0.3
  - @findable/spinner@9.0.4
  - @findable/field-text@7.0.3
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2
  - @findable/dropdown-menu@6.1.4
  - @findable/avatar@14.0.5

## 31.2.0
- [minor] expose smart Filmstrip from media-filmstrip [7fa84a2](https://github.com/fnamazing/uiKit/commits/7fa84a2)

## 31.1.1
- [patch] pass mimeType to files in uploads-start event in MediaPicker [3485c00](https://github.com/fnamazing/uiKit/commits/3485c00)
- [patch] Updated dependencies [3485c00](https://github.com/fnamazing/uiKit/commits/3485c00)
  - @findable/media-core@22.2.0

## 31.1.0
- [minor] use context.getFile in media-card [fad25ec](https://github.com/fnamazing/uiKit/commits/fad25ec)
- [minor] Updated dependencies [fad25ec](https://github.com/fnamazing/uiKit/commits/fad25ec)
  - @findable/media-test-helpers@15.2.0
  - @findable/media-core@22.1.0

## 31.0.0
- [major] Implemented smart cards and common views for other cards [fa6f865](https://github.com/fnamazing/uiKit/commits/fa6f865)
- [minor] Implemented smart cards and common UI elements [fdd03d8](https://github.com/fnamazing/uiKit/commits/fdd03d8)
- [major] Implement smart card [49c8425](https://github.com/fnamazing/uiKit/commits/49c8425)
- [major] Smart cards implementation and moved UI elements into media-ui package [3476e01](https://github.com/fnamazing/uiKit/commits/3476e01)
- [major] Updated dependencies [fa6f865](https://github.com/fnamazing/uiKit/commits/fa6f865)
  - @findable/smart-card@7.0.0
  - @findable/media-ui@5.0.0
  - @findable/media-test-helpers@15.1.0
- [minor] Updated dependencies [fdd03d8](https://github.com/fnamazing/uiKit/commits/fdd03d8)
  - @findable/smart-card@7.0.0
  - @findable/media-ui@5.0.0
  - @findable/media-test-helpers@15.1.0
- [major] Updated dependencies [49c8425](https://github.com/fnamazing/uiKit/commits/49c8425)
  - @findable/smart-card@7.0.0
  - @findable/media-ui@5.0.0
  - @findable/media-test-helpers@15.1.0
- [major] Updated dependencies [3476e01](https://github.com/fnamazing/uiKit/commits/3476e01)
  - @findable/smart-card@7.0.0
  - @findable/media-ui@5.0.0

## 30.0.1
- [patch] Updated dependencies [e6b1985](https://github.com/fnamazing/uiKit/commits/e6b1985)
  - @findable/tooltip@12.0.0
  - @findable/smart-card@6.0.1
  - @findable/icon@13.1.1
  - @findable/dropdown-menu@6.1.1
  - @findable/avatar@14.0.1

## 30.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/tooltip@11.0.0
  - @findable/smart-card@6.0.0
  - @findable/field-text@7.0.0
  - @findable/analytics-next@3.0.0
  - @findable/toggle@5.0.0
  - @findable/button@9.0.0
  - @findable/media-ui@4.0.0
  - @findable/media-core@22.0.0
  - @findable/media-test-helpers@15.0.0
  - @findable/lozenge@6.0.0
  - @findable/field-range@5.0.0
  - @findable/badge@9.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/field-radio-group@4.0.0
  - @findable/icon@13.0.0
  - @findable/dropdown-menu@6.0.0
  - @findable/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/smart-card@6.0.0
  - @findable/media-ui@4.0.0
  - @findable/media-test-helpers@15.0.0
  - @findable/media-core@22.0.0
  - @findable/analytics-next-types@3.0.0
  - @findable/tooltip@11.0.0
  - @findable/field-text@7.0.0
  - @findable/analytics-next@3.0.0
  - @findable/toggle@5.0.0
  - @findable/button@9.0.0
  - @findable/lozenge@6.0.0
  - @findable/field-range@5.0.0
  - @findable/badge@9.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/field-radio-group@4.0.0
  - @findable/icon@13.0.0
  - @findable/dropdown-menu@6.0.0
  - @findable/avatar@14.0.0

## 29.1.11
- [patch] Use proper analytics-next types [a6ac341](https://github.com/fnamazing/uiKit/commits/a6ac341)
- [none] Updated dependencies [a6ac341](https://github.com/fnamazing/uiKit/commits/a6ac341)
  - @findable/analytics-next-types@2.1.9

## 29.1.10


- [none] Updated dependencies [da63331](https://github.com/fnamazing/uiKit/commits/da63331)
  - @findable/button@8.2.5
  - @findable/smart-card@5.3.3
  - @findable/dropdown-menu@5.2.3
  - @findable/avatar@13.0.0
- [patch] Updated dependencies [7724115](https://github.com/fnamazing/uiKit/commits/7724115)
  - @findable/avatar@13.0.0
  - @findable/smart-card@5.3.3
  - @findable/button@8.2.5
  - @findable/dropdown-menu@5.2.3

## 29.1.9
- [patch] Render empty component in CardList when there are no items in the collection [9a1b6a2](https://github.com/fnamazing/uiKit/commits/9a1b6a2)

## 29.1.8
- [patch] Updated dependencies [42ee1ea](https://github.com/fnamazing/uiKit/commits/42ee1ea)
  - @findable/media-test-helpers@14.0.6
  - @findable/media-core@21.0.0

## 29.1.7
- [patch] Updated dependencies [8a01bcd](https://github.com/fnamazing/uiKit/commits/8a01bcd)
  - @findable/avatar@12.0.0
  - @findable/smart-card@5.3.2
  - @findable/dropdown-menu@5.2.2

## 29.1.6
- [patch] Bitbucket images were displaying at 100% of the container, and not respect max-width of the image. ED-4946 [370c812](https://github.com/fnamazing/uiKit/commits/370c812)

## 29.1.5
- [patch] Updated dependencies [c57e9c1](https://github.com/fnamazing/uiKit/commits/c57e9c1)
  - @findable/media-test-helpers@14.0.4
  - @findable/media-core@20.0.0

## 29.1.4
- [patch] Updated dependencies [cdba8b3](https://github.com/fnamazing/uiKit/commits/cdba8b3)
  - @findable/spinner@8.0.0
  - @findable/smart-card@5.3.1
  - @findable/button@8.2.3

## 29.1.3



- [patch] Updated dependencies [74a0d46](https://github.com/fnamazing/uiKit/commits/74a0d46)
  - @findable/smart-card@5.3.0
- [patch] Updated dependencies [6c6f078](https://github.com/fnamazing/uiKit/commits/6c6f078)
  - @findable/smart-card@5.3.0
- [patch] Updated dependencies [5bb26b4](https://github.com/fnamazing/uiKit/commits/5bb26b4)
  - @findable/smart-card@5.3.0

## 29.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/media-ui@3.1.2
  - @findable/media-test-helpers@14.0.3
  - @findable/media-core@19.1.3
  - @findable/tooltip@10.2.1
  - @findable/field-text@6.0.4
  - @findable/button@8.1.2
  - @findable/toggle@4.0.3
  - @findable/lozenge@5.0.4
  - @findable/field-range@4.0.3
  - @findable/spinner@7.0.2
  - @findable/field-radio-group@3.0.4
  - @findable/icon@12.1.2
  - @findable/dropdown-menu@5.0.4

## 29.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/smart-card@5.2.1
  - @findable/media-ui@3.1.1
  - @findable/media-test-helpers@14.0.2
  - @findable/media-core@19.1.2
  - @findable/spinner@7.0.1
  - @findable/lozenge@5.0.3
  - @findable/icon@12.1.1
  - @findable/analytics-next@2.1.8
  - @findable/field-radio-group@3.0.3
  - @findable/dropdown-menu@5.0.3
  - @findable/button@8.1.1
  - @findable/badge@8.0.3
  - @findable/avatar@11.1.1
  - @findable/docs@4.1.1

## 29.1.0
- [patch] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/spinner@7.0.0
  - @findable/smart-card@5.2.0
  - @findable/tooltip@10.2.0
  - @findable/dropdown-menu@5.0.2
  - @findable/avatar@11.1.0
  - @findable/icon@12.1.0
  - @findable/media-ui@3.1.0
  - @findable/toggle@4.0.2
  - @findable/field-radio-group@3.0.2
  - @findable/docs@4.1.0
  - @findable/media-core@19.1.1
  - @findable/media-test-helpers@14.0.1
  - @findable/lozenge@5.0.2
  - @findable/field-text@6.0.2
  - @findable/field-range@4.0.2
  - @findable/badge@8.0.2
  - @findable/analytics-next@2.1.7
  - @findable/button@8.1.0

## 29.0.3
- [patch] Updated dependencies [2de7ce7](https://github.com/fnamazing/uiKit/commits/2de7ce7)
  - @findable/smart-card@5.1.1

## 29.0.2
- [patch] Updated dependencies [823caef](https://github.com/fnamazing/uiKit/commits/823caef)
  - @findable/smart-card@5.1.0

## 29.0.1
- [patch] Updated dependencies [732d2f5](https://github.com/fnamazing/uiKit/commits/732d2f5)
  - @findable/smart-card@5.0.0

## 29.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/smart-card@4.0.0
  - @findable/media-ui@3.0.0
  - @findable/media-test-helpers@14.0.0
  - @findable/media-core@19.0.0
  - @findable/tooltip@10.0.0
  - @findable/icon@12.0.0
  - @findable/toggle@4.0.0
  - @findable/field-radio-group@3.0.0
  - @findable/field-text@6.0.0
  - @findable/analytics-next@2.1.4
  - @findable/button@8.0.0
  - @findable/lozenge@5.0.0
  - @findable/field-range@4.0.0
  - @findable/badge@8.0.0
  - @findable/spinner@6.0.0
  - @findable/docs@4.0.0
  - @findable/dropdown-menu@5.0.0
  - @findable/avatar@11.0.0

## 28.0.6
- [patch] Updated dependencies [1c87e5a](https://github.com/fnamazing/uiKit/commits/1c87e5a)
  - @findable/smart-card@3.0.4

## 28.0.5
- [patch] Updated dependencies [35d547f](https://github.com/fnamazing/uiKit/commits/35d547f)
  - @findable/smart-card@3.0.3

## 28.0.4
- [patch]  [f87724e](https://github.com/fnamazing/uiKit/commits/f87724e)
- [none] Updated dependencies [f87724e](https://github.com/fnamazing/uiKit/commits/f87724e)
  - @findable/media-test-helpers@13.0.2

## 28.0.3
- [patch] Fix Card's defaultProps TS type [527bc9c](https://github.com/fnamazing/uiKit/commits/527bc9c)

## 28.0.2
- [patch] Remove card's "shown" analytics event [7877ce6](https://github.com/fnamazing/uiKit/commits/7877ce6)

## 28.0.1
- [patch] Updated dependencies [bd26d3c](https://github.com/fnamazing/uiKit/commits/bd26d3c)
  - @findable/media-core@18.1.1
  - @findable/media-test-helpers@13.0.1

## 28.0.0
- [major] Updated dependencies [84f6f91](https://github.com/fnamazing/uiKit/commits/84f6f91)
  - @findable/media-test-helpers@13.0.0
  - @findable/media-core@18.1.0
- [patch] Updated dependencies [9041d71](https://github.com/fnamazing/uiKit/commits/9041d71)
  - @findable/media-test-helpers@13.0.0
  - @findable/media-core@18.1.0

## 27.1.4
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/smart-card@3.0.2
  - @findable/media-ui@2.1.1
  - @findable/tooltip@9.2.1
  - @findable/toggle@3.0.2
  - @findable/field-radio-group@2.0.3
  - @findable/field-text@5.0.3
  - @findable/media-test-helpers@12.0.4
  - @findable/media-core@18.0.3
  - @findable/analytics-next@2.1.1
  - @findable/dropdown-menu@4.0.3
  - @findable/button@7.2.5
  - @findable/field-range@3.0.2
  - @findable/badge@7.1.2
  - @findable/spinner@5.0.2
  - @findable/avatar@10.0.6
  - @findable/docs@3.0.4
  - @findable/lozenge@4.0.1

## 27.1.3
- [patch] Renamed smart card components and exposed inline smart card views [1094bb6](https://github.com/fnamazing/uiKit/commits/1094bb6)
- [patch] Updated dependencies [1094bb6](https://github.com/fnamazing/uiKit/commits/1094bb6)
  - @findable/smart-card@3.0.0

## 27.1.2
- [patch] Move toHumanReadableMediaSize to media-ui [b36c763](https://github.com/fnamazing/uiKit/commits/b36c763)
- [patch] Updated dependencies [b36c763](https://github.com/fnamazing/uiKit/commits/b36c763)
  - @findable/media-ui@2.1.0

## 27.1.0
- [minor] Added "disableOverlay" prop to Card and CardView public API [533d085](https://github.com/fnamazing/uiKit/commits/533d085)

## 27.0.4
- [patch] hide link items from CardList (Sidebard) [dd2c7e7](https://github.com/fnamazing/uiKit/commits/dd2c7e7)

## 27.0.3
- [patch] Turn side effects to true due to rxjs operators imports [668f01c](https://github.com/fnamazing/uiKit/commits/668f01c)
- [patch] Turn side effects to true due to rxjs operators imports [5eddd49](https://github.com/fnamazing/uiKit/commits/5eddd49)

## 27.0.2
- [patch] remove polished dependency [0e54c69](https://github.com/fnamazing/uiKit/commits/0e54c69)

## 26.0.1
- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://github.com/fnamazing/uiKit/commits/0672503)

## 26.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 25.2.0
- [minor] use local preview in MediaCard when available [b33788b](https://github.com/fnamazing/uiKit/commits/b33788b)

## 25.1.6
- [patch] Fix typo and potential memory leak [6ecc601](https://github.com/fnamazing/uiKit/commits/6ecc601)

## 25.1.5
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://github.com/fnamazing/uiKit/commits/c3b018a)

## 25.1.3
- [patch] Fix/revert TS TDs in analytics-next [1284d32](https://github.com/fnamazing/uiKit/commits/1284d32)

## 25.1.2
- [patch] ED-4030 Don't reload Image cards again after upload is done [9aff937](https://github.com/fnamazing/uiKit/commits/9aff937)

## 25.1.0
- [minor] Add analytics events for click and show actions of media-card [031d5da](https://github.com/fnamazing/uiKit/commits/031d5da)
- [minor] Add analytics events for click and show actions of media-card [b361185](https://github.com/fnamazing/uiKit/commits/b361185)

## 25.0.0
- [major] icons are now assignable to card actions, which will cause media cards to render upto 2 icon buttons, or a dropdown menu if more than 2 actions are set [649871c](https://github.com/fnamazing/uiKit/commits/649871c)

## 24.1.6
- [patch] added a cursor to application cards when the onClick property is passed [97cb9c2](https://github.com/fnamazing/uiKit/commits/97cb9c2)

## 24.1.5
- [patch] Remove TS types that requires styled-components v3 [836e53b](https://github.com/fnamazing/uiKit/commits/836e53b)

## 24.1.3
- [patch] Add key as an optional parameter to applicationCard actions [28be081](https://github.com/fnamazing/uiKit/commits/28be081)

## 24.1.2
- [patch] fix issues with ellipsing of new smart-card designs [ec2bed9](https://github.com/fnamazing/uiKit/commits/ec2bed9)

## 24.1.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 24.0.6
- [patch] Introduce media-ui package [39579e2](https://github.com/fnamazing/uiKit/commits/39579e2)

## 24.0.5
- [patch] fix new smart-card design which is showing the dropdown below consecutive smart-cards [5574b67](https://github.com/fnamazing/uiKit/commits/5574b67)
- [patch] fix issue with smart-card dropdown being hidden behind successive cards in new designs [ff01687](https://github.com/fnamazing/uiKit/commits/ff01687)

## 24.0.4
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 24.0.3
- [patch] fixed issue where clicking on smart-card try-again and cancel links would trigger onClick [1e575b3](https://github.com/fnamazing/uiKit/commits/1e575b3)

## 24.0.2
- [patch] added missing smart-card action states [3f7536e](https://github.com/fnamazing/uiKit/commits/3f7536e)

## 23.2.2
- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak mk 2 [bdeef5b](https://github.com/fnamazing/uiKit/commits/bdeef5b)

## 23.2.1
- [patch] added an offset to load lazily loaded cards earlier [d1d891c](https://github.com/fnamazing/uiKit/commits/d1d891c)

## 23.2.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 23.1.1
- [patch] Update dependencies [623f8ca](https://github.com/fnamazing/uiKit/commits/623f8ca)

## 23.1.0
- [minor] Added new AppCardView v1.5 designs behind a feature flag. [92bc6c8](https://github.com/fnamazing/uiKit/commits/92bc6c8)

## 23.0.2
- [patch] Make Card to work with pixel units [dedba4f](https://github.com/fnamazing/uiKit/commits/dedba4f)

## 23.0.1
- [patch] Make Card to work properly with pixel units [69c6443](https://github.com/fnamazing/uiKit/commits/69c6443)
- [patch] Dont use default dimensions for link cards [ae94181](https://github.com/fnamazing/uiKit/commits/ae94181)

## 23.0.0
- [major] Bump media-core peer dependency to next major versoin (12) [0a84f90](https://github.com/fnamazing/uiKit/commits/0a84f90)

## 22.4.2
- [patch] fix z-index issue for app cards [d2e05ae](https://github.com/fnamazing/uiKit/commits/d2e05ae)

## 22.4.1
- [patch] Use default dimensions in CardView when dimensions are not provided [d07f3f8](https://github.com/fnamazing/uiKit/commits/d07f3f8)

## 22.4.0
- [minor] make Card and CardView to work properly when percetanges are passed as dimensions [3178808](https://github.com/fnamazing/uiKit/commits/3178808)

## 22.3.0
- [minor] Update signature onClick event on filmstrip (renderer) [30bdfcc](https://github.com/fnamazing/uiKit/commits/30bdfcc)
- [minor] Update signature onClick event on filmstrip (renderer) [dbced25](https://github.com/fnamazing/uiKit/commits/dbced25)
- [minor] Update signature onClick event on filmstrip (renderer) [7ee4743](https://github.com/fnamazing/uiKit/commits/7ee4743)

## 22.2.7
- [patch] fix lazy-loading of cards when scrolling up [868505d](https://github.com/fnamazing/uiKit/commits/868505d)

## 22.2.6
- [patch] Show static images for gifs in small cards [e2508f9](https://github.com/fnamazing/uiKit/commits/e2508f9)
- [patch] Show static images for gifs in small cards [e2508f9](https://github.com/fnamazing/uiKit/commits/e2508f9)

## 22.2.5
- [patch] Fixed hover state for link media-cards in renderer [05ae05d](https://github.com/fnamazing/uiKit/commits/05ae05d)

## 22.2.3
- [patch] Bumping dependency on docs (from a failed build) [6949056](https://github.com/fnamazing/uiKit/commits/6949056)

## 22.2.1
- [patch] Migrated to the new repo and updated dependencies [f76434e](https://github.com/fnamazing/uiKit/commits/f76434e)

## 2.1.1 (2017-09-18)
* bug fix; update media-core and media-test-helpers version ([00108cf](https://bitbucket.org/atlassian/atlaskit/commits/00108cf))

## 2.1.0 (2017-08-11)
* feature; bump :allthethings: ([f4b1375](https://bitbucket.org/atlassian/atlaskit/commits/f4b1375))

## 2.0.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 1.0.0 (2017-06-07)
* feature; fix imgSrc property ([d2274ce](https://bitbucket.org/atlassian/atlaskit/commits/d2274ce))
* feature; mediaImage component skeleton ([5dd2f84](https://bitbucket.org/atlassian/atlaskit/commits/5dd2f84))
