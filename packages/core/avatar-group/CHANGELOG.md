# @findable/avatar-group

## 3.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/avatar@15.0.1
  - @findable/dropdown-menu@7.0.1
  - @findable/icon@16.0.5
  - @findable/theme@8.0.1
  - @findable/toggle@6.0.1
  - @findable/tooltip@13.0.1
  - @findable/button@11.0.0

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

## 2.1.12
- [patch] [3a9b559382](https://github.com/fnamazing/uiKit/commits/3a9b559382):

  - Stopping href from being passed down to Avatar in DropdownMenu rendered in AvatarGroup

## 2.1.11
- [patch] [ed05c5c5d9](https://github.com/fnamazing/uiKit/commits/ed05c5c5d9):

  - Change border color of avatar in avatar group dropdown menu to transparent so that it does not overlap with focus ring

## 2.1.10
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/avatar@14.1.8
  - @findable/button@10.1.2
  - @findable/dropdown-menu@6.1.26
  - @findable/field-base@11.0.14
  - @findable/item@8.0.15
  - @findable/toggle@5.0.15
  - @findable/tooltip@12.1.15
  - @findable/icon@16.0.0

## 2.1.9
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/avatar@14.1.7
  - @findable/button@10.1.1
  - @findable/code@8.2.2
  - @findable/dropdown-menu@6.1.25
  - @findable/field-base@11.0.13
  - @findable/icon@15.0.2
  - @findable/item@8.0.14
  - @findable/theme@7.0.1
  - @findable/toggle@5.0.14
  - @findable/tooltip@12.1.13
  - @findable/docs@6.0.0

## 2.1.8
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/code@8.2.1
  - @findable/dropdown-menu@6.1.24
  - @findable/field-base@11.0.12
  - @findable/icon@15.0.1
  - @findable/item@8.0.13
  - @findable/toggle@5.0.13
  - @findable/tooltip@12.1.12
  - @findable/theme@7.0.0
  - @findable/avatar@14.1.6

## 2.1.7
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/avatar@14.1.5
  - @findable/button@10.0.1
  - @findable/dropdown-menu@6.1.23
  - @findable/field-base@11.0.11
  - @findable/item@8.0.12
  - @findable/toggle@5.0.12
  - @findable/tooltip@12.1.11
  - @findable/icon@15.0.0

## 2.1.6
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/avatar@14.1.4
  - @findable/dropdown-menu@6.1.22
  - @findable/icon@14.6.1
  - @findable/theme@6.2.1
  - @findable/toggle@5.0.11
  - @findable/tooltip@12.1.10
  - @findable/button@10.0.0

## 2.1.5
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 2.1.4
- [patch] Adds new theming API to Avatar and AvatarItem components [79dd93f](https://github.com/fnamazing/uiKit/commits/79dd93f)

## 2.1.3
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/avatar@14.0.11
  - @findable/button@9.0.13
  - @findable/dropdown-menu@6.1.17
  - @findable/field-base@11.0.8
  - @findable/item@8.0.8
  - @findable/toggle@5.0.9
  - @findable/tooltip@12.1.1
  - @findable/icon@14.0.0

## 2.1.1
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/tooltip@12.0.9
  - @findable/toggle@5.0.6
  - @findable/item@8.0.5
  - @findable/icon@13.2.5
  - @findable/field-base@11.0.5
  - @findable/dropdown-menu@6.1.8
  - @findable/code@8.0.1
  - @findable/button@9.0.6
  - @findable/avatar@14.0.8
  - @findable/docs@5.0.6

## 2.1.0
- [minor] Added prop moreButtonProps to allow modification of the group's MoreButton [6efa808](https://github.com/fnamazing/uiKit/commits/6efa808)

## 2.0.8
- [patch] Updated dependencies [f9c0cdb](https://github.com/fnamazing/uiKit/commits/f9c0cdb)
  - @findable/code@8.0.0
  - @findable/docs@5.0.5

## 2.0.7
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/tooltip@12.0.5
  - @findable/field-base@11.0.3
  - @findable/toggle@5.0.5
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/code@7.0.3
  - @findable/item@8.0.4
  - @findable/icon@13.2.4
  - @findable/dropdown-menu@6.1.5
  - @findable/avatar@14.0.6

## 2.0.6
- [patch] Update pretty-proptypes [c7e484c](https://github.com/fnamazing/uiKit/commits/c7e484c)
- [none] Updated dependencies [c7e484c](https://github.com/fnamazing/uiKit/commits/c7e484c)
  - @findable/docs@5.0.3

## 2.0.5
- [patch] Clean up changelog [5b5bd8e](https://github.com/fnamazing/uiKit/commits/5b5bd8e)

## 2.0.4
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/tooltip@12.0.4
  - @findable/item@8.0.3
  - @findable/icon@13.2.2
  - @findable/toggle@5.0.4
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/code@7.0.2
  - @findable/docs@5.0.2
  - @findable/dropdown-menu@6.1.4
  - @findable/avatar@14.0.5
  - @findable/field-base@11.0.2

## 2.0.3
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/tooltip@12.0.3
  - @findable/field-base@11.0.1
  - @findable/toggle@5.0.3
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/code@7.0.1
  - @findable/item@8.0.2
  - @findable/icon@13.2.1
  - @findable/dropdown-menu@6.1.3
  - @findable/avatar@14.0.4

## 2.0.2
- [patch] Update dev dependencies and docs [d0e13b7](https://github.com/fnamazing/uiKit/commits/d0e13b7)

## 2.0.1
- [patch] Updated dependencies [e6b1985](https://github.com/fnamazing/uiKit/commits/e6b1985)
  - @findable/tooltip@12.0.0
  - @findable/item@8.0.1
  - @findable/icon@13.1.1
  - @findable/dropdown-menu@6.1.1
  - @findable/avatar@14.0.1

## 2.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/tooltip@11.0.0
  - @findable/field-base@11.0.0
  - @findable/toggle@5.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/code@7.0.0
  - @findable/docs@5.0.0
  - @findable/item@8.0.0
  - @findable/icon@13.0.0
  - @findable/dropdown-menu@6.0.0
  - @findable/avatar@14.0.0

## 1.0.2
- [patch] Fix flow types [da63331](https://github.com/fnamazing/uiKit/commits/da63331)
- [patch] Updated dependencies [7724115](https://github.com/fnamazing/uiKit/commits/7724115)
  - @findable/avatar@13.0.0
  - @findable/button@8.2.5
  - @findable/item@7.0.8
  - @findable/dropdown-menu@5.2.3

## 1.0.1
- [patch] Small avatar-group docs improvements [a54f6ea](https://github.com/fnamazing/uiKit/commits/a54f6ea)

## 1.0.0
- [major] Split avatar-group into its own package [8a01bcd](https://github.com/fnamazing/uiKit/commits/8a01bcd)
- [patch] Updated dependencies [8a01bcd](https://github.com/fnamazing/uiKit/commits/8a01bcd)
  - @findable/avatar@12.0.0
  - @findable/item@7.0.7
  - @findable/dropdown-menu@5.2.2
