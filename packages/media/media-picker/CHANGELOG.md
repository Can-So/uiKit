# @atlaskit/media-picker

## 33.0.2
- Updated dependencies [d5bce1ea15](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5bce1ea15):
  - @atlaskit/media-card@52.0.4
  - @atlaskit/media-editor@27.0.3
  - @atlaskit/media-test-helpers@20.1.2
  - @atlaskit/media-viewer@35.2.0
  - @atlaskit/media-ui@9.0.0

## 33.0.1
- [patch] [ef469cbb0b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef469cbb0b):

  - MS-357 replaced @atlaskit/util-shared-styles from media components by @atlaskit/theme

## 33.0.0
- [major] [65b73cc466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65b73cc466):

  - Code split media-picker: make MediaPicker factory async and make editor use it

## 32.0.1
- [patch] [6ead14f4eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ead14f4eb):

  - Move Async module loading of EditorView into media-editor component.
- Updated dependencies [79e21779d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79e21779d4):
  - @atlaskit/media-editor@27.0.0

## 32.0.0
- [minor] [4e82fedc90](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e82fedc90):

  - Expose real id upfront for remote files in MediaPicker
- [major] [9d881f1eb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d881f1eb8):

  - Use real id upfront for remote files + remove PublicMediaFile interface + now integrators can just use file.id from public events
- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @atlaskit/media-card@52.0.0
  - @atlaskit/media-editor@26.0.0
  - @atlaskit/media-test-helpers@20.1.0
  - @atlaskit/media-viewer@35.0.0
  - @atlaskit/media-store@9.1.5
  - @atlaskit/media-core@27.0.0

## 31.0.2
- [patch] [07a187bb30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07a187bb30):

  - Fetch cloud accounts only on cloud folder opening

## 31.0.1
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/button@10.1.2
  - @atlaskit/dropdown-menu@6.1.26
  - @atlaskit/flag@9.1.9
  - @atlaskit/modal-dialog@7.2.1
  - @atlaskit/select@6.1.19
  - @atlaskit/toggle@5.0.15
  - @atlaskit/media-card@51.0.1
  - @atlaskit/media-editor@25.0.1
  - @atlaskit/media-test-helpers@19.1.1
  - @atlaskit/media-ui@8.2.5
  - @atlaskit/media-viewer@34.0.1
  - @atlaskit/icon@16.0.0

## 31.0.0
- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @atlaskit/media-card@51.0.0
  - @atlaskit/media-editor@25.0.0
  - @atlaskit/media-viewer@34.0.0
  - @atlaskit/media-store@9.1.3
  - @atlaskit/media-test-helpers@19.1.0
  - @atlaskit/media-core@26.2.0

## 30.0.0
- [patch] [6da174b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6da174b):

  - Implementation of MediaEditor is partially moved to media-editor
- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
- Updated dependencies [3ad16f3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ad16f3):
- Updated dependencies [f9796df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f9796df):
  - @atlaskit/media-card@50.0.0
  - @atlaskit/media-editor@24.0.0
  - @atlaskit/media-viewer@33.0.0
  - @atlaskit/media-store@9.1.2
  - @atlaskit/media-test-helpers@19.0.0
  - @atlaskit/media-core@26.1.0
  - @atlaskit/media-ui@8.2.4

## 29.0.3
- [patch] [e6516fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6516fb):

  - Move media mocks into right location to prevent them to be included in dist

## 29.0.2
- [patch] [a55e4e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a55e4e6):

  - Remove Axios dependency from media-picker

## 29.0.1
- [patch] [c91adfe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c91adfe):

  - remove customVideoPlayer featureFlag prop and enable by default

## 29.0.0
- [patch] [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):

  - Remove redundant fileStreamCache createKey() method and replace the cache key with id everywhere
- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @atlaskit/media-card@49.0.0
  - @atlaskit/media-editor@23.0.0
  - @atlaskit/media-test-helpers@18.9.1
  - @atlaskit/media-viewer@31.0.0
  - @atlaskit/media-store@9.1.1
  - @atlaskit/media-core@26.0.0

