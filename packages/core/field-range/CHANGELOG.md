# @atlaskit/field-range

## 6.0.1
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/section-message@2.0.1
  - @atlaskit/theme@8.0.1

## 6.0.0
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

## 5.0.17
- Updated dependencies [3a7e838663](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7e838663):
  - @atlaskit/section-message@1.2.0

## 5.0.16
- Updated dependencies [dfd4cbc475](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfd4cbc475):
  - @atlaskit/section-message@1.1.0

## 5.0.15
- Updated dependencies [b8091afbdd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b8091afbdd):
  - @atlaskit/section-message@1.0.17

## 5.0.14
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/section-message@1.0.16

## 5.0.13
- Updated dependencies [6d08da6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d08da6):
  - @atlaskit/section-message@1.0.15

## 5.0.12
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/section-message@1.0.14
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 5.0.11
- Updated dependencies [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):
  - @atlaskit/docs@5.2.3
  - @atlaskit/section-message@1.0.13
  - @atlaskit/theme@7.0.0

## 5.0.10
- [patch] [ebc1e9d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ebc1e9d):

  - Bump to fix the range in Section message

## 5.0.9
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/section-message@1.0.11
  - @atlaskit/theme@6.2.1

## 5.0.8
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 5.0.7
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 5.0.5
- [patch] Refactored hacky change handler out of field-range. Should help server-side-rendering also. [2741c07](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2741c07)
- [none] Updated dependencies [2741c07](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2741c07)

## 5.0.4
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/docs@5.0.6

## 5.0.3
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/theme@5.1.3

## 5.0.2
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/theme@5.1.2
  - @atlaskit/docs@5.0.2

## 5.0.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/theme@5.1.1

## 5.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0

## 4.1.1
- [patch] update valuePercent state when value property is updated in FieldRange [8228477](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8228477)
- [none] Updated dependencies [8228477](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8228477)

## 4.1.0
- [minor] Added elevations to the Theme package and updated visual styles for the field-range component. [dbd8de7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dbd8de7)
- [none] Updated dependencies [dbd8de7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dbd8de7)
  - @atlaskit/theme@4.1.0

## 4.0.3
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/theme@4.0.4

## 4.0.2
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2

## 4.0.1
- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/theme@4.0.1
  - @atlaskit/docs@4.0.1

## 4.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/theme@4.0.0
  - @atlaskit/docs@4.0.0

## 3.0.2
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 2.6.3
- [patch] updated logic to calculate value percent [7e070f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e070f5)

## 2.6.2

- [patch] updated styles to be aligned with akit [53b9e18](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/53b9e18)

## 2.6.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 2.6.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 2.5.3
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 2.5.2
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 2.5.1
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 2.5.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 2.4.6
- [patch] Migrated to new repo & build system [450559a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/450559a)

## 2.4.5 (2017-11-15)
* bug fix; bumping internal dependencies to latest major version ([7857613](https://bitbucket.org/atlassian/atlaskit/commits/7857613))

## 2.4.4 (2017-10-26)
* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 2.4.3 (2017-10-22)
* bug fix; update styled component dependency and react peerDep ([39f3286](https://bitbucket.org/atlassian/atlaskit/commits/39f3286))

## 2.4.2 (2017-07-27)
* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 2.4.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 2.1.0 (2017-07-17)
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 2.1.0 (2017-07-17)
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 1.0.0 (2017-07-06)
* feature; convert Slider component into fieldRange one ([f5dc3dd](https://bitbucket.org/atlassian/atlaskit/commits/f5dc3dd))
* feature; update FieldRange specs to make it compatible with IE ([25963aa](https://bitbucket.org/atlassian/atlaskit/commits/25963aa))
* feature; update naming from sliderRange docs ([41c3af1](https://bitbucket.org/atlassian/atlaskit/commits/41c3af1))
