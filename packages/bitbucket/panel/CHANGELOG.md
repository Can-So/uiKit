# @findable/panel

## 0.1.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/icon@16.0.5
  - @findable/page@9.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 0.1.0
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

## 0.0.13
- Updated dependencies [0de1251ad1](https://github.com/fnamazing/uiKit/commits/0de1251ad1):
  - @findable/size-detector@6.0.0

## 0.0.12
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/icon@16.0.0

## 0.0.11
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/icon@15.0.2
  - @findable/page@8.0.12
  - @findable/size-detector@5.0.9
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 0.0.10
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/icon@15.0.1
  - @findable/theme@7.0.0

## 0.0.9
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/icon@15.0.0

## 0.0.8
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/icon@14.6.1
  - @findable/page@8.0.11
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 0.0.7
- [patch] [21f5216](https://github.com/fnamazing/uiKit/commits/21f5216):

  - Remove enzyme-to-json as it is used in our jestFrameworkSetup.js

## 0.0.6
- [patch] Fix button-toggle vertical positioning in IE 11 [92932e6](https://github.com/fnamazing/uiKit/commits/92932e6)

## 0.0.5
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 0.0.4
- [patch] Add vertical spacing styles [03fd7f9](https://github.com/fnamazing/uiKit/commits/03fd7f9)

## 0.0.3
- [patch] Update README title and description [43b712e](https://github.com/fnamazing/uiKit/commits/43b712e)

## 0.0.2
- [patch] Fix version for icon [0fd4b44](https://github.com/fnamazing/uiKit/commits/0fd4b44)
