# @atlaskit/media-picker

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

## 6.0.3

## 6.0.2
- [patch] Add rating "PG" parameter to GIPHY url strings [9cb61d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9cb61d3)

## 6.0.1
- [patch] Remove classnames + domready dependencies from MediaPicker [44f94f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44f94f6)

## 6.0.0
- [major] For media-picker: fetchMetadata and autoFinalize options are removed from UploadParams and replaced with always "true" in the code. For editor-core: "unfinalized" status is removed from MediaStateStatus and finalizeCb from MediaState. [a41759a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a41759a)

## 5.0.1

## 5.0.0

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

## 2.1.4

## 2.1.3

## 2.1.2
- [patch] Add analytics events for click and show actions of media-card [031d5da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/031d5da)

## 2.1.1

## 2.1.0
- [minor] code split MediaEditor in MediaPicker [bdc395a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdc395a)

## 2.0.2
- [patch] add icon to annotate card action [e982c4b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e982c4b)

## 2.0.1

## 2.0.0
- [major] icons are now assignable to card actions, which will cause media cards to render upto 2 icon buttons, or a dropdown menu if more than 2 actions are set [649871c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/649871c)

## 1.1.4
- [patch] Remove TS types that requires styled-components v3 [836e53b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/836e53b)

## 1.1.3

## 1.1.2

## 1.1.1

- [patch] Emit 100% upload progress when last file chunk has been uploaded [db24bed](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db24bed)

## 1.1.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 1.0.11

## 1.0.10
- [patch] Bump Rusha version to 0.8.13 [67a6312](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67a6312)

## 1.0.9

## 1.0.8

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

## 1.0.1

## 1.0.0


- [major] make MediaPicker stable [fd3f3ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fd3f3ec)

## 0.2.2

- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak mk 2 [bdeef5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdeef5b)

## 0.2.1

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
