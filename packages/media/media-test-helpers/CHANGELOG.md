# @atlaskit/media-test-helpers

## 14.0.6
- [patch] Use media.tsconfig in MediaViewer [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-core@21.0.0

## 14.0.5
- [patch] Replace faker with lightweight internal functions [1c3352a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c3352a)
- [none] Updated dependencies [1c3352a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c3352a)

## 14.0.4
- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-store@4.2.0
  - @atlaskit/media-core@20.0.0

## 14.0.3
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/media-store@4.1.1
  - @atlaskit/media-core@19.1.3

## 14.0.2
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/media-core@19.1.2

## 14.0.1
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/media-core@19.1.1

## 14.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/media-store@4.0.0
  - @atlaskit/media-core@19.0.0

## 13.3.1
- [patch] MSW-741 : handle unexpected media types without crashes [0353017](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0353017)
- [none] Updated dependencies [0353017](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0353017)

## 13.3.0
- [minor] Add new item to example items [602c46e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/602c46e)
- [none] Updated dependencies [602c46e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/602c46e)

## 13.2.0
- [minor] add custom video player under feature flag [9041109](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041109)
- [none] Updated dependencies [9041109](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041109)

## 13.1.0
- [minor] add media mocks [1754450](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1754450)
- [none] Updated dependencies [1754450](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1754450)
  - @atlaskit/media-store@3.1.0

## 13.0.2
- [patch]  [f87724e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f87724e)
- [none] Updated dependencies [f87724e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f87724e)

## 13.0.1
- [patch] Updated dependencies [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
  - @atlaskit/media-core@18.1.1

## 13.0.0
- [major] media-picker: <All but popup picker>.emitUploadEnd second argument shape has changed from MediaFileData to FileDetails; `upload-end` event payload body shape changed from MediaFileData to FileDetails; All the media pickers config now have new property `useNewUploadService: boolean` (false by default); popup media-picker .cancel can't be called with no argument, though types does allow for it; `File` is removed; --- media-store: MediaStore.createFile now has a required argument of type MediaStoreCreateFileParams; MediaStore.copyFileWithToken new method; uploadFile method result type has changed from just a promise to a UploadFileResult type; --- media-test-helpers: mediaPickerAuthProvider argument has changed from a component instance to just a boolean authEnvironment; [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
- [major] SUMMARY GOES HERE [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
- [none] Updated dependencies [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
  - @atlaskit/media-core@18.1.0
- [major] Updated dependencies [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
  - @atlaskit/media-core@18.1.0

## 12.0.4
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/field-text@5.0.3
  - @atlaskit/media-core@18.0.3

## 12.0.1
- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 12.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 11.0.0
- [major] Show upload button during recents load in media picker. + Inprove caching for auth provider used in examples [929731a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/929731a)

## 10.0.6
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 10.0.2
- [patch] fix(media-test-helpers): bump xhr-mock and add error handling [304265f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/304265f)

## 10.0.1
- [patch] feature(media-test-helpers): http mocks for media-picker [982085f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/982085f)

## 9.0.5
- [patch] Remove TS types that requires styled-components v3 [836e53b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/836e53b)

## 9.0.4
- [patch] fix(media-test-helpers): configure fetch to send credentials and point calls to correct endpoint [8978f4e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8978f4e)

## 9.0.3
- [patch] Pointing base urls to media-playground behind Stargate [4979dc5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4979dc5)

## 9.0.2
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 9.0.0
- [patch] use impersonation endpoint in authProvider [85cf404](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85cf404)

## 8.6.1
- [patch] Update atlassian.io domains [6ac1a8f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ac1a8f)

## 8.6.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 8.5.4
- [patch] Use media-test-helpers instead of hardcoded values [f2b92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f2b92f8)

## 8.5.3
- [patch] Update dependencies [623f8ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/623f8ca)

## 8.5.2
- [patch] Added new AppCardView v1.5 designs behind a feature flag. [92bc6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92bc6c8)

## 8.5.1
- [patch] Show static images for gifs in small cards [e2508f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e2508f9)
- [patch] Show static images for gifs in small cards [e2508f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e2508f9)

## 8.4.0 (2017-10-10)
* bug fix; fixed incompatible types between axioPromise and Promise. ([a227432](https://bitbucket.org/atlassian/atlaskit/commits/a227432))
* feature; created userAuthProvider for storybook ([31b2e96](https://bitbucket.org/atlassian/atlaskit/commits/31b2e96))

## 8.3.0 (2017-09-19)
* feature; new LinkCards UI ([06d49d2](https://bitbucket.org/atlassian/atlaskit/commits/06d49d2))

## 8.2.1 (2017-09-15)
* bug fix; fix bug where authProvider impl has wrong API ([f8fbeee](https://bitbucket.org/atlassian/atlaskit/commits/f8fbeee))

## 8.2.0 (2017-09-14)
* feature; add \`createStorybookContext\` default parameter ([6814e95](https://bitbucket.org/atlassian/atlaskit/commits/6814e95))

## 8.1.0 (2017-09-13)
* feature; bump media-core dep and introduce asap issuer way of auth ([f348ccb](https://bitbucket.org/atlassian/atlaskit/commits/f348ccb))
* breaking;
* `createStorybookContext` now takes 1 parameter object of type `AuthParameter`. It takes `serviceHost`
* and `authType`, that can be either `"client"` or `"asap"`, depending on what auth option you want to be used.
* Notice: `clientId` is not required anymore.
* breaking;
* `StoryBookTokenProvider` is gone. Instead `StoryBookAuthProvider` has new method `create`, it takes
* boolean `isAsapEnvironment` as first parameter and `scope` object as second.

## 7.2.0 (2017-08-08)
* feature; add password protected PDF ([5afbf6a](https://bitbucket.org/atlassian/atlaskit/commits/5afbf6a))

## 7.1.0 (2017-08-08)
* feature; add large pdf file ([695e4d1](https://bitbucket.org/atlassian/atlaskit/commits/695e4d1))
* feature; added link details ([ed1c4aa](https://bitbucket.org/atlassian/atlaskit/commits/ed1c4aa))

## 6.3.0 (2017-07-31)
* feature; added minimal link details which contain a smart card ([e016c4b](https://bitbucket.org/atlassian/atlaskit/commits/e016c4b))

## 6.2.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 6.2.0 (2017-06-29)
* feature; add new image id to mediaExamples ([5573611](https://bitbucket.org/atlassian/atlaskit/commits/5573611))

## 6.1.0 (2017-06-08)
* fix; use read/write access scope for all sample collections ([62380c2](https://bitbucket.org/atlassian/atlaskit/commits/62380c2))
* feature; cache token for custom scoped access ([c97cf14](https://bitbucket.org/atlassian/atlaskit/commits/c97cf14))

## 6.0.3 (2017-06-05)
* fix; updated link ids so they point to links that exist in their associated collections ([ce844c1](https://bitbucket.org/atlassian/atlaskit/commits/ce844c1))

## 6.0.2 (2017-05-22)
* fix; fix link id ([ae82433](https://bitbucket.org/atlassian/atlaskit/commits/ae82433))

## 6.0.1 (2017-05-19)
* fix; actualize media-test-helpers dependencies ([6ffff96](https://bitbucket.org/atlassian/atlaskit/commits/6ffff96))

## 5.0.0 (2017-05-19)
* feature; bumped version of media-core ([16674d9](https://bitbucket.org/atlassian/atlaskit/commits/16674d9))
* breaking; bumped version of media-core

## 4.8.5 (2017-05-15)
* fix; fixed the default fakeContextProvider with a more robust mock ([5b703f2](https://bitbucket.org/atlassian/atlaskit/commits/5b703f2))

## 4.8.4 (2017-05-09)
* fix; add missing dependency ([b998940](https://bitbucket.org/atlassian/atlaskit/commits/b998940))

## 4.8.2 (2017-05-05)
* fix; bumping media-core ([85f448f](https://bitbucket.org/atlassian/atlaskit/commits/85f448f))

## 4.8.1 (2017-05-01)
* fix; changed video url preview to one that is identified by endpoint with player attribut ([76f0895](https://bitbucket.org/atlassian/atlaskit/commits/76f0895))
* fix; update for media-test-helpers with updated context signature ([10ae6e2](https://bitbucket.org/atlassian/atlaskit/commits/10ae6e2))

## 4.8.0 (2017-04-27)
* feature; added data uri gif required by FIL-4001 ([e2ffb80](https://bitbucket.org/atlassian/atlaskit/commits/e2ffb80))

## 4.7.0 (2017-04-27)
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 4.6.0 (2017-04-27)
* feature; add imageLinkId to examples ([64a48ad](https://bitbucket.org/atlassian/atlaskit/commits/64a48ad))
* feature; added file details required by FIL-4001 ([7586dfd](https://bitbucket.org/atlassian/atlaskit/commits/7586dfd))

## 4.5.2 (2017-04-26)
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))
* fix; updated media packages key words and maintainers ([01bcbc5](https://bitbucket.org/atlassian/atlaskit/commits/01bcbc5))

## 4.5.1 (2017-04-26)
* fix; fixed typescript/validate errors by using explicit type ([d7e1639](https://bitbucket.org/atlassian/atlaskit/commits/d7e1639))

## 4.5.0 (2017-04-26)
* feature; added file and url preview identifiers ([5fd08f1](https://bitbucket.org/atlassian/atlaskit/commits/5fd08f1))

## 4.4.0 (2017-04-21)
* feature; added example details ([fbb8fc1](https://bitbucket.org/atlassian/atlaskit/commits/fbb8fc1))

## 4.3.0 (2017-04-19)
* fix; fix spotify URL ([395c9db](https://bitbucket.org/atlassian/atlaskit/commits/395c9db))
* feature; added a audio file changed video/youtube url previews ([5add9d6](https://bitbucket.org/atlassian/atlaskit/commits/5add9d6))

## 4.2.0 (2017-04-19)
* fix; fix example media item names and add collectionName (otherwise they don't work) ([9cd2b34](https://bitbucket.org/atlassian/atlaskit/commits/9cd2b34))
* fix; fix naming to be consistent ([e86740e](https://bitbucket.org/atlassian/atlaskit/commits/e86740e))
* feature; add createMouseEvent helper method ([794d681](https://bitbucket.org/atlassian/atlaskit/commits/794d681))
* feature; added example media item identifiers to media-test-helpers ([8554af2](https://bitbucket.org/atlassian/atlaskit/commits/8554af2))

## 4.1.0 (2017-04-11)
* feature; update storybook context with insert/update permissions ([3fcb6f0](https://bitbucket.org/atlassian/atlaskit/commits/3fcb6f0))

## 4.0.1 (2017-04-10)
* fix; return an expected value from default fake fetchImageDataUri ([c107164](https://bitbucket.org/atlassian/atlaskit/commits/c107164))

## 3.0.0 (2017-04-03)
* fix; moved media-core into peer dependency for media-test-helpers ([bc24c11](https://bitbucket.org/atlassian/atlaskit/commits/bc24c11))
* breaking; moved media-core to peer dependency for media-test-helpers

## 1.49.0 (2017-03-27)
* feature; bump media-test-helpers version ([2e390f9](https://bitbucket.org/atlassian/atlaskit/commits/2e390f9))
* feature; update dependency media-core to 3.0.0 ([f07416c](https://bitbucket.org/atlassian/atlaskit/commits/f07416c))

## 1.2.0 (2017-03-23)
* fix; fixing the build ([ba21a9d](https://bitbucket.org/atlassian/atlaskit/commits/ba21a9d))
* feature; added 'super' card component ([559579f](https://bitbucket.org/atlassian/atlaskit/commits/559579f))
* breaking; Card API, LinkCard API, FileCard API
* ISSUES CLOSED: FIL-3919
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))
* fix; avoid UI flickering when showing an already loaded collection ([5637ffb](https://bitbucket.org/atlassian/atlaskit/commits/5637ffb))
* feature; allow media-api token generation with access ([d337480](https://bitbucket.org/atlassian/atlaskit/commits/d337480))
* feature; added application links to media-card and restructured ([618650e](https://bitbucket.org/atlassian/atlaskit/commits/618650e))
* feature; media Test Helpers portion of shipit/house_of_cards ([b9e6db9](https://bitbucket.org/atlassian/atlaskit/commits/b9e6db9))

## 1.1.0 (2017-03-09)
* feature; cleaned and updated link card ([5dcae43](https://bitbucket.org/atlassian/atlaskit/commits/5dcae43))
* feature; migrate FilmStrip component + create media-test-helpers ([8896543](https://bitbucket.org/atlassian/atlaskit/commits/8896543))
