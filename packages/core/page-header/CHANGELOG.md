# @findable/page-header

## 7.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/breadcrumbs@7.0.1
  - @findable/inline-edit@8.0.1
  - @findable/page@9.0.1
  - @findable/select@8.0.3
  - @findable/textfield@0.3.1
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

## 6.1.4
- Updated dependencies [e9b824bf86](https://github.com/fnamazing/uiKit/commits/e9b824bf86):
  - @findable/textfield@0.2.0

## 6.1.3
- [patch] [4b0fb4e85f](https://github.com/fnamazing/uiKit/commits/4b0fb4e85f):

  - Allow items in Page Header actions to wrap on small screens.

## 6.1.2
- Updated dependencies [06713e0a0c](https://github.com/fnamazing/uiKit/commits/06713e0a0c):
  - @findable/breadcrumbs@6.0.15
  - @findable/select@7.0.0

## 6.1.1
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/breadcrumbs@6.0.14
  - @findable/button@10.1.1
  - @findable/inline-edit@7.1.7
  - @findable/page@8.0.12
  - @findable/select@6.1.13
  - @findable/textfield@0.1.4
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 6.1.0
- [minor] [6cfa757](https://github.com/fnamazing/uiKit/commits/6cfa757):

  - PageHeader without truncation now wraps actions below the heading to avoid the heading becoming too narrow

## 6.0.9
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/breadcrumbs@6.0.12
  - @findable/button@10.0.4
  - @findable/field-text@7.0.16
  - @findable/inline-edit@7.1.6
  - @findable/input@4.0.8
  - @findable/single-select@6.0.10
  - @findable/theme@7.0.0

## 6.0.8
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/breadcrumbs@6.0.11
  - @findable/field-text@7.0.15
  - @findable/inline-edit@7.1.4
  - @findable/page@8.0.11
  - @findable/single-select@6.0.8
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 6.0.7
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 6.0.6
- [patch] Pulling the shared styles from @findable/theme and removed dependency on util-shraed-styles [7d51a09](https://github.com/fnamazing/uiKit/commits/7d51a09)

## 6.0.5
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 6.0.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/page@8.0.3
  - @findable/input@4.0.3
  - @findable/inline-edit@7.0.4
  - @findable/field-text@7.0.4
  - @findable/button@9.0.5
  - @findable/breadcrumbs@6.0.5

## 6.0.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/page@8.0.2
  - @findable/single-select@6.0.3
  - @findable/inline-edit@7.0.3
  - @findable/button@9.0.4
  - @findable/input@4.0.2
  - @findable/field-text@7.0.3
  - @findable/docs@5.0.2
  - @findable/breadcrumbs@6.0.4

## 6.0.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/input@4.0.1
  - @findable/inline-edit@7.0.2
  - @findable/field-text@7.0.2
  - @findable/page@8.0.1
  - @findable/button@9.0.3
  - @findable/breadcrumbs@6.0.3

## 6.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/single-select@6.0.0
  - @findable/input@4.0.0
  - @findable/inline-edit@7.0.0
  - @findable/field-text@7.0.0
  - @findable/page@8.0.0
  - @findable/button@9.0.0
  - @findable/docs@5.0.0
  - @findable/breadcrumbs@6.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/page@8.0.0
  - @findable/single-select@6.0.0
  - @findable/input@4.0.0
  - @findable/inline-edit@7.0.0
  - @findable/field-text@7.0.0
  - @findable/button@9.0.0
  - @findable/docs@5.0.0
  - @findable/breadcrumbs@6.0.0

## 5.1.4
- [patch] Remove or update $FlowFixMe [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
- [none] Updated dependencies [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
  - @findable/inline-edit@6.1.4
  - @findable/field-text@6.1.1
  - @findable/button@8.2.4
  - @findable/breadcrumbs@5.1.2

## 5.1.3
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
- [none] Updated dependencies [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
  - @findable/single-select@5.2.1
  - @findable/button@8.2.2

## 5.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/single-select@5.1.2
  - @findable/input@3.0.2
  - @findable/inline-edit@6.1.3
  - @findable/field-text@6.0.4
  - @findable/button@8.1.2
  - @findable/page@7.1.1

## 5.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/single-select@5.1.1
  - @findable/inline-edit@6.1.2
  - @findable/button@8.1.1
  - @findable/breadcrumbs@5.1.1
  - @findable/docs@4.1.1

## 5.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/single-select@5.1.0
  - @findable/page@7.1.0
  - @findable/breadcrumbs@5.1.0
  - @findable/inline-edit@6.1.0
  - @findable/docs@4.1.0
  - @findable/field-text@6.0.2
  - @findable/button@8.1.0

## 5.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/page@7.0.1
  - @findable/inline-edit@6.0.1
  - @findable/field-text@6.0.1
  - @findable/button@8.0.1
  - @findable/docs@4.0.1
  - @findable/breadcrumbs@5.0.1

## 5.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/page@7.0.0
  - @findable/single-select@5.0.0
  - @findable/inline-edit@6.0.0
  - @findable/input@3.0.0
  - @findable/field-text@6.0.0
  - @findable/button@8.0.0
  - @findable/docs@4.0.0
  - @findable/breadcrumbs@5.0.0

## 4.0.3
- [patch] Updated dependencies [1c87e5a](https://github.com/fnamazing/uiKit/commits/1c87e5a)
  - @findable/page@6.0.4

## 4.0.2
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/page@6.0.3
  - @findable/single-select@4.0.3
  - @findable/inline-edit@5.0.2
  - @findable/input@2.0.2
  - @findable/field-text@5.0.3
  - @findable/button@7.2.5
  - @findable/breadcrumbs@4.1.3
  - @findable/docs@3.0.4

## 4.0.1
- [patch] Fixed alignment of title for page-header [a9f95f6](https://github.com/fnamazing/uiKit/commits/a9f95f6)

## 4.0.0
- [major] Titles no longer truncate by default. Use the truncateTitle prop instead. [6879ef0](https://github.com/fnamazing/uiKit/commits/6879ef0)

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 2.4.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 2.4.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 2.3.0
- [minor] Add disableTitleStyles prop to enable the composition of components that may be affected by the default heading styles. This is a stop-gap measure until we can make a breaking change to update the API to inherently facilitate this. [0866a89](https://github.com/fnamazing/uiKit/commits/0866a89)

## 2.2.2
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 2.2.1
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 2.2.0
- [minor] Update readme and docs [7a53047](https://github.com/fnamazing/uiKit/commits/7a53047)

## 2.1.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 2.0.7
- [patch] Update dependencies [623f8ca](https://github.com/fnamazing/uiKit/commits/623f8ca)

## 2.0.1
- [patch] Migrated page-header to mk2. Fixed breadcrumbs main entry point [51bf0c7](https://github.com/fnamazing/uiKit/commits/51bf0c7)
- [patch] Migrated page-header to mk2. Fixed breadcrumbs main entry point [51bf0c7](https://github.com/fnamazing/uiKit/commits/51bf0c7)
