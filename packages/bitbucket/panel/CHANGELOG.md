# @atlaskit/panel

## 0.1.1
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/page@9.0.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/button@11.0.0

## 0.1.0
- [minor] [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):

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

## 0.0.13
- Updated dependencies [0de1251ad1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0de1251ad1):
  - @atlaskit/size-detector@6.0.0

## 0.0.12
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/button@10.1.2
  - @atlaskit/icon@16.0.0

## 0.0.11
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/icon@15.0.2
  - @atlaskit/page@8.0.12
  - @atlaskit/size-detector@5.0.9
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 0.0.10
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/icon@15.0.1
  - @atlaskit/theme@7.0.0

## 0.0.9
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/button@10.0.1
  - @atlaskit/icon@15.0.0

## 0.0.8
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/icon@14.6.1
  - @atlaskit/page@8.0.11
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 0.0.7
- [patch] [21f5216](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/21f5216):

  - Remove enzyme-to-json as it is used in our jestFrameworkSetup.js

## 0.0.6
- [patch] Fix button-toggle vertical positioning in IE 11 [92932e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92932e6)

## 0.0.5
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 0.0.4
- [patch] Add vertical spacing styles [03fd7f9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03fd7f9)

## 0.0.3
- [patch] Update README title and description [43b712e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/43b712e)

## 0.0.2
- [patch] Fix version for icon [0fd4b44](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0fd4b44)
