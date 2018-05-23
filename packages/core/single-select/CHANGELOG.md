# @atlaskit/single-select

## 4.0.3
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/icon@11.3.0
  - @atlaskit/field-base@9.0.3
  - @atlaskit/droplist@5.0.3
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/spinner@5.0.2
  - @atlaskit/avatar@10.0.6
  - @atlaskit/docs@3.0.4

## 4.0.2
- [patch] Export types for Single select [dd51dad](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd51dad)
- [none] Updated dependencies [dd51dad](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd51dad)

## 4.0.1

## 4.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 3.3.4
- [patch] Makes packages Flow types compatible with version 0.67 [25daac0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25daac0)

## 3.3.3

## 3.3.2
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 3.3.1

## 3.3.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 3.2.4
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 3.2.3
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 3.2.2
- [patch] Fixes dependency on @atlaskit/webdriver-runner to be a devDependency [4567857](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4567857)

## 3.2.1

## 3.2.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 3.1.4

- [patch] Remove index.js from root, fix flow type, remove react from dep [4f1e6d1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f1e6d1)

## 3.1.3
- [patch] Migrate signle-select to atlaskit-mk-2 repo [ee8d580](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee8d580)

## 3.1.2 (2017-11-24)

* bug fix; prevent inline-dialog from closing when event is prevented and prevent default for c (issues closed: ak-3870) ([8ae0c3b](https://bitbucket.org/atlassian/atlaskit/commits/8ae0c3b))
## 3.1.1 (2017-11-24)


* bug fix; fix single select dropdown not closing on blur (issues closed: ak-3916) ([ae1d589](https://bitbucket.org/atlassian/atlaskit/commits/ae1d589))
## 3.1.0 (2017-11-23)



* feature; hide groups without matches when filtering single-select component ([e5dde4b](https://bitbucket.org/atlassian/atlaskit/commits/e5dde4b))
## 3.0.1 (2017-11-13)

* bug fix; fix single select focus in IE11 (issues closed: ak-3832) ([2b83759](https://bitbucket.org/atlassian/atlaskit/commits/2b83759))
## 3.0.0 (2017-10-26)

* breaking; If your item.content is JSX (instead of a string) then you must also supply the new item.label ([9d61a1b](https://bitbucket.org/atlassian/atlaskit/commits/9d61a1b))
* breaking; select items with JSX content now behave correctly (issues closed: ak-3505) ([9d61a1b](https://bitbucket.org/atlassian/atlaskit/commits/9d61a1b))
## 2.0.5 (2017-10-26)

* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 2.0.4 (2017-10-22)

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))
## 2.0.3 (2017-10-18)

* bug fix; updated icon dependency to fix IE 11 issues (issues closed: ak-3709) ([8e93274](https://bitbucket.org/atlassian/atlaskit/commits/8e93274))
## 2.0.2 (2017-10-16)

* bug fix; disabled native autocomplete on the autocomplete component (issues closed: ak-3691) ([c4fd697](https://bitbucket.org/atlassian/atlaskit/commits/c4fd697))
## 2.0.1 (2017-09-11)

* bug fix; standardise placeholders (issues closed: #ak-3406) ([95187e1](https://bitbucket.org/atlassian/atlaskit/commits/95187e1))
## 2.0.0 (2017-09-06)

* bug fix; fix how gridsize is implemented in styles ([586d583](https://bitbucket.org/atlassian/atlaskit/commits/586d583))
* feature; bump field base component for dark mode ([df986db](https://bitbucket.org/atlassian/atlaskit/commits/df986db))
* breaking; Dark mode added for single-select, util-shared-styles removed ([df016de](https://bitbucket.org/atlassian/atlaskit/commits/df016de))
* breaking; darkmode added for single-select ([df016de](https://bitbucket.org/atlassian/atlaskit/commits/df016de))
## 1.19.1 (2017-09-05)

* bug fix; removing unused focus outline from single-select triggers. Fieldbase handles the glo ([7792b87](https://bitbucket.org/atlassian/atlaskit/commits/7792b87))
## 1.19.0 (2017-08-31)




* feature; added loading state for the initial fetching of data on the single-select component (issues closed: ak-3181) ([473effe](https://bitbucket.org/atlassian/atlaskit/commits/473effe))


## 1.18.0 (2017-08-22)

* feature; single select items now support filterValues which, when present, are used instead (issues closed: ak-3348) ([523f485](https://bitbucket.org/atlassian/atlaskit/commits/523f485))
## 1.17.4 (2017-08-21)

* bug fix; fixes bug in single select that would cause the shouldFocus prop to not work on initia ([1a13257](https://bitbucket.org/atlassian/atlaskit/commits/1a13257))
## 1.17.3 (2017-08-11)

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))








## 1.17.2 (2017-07-27)


* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 1.17.1 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 1.17.0 (2017-07-19)

## 1.13.0 (2017-07-17)

## 1.13.0 (2017-07-17)

## 1.13.0 (2017-07-17)


* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 1.13.0 (2017-07-17)


* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 1.12.1 (2017-07-17)


* fix; replace "*" with last version of tooltip "1.2.0" ([769c35d](https://bitbucket.org/atlassian/atlaskit/commits/769c35d))


* feature; adds maxHeight prop to single-select ([296a6e1](https://bitbucket.org/atlassian/atlaskit/commits/296a6e1))

## 1.12.0 (2017-06-29)


* feature; single select has shouldFlip prop that sets whether the droplist should flip its po ([b31523a](https://bitbucket.org/atlassian/atlaskit/commits/b31523a))

## 1.11.0 (2017-06-01)


* feature; add invalidMessage to single-select ([5b30d9a](https://bitbucket.org/atlassian/atlaskit/commits/5b30d9a))

## 1.10.3 (2017-05-31)

## 1.10.2 (2017-05-31)


* fix; bump field-base in single-select to fix invalid icon ([493a339](https://bitbucket.org/atlassian/atlaskit/commits/493a339))
* fix; items now rendered with the correct type ([8761a17](https://bitbucket.org/atlassian/atlaskit/commits/8761a17))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 1.10.1 (2017-05-25)


* fix; opening droplist should focus autocomplete field ([1d3f188](https://bitbucket.org/atlassian/atlaskit/commits/1d3f188))

## 1.10.0 (2017-05-11)


* feature; bump field-base version in single-select ([fcd6dfa](https://bitbucket.org/atlassian/atlaskit/commits/fcd6dfa))

## 1.9.0 (2017-05-10)

## 1.8.0 (2017-05-10)


* fix; fixed imports for icons ([7999eae](https://bitbucket.org/atlassian/atlaskit/commits/7999eae))


* feature; add tooltip support. ([b7445b1](https://bitbucket.org/atlassian/atlaskit/commits/b7445b1))
* feature; bump icon to 6.5.2 version ([92daa36](https://bitbucket.org/atlassian/atlaskit/commits/92daa36))

## 1.7.6 (2017-05-08)

## 1.7.5 (2017-05-08)


* fix; single select - removed ability to control a disabled single-select with the keyboar ([b9102fb](https://bitbucket.org/atlassian/atlaskit/commits/b9102fb))
* fix; single-select - fix groups selecting multiple options ([2a7f469](https://bitbucket.org/atlassian/atlaskit/commits/2a7f469))

## 1.7.4 (2017-05-01)

## 1.7.3 (2017-04-27)


* fix; allow single-select droplist to be wider than the parent ([2ddd9a4](https://bitbucket.org/atlassian/atlaskit/commits/2ddd9a4))
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.7.2 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.7.1 (2017-04-20)


* fix; improve the behaviour of SingleSelect's shouldFocus prop ([edcc82e](https://bitbucket.org/atlassian/atlaskit/commits/edcc82e))

## 1.7.0 (2017-04-20)


* fix; upgrade droplist dependency version ([0dd084d](https://bitbucket.org/atlassian/atlaskit/commits/0dd084d))


* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))


null temporarily revert changes ([8d22c2d](https://bitbucket.org/atlassian/atlaskit/commits/8d22c2d))

## 1.6.1 (2017-03-29)

## 1.6.0 (2017-03-23)

## 1.5.1 (2017-03-23)


* fix; prevent default action if Enter pressed then Select is open ([2e78967](https://bitbucket.org/atlassian/atlaskit/commits/2e78967))
* fix; updates and descriptions ([ec8aca1](https://bitbucket.org/atlassian/atlaskit/commits/ec8aca1))

## 1.5.0 (2017-03-22)

## 1.4.2 (2017-03-21)

## 1.4.2 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))


* feature; selected items will now render their elemBefore content in the select field ([31fa403](https://bitbucket.org/atlassian/atlaskit/commits/31fa403))

## 1.4.1 (2017-03-20)


* fix; select now closes itself after clicking on the trigger ([46638c1](https://bitbucket.org/atlassian/atlaskit/commits/46638c1))


* feature; shouldWrapEditViewWithFieldBase prop on inline-edit and style fixes for single-sele ([4946f21](https://bitbucket.org/atlassian/atlaskit/commits/4946f21))

## 1.4.0 (2017-02-24)


* fix bug when focus doesn't work with previously selected item ([53493ae](https://bitbucket.org/atlassian/atlaskit/commits/53493ae))
* fix bug where only every second item was selected ([bbd09cf](https://bitbucket.org/atlassian/atlaskit/commits/bbd09cf))
* fix the 'dummy search' behavior when dropdown is open ([4176ab3](https://bitbucket.org/atlassian/atlaskit/commits/4176ab3))
* replace null to undefined and fix broken tests ([682506e](https://bitbucket.org/atlassian/atlaskit/commits/682506e))
* small fixes after review ([d356301](https://bitbucket.org/atlassian/atlaskit/commits/d356301))

## 1.3.0 (2017-02-23)


* dummy search is implemented ([cc26e47](https://bitbucket.org/atlassian/atlaskit/commits/cc26e47))

## 1.2.1 (2017-02-22)


* prevent default behavior for 'up' and 'down' key ([86a4716](https://bitbucket.org/atlassian/atlaskit/commits/86a4716))

## 1.2.0 (2017-02-20)


* feature; selects should support different appearances ([961bd5c](https://bitbucket.org/atlassian/atlaskit/commits/961bd5c))
* single select with autocomplete is implemented ([4b22219](https://bitbucket.org/atlassian/atlaskit/commits/4b22219))

## 1.1.0 (2017-02-19)


* feature; Select is now submittable ([5f66784](https://bitbucket.org/atlassian/atlaskit/commits/5f66784))

## 1.0.8 (2017-02-17)


* fix; add a story with groups in single-select ([5c9fbc8](https://bitbucket.org/atlassian/atlaskit/commits/5c9fbc8))

## 1.0.7 (2017-02-15)


* height of the dropdown list is calculated correctly now ([baaedc7](https://bitbucket.org/atlassian/atlaskit/commits/baaedc7))

## 1.0.5 (2017-02-14)

## 1.0.5 (2017-02-14)


* fix broken focus ring and scrolling ([6e30737](https://bitbucket.org/atlassian/atlaskit/commits/6e30737))

## 1.0.4 (2017-02-09)


* fix; avoiding binding render to this ([40c9951](https://bitbucket.org/atlassian/atlaskit/commits/40c9951))

## 1.0.3 (2017-02-07)


* update to the latest field base with the correct design ([ce38252](https://bitbucket.org/atlassian/atlaskit/commits/ce38252))

## 1.0.2 (2017-02-03)


* fix; fix the component name in usage.md ([28e796f](https://bitbucket.org/atlassian/atlaskit/commits/28e796f))
