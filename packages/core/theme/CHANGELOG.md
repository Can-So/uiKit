# @findable/theme

## 8.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/section-message@2.0.1
  - @findable/button@11.0.0

## 8.0.0
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

## 7.0.5
- [patch] [b46504d2e4](https://github.com/fnamazing/uiKit/commits/b46504d2e4):

  - Fixed example docs

## 7.0.4
- [patch] [1a98f74](https://github.com/fnamazing/uiKit/commits/1a98f74):

  - Added the missing unit to box-shadow for focus ring styles

## 7.0.3
- [patch] [899fac7](https://github.com/fnamazing/uiKit/commits/899fac7):

  - added the focus ring and no focus ring styles

## 7.0.2
- [patch] [ca16fa9](https://github.com/fnamazing/uiKit/commits/ca16fa9):

  - Add SSR support to media components

## 7.0.1
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/lozenge@6.2.4
  - @findable/section-message@1.0.14
  - @findable/docs@6.0.0

## 7.0.0
- [major] [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):

  - Change API to experimental theming API to namespace component themes into separate contexts and make theming simpler. Update all dependant components.

## 6.2.1
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/section-message@1.0.11
  - @findable/button@10.0.0

## 6.2.0
- [minor] Add smallFontSize as an export to theme [3469f64](https://github.com/fnamazing/uiKit/commits/3469f64)

## 6.1.1
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 6.1.0
- [minor] Adds new theming API to Avatar and AvatarItem components [79dd93f](https://github.com/fnamazing/uiKit/commits/79dd93f)

## 6.0.4
- [patch] Added assistive styles from util-shared-styles [dc563c1](https://github.com/fnamazing/uiKit/commits/dc563c1)

## 6.0.3
- [patch] fixed font-size and font-weight of h100 in theme to 11px and 700 respectively [9742864](https://github.com/fnamazing/uiKit/commits/9742864)

## 6.0.2
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 6.0.0
- [major] Update badge to the new theming API. Rework experimental theming API. [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
- [none] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/lozenge@6.1.5
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 5.1.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/button@9.0.5
  - @findable/lozenge@6.1.4

## 5.1.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/button@9.0.4
  - @findable/lozenge@6.1.3
  - @findable/docs@5.0.2

## 5.1.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/button@9.0.3
  - @findable/lozenge@6.1.2

## 5.1.0
- [minor] Add new components (Consumer, Provider, Reset and Theme) and deprecate old APIs. New components are marked as experimenta so they may change. Deprecated components can still be used until experimental APIs are finalised. [cd799a5](https://github.com/fnamazing/uiKit/commits/cd799a5)
- [none] Updated dependencies [cd799a5](https://github.com/fnamazing/uiKit/commits/cd799a5)

## 5.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/button@9.0.0
  - @findable/docs@5.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/button@9.0.0
  - @findable/docs@5.0.0

## 4.1.0
- [minor] Added elevations to the Theme package and updated visual styles for the field-range component. [dbd8de7](https://github.com/fnamazing/uiKit/commits/dbd8de7)
- [none] Updated dependencies [dbd8de7](https://github.com/fnamazing/uiKit/commits/dbd8de7)

## 4.0.5
- [patch] Align ADG, Website and AK [dd295bf](https://github.com/fnamazing/uiKit/commits/dd295bf)
- [none] Updated dependencies [dd295bf](https://github.com/fnamazing/uiKit/commits/dd295bf)

## 4.0.4
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/button@8.1.2

## 4.0.3
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/button@8.1.1
  - @findable/docs@4.1.1

## 4.0.2
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/docs@4.1.0
  - @findable/button@8.1.0

## 4.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/button@8.0.1
  - @findable/docs@4.0.1

## 4.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/button@8.0.0
  - @findable/docs@4.0.0

## 3.2.2
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/button@7.2.5
  - @findable/docs@3.0.4

## 3.2.1
- [patch] Add Consolas to our font family [62bacf6](https://github.com/fnamazing/uiKit/commits/62bacf6)
- [none] Updated dependencies [62bacf6](https://github.com/fnamazing/uiKit/commits/62bacf6)

## 3.2.0
- [minor] Add color palette to theme - Jira Porfolio [72ab054](https://github.com/fnamazing/uiKit/commits/72ab054)

## 3.1.1
- [patch] releasing all compo that depends on theme [86a82d2](https://github.com/fnamazing/uiKit/commits/86a82d2)
- [patch] Re-release to fix changes merged with @findable/form [baa3c20](https://github.com/fnamazing/uiKit/commits/baa3c20)

## 3.1.0
- [minor] Added ability to specify an object as the badge appearance. Added an Appearance export to theme so that we can use strings and objects for appearance theming." [6e89615](https://github.com/fnamazing/uiKit/commits/6e89615)

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 2.4.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 2.4.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 2.3.4
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 2.3.3
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 2.3.2
- [patch] added a new layer tooltip [2215bc7](https://github.com/fnamazing/uiKit/commits/2215bc7)

## 2.3.1
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://github.com/fnamazing/uiKit/commits/007de27)

## 2.3.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 2.2.4
- [patch] moved theme to new atlaskit repo [a25b940](https://github.com/fnamazing/uiKit/commits/a25b940)
- [patch] moved theme to new atlaskit repo [a25b940](https://github.com/fnamazing/uiKit/commits/a25b940)

## 2.2.3 (2017-10-27)
* bug fix; triggering storybooks ([87e7247](https://bitbucket.org/atlassian/atlaskit/commits/87e7247))
* bug fix; removed unused dependency on util-shared-styles from the Theme component ([253d8fc](https://bitbucket.org/atlassian/atlaskit/commits/253d8fc))

## 2.2.2 (2017-10-26)
* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 2.2.1 (2017-10-22)
* bug fix; update styled components dep and react peerDep ([5539ada](https://bitbucket.org/atlassian/atlaskit/commits/5539ada))

## 2.2.0 (2017-09-27)
* feature; export "layers" from theme ([15aebe6](https://bitbucket.org/atlassian/atlaskit/commits/15aebe6))

## 2.1.0 (2017-09-13)
* feature; [@atlaskit](https://github.com/atlaskit)/theme now has a named getTheme() function export ([b727679](https://bitbucket.org/atlassian/atlaskit/commits/b727679))

## 2.0.1 (2017-08-11)
* bug fix; Add placeholder color to theme ([ba023fb](https://bitbucket.org/atlassian/atlaskit/commits/ba023fb))

## 2.0.0
* Initial Release
