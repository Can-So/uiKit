# @atlaskit/media-store

## 8.2.0
- [minor] Split Media + Editor cleanup part 1 [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)

## 8.1.1
- [patch] Fix bug with download binary [71ebe0b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/71ebe0b)

## 8.1.0
- [minor] Media-card: allow to download binary when processing failed, add failed-processing to CardStatus; Media-core: add context.file.downloadBinary, add failed-processing to FileStatus; Media-store: add getFileBinaryURL; [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)

## 8.0.1
- [patch] Add pagination to recents view in MediaPicker [4b3c1f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b3c1f5)

## 8.0.0
- [major] Deprecate context.uploadFile & context.getFile. Instead context.file.upload & context.file.getFileState should be used; media-store's uploadFile function now takes MediaStore as a second argument, not MediaApiConfig [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [major] Deprecate context.uploadFile & context.getFile. Instead context.file.upload & context.file.getFileState should be used; media-store's uploadFile function now takes MediaStore as a second argument, not MediaApiConfig [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)

## 7.0.0
- [major] Make hasherCreator load async and remove public export of createHasher [2d848cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d848cd)

## 6.2.1
- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/media-test-helpers@18.0.0

## 6.2.0
- [minor] expose new context.collection methods [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)

## 6.1.0
- [minor] Expose upfrontId in MediaPicker [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)

## 6.0.1
- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/media-test-helpers@17.0.0

## 6.0.0
- [major] Synchronous property "serviceHost" as part of many Interfaces in media components (like MediaApiConfig) is removed and replaced with asynchronous "baseUrl" as part of Auth object. [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
- [major] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/media-test-helpers@16.0.0

## 5.1.1
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/media-test-helpers@15.2.1

## 5.1.0
- [minor] use context.getFile in media-card [fad25ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad25ec)
- [minor] Updated dependencies [fad25ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fad25ec)
  - @atlaskit/media-test-helpers@15.2.0

## 5.0.0


- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/media-test-helpers@15.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/media-test-helpers@15.0.0

## 4.2.1
- [patch] re-enable usage of file id upfront in new MediaPicker uploader [3fb464b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3fb464b)
- [none] Updated dependencies [3fb464b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3fb464b)

## 4.2.0
- [minor] merge getFile and uploadFile + update MediaPicker NewUploadService + expose UploadController from MediaStore [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
- [minor] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-test-helpers@14.0.4

## 4.1.1
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/media-test-helpers@14.0.3

## 4.1.0
- [minor] add failed status to MediaFileProcessingStatus [2e66dab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e66dab)
- [none] Updated dependencies [2e66dab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e66dab)
- [none] Updated dependencies [4494d91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4494d91)

## 4.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/media-test-helpers@14.0.0

## 3.1.1
- [patch] uploadFile() no longer creates an empty file when uploading a file to avoid empty (ghost) files being created in collections when an upload is aborted [5ee48c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ee48c4)
- [none] Updated dependencies [5ee48c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ee48c4)

## 3.1.0
- [minor] add media mocks [1754450](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1754450)
- [none] Updated dependencies [1754450](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1754450)
  - @atlaskit/media-test-helpers@13.1.0

## 3.0.1
- [patch] Bump chunkinator version to latest to unblock BB. Latest version of chunkinator has a correct dep set for "rxjs-async-map" so that installs via npm work for consumers [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
- [patch] Updated dependencies [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
  - @atlaskit/media-test-helpers@13.0.1

## 3.0.0
- [major] media-picker: <All but popup picker>.emitUploadEnd second argument shape has changed from MediaFileData to FileDetails; `upload-end` event payload body shape changed from MediaFileData to FileDetails; All the media pickers config now have new property `useNewUploadService: boolean` (false by default); popup media-picker .cancel can't be called with no argument, though types does allow for it; `File` is removed; --- media-store: MediaStore.createFile now has a required argument of type MediaStoreCreateFileParams; MediaStore.copyFileWithToken new method; uploadFile method result type has changed from just a promise to a UploadFileResult type; --- media-test-helpers: mediaPickerAuthProvider argument has changed from a component instance to just a boolean authEnvironment; [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
- [major] SUMMARY GOES HERE [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
- [major] Updated dependencies [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
  - @atlaskit/media-test-helpers@13.0.0
- [major] Updated dependencies [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
  - @atlaskit/media-test-helpers@13.0.0

## 2.1.1
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/media-test-helpers@12.0.4

## 2.1.0
- [minor] Use id upfront in Uploader [f13d79e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f13d79e)

## 2.0.0
- [major] FileDetails' `id` property is now mandatory\nAuth interfaces moves from media-core to media-store, though still exported from media-core\nNew Interfaces (UploadableFile, UploadFileCallbacks) are exported from media-store\nMediaStore calls fixed with collection supplied during auth-provider call [d7b5021](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7b5021)

## 1.0.6
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 1.0.0
- [patch] Remove TS types that requires styled-components v3 [836e53b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/836e53b)

## 0.1.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 0.0.3
- [patch] Bump Rusha version to 0.8.13 [67a6312](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/67a6312)

## 0.0.2
- [patch] add media-store package [bcd67e7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bcd67e7)
