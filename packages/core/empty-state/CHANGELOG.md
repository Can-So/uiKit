# @findable/empty-state

## 4.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/spinner@10.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 4.0.0
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

## 3.1.4
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/spinner@9.0.13
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 3.1.3
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/spinner@9.0.12
  - @findable/theme@7.0.0

## 3.1.2
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/spinner@9.0.11
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 3.1.1
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 3.1.0
- [minor] Adds new imageWidth and imageHeight props, useful for fixing the image dimensions while it's loading so the page doesn't bounce around. Changes the root element to use max-width instead of width so it shrinks down in smaller containers. [3209be4](https://github.com/fnamazing/uiKit/commits/3209be4)

## 3.0.9
- [patch] Pulling the shared styles from @findable/theme and removed dependency on util-shraed-styles [7d51a09](https://github.com/fnamazing/uiKit/commits/7d51a09)

## 3.0.8
- [patch] Moved the atlaskit button, spinner, theme and util-shared-styles to dependencies from peer dependdency [a2d1132](https://github.com/fnamazing/uiKit/commits/a2d1132)

## 3.0.7
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 3.0.5
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/spinner@9.0.6
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 3.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/spinner@9.0.5

## 3.0.3
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/spinner@9.0.4
  - @findable/docs@5.0.2

## 3.0.2
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/spinner@9.0.3

## 3.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/button@9.0.2
  - @findable/spinner@9.0.2
  - @findable/docs@5.0.1

## 3.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0

## 2.1.3
- [patch] Updated dependencies [cdba8b3](https://github.com/fnamazing/uiKit/commits/cdba8b3)
  - @findable/spinner@8.0.0
  - @findable/button@8.2.3

## 2.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/button@8.1.2
  - @findable/theme@4.0.4
  - @findable/spinner@7.0.2

## 2.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/spinner@7.0.1
  - @findable/button@8.1.1
  - @findable/docs@4.1.1

## 2.1.0
- [patch] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/spinner@7.0.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/button@8.1.0

## 2.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/spinner@6.0.1
  - @findable/docs@4.0.1

## 2.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/spinner@6.0.0
  - @findable/docs@4.0.0

## 1.1.2
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/button@7.2.5
  - @findable/theme@3.2.2
  - @findable/spinner@5.0.2
  - @findable/docs@3.0.4

## 1.1.0
- [patch] Remove null as we allowed void values [7ab743b](https://github.com/fnamazing/uiKit/commits/7ab743b)
- [patch] Update empty state and button to have consistent types [f0da143](https://github.com/fnamazing/uiKit/commits/f0da143)
- [minor] Update Empty state to use ButtonGroup from @findable/button [e4a8dcf](https://github.com/fnamazing/uiKit/commits/e4a8dcf)

## 1.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 0.3.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 0.2.2
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 0.2.1
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 0.2.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 0.1.3
- [patch] Color of the description changed to N800 [ebf65be](https://github.com/fnamazing/uiKit/commits/ebf65be)

## 0.1.0
- [patch] Updates dependency on docs/ to ^1.0.1 [36c7ef8](https://github.com/fnamazing/uiKit/commits/36c7ef8)
- [minor] Initial release [afbb1e5](https://github.com/fnamazing/uiKit/commits/afbb1e5)
