# @atlaskit/util-data-test

## 8.0.3
- [patch] Patch release util-data-test to bump emoji [49ff12f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49ff12f)

## 8.0.2

## 8.0.1
- [patch] FS-1697 move elements packages to use util-data-test for test data [deb820a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/deb820a)

## 8.0.0 (2018-03-27)


* breaking; Change structure of exports in elements packages ([7c0b226](https://bitbucket.org/atlassian/atlaskit/commits/7c0b226))
* breaking; fS-1697 moved testing and example utils to util-data-test ([7c0b226](https://bitbucket.org/atlassian/atlaskit/commits/7c0b226))
## 7.3.0 (2018-02-13)

* feature; migrated json data back to util-data-test ([d03b160](https://bitbucket.org/atlassian/atlaskit/commits/d03b160))
## 7.2.1 (2018-01-17)

* bug fix; missing json files are breaking mk-2 ([0e5e8db](https://bitbucket.org/atlassian/atlaskit/commits/0e5e8db))
## 7.2.0 (2018-01-17)

* feature; move test json files from fabric packages ([a0dd818](https://bitbucket.org/atlassian/atlaskit/commits/a0dd818))
## 7.1.1 (2017-09-08)

* bug fix; fix regex in mock-profile-client to match lower and uppercase error strings (issues closed: dir-376) ([e52930f](https://bitbucket.org/atlassian/atlaskit/commits/e52930f))


## 7.1.0 (2017-08-04)

* feature; update mock-profile-client to be able to return custom error responses ([1a99156](https://bitbucket.org/atlassian/atlaskit/commits/1a99156))




## 5.0.0 (2017-07-25)


* fix; fix build to not fail copying something that no longer exists. ;) ([ebb411b](https://bitbucket.org/atlassian/atlaskit/commits/ebb411b))

## 5.0.0 (2017-07-25)


* feature; remove emoji and mention test data from util-data-test. ([c3604f1](https://bitbucket.org/atlassian/atlaskit/commits/c3604f1))


* breaking; Emoji and mention data can now be imported directly from the component.

ISSUES CLOSED: FS-1205

## 4.10.2 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))
* fix; don't use dev/peer deps as it breaks components on upgrade that don't supply all pee ([52e5249](https://bitbucket.org/atlassian/atlaskit/commits/52e5249))

## 4.10.1 (2017-07-20)


* fix; emojiDescription 'duck types' in the test data need to specify the searchable property ([c301d9c](https://bitbucket.org/atlassian/atlaskit/commits/c301d9c))

## 4.10.0 (2017-07-14)


* feature; move profilecard stories helpers into util-data-test ([b93209b](https://bitbucket.org/atlassian/atlaskit/commits/b93209b))

## 4.9.1 (2017-07-11)


* fix; bump emoji to the latest version ([2342c9a](https://bitbucket.org/atlassian/atlaskit/commits/2342c9a))

## 4.9.0 (2017-07-07)


* fix; fS-1125 Test package has test too :facepalm: ([78540f2](https://bitbucket.org/atlassian/atlaskit/commits/78540f2))


* feature; fS-1125 Update mention test data ([f6c8978](https://bitbucket.org/atlassian/atlaskit/commits/f6c8978))

## 4.8.0 (2017-07-05)


* feature; updated atlassian emoji test data in util-data-test ([f7bf773](https://bitbucket.org/atlassian/atlaskit/commits/f7bf773))

## 4.7.0 (2017-06-28)


* feature; fS-1090 Update util-data-test to handle isFiltering and new query parameter in filt ([feb1fc4](https://bitbucket.org/atlassian/atlaskit/commits/feb1fc4))
* feature; fS-1090 Bump mention version ([1274606](https://bitbucket.org/atlassian/atlaskit/commits/1274606))

## 4.6.1 (2017-06-20)

## 4.4.0 (2017-06-20)


* fix; changed build scripts to export mention data ([aab2242](https://bitbucket.org/atlassian/atlaskit/commits/aab2242))

## 4.4.0 (2017-06-20)

## 4.4.0 (2017-06-19)

## 4.3.0 (2017-06-19)


* fix; integrated native emoji convert breaking changes to MockEmojiResource ([f039649](https://bitbucket.org/atlassian/atlaskit/commits/f039649))


* feature; add ascii emoji input rule to automatically match and convert ascii representations ([b404019](https://bitbucket.org/atlassian/atlaskit/commits/b404019))
* feature; extracted shared mention testing data to package ([b189402](https://bitbucket.org/atlassian/atlaskit/commits/b189402))

## 4.2.1 (2017-05-18)


* fix; fix dependency on emoji to get latest EmojiRepository ([eb0e0e6](https://bitbucket.org/atlassian/atlaskit/commits/eb0e0e6))

## 4.2.0 (2017-05-08)


* feature; update of shared emoji testing data ([18c9ef5](https://bitbucket.org/atlassian/atlaskit/commits/18c9ef5))

## 4.1.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 4.1.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 4.1.0 (2017-04-13)


* feature; feature commit to trigger release ([a849b8b](https://bitbucket.org/atlassian/atlaskit/commits/a849b8b))

## 3.0.0 (2017-04-03)

## 2.1.3 (2017-04-03)


* fix; add description, force a release. ([10898af](https://bitbucket.org/atlassian/atlaskit/commits/10898af))
* fix; bump package version to prevent linking by reactions due to breaking change. ([1aacc41](https://bitbucket.org/atlassian/atlaskit/commits/1aacc41))


* feature; upgrade to Emoji 13.0.0 compatible data set ([bce544a](https://bitbucket.org/atlassian/atlaskit/commits/bce544a))


* breaking; Dataset is not compatible with earlier versions of the Emoji component

ISSUES CLOSED: FS-850

## 2.1.1 (2017-03-21)

## 2.1.1 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 2.1.0 (2017-03-14)

## 1.0.0 (2017-03-14)


* fix; defer loading of test data unless used ([3630f3b](https://bitbucket.org/atlassian/atlaskit/commits/3630f3b))


* feature; add shared data component for sharing test/story data and mocks for between compone ([058e642](https://bitbucket.org/atlassian/atlaskit/commits/058e642))
* feature; adjust exports. Move test from emoji. ([0b04066](https://bitbucket.org/atlassian/atlaskit/commits/0b04066))
