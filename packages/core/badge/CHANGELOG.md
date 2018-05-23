# @atlaskit/badge

## 7.1.2
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 7.1.1

## 7.1.0
- [minor] Added ability to specify an object as the badge appearance. Added an Appearance export to theme so that we can use strings and objects for appearance theming." [6e89615](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e89615)

## 7.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 6.3.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 6.3.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 6.2.2
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 6.2.1
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 6.2.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 6.1.8

## 6.1.7

## 6.1.6

## 6.1.5

## 6.1.4

## 6.1.0 (2017-08-24)

* feature; remove util-shared-styles as a dependency ([52a0a63](https://bitbucket.org/atlassian/atlaskit/commits/52a0a63))
* feature; adjust dark mode colors to spec 1.2, add primaryInveted appearance ([9c79e7b](https://bitbucket.org/atlassian/atlaskit/commits/9c79e7b))

## 6.0.0 (2017-08-11)

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))
* bug fix; reimplement appearance prop validation for badges ([25dabe3](https://bitbucket.org/atlassian/atlaskit/commits/25dabe3))
* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))

## 5.0.0 (2017-08-11)

* bug fix; reimplement appearance prop validation for badges ([25dabe3](https://bitbucket.org/atlassian/atlaskit/commits/25dabe3))
* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))

## 4.5.2 (2017-07-27)

* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 4.5.1 (2017-07-25)

* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 4.2.0 (2017-07-17)

## 4.2.0 (2017-07-17)

## 4.2.0 (2017-07-17)

* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 4.2.0 (2017-07-17)

* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 4.1.0 (2017-07-06)

* feature; reducing the contrast of white on blue for global nav ([ff89e2b](https://bitbucket.org/atlassian/atlaskit/commits/ff89e2b))

## 4.0.5 (2017-05-26)

* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 4.0.4 (2017-05-23)

## 4.0.3 (2017-05-10)

* fix; testing releasing more than 5 packages at a time ([e69b832](https://bitbucket.org/atlassian/atlaskit/commits/e69b832))
* fix; update dependencies ([0c92fef](https://bitbucket.org/atlassian/atlaskit/commits/0c92fef))

## 4.0.2 (2017-04-27)

* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 4.0.1 (2017-04-26)

* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 4.0.0 (2017-04-12)

null align component with new conventions ([726dc9b](https://bitbucket.org/atlassian/atlaskit/commits/726dc9b))

* breaking; removed TypeScript

ISSUES CLOSED: AK-2084

## 3.0.2 (2017-04-11)

* fix; update badge stories to fix proptype bug ([0fa922f](https://bitbucket.org/atlassian/atlaskit/commits/0fa922f))

## 3.0.1 (2017-04-10)

* fix; simplify the Badge component, fixes tests and docs ([07946a1](https://bitbucket.org/atlassian/atlaskit/commits/07946a1))

## 3.0.0 (2017-03-29)

* feature; update badge to use new guidelines, and readme story ([fe7bd5a](https://bitbucket.org/atlassian/atlaskit/commits/fe7bd5a))
* breaking; remove APPEARANCE_ENUM and THEME_ENUM from exports

ISSUES CLOSED: AK-1534

## 2.0.0 (2017-03-27)

null refactor the badge component to use styled-components ([70aa262](https://bitbucket.org/atlassian/atlaskit/commits/70aa262))

* breaking; badges now require peerDep styled-components

ISSUES CLOSED: AK-1943

## 1.2.3 (2017-03-23)

* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

null refactor the badge component to use styled-components ([a5c8722](https://bitbucket.org/atlassian/atlaskit/commits/a5c8722))

* breaking; badges now require peerDep styled-components

ISSUES CLOSED: AK-1943

## 1.2.1 (2017-03-21)

## 1.2.1 (2017-03-21)

* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.2.0 (2017-03-16)

## 1.1.0 (2017-03-15)

* feature; added application links to media-card and restructured ([618650e](https://bitbucket.org/atlassian/atlaskit/commits/618650e))
* feature; added typescript definition file to badges ([a067336](https://bitbucket.org/atlassian/atlaskit/commits/a067336))

## 1.0.3 (2017-02-16)

* fix; refactor stories to use // rather than http:// ([a0826cf](https://bitbucket.org/atlassian/atlaskit/commits/a0826cf))

## 1.0.2 (2017-02-10)

* fix; Dummy commit to release components to registry ([5bac43b](https://bitbucket.org/atlassian/atlaskit/commits/5bac43b))

## 1.0.1 (2017-02-06)

* fix; Bumps dependencies to used scoped packages ([f41dbfc](https://bitbucket.org/atlassian/atlaskit/commits/f41dbfc))
