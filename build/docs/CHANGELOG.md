# @findable/docs

## 7.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/icon@16.0.5
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 7.0.0
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

## 6.0.2
- [patch] [050e08173f](https://github.com/fnamazing/uiKit/commits/050e08173f):

  - Add missing import for codesandboxer

## 6.0.1
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/button@10.1.2
  - @findable/icon@16.0.0

## 6.0.0
- [major] [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):

  - Use latest version of pretty-proptypes - this is incompatible with `extract-react-types` versions under `0.15.0`

## 5.2.3
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/button@10.0.4
  - @findable/code@8.2.1
  - @findable/icon@15.0.1
  - @findable/theme@7.0.0

## 5.2.2
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/button@10.0.1
  - @findable/icon@15.0.0

## 5.2.1
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/icon@14.6.1
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 5.2.0
- [minor] Add ErrorBoundary to Examples so that errors in Example components don't leak out onto the containing page when embedding examples within docs. [5131102](https://github.com/fnamazing/uiKit/commits/5131102)

## 5.1.0
- [minor] Example component now accepts a packageName. This prop is now required [7a8278d](https://github.com/fnamazing/uiKit/commits/7a8278d)

## 5.0.8
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/button@9.0.13
  - @findable/icon@14.0.0

## 5.0.7
- [patch] Upgrade extract-react-types to add TypeScript support. [c742e5a](https://github.com/fnamazing/uiKit/commits/c742e5a)

## 5.0.6
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/icon@13.2.5
  - @findable/code@8.0.1
  - @findable/button@9.0.6

## 5.0.5
- [patch] Updated dependencies [f9c0cdb](https://github.com/fnamazing/uiKit/commits/f9c0cdb)
  - @findable/code@8.0.0

## 5.0.4
- [patch] Export a modified replaceImport function [18f2701](https://github.com/fnamazing/uiKit/commits/18f2701)
- [none] Updated dependencies [18f2701](https://github.com/fnamazing/uiKit/commits/18f2701)

## 5.0.3
- [patch] Update pretty-proptypes [c7e484c](https://github.com/fnamazing/uiKit/commits/c7e484c)
- [none] Updated dependencies [c7e484c](https://github.com/fnamazing/uiKit/commits/c7e484c)

## 5.0.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/icon@13.2.2
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/code@7.0.2

## 5.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/button@9.0.2

## 5.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/code@7.0.0
  - @findable/icon@13.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/code@7.0.0
  - @findable/icon@13.0.0

## 4.2.2
- [patch] Add missing dependencies to packages to get the website to build [99446e3](https://github.com/fnamazing/uiKit/commits/99446e3)

- [none] Updated dependencies [99446e3](https://github.com/fnamazing/uiKit/commits/99446e3)
- [none] Updated dependencies [9bac948](https://github.com/fnamazing/uiKit/commits/9bac948)

## 4.2.1
- [patch] Updated dependencies [eee2d45](https://github.com/fnamazing/uiKit/commits/eee2d45)
  - @findable/code@6.0.0

## 4.2.0
- [minor] Added upgrade guide, updated atlaskit/docs dep on react-markings to expose md parser customisations [aef4aea](https://github.com/fnamazing/uiKit/commits/aef4aea)
- [none] Updated dependencies [aef4aea](https://github.com/fnamazing/uiKit/commits/aef4aea)

## 4.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/icon@12.1.1
  - @findable/code@5.0.3

## 4.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/icon@12.1.0
  - @findable/theme@4.0.2
  - @findable/code@5.0.2

## 4.0.1
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/icon@12.0.1
  - @findable/theme@4.0.1
  - @findable/code@5.0.1

## 4.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/icon@12.0.0
  - @findable/theme@4.0.0
  - @findable/code@5.0.0

## 3.0.4
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/theme@3.2.2
  - @findable/code@4.0.4

## 3.0.3

## 3.0.2
- [patch] Upgrade pretty proptypes [0ad9962](https://github.com/fnamazing/uiKit/commits/0ad9962)

## 3.0.1
- [patch] Switch to using pretty-proptypes [2b08b6b](https://github.com/fnamazing/uiKit/commits/2b08b6b)

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 2.6.2
- [patch] Update look and feel of collapsed props [e42d92e](https://github.com/fnamazing/uiKit/commits/e42d92e)

## 2.6.1
- [patch] Props with default values are not marked as required [d00499f](https://github.com/fnamazing/uiKit/commits/d00499f)

## 2.6.0
- [minor] Add prop to allow proptype shape to be hidden [3150228](https://github.com/fnamazing/uiKit/commits/3150228)

## 2.5.5
- [patch] Docs now handle props of nested intersections, and remove console errors [fd2d099](https://github.com/fnamazing/uiKit/commits/fd2d099)

## 2.5.4
- [patch] Make header not display when passed a string [cff04f2](https://github.com/fnamazing/uiKit/commits/cff04f2)

## 2.5.3
- [patch] Add converter for intersection in prettyPropType [0d6b5fa](https://github.com/fnamazing/uiKit/commits/0d6b5fa)

## 2.5.2
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 2.5.1
- [patch] Update kind2string dependency to 0.3.1 [2c432fd](https://github.com/fnamazing/uiKit/commits/2c432fd)

## 2.5.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 2.4.3
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 2.4.2
- [patch] Refactor code helper function to fix React re-render bug. [8dcb772](https://github.com/fnamazing/uiKit/commits/8dcb772)

## 2.4.1

## 2.4.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 2.3.0
- [minor] Added support for JSX Elements in default prop declarations [8030309](https://github.com/fnamazing/uiKit/commits/8030309)

## 2.2.0
- [minor] Props  component now understands how to parse members of the Array type [3eebe75](https://github.com/fnamazing/uiKit/commits/3eebe75)

## 2.1.1
- [patch] Convert function parameters [f6c5a21](https://github.com/fnamazing/uiKit/commits/f6c5a21)
- [patch] Convert function parameters [f6c5a21](https://github.com/fnamazing/uiKit/commits/f6c5a21)

## 2.1.0


- [minor] corrected types and added heading option to props [bdf39b3](https://github.com/fnamazing/uiKit/commits/bdf39b3)
- [minor] corrected types and added heading option to props [bdf39b3](https://github.com/fnamazing/uiKit/commits/bdf39b3)

## 2.0.0
- [major] Now renders default props, consumes breaking change from extract-react-types [df9fa94](https://github.com/fnamazing/uiKit/commits/df9fa94)
- [major] Now renders default props, consumes breaking change from extract-react-types [df9fa94](https://github.com/fnamazing/uiKit/commits/df9fa94)

## 1.0.1
- [patch] Releasing 1.x as this is now stable [0b87d5c](https://github.com/fnamazing/uiKit/commits/0b87d5c)
- [patch] Releasing 1.x as this is now stable [0b87d5c](https://github.com/fnamazing/uiKit/commits/0b87d5c)

## 0.0.7
- [patch] Bump version of @findable/docs everywhere [9a0ea18](https://github.com/fnamazing/uiKit/commits/9a0ea18)
- [patch] Bump version of @findable/docs everywhere [9a0ea18](https://github.com/fnamazing/uiKit/commits/9a0ea18)
- [patch] Update react-markings dependency [71d0703](https://github.com/fnamazing/uiKit/commits/71d0703)
- [patch] Update react-markings dependency [71d0703](https://github.com/fnamazing/uiKit/commits/71d0703)

## 0.0.6
- [patch] bump icon dependency [da14956](https://github.com/fnamazing/uiKit/commits/da14956)
- [patch] bump icon dependency [da14956](https://github.com/fnamazing/uiKit/commits/da14956)

## 0.0.5
- [patch] bump consumer versions for release [c730a1c](https://github.com/fnamazing/uiKit/commits/c730a1c)
- [patch] bump consumer versions for release [c730a1c](https://github.com/fnamazing/uiKit/commits/c730a1c)
- [patch] Add documentation to editor core; introduce code formatting method to docs [a1c7e56](https://github.com/fnamazing/uiKit/commits/a1c7e56)
- [patch] Add documentation to editor core; introduce code formatting method to docs [a1c7e56](https://github.com/fnamazing/uiKit/commits/a1c7e56)

## 0.0.4
- [patch] Use correct dependencies  [7b178b1](7b178b1)
- [patch] Use correct dependencies  [7b178b1](7b178b1)
- [patch] Adding responsive behavior to the editor. [e0d9867](e0d9867)
- [patch] Adding responsive behavior to the editor. [e0d9867](e0d9867)