## 28.0.0
- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @atlaskit/media-card@48.0.0
  - @atlaskit/media-editor@22.0.0
  - @atlaskit/media-core@25.0.0
  - @atlaskit/media-store@9.1.0
  - @atlaskit/media-test-helpers@18.9.0

## 27.0.5
- [patch] [8314694](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8314694):

  - Support uploading + processing files in MediaViewer

## 27.0.4
- [patch] [442821a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/442821a):

  - Fix the issue with being unable to save image inserted into the editor: pass collection to tenant auth for file polling

## 27.0.3
- [patch] [b677631](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b677631):

  - Add new example and ensure occurrenceKey is set for all copy/withToken calls

## 27.0.2
- Updated dependencies [135ed00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/135ed00):
  - @atlaskit/media-core@24.7.2
  - @atlaskit/media-store@9.0.2
  - @atlaskit/media-test-helpers@18.7.2
  - @atlaskit/media-card@47.0.0

## 27.0.1
- [patch] [ca16fa9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ca16fa9):

  - Add SSR support to media components

## 27.0.0
- [major] [6cb6696](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6cb6696):

  - All file ids returned in any of the triggered events (including syncronouse one like uploads-start) are real file IDs and not a temp. one;
- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
- Updated dependencies [096f898](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/096f898):
  - @atlaskit/media-card@46.0.0
  - @atlaskit/media-editor@21.0.0
  - @atlaskit/media-store@9.0.0
  - @atlaskit/media-test-helpers@18.7.0
  - @atlaskit/media-core@24.7.0

## 26.0.0
- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @atlaskit/media-card@45.0.0
  - @atlaskit/media-editor@20.0.0
  - @atlaskit/media-store@8.5.1
  - @atlaskit/media-test-helpers@18.6.2
  - @atlaskit/media-core@24.6.0

## 25.0.8
- [patch] [ff8b31d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ff8b31d):

  - Pass uploadParams to createStore when initializing MediaPicker popup. This fixes an issue when calling /copy/withToken endpoint

## 25.0.7
- [patch] [5f12909](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f12909):

  - remove tenant property from MediaPicker + make show() faster

## 25.0.6
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/button@10.1.1
  - @atlaskit/dropdown-menu@6.1.25
  - @atlaskit/field-text@7.0.18
  - @atlaskit/flag@9.1.8
  - @atlaskit/icon@15.0.2
  - @atlaskit/modal-dialog@7.1.1
  - @atlaskit/spinner@9.0.13
  - @atlaskit/toggle@5.0.14
  - @atlaskit/analytics-gas-types@3.2.3
  - @atlaskit/analytics-listeners@4.1.4
  - @atlaskit/media-card@44.1.3
  - @atlaskit/media-core@24.5.2
  - @atlaskit/media-editor@19.0.2
  - @atlaskit/media-ui@8.1.2
  - @atlaskit/docs@6.0.0

## 25.0.5
- [patch] [92a6240](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92a6240):

  - Picking video file will now send dimensions same way as image would

## 25.0.4
- Updated dependencies [5de3574](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5de3574):
  - @atlaskit/media-test-helpers@18.5.2
  - @atlaskit/media-card@44.1.1
  - @atlaskit/media-ui@8.0.0

## 25.0.3
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/button@10.0.1
  - @atlaskit/dropdown-menu@6.1.23
  - @atlaskit/flag@9.1.6
  - @atlaskit/modal-dialog@7.0.13
  - @atlaskit/toggle@5.0.12
  - @atlaskit/media-card@44.0.2
  - @atlaskit/media-editor@19.0.1
  - @atlaskit/media-test-helpers@18.3.1
  - @atlaskit/media-ui@7.6.2
  - @atlaskit/icon@15.0.0

