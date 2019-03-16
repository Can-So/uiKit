# @findable/mobile-header

## 2.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/icon@16.0.5
  - @findable/navigation@34.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 2.0.0
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

## 1.1.6
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/navigation@33.3.9
  - @findable/icon@16.0.0

## 1.1.5
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/icon@15.0.2
  - @findable/navigation@33.3.8
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 1.1.4
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/icon@15.0.1
  - @findable/navigation@33.3.7
  - @findable/theme@7.0.0

## 1.1.3
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/navigation@33.3.6
  - @findable/icon@15.0.0

## 1.1.2
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/icon@14.6.1
  - @findable/navigation@33.3.5
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 1.1.1
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 1.1.0
- [minor] changing pageHeading type so can internationalize it easier [6e688a9](https://github.com/fnamazing/uiKit/commits/6e688a9)

## 1.0.1
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/navigation@33.1.11
  - @findable/icon@14.0.0

## 1.0.0
- [patch] updated examples [edff5c9](https://github.com/fnamazing/uiKit/commits/edff5c9)
- [major] Changed layout from position sticky to fixed and adjusted color contrast. [1648676](https://github.com/fnamazing/uiKit/commits/1648676)
- [patch] Added dark theme and addressed PR comments/tasks. [de18390](https://github.com/fnamazing/uiKit/commits/de18390)
- [major] add mobile header component to atlaskit [93a318a](https://github.com/fnamazing/uiKit/commits/93a318a)
