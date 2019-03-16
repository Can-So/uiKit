# @findable/nps

## 5.0.2
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/checkbox@6.0.1
  - @findable/dropdown-menu@7.0.1
  - @findable/field-text-area@5.0.1
  - @findable/icon@16.0.5
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 5.0.1
- [patch] [147eb61bf6](https://github.com/fnamazing/uiKit/commits/147eb61bf6):

  - Internal changes. Updates tested example to be SSR ready.

## 5.0.0
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

## 4.0.15
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/checkbox@5.0.11
  - @findable/dropdown-menu@6.1.26
  - @findable/icon@16.0.0

## 4.0.14
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/checkbox@5.0.9
  - @findable/dropdown-menu@6.1.25
  - @findable/field-text-area@4.0.14
  - @findable/icon@15.0.2
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 4.0.13
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/checkbox@5.0.8
  - @findable/dropdown-menu@6.1.24
  - @findable/field-text-area@4.0.13
  - @findable/icon@15.0.1
  - @findable/theme@7.0.0

## 4.0.12
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/checkbox@5.0.7
  - @findable/dropdown-menu@6.1.23
  - @findable/icon@15.0.0

## 4.0.11
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/checkbox@5.0.6
  - @findable/dropdown-menu@6.1.22
  - @findable/field-text-area@4.0.12
  - @findable/icon@14.6.1
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 4.0.10
- [patch] Fixing blank state for datetime-picker in Firefox.  [0e6d838](https://github.com/fnamazing/uiKit/commits/0e6d838)

## 4.0.9
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 4.0.8
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/checkbox@5.0.2
  - @findable/dropdown-menu@6.1.17
  - @findable/icon@14.0.0

## 4.0.7
- [patch] Updated dependencies [80e1925](https://github.com/fnamazing/uiKit/commits/80e1925)
  - @findable/button@9.0.9
  - @findable/checkbox@5.0.0

## 4.0.6
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 4.0.4
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/icon@13.2.5
  - @findable/field-text-area@4.0.6
  - @findable/dropdown-menu@6.1.8
  - @findable/checkbox@4.0.4
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 4.0.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/field-text-area@4.0.4
  - @findable/checkbox@4.0.3
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/icon@13.2.4
  - @findable/dropdown-menu@6.1.5

## 4.0.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/icon@13.2.2
  - @findable/checkbox@4.0.2
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/field-text-area@4.0.3
  - @findable/docs@5.0.2
  - @findable/dropdown-menu@6.1.4

## 4.0.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/field-text-area@4.0.2
  - @findable/checkbox@4.0.1
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/icon@13.2.1
  - @findable/dropdown-menu@6.1.3

## 4.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/field-text-area@4.0.0
  - @findable/checkbox@4.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/icon@13.0.0
  - @findable/dropdown-menu@6.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/field-text-area@4.0.0
  - @findable/checkbox@4.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/icon@13.0.0
  - @findable/dropdown-menu@6.0.0

## 3.0.4
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/field-text-area@3.1.1
  - @findable/button@8.1.2
  - @findable/theme@4.0.4
  - @findable/checkbox@3.0.6
  - @findable/icon@12.1.2
  - @findable/dropdown-menu@5.0.4

## 3.0.3
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/icon@12.1.1
  - @findable/dropdown-menu@5.0.3
  - @findable/checkbox@3.0.5
  - @findable/button@8.1.1
  - @findable/docs@4.1.1

## 3.0.2
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/dropdown-menu@5.0.2
  - @findable/icon@12.1.0
  - @findable/checkbox@3.0.4
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/field-text-area@3.0.3
  - @findable/button@8.1.0

## 3.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/icon@12.0.1
  - @findable/field-text-area@3.0.1
  - @findable/checkbox@3.0.1
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/docs@4.0.1
  - @findable/dropdown-menu@5.0.1

## 3.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/icon@12.0.0
  - @findable/field-text-area@3.0.0
  - @findable/checkbox@3.0.0
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/docs@4.0.0
  - @findable/dropdown-menu@5.0.0

## 2.0.2
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/field-text-area@2.0.4
  - @findable/dropdown-menu@4.0.3
  - @findable/checkbox@2.0.2
  - @findable/button@7.2.5
  - @findable/theme@3.2.2
  - @findable/docs@3.0.4

## 2.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)
