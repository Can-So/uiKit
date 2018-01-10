# @atlaskit/tabs

## 5.1.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 5.0.1
- [patch] fix tabs so that it re-renders when content props update [9b039dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9b039dd)

## 5.0.0
- [major] Re-write tabs to provide a more flexible API. Breaking changes: 1) The package no longer exports TabsStateless. The Tabs component manages its own state by default, but will behave as a controlled component if the selectedTab prop is set. 2) The component no longer recognises the defaultSelected property on individual tab objects. Tabs now takes a defaultSelectedTab prop which accepts either a tab object or tab index. 3) The tabs prop is now required - the component will not render if this prop is not set. 4) It is no longer possible to render Tabs without a tab being selected. If the defaultSelectedTab and selectedTab props are not set the first tab will be selected by default. [10a5a5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/10a5a5a)

## 4.1.0
- [minor] Update type for label to accept string [0d0ca5f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d0ca5f)

## 4.0.5
- [patch] Migrate to ak-mk-2 [4c679a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4c679a0)

## 4.0.4 (2017-11-17)

* bug fix; bumping internal dependencies to latest version ([f87bb04](https://bitbucket.org/atlassian/atlaskit/commits/f87bb04))
## 4.0.3 (2017-10-26)

* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))
## 4.0.2 (2017-10-22)

* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))

## 4.0.1 (2017-10-04)

* bug fix; tabs now hide overflow, and ellipsis text-overflow (issues closed: #ak3519) ([aa91734](https://bitbucket.org/atlassian/atlaskit/commits/aa91734))




## 4.0.0 (2017-08-11)

* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))

* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* bug fix; fix prop types ([8abfd3c](https://bitbucket.org/atlassian/atlaskit/commits/8abfd3c))
* bug fix; make tab types clearer ([3071418](https://bitbucket.org/atlassian/atlaskit/commits/3071418))
* bug fix; move babel-plugin-react-flow-props-to-prop-types to devDep ([e1cd3aa](https://bitbucket.org/atlassian/atlaskit/commits/e1cd3aa))


* feature; dark mode for Tabs, plus a bunch of cleanup for the component and its docs ([a111cf2](https://bitbucket.org/atlassian/atlaskit/commits/a111cf2))





## 3.0.0 (2017-08-11)

* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* bug fix; fix prop types ([8abfd3c](https://bitbucket.org/atlassian/atlaskit/commits/8abfd3c))
* bug fix; make tab types clearer ([3071418](https://bitbucket.org/atlassian/atlaskit/commits/3071418))
* bug fix; move babel-plugin-react-flow-props-to-prop-types to devDep ([e1cd3aa](https://bitbucket.org/atlassian/atlaskit/commits/e1cd3aa))


* feature; dark mode for Tabs, plus a bunch of cleanup for the component and its docs ([a111cf2](https://bitbucket.org/atlassian/atlaskit/commits/a111cf2))






## 2.4.2 (2017-07-27)


* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 2.4.1 (2017-07-25)


* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 2.1.0 (2017-07-17)

## 2.1.0 (2017-07-17)

## 2.1.0 (2017-07-17)


* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 2.1.0 (2017-07-17)


* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 2.0.0 (2017-05-30)


null refactor tabs to styled-components. Rename StatelessTabs named export to TabsSta ([b77172d](https://bitbucket.org/atlassian/atlaskit/commits/b77172d))


* breaking; Rename StatelessTabs named export to TabsStateless for consistency.

ISSUES CLOSED: #AK-2396

## 1.3.3 (2017-05-26)


* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))
* fix; pin react-lorem-component version to avoid newly released broken version ([6f3d9c6](https://bitbucket.org/atlassian/atlaskit/commits/6f3d9c6))

## 1.3.2 (2017-04-27)


* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.3.1 (2017-04-26)


* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.3.0 (2017-04-20)


* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 1.2.8 (2017-03-23)


* fix; empty commit to force release of tabs ([47d958e](https://bitbucket.org/atlassian/atlaskit/commits/47d958e))

## 1.2.6 (2017-03-21)

## 1.2.6 (2017-03-21)


* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.2.5 (2017-02-22)


* fix; trigger onSelect prop on keyboard nav ([71bb315](https://bitbucket.org/atlassian/atlaskit/commits/71bb315))

## 1.2.4 (2017-02-10)


* fix; render tabs with flex content correctly in FF and IE11 ([dc181da](https://bitbucket.org/atlassian/atlaskit/commits/dc181da))

## 1.2.3 (2017-02-07)

## 1.2.2 (2017-02-07)


* fix; Updates docs to use https to load demo image ([0468d4d](https://bitbucket.org/atlassian/atlaskit/commits/0468d4d))
* fix; small design fixes for tabs ([d3a6666](https://bitbucket.org/atlassian/atlaskit/commits/d3a6666))

## 1.2.1 (2017-02-03)

## 1.2.0 (2017-02-03)


* fix; support centering of tab flex children ([87fe198](https://bitbucket.org/atlassian/atlaskit/commits/87fe198))


* feature; support fitting tabs inside a flex box container ([4158cd8](https://bitbucket.org/atlassian/atlaskit/commits/4158cd8))
