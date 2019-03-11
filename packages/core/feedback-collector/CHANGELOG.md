# @atlaskit/feedback-collector

## 3.0.0
- [major] [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):

  - Drop ES5 from all the flow modules

  ### Dropping CJS support in all @atlaskit packages

  As a breaking change, all @atlaskit packages will be dropping cjs distributions and will only distribute esm. This means all distributed code will be transpiled, but will still contain `import` and
  `export` declarations.

  The major reason for doing this is to allow us to support multiple entry points in packages, e.g:

  ```js
  import colors from `@atlaskit/theme/colors`;
  ```

  Previously this was sort of possible for consumers by doing something like:

  ```js
  import colors from `@atlaskit/theme/dist/esm/colors`;
  ```

  This has a couple of issues. 1, it treats the file system as API making internal refactors harder, we have to worry about how consumers might be using things that aren't *actually* supposed to be used. 2. We are unable to do this *internally* in @atlaskit packages. This leads to lots of packages bundling all of theme, just to use a single color, especially in situations where tree shaking fails.

  To support being able to use multiple entrypoints internally, we unfortunately cannot have multiple distributions as they would need to have very different imports from of their own internal dependencies.

  ES Modules are widely supported by all modern bundlers and can be worked around in node environments.

  We may choose to revisit this solution in the future if we find any unintended condequences, but we see this as a pretty sane path forward which should lead to some major bundle size decreases, saner API's and simpler package architecture.

  Please reach out to #fabric-build (if in Atlassian) or create an issue in [Design System Support](https://ecosystem.atlassian.net/secure/CreateIssue.jspa?pid=24670) (for external) if you have any questions or queries about this.

## 2.0.5
- Updated dependencies [06713e0a0c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06713e0a0c):
  - @atlaskit/form@5.1.5
  - @atlaskit/logo@9.2.7
  - @atlaskit/navigation-next@4.2.3
  - @atlaskit/modal-dialog@7.2.3
  - @atlaskit/select@7.0.0

## 2.0.4
- [patch] [2a8536a220](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2a8536a220):

  - Button is no longer a peer dependency of this module

## 2.0.3
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/button@10.1.2
  - @atlaskit/checkbox@5.0.11
  - @atlaskit/flag@9.1.9
  - @atlaskit/form@5.1.2
  - @atlaskit/global-navigation@5.5.2
  - @atlaskit/modal-dialog@7.2.1
  - @atlaskit/navigation-next@4.1.2
  - @atlaskit/section-message@1.0.16
  - @atlaskit/select@6.1.19
  - @atlaskit/icon@16.0.0

## 2.0.2
- [patch] [a048a85](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a048a85):

  - Updated to be compatible with new Forms API
- Updated dependencies [647a46f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/647a46f):
  - @atlaskit/select@6.1.14
  - @atlaskit/form@5.0.0

## 2.0.1
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/checkbox@5.0.9
  - @atlaskit/field-text-area@4.0.14
  - @atlaskit/flag@9.1.8
  - @atlaskit/form@4.0.21
  - @atlaskit/global-navigation@5.3.8
  - @atlaskit/icon@15.0.2
  - @atlaskit/logo@9.2.6
  - @atlaskit/modal-dialog@7.1.1
  - @atlaskit/navigation-next@4.0.9
  - @atlaskit/section-message@1.0.14
  - @atlaskit/select@6.1.13
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 2.0.0
- Updated dependencies [36929ef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36929ef):
  - @atlaskit/button@10.1.0

## 1.0.2
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/checkbox@5.0.8
  - @atlaskit/field-text-area@4.0.13
  - @atlaskit/flag@9.1.7
  - @atlaskit/form@4.0.20
  - @atlaskit/global-navigation@5.3.6
  - @atlaskit/icon@15.0.1
  - @atlaskit/logo@9.2.5
  - @atlaskit/modal-dialog@7.0.14
  - @atlaskit/navigation-next@4.0.8
  - @atlaskit/section-message@1.0.13
  - @atlaskit/select@6.1.10
  - @atlaskit/theme@7.0.0

## 1.0.1
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/button@10.0.1
  - @atlaskit/checkbox@5.0.7
  - @atlaskit/flag@9.1.6
  - @atlaskit/form@4.0.19
  - @atlaskit/global-navigation@5.3.5
  - @atlaskit/modal-dialog@7.0.13
  - @atlaskit/navigation-next@4.0.7
  - @atlaskit/section-message@1.0.12
  - @atlaskit/select@6.1.9
  - @atlaskit/icon@15.0.0

## 1.0.0
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/checkbox@5.0.6
  - @atlaskit/field-text-area@4.0.12
  - @atlaskit/flag@9.1.5
  - @atlaskit/form@4.0.18
  - @atlaskit/global-navigation@5.3.4
  - @atlaskit/icon@14.6.1
  - @atlaskit/logo@9.2.4
  - @atlaskit/modal-dialog@7.0.12
  - @atlaskit/navigation-next@4.0.6
  - @atlaskit/section-message@1.0.11
  - @atlaskit/select@6.1.8
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 0.2.5
- Updated dependencies [8e753fc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8e753fc):
  - @atlaskit/global-navigation@5.3.2
  - @atlaskit/navigation-next@4.0.0

## 0.2.4
- [patch] [a637f5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @atlaskit/analytics-next HOCs to allow flow to type check properly

## 0.2.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 0.2.2
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/button@9.0.13
  - @atlaskit/checkbox@5.0.2
  - @atlaskit/flag@9.0.11
  - @atlaskit/form@4.0.10
  - @atlaskit/global-navigation@5.0.1
  - @atlaskit/modal-dialog@7.0.2
  - @atlaskit/navigation-next@3.15.5
  - @atlaskit/section-message@1.0.8
  - @atlaskit/select@6.0.2
  - @atlaskit/icon@14.0.0

## 0.2.1
- [patch] Updated dependencies [ac88888](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac88888)
  - @atlaskit/navigation-next@3.15.4
  - @atlaskit/global-navigation@5.0.0

## 0.2.0
- [patch] Fix bug with flag being not auto-dismissable [51fbd9b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51fbd9b)
- [minor] New set of properties to the Feedback Collector that provide improved mapping between JSD and the form. Export feedback form primitive. Removed export of the flag group, export only flag instead. [fca309f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fca309f)

## 0.1.6
- [patch] Fixed a bug that crashes dialog when something is selected; fixed a bug that caused textarea to show error state even if not empty [3a6ac76](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a6ac76)

## 0.1.5
- [patch] Updated dependencies [4194aa4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4194aa4)
  - @atlaskit/form@4.0.9
  - @atlaskit/logo@9.2.2
  - @atlaskit/navigation-next@3.13.2
  - @atlaskit/select@6.0.0

## 0.1.4
- [patch] Updated dependencies [80e1925](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80e1925)
  - @atlaskit/button@9.0.9
  - @atlaskit/form@4.0.5
  - @atlaskit/modal-dialog@7.0.1
  - @atlaskit/select@5.0.18
  - @atlaskit/checkbox@5.0.0

## 0.1.3
- [patch] Updated dependencies [d5a043a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5a043a)
  - @atlaskit/form@4.0.3
  - @atlaskit/global-navigation@4.3.2
  - @atlaskit/icon@13.8.1
  - @atlaskit/select@5.0.17
  - @atlaskit/flag@9.0.10
  - @atlaskit/modal-dialog@7.0.0

## 0.1.2
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 0.1.1
- [patch] Updated dependencies [d8d8107](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d8d8107)
  - @atlaskit/select@5.0.14
  - @atlaskit/form@4.0.0
