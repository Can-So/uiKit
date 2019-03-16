# @findable/table-tree

## 6.0.2
- [patch] [59eb35b62f](https://github.com/fnamazing/uiKit/commits/59eb35b62f):

  - Quick change to TableTree is now compatible with SSR. This required moving setState to componentDidMount().

## 6.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/empty-state@4.0.1
  - @findable/icon@16.0.5
  - @findable/section-message@2.0.1
  - @findable/select@8.0.3
  - @findable/spinner@10.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 6.0.0
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

## 5.0.7
- Updated dependencies [06713e0a0c](https://github.com/fnamazing/uiKit/commits/06713e0a0c):
  - @findable/select@7.0.0

## 5.0.6
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/section-message@1.0.16
  - @findable/select@6.1.19
  - @findable/icon@16.0.0

## 5.0.5
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/button@10.1.1
  - @findable/empty-state@3.1.4
  - @findable/icon@15.0.2
  - @findable/section-message@1.0.14
  - @findable/select@6.1.13
  - @findable/spinner@9.0.13
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 5.0.4
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/empty-state@3.1.3
  - @findable/icon@15.0.1
  - @findable/section-message@1.0.13
  - @findable/select@6.1.10
  - @findable/spinner@9.0.12
  - @findable/theme@7.0.0

## 5.0.3
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/section-message@1.0.12
  - @findable/select@6.1.9
  - @findable/icon@15.0.0

## 5.0.2
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/empty-state@3.1.2
  - @findable/icon@14.6.1
  - @findable/section-message@1.0.11
  - @findable/select@6.1.8
  - @findable/spinner@9.0.11
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 5.0.1
- [patch] [a637f5e](https://github.com/fnamazing/uiKit/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @findable/analytics-next HOCs to allow flow to type check properly

## 5.0.0
- [major] [90109e9"
d](https://github.com/fnamazing/uiKit/commits/90109e9"
d):

  * added isDefaultExpanded flag to control default expansion state
  * Row component now takes in isExpanded prop to control the expansion state

## 4.1.11
- [patch] Fixing blank state for datetime-picker in Firefox.  [0e6d838](https://github.com/fnamazing/uiKit/commits/0e6d838)

## 4.1.10
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 4.1.9
- [patch] add an example which renders a custom component [371a771](https://github.com/fnamazing/uiKit/commits/371a771)

## 4.1.8
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/section-message@1.0.8
  - @findable/select@6.0.2
  - @findable/icon@14.0.0

## 4.1.7
- [patch] Updated dependencies [4194aa4](https://github.com/fnamazing/uiKit/commits/4194aa4)
  - @findable/select@6.0.0

## 4.1.6
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 4.1.4
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/spinner@9.0.6
  - @findable/select@5.0.9
  - @findable/section-message@1.0.5
  - @findable/icon@13.2.5
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 4.1.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/select@5.0.8
  - @findable/analytics-next@3.0.4
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/spinner@9.0.5
  - @findable/section-message@1.0.4
  - @findable/icon@13.2.4

## 4.1.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/select@5.0.7
  - @findable/icon@13.2.2
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/spinner@9.0.4
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2

## 4.1.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/select@5.0.6
  - @findable/analytics-next@3.0.2
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/spinner@9.0.3
  - @findable/icon@13.2.1

## 4.1.0
- [minor] Added a new helper method appendItem in tableTreeHelper class [f520c93](https://github.com/fnamazing/uiKit/commits/f520c93)

## 4.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/select@5.0.2
  - @findable/analytics-next@3.0.1
  - @findable/button@9.0.2
  - @findable/spinner@9.0.2
  - @findable/docs@5.0.1

## 4.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/select@5.0.0
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/icon@13.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/select@5.0.0
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/icon@13.0.0

## 3.1.3
- [patch] Updated dependencies [cdba8b3](https://github.com/fnamazing/uiKit/commits/cdba8b3)
  - @findable/spinner@8.0.0
  - @findable/button@8.2.3

## 3.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/select@4.2.3
  - @findable/button@8.1.2
  - @findable/theme@4.0.4
  - @findable/spinner@7.0.2
  - @findable/icon@12.1.2

## 3.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/spinner@7.0.1
  - @findable/select@4.2.1
  - @findable/icon@12.1.1
  - @findable/button@8.1.1
  - @findable/docs@4.1.1

## 3.1.0
- [patch] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/spinner@7.0.0
  - @findable/select@4.2.0
  - @findable/icon@12.1.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/button@8.1.0

## 3.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/select@4.0.1
  - @findable/icon@12.0.1
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/spinner@6.0.1
  - @findable/docs@4.0.1

## 3.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/select@4.0.0
  - @findable/icon@12.0.0
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/spinner@6.0.0
  - @findable/docs@4.0.0

## 2.0.1
- [patch] Remove line break from changelog to allow it to display properly on the website [9e30bb1](https://github.com/fnamazing/uiKit/commits/9e30bb1)

## 2.0.0
- [major] updated the api to capture scenarios where data can be updated on the fly [c1720e8](https://github.com/fnamazing/uiKit/commits/c1720e8)
- updated the `items` prop in TableTree component to accept Array of table data instead of function
- updated the `items` prop in Rows component to accept Array of table data instead of function
- added an `items` prop in Row component to accept children data Array for particular parent
- a new class is exported that will help manipulation for async loading `TableTreeDataHelper`, this is intended to make upgrade from previous API easy in case of async loading.

## 1.1.4
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/select@3.0.2
  - @findable/button@7.2.5
  - @findable/theme@3.2.2
  - @findable/spinner@5.0.2
  - @findable/docs@3.0.4

## 1.1.3
- [patch] Updated dependencies [d05b9e5](https://github.com/fnamazing/uiKit/commits/d05b9e5)
  - @findable/select@3.0.0

## 1.1.0
- [minor] Improve accessibility. Use AkButton for the Chevrons. [8ec5a94](https://github.com/fnamazing/uiKit/commits/8ec5a94)

## 1.0.1
- [patch] Update deps and examples. [b775a12](https://github.com/fnamazing/uiKit/commits/b775a12)
- [patch] Add a performance example [8eb1472](https://github.com/fnamazing/uiKit/commits/8eb1472)

## 1.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 0.6.1
- [patch] Makes packages Flow types compatible with version 0.67 [25daac0](https://github.com/fnamazing/uiKit/commits/25daac0)

## 0.6.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 0.5.3
- [patch] Fix an indirect race condition vulnerability [b75c02a](https://github.com/fnamazing/uiKit/commits/b75c02a)

## 0.5.2
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 0.5.1
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 0.5.0
- [minor] Add accessibility features; introduce Row's itemId prop [2e0807f](https://github.com/fnamazing/uiKit/commits/2e0807f)

## 0.4.0
- [minor] Update header design to conform to ADG3 [6170e98](https://github.com/fnamazing/uiKit/commits/6170e98)
- [minor] Don't display the loader if data is available quickly [93fd2eb](https://github.com/fnamazing/uiKit/commits/93fd2eb)

## 0.3.2
- [patch] Fix: ellipsis was not shown when overflowing text was clipped [05034f7](https://github.com/fnamazing/uiKit/commits/05034f7)

## 0.3.1
- [patch] Fix setState being called after unmount [4e5ca03](https://github.com/fnamazing/uiKit/commits/4e5ca03)

## 0.3.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 0.2.2
- [patch] Styling/spacing adjustments [0c29170](https://github.com/fnamazing/uiKit/commits/0c29170)

## 0.2.1
- [patch] Fix Table Tree readme to point to the correct screencast [ba4a01f](https://github.com/fnamazing/uiKit/commits/ba4a01f)

## 0.2.0
- [minor] Add the Table Tree component (alpha version) [53ec386](https://github.com/fnamazing/uiKit/commits/53ec386)