## 25.0.2
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/dropdown-menu@6.1.22
  - @atlaskit/field-text@7.0.15
  - @atlaskit/flag@9.1.5
  - @atlaskit/icon@14.6.1
  - @atlaskit/modal-dialog@7.0.12
  - @atlaskit/spinner@9.0.11
  - @atlaskit/toggle@5.0.11
  - @atlaskit/analytics-listeners@4.1.1
  - @atlaskit/media-card@44.0.1
  - @atlaskit/media-core@24.5.1
  - @atlaskit/media-ui@7.6.1
  - @atlaskit/button@10.0.0
  - @atlaskit/analytics-next-types@3.1.2

## 25.0.1
- [patch] [b9d9e9a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9d9e9a):

  - Support advanced i18n mode in MediaPicker

## 25.0.0
- [minor] [801fd18](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/801fd18):

  - Ability to delete file from recents has been added; MediaFile now has optional fields userUpfrontId and userOccurrenceKey;
- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @atlaskit/media-card@44.0.0
  - @atlaskit/media-editor@19.0.0
  - @atlaskit/media-test-helpers@18.3.0
  - @atlaskit/media-core@24.5.0

## 24.0.1
- [patch] [e151c1a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e151c1a):

  - Removes dependency on @atlaskit/layer-manager

  As of component versions:

  - \`@atlaskit/modal-dialog@7.0.0\`
  - \`@atlaskit/tooltip@12.0.2\`
  - \`@atlaskit/flag@9.0.6\`
  - \`@atlaskit/onboarding@6.0.0\`

  No component requires \`LayerManager\` to layer correctly.

  You can safely remove this dependency and stop rendering \`LayerManager\` in your apps.

## 24.0.0
- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @atlaskit/media-card@43.0.0
  - @atlaskit/media-editor@18.0.0
  - @atlaskit/media-test-helpers@18.2.12
  - @atlaskit/media-core@24.4.0
  - @atlaskit/media-store@8.3.0

## 23.2.2
- Updated dependencies [04c7192](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/04c7192):
  - @atlaskit/media-core@24.3.1
  - @atlaskit/media-test-helpers@18.2.11
  - @atlaskit/media-card@42.0.0

## 23.2.1
- [patch] Updated dependencies [ced32d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ced32d0)
  - @atlaskit/media-card@41.1.2
  - @atlaskit/media-test-helpers@18.2.10
  - @atlaskit/media-ui@7.0.0

## 23.2.0
- [minor] pass scaleFactor from media-picker upload-preview-update event [e23a078](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e23a078)

## 23.1.0
- [minor] add scaleFactor to ImagePreview type [605eff0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/605eff0)

## 23.0.0
- [major] Add i18n support to MediaPicker [9add3a4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9add3a4)

## 22.0.0
- [major] Cleanup media + editor integration 🔥 [2f9d14d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2f9d14d)

## 21.0.0
- [patch] Split Media + Editor cleanup part 1 [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
- [major] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @atlaskit/media-card@41.0.0
  - @atlaskit/media-editor@17.0.0
  - @atlaskit/media-core@24.3.0
  - @atlaskit/media-store@8.2.0
  - @atlaskit/media-test-helpers@18.2.8

## 20.0.1
- [patch] Updated dependencies [6e510d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e510d8)
  - @atlaskit/media-core@24.2.2
  - @atlaskit/media-test-helpers@18.2.7
  - @atlaskit/media-card@40.0.0

## 20.0.0
- [major] Remove hardcoded 'source' field from all events which will avoid overriding the value provided by integrating products. When upgrading, make sure you also upgrade the analytics-listener package which is now responsible for setting the default 'source' value if not set. [17afe04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/17afe04)

## 19.0.0
- [major] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @atlaskit/media-card@39.0.0
  - @atlaskit/media-editor@16.0.0
  - @atlaskit/media-test-helpers@18.2.5
  - @atlaskit/media-core@24.2.0
  - @atlaskit/media-store@8.1.0

## 18.1.0
- [minor] Add pagination to recents view in MediaPicker [4b3c1f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b3c1f5)

## 18.0.0
- [patch] Deprecate context.uploadFile & context.getFile. Instead context.file.upload & context.file.getFileState should be used; media-store's uploadFile function now takes MediaStore as a second argument, not MediaApiConfig [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Deprecate context.uploadFile & context.getFile. Instead context.file.upload & context.file.getFileState should be used; media-store's uploadFile function now takes MediaStore as a second argument, not MediaApiConfig [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
- [major] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [major] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @atlaskit/media-card@38.0.0
  - @atlaskit/media-editor@15.0.0
  - @atlaskit/media-core@24.1.0
  - @atlaskit/media-store@8.0.0
  - @atlaskit/media-test-helpers@18.2.3

## 17.0.4
- [patch] use Card instead of CardView in MediaPicker recents [081f4c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/081f4c6)

## 17.0.3
- [patch] Updated dependencies [2d848cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d848cd)
  - @atlaskit/media-core@24.0.3
  - @atlaskit/media-test-helpers@18.2.2
  - @atlaskit/media-store@7.0.0

## 17.0.2
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/button@9.0.13
  - @atlaskit/dropdown-menu@6.1.17
  - @atlaskit/flag@9.0.11
  - @atlaskit/layer-manager@5.0.13
  - @atlaskit/modal-dialog@7.0.2
  - @atlaskit/toggle@5.0.9
  - @atlaskit/media-card@37.0.1
  - @atlaskit/media-editor@14.0.1
  - @atlaskit/media-test-helpers@18.2.1
  - @atlaskit/icon@14.0.0

## 17.0.1
- [patch] Updated dependencies [dae7792](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dae7792)
  - @atlaskit/media-core@24.0.2
  - @atlaskit/media-card@37.0.0
  - @atlaskit/media-test-helpers@18.2.0

## 17.0.0
- [major] Update RXJS dependency to ^5.5.0 [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
- [major] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/media-card@36.0.0
  - @atlaskit/media-editor@14.0.0
  - @atlaskit/media-store@6.2.1
  - @atlaskit/media-core@24.0.0
  - @atlaskit/media-test-helpers@18.0.0

## 16.0.6
- [patch] Updated dependencies [1be4bb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1be4bb8)
  - @atlaskit/media-core@23.2.1
  - @atlaskit/media-card@35.0.0

## 16.0.5
- [patch] Introduce media analytics listener [e7d7ab1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7d7ab1)

## 16.0.4
- [patch] Add className to headless dropzone [96be52e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/96be52e)

## 16.0.3
- [patch] use context.collection.getItems in MediaPicker [1486ca4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1486ca4)

## 16.0.2
- [patch] Use stricter tsconfig [3e3a10d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3e3a10d)

## 16.0.1
- [patch]  Handle the fact that remoteUploadId may not exist and not break cloud uploads [c2317af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c2317af)

## 16.0.0
- [major] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @atlaskit/media-card@34.0.0
  - @atlaskit/media-editor@13.0.0
  - @atlaskit/media-core@23.2.0
  - @atlaskit/media-store@6.2.0
  - @atlaskit/media-test-helpers@17.1.0

## 15.1.2
- [patch] Update TS to 3.0 [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
- [none] Updated dependencies [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
  - @atlaskit/media-test-helpers@17.0.2
  - @atlaskit/media-core@23.1.1
  - @atlaskit/media-card@33.0.2

## 15.1.1
- [patch] Fix app not dispatching dropzone actions [34f69df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/34f69df)

## 15.1.0
- [minor] Instrument media-picker with analytics [d5f093b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5f093b)

## 15.0.2
- [patch] Updated dependencies [d5a043a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5a043a)
  - @atlaskit/icon@13.8.1
  - @atlaskit/flag@9.0.10
  - @atlaskit/modal-dialog@7.0.0

## 15.0.1
- [patch] Updated dependencies [9c66d4d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9c66d4d)
  - @atlaskit/webdriver-runner@0.1.0

## 15.0.0
- [major] "userAuthProvider" property removed from all the media-picker configs; Optional "shouldCopyFileToRecents" property added to all media-picker configs; "tenantUploadParams" is removed since "uploadParams" is already a tenant one; "copyFileToRecents" is removed from UploadParams; [048f488](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/048f488)

## 14.0.1
- [patch] Append timestamp in image files for Clipboard component [da65dec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da65dec)

## 14.0.0
- [minor] Expose upfrontId in MediaPicker [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
- [major] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @atlaskit/media-card@33.0.0
  - @atlaskit/media-editor@12.0.0
  - @atlaskit/media-core@23.1.0
  - @atlaskit/media-store@6.1.0

## 13.0.0
- [major] Remove new upload service feature flag (useNewUploadService). Now new upload service will be used by default. [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/media-test-helpers@17.0.0
  - @atlaskit/media-store@6.0.1
  - @atlaskit/media-editor@11.0.1
  - @atlaskit/media-core@23.0.2
  - @atlaskit/media-card@32.0.6

## 12.1.2
- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/media-card@32.0.5

## 12.1.1
- [patch] Fix MediaPicker Dropzone UI on IE11 [79f780a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79f780a)

## 12.1.0
- [minor] New option "singleSelect" allows to limit number of selected files to just 1. [4ac210e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ac210e)

## 12.0.1
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/media-card@32.0.1
  - @atlaskit/modal-dialog@6.0.6
  - @atlaskit/field-text@7.0.4
  - @atlaskit/analytics-next@3.0.4
  - @atlaskit/toggle@5.0.5
  - @atlaskit/flag@9.0.4
  - @atlaskit/button@9.0.5
  - @atlaskit/spinner@9.0.5
  - @atlaskit/icon@13.2.4
  - @atlaskit/dropdown-menu@6.1.5

## 12.0.0
- [major] Synchronous property "serviceHost" as part of many Interfaces in media components (like MediaApiConfig) is removed and replaced with asynchronous "baseUrl" as part of Auth object. [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
- [major] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/media-test-helpers@16.0.0
  - @atlaskit/media-store@6.0.0
  - @atlaskit/media-editor@11.0.0
  - @atlaskit/media-core@23.0.0
  - @atlaskit/media-card@32.0.0

## 11.2.2
- [patch] Updated dependencies [59ccb09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59ccb09)
  - @atlaskit/media-card@31.3.0

## 11.2.1
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/media-card@31.2.1
  - @atlaskit/flag@9.0.3
  - @atlaskit/icon@13.2.2
  - @atlaskit/media-editor@10.0.1
  - @atlaskit/toggle@5.0.4
  - @atlaskit/button@9.0.4
  - @atlaskit/media-core@22.2.1
  - @atlaskit/media-test-helpers@15.2.1
  - @atlaskit/media-store@5.1.1
  - @atlaskit/spinner@9.0.4
  - @atlaskit/field-text@7.0.3
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2
  - @atlaskit/dropdown-menu@6.1.4
  - @atlaskit/modal-dialog@6.0.5

## 11.2.0
- [minor] MediaPicker Popup now supports passing of optional parent react context as a parameter [25ef2e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25ef2e4)

## 11.1.2
- [patch] pass mimeType to files in uploads-start event in MediaPicker [3485c00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3485c00)
- [patch] Updated dependencies [3485c00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3485c00)
  - @atlaskit/media-core@22.2.0
  - @atlaskit/media-card@31.1.1

## 11.1.1
- [patch] use context.getFile in media-card [fad25ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad25ec)
- [patch] Updated dependencies [fad25ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad25ec)
  - @atlaskit/media-test-helpers@15.2.0
  - @atlaskit/media-store@5.1.0
  - @atlaskit/media-core@22.1.0
  - @atlaskit/media-card@31.1.0

## 11.1.0




- [patch] Updated dependencies [fa6f865](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fa6f865)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-test-helpers@15.1.0
- [none] Updated dependencies [fdd03d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fdd03d8)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-test-helpers@15.1.0
- [patch] Updated dependencies [49c8425](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49c8425)
  - @atlaskit/media-card@31.0.0
  - @atlaskit/media-test-helpers@15.1.0
- [minor] Updated dependencies [3476e01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3476e01)
  - @atlaskit/media-card@31.0.0

## 11.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/media-card@30.0.0
  - @atlaskit/modal-dialog@6.0.0
  - @atlaskit/field-text@7.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/toggle@5.0.0
  - @atlaskit/flag@9.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/media-store@5.0.0
  - @atlaskit/media-editor@10.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/dropdown-menu@6.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/media-card@30.0.0
  - @atlaskit/media-test-helpers@15.0.0
  - @atlaskit/media-store@5.0.0
  - @atlaskit/media-editor@10.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/modal-dialog@6.0.0
  - @atlaskit/field-text@7.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/toggle@5.0.0
  - @atlaskit/flag@9.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/dropdown-menu@6.0.0

## 10.0.0
- [major] Remove old analytics client, context and tracker code [daf6227](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/daf6227)

## 9.0.1
- [patch] [MSW-847 ] Fix Safari issue with not selecting files in MediaPicker recents [6f51fdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6f51fdb)

## 9.0.0
- [major] Use more strict type for MediaArtifacts [8c711bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c711bd)
- [patch] Use media.tsconfig in MediaViewer [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-test-helpers@14.0.6
  - @atlaskit/media-editor@9.1.4
  - @atlaskit/media-core@21.0.0
  - @atlaskit/media-card@29.1.8

## 8.1.6
- [patch] Safely handle paste handler for clipboard to avoid error noise in unsupported browsers [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)

## 8.1.5
- [patch] re-enable usage of file id upfront in new MediaPicker uploader [3fb464b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3fb464b)
- [patch] Updated dependencies [3fb464b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3fb464b)
  - @atlaskit/media-store@4.2.1

## 8.1.4
- [patch] merge getFile and uploadFile + update MediaPicker NewUploadService + expose UploadController from MediaStore [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-store@4.2.0
  - @atlaskit/media-test-helpers@14.0.4
  - @atlaskit/media-editor@9.1.3
  - @atlaskit/media-card@29.1.5
  - @atlaskit/media-core@20.0.0

## 8.1.3
- [patch] Updated dependencies [cdba8b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cdba8b3)
  - @atlaskit/spinner@8.0.0
  - @atlaskit/media-card@29.1.4
  - @atlaskit/flag@8.1.3
  - @atlaskit/button@8.2.3

## 8.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/media-card@29.1.2
  - @atlaskit/media-test-helpers@14.0.3
  - @atlaskit/media-store@4.1.1
  - @atlaskit/media-editor@9.1.2
  - @atlaskit/media-core@19.1.3
  - @atlaskit/modal-dialog@5.2.2
  - @atlaskit/field-text@6.0.4
  - @atlaskit/button@8.1.2
  - @atlaskit/toggle@4.0.3
  - @atlaskit/spinner@7.0.2
  - @atlaskit/flag@8.1.1
  - @atlaskit/icon@12.1.2
  - @atlaskit/dropdown-menu@5.0.4

## 8.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/media-card@29.1.1
  - @atlaskit/media-test-helpers@14.0.2
  - @atlaskit/media-editor@9.1.1
  - @atlaskit/media-core@19.1.2
  - @atlaskit/spinner@7.0.1
  - @atlaskit/modal-dialog@5.1.1
  - @atlaskit/icon@12.1.1
  - @atlaskit/analytics-next@2.1.8
  - @atlaskit/dropdown-menu@5.0.3
  - @atlaskit/button@8.1.1
  - @atlaskit/docs@4.1.1

## 8.1.0
- [patch] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/spinner@7.0.0
  - @atlaskit/media-card@29.1.0
  - @atlaskit/modal-dialog@5.1.0
  - @atlaskit/dropdown-menu@5.0.2
  - @atlaskit/icon@12.1.0
  - @atlaskit/media-editor@9.1.0
  - @atlaskit/toggle@4.0.2
  - @atlaskit/docs@4.1.0
  - @atlaskit/media-core@19.1.1
  - @atlaskit/media-test-helpers@14.0.1
  - @atlaskit/field-text@6.0.2
  - @atlaskit/analytics-next@2.1.7
  - @atlaskit/flag@8.1.0
  - @atlaskit/button@8.1.0
  
## 8.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/media-card@29.0.0
  - @atlaskit/media-test-helpers@14.0.0
  - @atlaskit/media-store@4.0.0
  - @atlaskit/media-core@19.0.0
  - @atlaskit/media-editor@9.0.0
  - @atlaskit/modal-dialog@5.0.0
  - @atlaskit/flag@8.0.0
  - @atlaskit/icon@12.0.0
  - @atlaskit/toggle@4.0.0
  - @atlaskit/field-text@6.0.0
  - @atlaskit/analytics-next@2.1.4
  - @atlaskit/button@8.0.0
  - @atlaskit/spinner@6.0.0
  - @atlaskit/docs@4.0.0
  - @atlaskit/dropdown-menu@5.0.0

## 7.0.6
- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/media-card@28.0.6

## 7.0.5
- [patch] Updated dependencies [5ee48c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ee48c4)
  - @atlaskit/media-store@3.1.1
  - @atlaskit/media-core@18.1.2
  - @atlaskit/media-editor@8.0.2

## 7.0.4
- [patch] add media mocks [1754450](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1754450)
- [none] Updated dependencies [1754450](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1754450)
  - @atlaskit/media-test-helpers@13.1.0
  - @atlaskit/media-store@3.1.0

## 7.0.3
- [patch]  [f87724e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f87724e)
- [none] Updated dependencies [f87724e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f87724e)
  - @atlaskit/media-test-helpers@13.0.2
  - @atlaskit/media-card@28.0.4

## 7.0.2
- [patch] remove browse + dropzone logic from UploadService [02a72e8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02a72e8)

## 7.0.1
- [patch] Updated dependencies [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
  - @atlaskit/media-store@3.0.1
  - @atlaskit/media-core@18.1.1
  - @atlaskit/media-test-helpers@13.0.1
  - @atlaskit/media-editor@8.0.1
  - @atlaskit/media-card@28.0.1

## 7.0.0
- [major] media-picker: <All but popup picker>.emitUploadEnd second argument shape has changed from MediaFileData to FileDetails; `upload-end` event payload body shape changed from MediaFileData to FileDetails; All the media pickers config now have new property `useNewUploadService: boolean` (false by default); popup media-picker .cancel can't be called with no argument, though types does allow for it; `File` is removed; --- media-store: MediaStore.createFile now has a required argument of type MediaStoreCreateFileParams; MediaStore.copyFileWithToken new method; uploadFile method result type has changed from just a promise to a UploadFileResult type; --- media-test-helpers: mediaPickerAuthProvider argument has changed from a component instance to just a boolean authEnvironment; [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
- [major] SUMMARY GOES HERE [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
- [major] Updated dependencies [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
  - @atlaskit/media-test-helpers@13.0.0
  - @atlaskit/media-store@3.0.0
  - @atlaskit/media-core@18.1.0
  - @atlaskit/media-editor@8.0.0
  - @atlaskit/media-card@28.0.0
- [major] Updated dependencies [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
  - @atlaskit/media-test-helpers@13.0.0
  - @atlaskit/media-store@3.0.0
  - @atlaskit/media-core@18.1.0
  - @atlaskit/media-editor@8.0.0
  - @atlaskit/media-card@28.0.0

## 6.0.6
- [patch] change media picker image src to static assets served on dt-static [a5a740b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5a740b)

## 6.0.5
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/icon@11.3.0
  - @atlaskit/media-editor@7.0.2
  - @atlaskit/media-card@27.1.4
  - @atlaskit/toggle@3.0.2
  - @atlaskit/modal-dialog@4.0.5
  - @atlaskit/flag@7.0.3
  - @atlaskit/field-text@5.0.3
  - @atlaskit/media-test-helpers@12.0.4
  - @atlaskit/media-core@18.0.3
  - @atlaskit/analytics-next@2.1.1
  - @atlaskit/dropdown-menu@4.0.3
  - @atlaskit/button@7.2.5
  - @atlaskit/spinner@5.0.2
  - @atlaskit/docs@3.0.4

## 6.0.4
- [patch] Media Picker Popup modal dialog now has a fixed size unwanted wrapping behaviour of cards in the Upload view and jumping of the dialog when switching to the GIPHY view. [814e505](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/814e505)

## 6.0.2
- [patch] Add rating "PG" parameter to GIPHY url strings [9cb61d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cb61d3)

## 6.0.1
- [patch] Remove classnames + domready dependencies from MediaPicker [44f94f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44f94f6)

## 6.0.0
- [major] For media-picker: fetchMetadata and autoFinalize options are removed from UploadParams and replaced with always "true" in the code. For editor-core: "unfinalized" status is removed from MediaStateStatus and finalizeCb from MediaState. [a41759a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a41759a)

## 4.0.0
- [major] Use media-core context in MediaPicker constructor [6cc9f55](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6cc9f55)

## 3.0.1
- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 2.2.0
- [minor] show local previews for video files [6b24c51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6b24c51)

## 2.1.6
- [patch] Show upload button during recents load in media picker. + Inprove caching for auth provider used in examples [929731a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/929731a)

## 2.1.5
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 2.1.2
- [patch] Add analytics events for click and show actions of media-card [031d5da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/031d5da)

## 2.1.0
- [minor] code split MediaEditor in MediaPicker [bdc395a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdc395a)

## 2.0.2
- [patch] add icon to annotate card action [e982c4b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e982c4b)

## 2.0.0
- [major] icons are now assignable to card actions, which will cause media cards to render upto 2 icon buttons, or a dropdown menu if more than 2 actions are set [649871c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/649871c)

## 1.1.4
- [patch] Remove TS types that requires styled-components v3 [836e53b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/836e53b)

## 1.1.1
- [patch] Emit 100% upload progress when last file chunk has been uploaded [db24bed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db24bed)

## 1.1.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 1.0.10
- [patch] Bump Rusha version to 0.8.13 [67a6312](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67a6312)

## 1.0.7
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 1.0.6
- [patch] Fix issue with having multiple Dropzone elements listening at the same time with Editor and MediaPicker [d37de20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d37de20)

## 1.0.5
- [patch] delay call to /recents and /accounts in MediaPicker and improve overall performance [8f2b541](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8f2b541)

## 1.0.4
- [patch] Move media provider and state manager to editor-core [0601da7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0601da7)

## 1.0.3
- [patch] Replaced heavy placeholder image for GIPHY view error state. This will reduce the page weight of media-picker by ~160kb [e4cb2a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e4cb2a0)

## 1.0.2
- [patch] update link account handling redirect url from custom s3 location to media picker api [bd3e22f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd3e22f)

## 1.0.0
- [major] make MediaPicker stable [fd3f3ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fd3f3ec)

## 0.2.2
- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak mk 2 [bdeef5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdeef5b)

## 0.2.0
- [minor] Added GIPHY file picking support to Media Picker Popup [d6be99c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6be99c)

## 0.1.2
- [patch] Fixed header styles in Popup [48555ce](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/48555ce)

## 0.1.1
- [patch] Fix data URI generation crashing/lagging the browser for large files. data URIs are only generated for local uploaded files when the type of the file [2dd1728](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2dd1728)

## 0.1.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 0.0.2
- [patch] Migrate MediaPicker into new repo [494c424](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/494c424)
