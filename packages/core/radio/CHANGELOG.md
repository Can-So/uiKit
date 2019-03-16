# @findable/radio

## 0.5.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/checkbox@6.0.1
  - @findable/form@5.2.1
  - @findable/icon@16.0.5
  - @findable/section-message@2.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 0.5.0
- [minor] [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):

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

## 0.4.7
- [patch] [942e0aec04](https://github.com/fnamazing/uiKit/commits/942e0aec04):

  - Added test to make sure props are passed hidden input

## 0.4.6
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/checkbox@5.0.11
  - @findable/form@5.1.2
  - @findable/section-message@1.0.16
  - @findable/icon@16.0.0

## 0.4.5
- [patch] [a048a85](https://github.com/fnamazing/uiKit/commits/a048a85):

  - Updated to be compatible with new Forms API
- Updated dependencies [647a46f](https://github.com/fnamazing/uiKit/commits/647a46f):
  - @findable/form@5.0.0

## 0.4.4
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/button@10.1.1
  - @findable/checkbox@5.0.9
  - @findable/form@4.0.21
  - @findable/icon@15.0.2
  - @findable/section-message@1.0.14
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 0.4.3
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/field-base@11.0.12
  - @findable/form@4.0.20
  - @findable/icon@15.0.1
  - @findable/section-message@1.0.13
  - @findable/theme@7.0.0

## 0.4.2
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/field-base@11.0.11
  - @findable/form@4.0.19
  - @findable/section-message@1.0.12
  - @findable/icon@15.0.0

## 0.4.1
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/form@4.0.18
  - @findable/icon@14.6.1
  - @findable/section-message@1.0.11
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 0.4.0
- [minor] [b42680b](https://github.com/fnamazing/uiKit/commits/b42680b):

  - Add isDisabled prop to RadioGroup, once set will set the isDisabled value for all Radio elements within the group

## 0.3.0
- [minor] [8199088](https://github.com/fnamazing/uiKit/commits/8199088):

  - BREAKING: defaultCheckedValue and checkedValue props in the RadioGroup component now changed to defaultValue and value respectively

## 0.2.4
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 0.2.3
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/field-base@11.0.8
  - @findable/form@4.0.10
  - @findable/section-message@1.0.8
  - @findable/icon@14.0.0

## 0.2.2
- [patch] Fixing analytics events for checkbox/radio/select [3e428e3](https://github.com/fnamazing/uiKit/commits/3e428e3)

## 0.2.1
- [patch] Fixed radio indent styling [88520b2](https://github.com/fnamazing/uiKit/commits/88520b2)

## 0.2.0
- [minor] Removed radioInput component, replaced Radio children prop with optional label prop to enable the use case facilitated by RadioInput. Added aria-label prop to Radio for accessibility. Wrapped Radio component in Analytics. [866a29b](https://github.com/fnamazing/uiKit/commits/866a29b)

## 0.1.0
- [minor] Dev release of @findable/radio [2b37611](https://github.com/fnamazing/uiKit/commits/2b37611)

## 0.0.3
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 0.0.1
- [patch] Bump radio to include the new version of theme. [ea62d3d](https://github.com/fnamazing/uiKit/commits/ea62d3d)
