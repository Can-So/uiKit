# @atlaskit/media-core

## 18.1.1
- [patch] Updated dependencies [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
  - @atlaskit/media-store@3.0.1

## 18.1.0
- [minor] media-picker: <All but popup picker>.emitUploadEnd second argument shape has changed from MediaFileData to FileDetails; `upload-end` event payload body shape changed from MediaFileData to FileDetails; All the media pickers config now have new property `useNewUploadService: boolean` (false by default); popup media-picker .cancel can't be called with no argument, though types does allow for it; `File` is removed; --- media-store: MediaStore.createFile now has a required argument of type MediaStoreCreateFileParams; MediaStore.copyFileWithToken new method; uploadFile method result type has changed from just a promise to a UploadFileResult type; --- media-test-helpers: mediaPickerAuthProvider argument has changed from a component instance to just a boolean authEnvironment; [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
- [minor] SUMMARY GOES HERE [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
- [patch] Updated dependencies [84f6f91](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/84f6f91)
  - @atlaskit/media-store@3.0.0
- [minor] Updated dependencies [9041d71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9041d71)
  - @atlaskit/media-store@3.0.0

## 18.0.3
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/media-store@2.1.1
  - @atlaskit/button@7.2.5
  - @atlaskit/docs@3.0.4

## 18.0.2
- [patch] Turn side effects to true due to rxjs operators imports [668f01c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/668f01c)

## 18.0.1

## 18.0.0
- [major] FileDetails' `id` property is now mandatory\nAuth interfaces moves from media-core to media-store, though still exported from media-core\nNew Interfaces (UploadableFile, UploadFileCallbacks) are exported from media-store\nMediaStore calls fixed with collection supplied during auth-provider call [d7b5021](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7b5021)

## 17.0.0
- [major] MediaCollectionProvider now emits errors as next values in observable() [f22e2a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f22e2a0)

## 16.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 15.3.0
- [minor] use local preview in MediaCard when available [b33788b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b33788b)

## 15.2.0
- [minor] MSW-531: add cancelable methods to blobService [7f84f67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7f84f67)

## 15.1.0
- [minor] Release first version of image viewer for Media Viewer Next Generation [dd1893a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd1893a)

## 15.0.1

- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 15.0.0
- [major] icons are now assignable to card actions, which will cause media cards to render upto 2 icon buttons, or a dropdown menu if more than 2 actions are set [649871c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/649871c)

## 14.1.1
- [patch] fix(media-test-helpers): configure fetch to send credentials and point calls to correct endpoint [8978f4e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8978f4e)

## 14.1.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 14.0.1
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 14.0.0
- [major] Move media provider and state manager to editor-core [0601da7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0601da7)

## 13.0.0



- [major] change thumbnail interface according to new MediaPicker one [5c889c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5c889c4)

## 12.1.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 12.0.3
- [patch] Use media-test-helpers instead of hardcoded values [f2b92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f2b92f8)

## 12.0.2

## 12.0.1

## 12.0.0
- [major] Show static images for gifs in small cards [e2508f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e2508f9)
* breaking; Api for DataUriService has changed
before:
```typescript
interface fetchImageDataUri(
    mediaItem: MediaItem,
    width: number,
    height: number,
    mode?: ImageResizeMode,
    allowAnimated?: boolean): Promise<DataUri>;
``` 
after:
```typescript
interface FetchImageOptions {
  width: number;
  height: number;
  mode?: ImageResizeMode;
  allowAnimated?: boolean;
}

interface fetchImageDataUri(
    mediaItem: MediaItem,
    options: FetchImageOptions,
  ): Promise<DataUri>;
```


## 11.0.2

## 11.0.1
- [patch] Move media-core to mk2 biuld repo [379a8ad](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/379a8ad)

## 11.0.0 (2017-11-14)

* breaking; updated the interface of MediaState to reflect the changes on mediapicker ([cbee946](https://bitbucket.org/atlassian/atlaskit/commits/cbee946))
* breaking; updated the interface of MediaState to reflect the changes on mediapicker ([cbee946](https://bitbucket.org/atlassian/atlaskit/commits/cbee946))
## 10.2.0 (2017-10-10)

* feature; updated contextConfig to include userAuthProvider. ([3cfb5d0](https://bitbucket.org/atlassian/atlaskit/commits/3cfb5d0))

* feature; updated contextConfig to include userAuthProvider. ([03f200e](https://bitbucket.org/atlassian/atlaskit/commits/03f200e))


## 10.1.0 (2017-09-12)

* feature; support asap issuer in media-core context ([eff2b56](https://bitbucket.org/atlassian/atlaskit/commits/eff2b56))

* breaking; 
ContextConfig type has changed. `clientId` and `tokenProvider` are replaced with
single `authProvider`. It's a function that takes `AuthContext` (currently object with `collectionName` key),
and returns a `Promise` that resolved with `Auth` object. `Auth` object can have either `clientId` + `token` 
keys or `asapIssuer` + `token`. This also changed `MediaApiConfig` 
(type of an object returned from `context.apiConfig()`) - `tokenProvider` was replaces with `authProvider`.
See `USAGE.md` for more details.

* breaking;
Constructor arguments of `DataUriService` has changed. `clientId` and `tokenProvider` replaced with `authProvider`.

* breaking;
`FileProvider.fromMediaApi` doesnt take `clientId` as 4th argument.<br/>
`FileProvider.fromFileService` doesnt take `clientId` as 3rd argument.<br/>
`LinkProvider.fromMediaApi` doesnt take `clientId` as 3rd argument.<br/>
`LinkProvider.fromLinkService` doesnt take `clientId` as 3rd argument.<br/>
`MediaItemProvider.fromMediaApi` doesnt take `clientId` as 5th argument.<br/>
`MediaItemProvider.fromPool` doesnt take `clientId` as 6th argument.<br/>
`MediaUrlPreviewProvider.fromMediaApi` doesnt take `clientId` as 3rd argument.<br/>
`MediaUrlPreviewProvider.fromPool` doesnt take `clientId` as 4th argument.<br/>
`RemoteMediaCollectionProvider.fromMediaAPI` doesnt take `clientId` as 3rd argument.<br/>
`RemoteMediaCollectionProvider.fromPool` doesnt take `clientId` as 4th argument.<br/>
`UrlPreviewProvider.fromMediaAPI` doesnt take `clientId` as 3rd argument.<br/>
`UrlPreviewProvider.fromUrlPreviewService` doesnt take `clientId` as 3rd argument.<br/> 


## 9.0.0 (2017-08-07)

* breaking; removed trello types ([ce181b4](https://bitbucket.org/atlassian/atlaskit/commits/ce181b4))
* breaking; remove trello app types and update to adhere to latest api signatures ([ce181b4](https://bitbucket.org/atlassian/atlaskit/commits/ce181b4))




## 8.4.1 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 8.4.0 (2017-07-19)


* feature; add support for smart-card links from the API ([ff95bc6](https://bitbucket.org/atlassian/atlaskit/commits/ff95bc6))

## 8.3.0 (2017-07-18)


* feature; added smart card payload ([3f1691e](https://bitbucket.org/atlassian/atlaskit/commits/3f1691e))

## 8.2.0 (2017-06-28)


* fix; use full-fit mode instead of crop for /image endpoint ([4de7d32](https://bitbucket.org/atlassian/atlaskit/commits/4de7d32))


* feature; allow to pass imageResizeMode to fetchImageDataUri ([379aade](https://bitbucket.org/atlassian/atlaskit/commits/379aade))

## 8.1.0 (2017-06-06)


* feature; allow createRequest method to prevent preflight requests ([3f50ebc](https://bitbucket.org/atlassian/atlaskit/commits/3f50ebc))
* feature; prevent preflight requests in CollectionService & LinkService ([25d87da](https://bitbucket.org/atlassian/atlaskit/commits/25d87da))

## 8.0.1 (2017-05-29)


* fix; export media state status from media-core ([fb8dcb5](https://bitbucket.org/atlassian/atlaskit/commits/fb8dcb5))

## 7.0.0 (2017-05-18)


* feature; changed CollectionProvider and its pooling behaviour ([ce4679c](https://bitbucket.org/atlassian/atlaskit/commits/ce4679c))


* breaking; changed CollectionProvider and its pooling behaviour

ISSUES CLOSED: FIL-4226

## 6.1.1 (2017-05-11)


* fix; preventing unsubscribe from modifying array iterator, preventing 'unfinalized' statu ([26e42b8](https://bitbucket.org/atlassian/atlaskit/commits/26e42b8))

## 6.1.0 (2017-05-09)

## 6.0.3 (2017-05-08)

## 6.0.2 (2017-05-03)


* fix; add missing signature on interface ([009fe3a](https://bitbucket.org/atlassian/atlaskit/commits/009fe3a))
* fix; move editor-relate media components into media-core (defaultMediaProvider, mediaStat ([c85be66](https://bitbucket.org/atlassian/atlaskit/commits/c85be66))
* fix; use common mediaProvider for both renderer and editor-core ([7ed6650](https://bitbucket.org/atlassian/atlaskit/commits/7ed6650))


* feature; add Webp support to requests ([1239b33](https://bitbucket.org/atlassian/atlaskit/commits/1239b33))

## 6.0.1 (2017-04-27)

## 6.0.0 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 5.5.2 (2017-04-27)


* fix; added a refresh() method on the collection controller" ([17c6b1f](https://bitbucket.org/atlassian/atlaskit/commits/17c6b1f))


* feature; added a refresh() method on the collection controller ([866c778](https://bitbucket.org/atlassian/atlaskit/commits/866c778))


* breaking; The complete callback is no longer called on the CollectionProvider

## 5.5.1 (2017-04-26)

## 5.5.0 (2017-04-26)


* feature; added a refresh() method on the collection controller ([87b008b](https://bitbucket.org/atlassian/atlaskit/commits/87b008b))

## 5.4.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))
* fix; updated media packages key words and maintainers ([01bcbc5](https://bitbucket.org/atlassian/atlaskit/commits/01bcbc5))

## 5.4.0 (2017-04-18)


* fix; call function isIE() ([85a5f07](https://bitbucket.org/atlassian/atlaskit/commits/85a5f07))
* fix; call utility function ([0a7f1c1](https://bitbucket.org/atlassian/atlaskit/commits/0a7f1c1))
* fix; fix tests to run in IE ([62b4e00](https://bitbucket.org/atlassian/atlaskit/commits/62b4e00))


* feature; add utility function to detect if we need to specify crossorigin property for img e ([5536b7a](https://bitbucket.org/atlassian/atlaskit/commits/5536b7a))

## 5.3.0 (2017-04-10)


* feature; expose media collection provider interface ([9071b45](https://bitbucket.org/atlassian/atlaskit/commits/9071b45))

## 5.2.1 (2017-04-07)


* fix; fix unhandled promise error and broken test (which isn't actually failing) ([b213f0c](https://bitbucket.org/atlassian/atlaskit/commits/b213f0c))

## 5.2.0 (2017-04-06)


* fix; change nextInclusiveStartKey on RemoteCollectionItemsResponse to be optional ([8ee8039](https://bitbucket.org/atlassian/atlaskit/commits/8ee8039))


* feature; collection controller can load next page until given predicate ([1424c57](https://bitbucket.org/atlassian/atlaskit/commits/1424c57))

## 5.1.0 (2017-04-04)


* feature; export DataUriService ([1cd019c](https://bitbucket.org/atlassian/atlaskit/commits/1cd019c))

## 5.0.4 (2017-03-31)

## 5.0.3 (2017-03-31)


* fix; make addLinkItem method send metadata properly ([21a0cc1](https://bitbucket.org/atlassian/atlaskit/commits/21a0cc1))
* fix; return an error when the URLPreview endpoint returns an error with a successful stat ([a85b1c0](https://bitbucket.org/atlassian/atlaskit/commits/a85b1c0))

## 5.0.2 (2017-03-29)

## 5.0.1 (2017-03-29)


* fix; repush stories for broken releases ([9032923](https://bitbucket.org/atlassian/atlaskit/commits/9032923))

## 4.0.0 (2017-03-28)

## 4.0.0 (2017-03-28)


* fix; bump media packages and fix ts errors ([dcc463d](https://bitbucket.org/atlassian/atlaskit/commits/dcc463d))
* fix; pass missing collectionName to createRequest ([5ea22d8](https://bitbucket.org/atlassian/atlaskit/commits/5ea22d8))


* feature; modified Context.getMediaItemProvider to use a MediaItem if provided ([a6128cd](https://bitbucket.org/atlassian/atlaskit/commits/a6128cd))


* breaking; Changed the CollectionService response to be similar to an array of MediaItems. Typed

processingStatus.

ISSUES CLOSED: FIL-3542

## 2.0.0 (2017-03-25)


null expose config on context ([256fde2](https://bitbucket.org/atlassian/atlaskit/commits/256fde2))


* feature; add collection action and event handler ([d6a07a3](https://bitbucket.org/atlassian/atlaskit/commits/d6a07a3))
* feature; add details support in collections service ([477ee0f](https://bitbucket.org/atlassian/atlaskit/commits/477ee0f))
* feature; add occurrence key to media collection item ([3705deb](https://bitbucket.org/atlassian/atlaskit/commits/3705deb))


* breaking; Context API changed
* breaking; MediaCollectionItem API changed
* breaking; CollectionService API changed

## 1.99.1 (2017-03-24)


* fix; refactor media-core services to use a common method for doing XHR ([80a3576](https://bitbucket.org/atlassian/atlaskit/commits/80a3576))

## 1.3.0 (2017-03-23)


* fix; fixing the build ([ba21a9d](https://bitbucket.org/atlassian/atlaskit/commits/ba21a9d))

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-23)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)


* feature; added 'super' card component ([559579f](https://bitbucket.org/atlassian/atlaskit/commits/559579f))


* breaking; Card API, LinkCard API, FileCard API

ISSUES CLOSED: FIL-3919

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-22)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-21)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-20)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-17)

## 1.3.0 (2017-03-16)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)


* feature; media core changes as part of shipit ([d13526e](https://bitbucket.org/atlassian/atlaskit/commits/d13526e))

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-15)


* feature; added application links to media-card and restructured ([618650e](https://bitbucket.org/atlassian/atlaskit/commits/618650e))

## 1.3.0 (2017-03-15)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-14)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-13)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)


* fix; add addLinkItem interface member to context ([b548257](https://bitbucket.org/atlassian/atlaskit/commits/b548257))

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-09)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)


* feature; updated linkCard to take either a stored link or url ([704f16d](https://bitbucket.org/atlassian/atlaskit/commits/704f16d))

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-08)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)

## 1.3.0 (2017-03-07)


* fix; fix TS issues with media-card ([6fd3f27](https://bitbucket.org/atlassian/atlaskit/commits/6fd3f27))


* feature; add method 'addLinkItem' to the link service ([0b0d9d3](https://bitbucket.org/atlassian/atlaskit/commits/0b0d9d3))

## 1.2.2 (2017-03-06)


* fix; fix processing status (fixes card file caching) ([668780e](https://bitbucket.org/atlassian/atlaskit/commits/668780e))


* feature; migrate FilmStrip component + create media-test-helpers ([8896543](https://bitbucket.org/atlassian/atlaskit/commits/8896543))
* feature; move MediaKit into Atlaskit ([98de4f3](https://bitbucket.org/atlassian/atlaskit/commits/98de4f3))

## 1.2.1 (2017-03-06)


* fix; declare axios as dependency ([609768c](https://bitbucket.org/atlassian/atlaskit/commits/609768c))

## 1.2.0 (2017-03-02)


* fix; moved lru-fast to dependencies ([85f7f8f](https://bitbucket.org/atlassian/atlaskit/commits/85f7f8f))
* fix; specified lru-fast as a dependency within media-core instead of devDependency ([c505959](https://bitbucket.org/atlassian/atlaskit/commits/c505959))


* feature; migrated card from mediakit repo to atlaskit ([438a050](https://bitbucket.org/atlassian/atlaskit/commits/438a050))

## 1.1.1 (2017-02-27)

## 1.1.0 (2017-02-27)


* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))


* feature; move providers, services, and context to Atlaskit ([31ca242](https://bitbucket.org/atlassian/atlaskit/commits/31ca242))

## 1.0.0 (2017-02-12)


* feature; commits ([7f474ea](https://bitbucket.org/atlassian/atlaskit/commits/7f474ea))
* feature; add media-core models ([63f2d78](https://bitbucket.org/atlassian/atlaskit/commits/63f2d78))
