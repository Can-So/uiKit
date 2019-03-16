# @findable/tabs

## 9.0.0
- [major] [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):

  - Drop ES5 from all the flow modules

  ### Dropping CJS support in all @atlaskit packages

  As a breaking change, all @atlaskit packages will be dropping cjs distributions and will only distribute esm. This means all distributed code will be transpiled, but will still contain `import` and
  `export` declarations.

  The major reason for doing this is to allow us to support multiple entry points in packages, e.g:

  ```js
  import colors from `@findable/theme/colors`;
  ```

  Previously this was sort of possible for consumers by doing something like:

  ```js
  import colors from `@findable/theme/dist/esm/colors`;
  ```

  This has a couple of issues. 1, it treats the file system as API making internal refactors harder, we have to worry about how consumers might be using things that aren't *actually* supposed to be used. 2. We are unable to do this *internally* in @atlaskit packages. This leads to lots of packages bundling all of theme, just to use a single color, especially in situations where tree shaking fails.

  To support being able to use multiple entrypoints internally, we unfortunately cannot have multiple distributions as they would need to have very different imports from of their own internal dependencies.

  ES Modules are widely supported by all modern bundlers and can be worked around in node environments.

  We may choose to revisit this solution in the future if we find any unintended condequences, but we see this as a pretty sane path forward which should lead to some major bundle size decreases, saner API's and simpler package architecture.

  Please reach out to #fabric-build (if in Atlassian) or create an issue in [Design System Support](https://ecosystem.atlassian.net/secure/CreateIssue.jspa?pid=24670) (for external) if you have any questions or queries about this.

## 8.0.11
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/spinner@9.0.13
  - @findable/theme@7.0.1
  - @findable/tooltip@12.1.13
  - @findable/docs@6.0.0

## 8.0.10
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/spinner@9.0.12
  - @findable/tooltip@12.1.12
  - @findable/theme@7.0.0

## 8.0.9
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 8.0.8
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 8.0.6
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/tooltip@12.0.9
  - @findable/spinner@9.0.6
  - @findable/docs@5.0.6

## 8.0.5
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/tooltip@12.0.5
  - @findable/analytics-next@3.0.4
  - @findable/theme@5.1.3
  - @findable/spinner@9.0.5

## 8.0.4
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/tooltip@12.0.4
  - @findable/theme@5.1.2
  - @findable/spinner@9.0.4
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2

## 8.0.3
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/tooltip@12.0.3
  - @findable/analytics-next@3.0.2
  - @findable/theme@5.1.1
  - @findable/spinner@9.0.3

## 8.0.2
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/tooltip@12.0.1
  - @findable/analytics-next@3.0.1
  - @findable/spinner@9.0.2
  - @findable/docs@5.0.1

## 8.0.1
- [patch] Updated dependencies [e6b1985](https://github.com/fnamazing/uiKit/commits/e6b1985)
  - @findable/tooltip@12.0.0

## 8.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/tooltip@11.0.0
  - @findable/analytics-next@3.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/tooltip@11.0.0
  - @findable/analytics-next@3.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0

## 7.1.3
- [patch] Updated dependencies [cdba8b3](https://github.com/fnamazing/uiKit/commits/cdba8b3)
  - @findable/spinner@8.0.0

## 7.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/tooltip@10.2.1
  - @findable/theme@4.0.4
  - @findable/spinner@7.0.2

## 7.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/spinner@7.0.1
  - @findable/docs@4.1.1

## 7.1.0
- [patch] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/spinner@7.0.0
  - @findable/tooltip@10.2.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2

## 7.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/tooltip@10.0.1
  - @findable/theme@4.0.1
  - @findable/spinner@6.0.1
  - @findable/docs@4.0.1

## 7.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/tooltip@10.0.0
  - @findable/theme@4.0.0
  - @findable/spinner@6.0.0
  - @findable/docs@4.0.0

## 6.0.3
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/tooltip@9.2.1
  - @findable/theme@3.2.2
  - @findable/spinner@5.0.2
  - @findable/docs@3.0.4

## 6.0.1
- [patch] Update types [0073768](https://github.com/fnamazing/uiKit/commits/0073768)

## 6.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 5.2.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 5.2.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 5.1.3
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 5.1.2
- [patch] Tabs now abide by selected prop when tabs and selected props both change, instead of using internal selected state [3facabc](https://github.com/fnamazing/uiKit/commits/3facabc)

## 5.1.1
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 5.1.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 5.0.1
- [patch] fix tabs so that it re-renders when content props update [9b039dd](https://github.com/fnamazing/uiKit/commits/9b039dd)

## 5.0.0
- [major] Re-write tabs to provide a more flexible API. Breaking changes: 1) The package no longer exports TabsStateless. The Tabs component manages its own state by default, but will behave as a controlled component if the selectedTab prop is set. 2) The component no longer recognises the defaultSelected property on individual tab objects. Tabs now takes a defaultSelectedTab prop which accepts either a tab object or tab index. 3) The tabs prop is now required - the component will not render if this prop is not set. 4) It is no longer possible to render Tabs without a tab being selected. If the defaultSelectedTab and selectedTab props are not set the first tab will be selected by default. [10a5a5a](https://github.com/fnamazing/uiKit/commits/10a5a5a)

## 4.1.0
- [minor] Update type for label to accept string [0d0ca5f](https://github.com/fnamazing/uiKit/commits/0d0ca5f)

## 4.0.5
- [patch] Migrate to ak-mk-2 [4c679a0](https://github.com/fnamazing/uiKit/commits/4c679a0)

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
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 2.1.0 (2017-07-17)
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 2.0.0 (2017-05-30)
* refactor tabs to styled-components. Rename StatelessTabs named export to TabsSta ([b77172d](https://bitbucket.org/atlassian/atlaskit/commits/b77172d))
* breaking; Rename StatelessTabs named export to TabsStateless for consistency.
* ISSUES CLOSED: #AK-2396

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
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.2.5 (2017-02-22)
* fix; trigger onSelect prop on keyboard nav ([71bb315](https://bitbucket.org/atlassian/atlaskit/commits/71bb315))

## 1.2.4 (2017-02-10)
* fix; render tabs with flex content correctly in FF and IE11 ([dc181da](https://bitbucket.org/atlassian/atlaskit/commits/dc181da))

## 1.2.2 (2017-02-07)
* fix; Updates docs to use https to load demo image ([0468d4d](https://bitbucket.org/atlassian/atlaskit/commits/0468d4d))
* fix; small design fixes for tabs ([d3a6666](https://bitbucket.org/atlassian/atlaskit/commits/d3a6666))

## 1.2.0 (2017-02-03)
* fix; support centering of tab flex children ([87fe198](https://bitbucket.org/atlassian/atlaskit/commits/87fe198))
* feature; support fitting tabs inside a flex box container ([4158cd8](https://bitbucket.org/atlassian/atlaskit/commits/4158cd8))
