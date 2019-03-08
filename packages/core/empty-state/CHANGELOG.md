# @atlaskit/empty-state

## 4.0.0
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

## 3.1.4
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/spinner@9.0.13
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 3.1.3
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/button@10.0.4
  - @atlaskit/spinner@9.0.12
  - @atlaskit/theme@7.0.0

## 3.1.2
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/spinner@9.0.11
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 3.1.1
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 3.1.0
- [minor] Adds new imageWidth and imageHeight props, useful for fixing the image dimensions while it's loading so the page doesn't bounce around. Changes the root element to use max-width instead of width so it shrinks down in smaller containers. [3209be4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3209be4)

## 3.0.9
- [patch] Pulling the shared styles from @atlaskit/theme and removed dependency on util-shraed-styles [7d51a09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d51a09)

## 3.0.8
- [patch] Moved the atlaskit button, spinner, theme and util-shared-styles to dependencies from peer dependdency [a2d1132](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a2d1132)

## 3.0.7
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 3.0.5
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/spinner@9.0.6
  - @atlaskit/button@9.0.6
  - @atlaskit/docs@5.0.6

## 3.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/button@9.0.5
  - @atlaskit/theme@5.1.3
  - @atlaskit/spinner@9.0.5

## 3.0.3
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/button@9.0.4
  - @atlaskit/theme@5.1.2
  - @atlaskit/spinner@9.0.4
  - @atlaskit/docs@5.0.2

## 3.0.2
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/button@9.0.3
  - @atlaskit/theme@5.1.1
  - @atlaskit/spinner@9.0.3

## 3.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
  - @atlaskit/button@9.0.2
  - @atlaskit/spinner@9.0.2
  - @atlaskit/docs@5.0.1

## 3.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/spinner@9.0.0
  - @atlaskit/docs@5.0.0

## 2.1.3
- [patch] Updated dependencies [cdba8b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cdba8b3)
  - @atlaskit/spinner@8.0.0
  - @atlaskit/button@8.2.3

## 2.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/button@8.1.2
  - @atlaskit/theme@4.0.4
  - @atlaskit/spinner@7.0.2

## 2.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/spinner@7.0.1
  - @atlaskit/button@8.1.1
  - @atlaskit/docs@4.1.1

## 2.1.0
- [patch] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/spinner@7.0.0
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2
  - @atlaskit/button@8.1.0

## 2.0.1
- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/button@8.0.1
  - @atlaskit/theme@4.0.1
  - @atlaskit/spinner@6.0.1
  - @atlaskit/docs@4.0.1

## 2.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/spinner@6.0.0
  - @atlaskit/docs@4.0.0

## 1.1.2
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/spinner@5.0.2
  - @atlaskit/docs@3.0.4

## 1.1.0
- [patch] Remove null as we allowed void values [7ab743b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ab743b)
- [patch] Update empty state and button to have consistent types [f0da143](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f0da143)
- [minor] Update Empty state to use ButtonGroup from @atlaskit/button [e4a8dcf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e4a8dcf)

## 1.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 0.3.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 0.2.2
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 0.2.1
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 0.2.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 0.1.3
- [patch] Color of the description changed to N800 [ebf65be](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ebf65be)

## 0.1.0
- [patch] Updates dependency on docs/ to ^1.0.1 [36c7ef8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/36c7ef8)
- [minor] Initial release [afbb1e5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/afbb1e5)
