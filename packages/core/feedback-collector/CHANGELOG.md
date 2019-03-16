# @findable/feedback-collector

## 3.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/checkbox@6.0.1
  - @findable/flag@10.0.1
  - @findable/form@5.2.1
  - @findable/global-navigation@6.1.1
  - @findable/icon@16.0.5
  - @findable/logo@10.0.1
  - @findable/modal-dialog@8.0.2
  - @findable/navigation-next@5.0.1
  - @findable/section-message@2.0.1
  - @findable/select@8.0.3
  - @findable/theme@8.0.1
  - @findable/button@11.0.0
  - @findable/textarea@0.3.0

## 3.0.0
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

## 2.0.5
- Updated dependencies [06713e0a0c](https://github.com/fnamazing/uiKit/commits/06713e0a0c):
  - @findable/form@5.1.5
  - @findable/logo@9.2.7
  - @findable/navigation-next@4.2.3
  - @findable/modal-dialog@7.2.3
  - @findable/select@7.0.0

## 2.0.4
- [patch] [2a8536a220](https://github.com/fnamazing/uiKit/commits/2a8536a220):

  - Button is no longer a peer dependency of this module

## 2.0.3
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/checkbox@5.0.11
  - @findable/flag@9.1.9
  - @findable/form@5.1.2
  - @findable/global-navigation@5.5.2
  - @findable/modal-dialog@7.2.1
  - @findable/navigation-next@4.1.2
  - @findable/section-message@1.0.16
  - @findable/select@6.1.19
  - @findable/icon@16.0.0

## 2.0.2
- [patch] [a048a85](https://github.com/fnamazing/uiKit/commits/a048a85):

  - Updated to be compatible with new Forms API
- Updated dependencies [647a46f](https://github.com/fnamazing/uiKit/commits/647a46f):
  - @findable/select@6.1.14
  - @findable/form@5.0.0

## 2.0.1
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/checkbox@5.0.9
  - @findable/field-text-area@4.0.14
  - @findable/flag@9.1.8
  - @findable/form@4.0.21
  - @findable/global-navigation@5.3.8
  - @findable/icon@15.0.2
  - @findable/logo@9.2.6
  - @findable/modal-dialog@7.1.1
  - @findable/navigation-next@4.0.9
  - @findable/section-message@1.0.14
  - @findable/select@6.1.13
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 2.0.0
- Updated dependencies [36929ef](https://github.com/fnamazing/uiKit/commits/36929ef):
  - @findable/button@10.1.0

## 1.0.2
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/checkbox@5.0.8
  - @findable/field-text-area@4.0.13
  - @findable/flag@9.1.7
  - @findable/form@4.0.20
  - @findable/global-navigation@5.3.6
  - @findable/icon@15.0.1
  - @findable/logo@9.2.5
  - @findable/modal-dialog@7.0.14
  - @findable/navigation-next@4.0.8
  - @findable/section-message@1.0.13
  - @findable/select@6.1.10
  - @findable/theme@7.0.0

## 1.0.1
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/checkbox@5.0.7
  - @findable/flag@9.1.6
  - @findable/form@4.0.19
  - @findable/global-navigation@5.3.5
  - @findable/modal-dialog@7.0.13
  - @findable/navigation-next@4.0.7
  - @findable/section-message@1.0.12
  - @findable/select@6.1.9
  - @findable/icon@15.0.0

## 1.0.0
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/checkbox@5.0.6
  - @findable/field-text-area@4.0.12
  - @findable/flag@9.1.5
  - @findable/form@4.0.18
  - @findable/global-navigation@5.3.4
  - @findable/icon@14.6.1
  - @findable/logo@9.2.4
  - @findable/modal-dialog@7.0.12
  - @findable/navigation-next@4.0.6
  - @findable/section-message@1.0.11
  - @findable/select@6.1.8
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 0.2.5
- Updated dependencies [8e753fc](https://github.com/fnamazing/uiKit/commits/8e753fc):
  - @findable/global-navigation@5.3.2
  - @findable/navigation-next@4.0.0

## 0.2.4
- [patch] [a637f5e](https://github.com/fnamazing/uiKit/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @findable/analytics-next HOCs to allow flow to type check properly

## 0.2.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 0.2.2
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/checkbox@5.0.2
  - @findable/flag@9.0.11
  - @findable/form@4.0.10
  - @findable/global-navigation@5.0.1
  - @findable/modal-dialog@7.0.2
  - @findable/navigation-next@3.15.5
  - @findable/section-message@1.0.8
  - @findable/select@6.0.2
  - @findable/icon@14.0.0

## 0.2.1
- [patch] Updated dependencies [ac88888](https://github.com/fnamazing/uiKit/commits/ac88888)
  - @findable/navigation-next@3.15.4
  - @findable/global-navigation@5.0.0

## 0.2.0
- [patch] Fix bug with flag being not auto-dismissable [51fbd9b](https://github.com/fnamazing/uiKit/commits/51fbd9b)
- [minor] New set of properties to the Feedback Collector that provide improved mapping between JSD and the form. Export feedback form primitive. Removed export of the flag group, export only flag instead. [fca309f](https://github.com/fnamazing/uiKit/commits/fca309f)

## 0.1.6
- [patch] Fixed a bug that crashes dialog when something is selected; fixed a bug that caused textarea to show error state even if not empty [3a6ac76](https://github.com/fnamazing/uiKit/commits/3a6ac76)

## 0.1.5
- [patch] Updated dependencies [4194aa4](https://github.com/fnamazing/uiKit/commits/4194aa4)
  - @findable/form@4.0.9
  - @findable/logo@9.2.2
  - @findable/navigation-next@3.13.2
  - @findable/select@6.0.0

## 0.1.4
- [patch] Updated dependencies [80e1925](https://github.com/fnamazing/uiKit/commits/80e1925)
  - @findable/button@9.0.9
  - @findable/form@4.0.5
  - @findable/modal-dialog@7.0.1
  - @findable/select@5.0.18
  - @findable/checkbox@5.0.0

## 0.1.3
- [patch] Updated dependencies [d5a043a](https://github.com/fnamazing/uiKit/commits/d5a043a)
  - @findable/form@4.0.3
  - @findable/global-navigation@4.3.2
  - @findable/icon@13.8.1
  - @findable/select@5.0.17
  - @findable/flag@9.0.10
  - @findable/modal-dialog@7.0.0

## 0.1.2
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 0.1.1
- [patch] Updated dependencies [d8d8107](https://github.com/fnamazing/uiKit/commits/d8d8107)
  - @findable/select@5.0.14
  - @findable/form@4.0.0
