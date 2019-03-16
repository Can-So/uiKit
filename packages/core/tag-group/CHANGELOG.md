# @findable/tag-group

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

## 6.0.8
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/avatar@14.1.7
  - @findable/tag@6.1.3
  - @findable/docs@6.0.0

## 6.0.7
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 6.0.6
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 6.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/tag@6.0.4
  - @findable/avatar@14.0.6

## 6.0.3
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/tag@6.0.3
  - @findable/docs@5.0.2
  - @findable/avatar@14.0.5

## 6.0.2
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/tag@6.0.2
  - @findable/avatar@14.0.4

## 6.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/tag@6.0.1
  - @findable/docs@5.0.1
  - @findable/avatar@14.0.2

## 6.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/tag@6.0.0
  - @findable/docs@5.0.0
  - @findable/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/tag@6.0.0
  - @findable/docs@5.0.0
  - @findable/avatar@14.0.0

## 5.1.3


- [none] Updated dependencies [da63331](https://github.com/fnamazing/uiKit/commits/da63331)
  - @findable/tag@5.0.7
  - @findable/avatar@13.0.0
- [patch] Updated dependencies [7724115](https://github.com/fnamazing/uiKit/commits/7724115)
  - @findable/avatar@13.0.0
  - @findable/tag@5.0.7

## 5.1.2
- [patch] Updated dependencies [8a01bcd](https://github.com/fnamazing/uiKit/commits/8a01bcd)
  - @findable/avatar@12.0.0
  - @findable/tag@5.0.6

## 5.1.1
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/tag@5.0.4

## 5.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/avatar@11.1.0
  - @findable/tag@5.0.2
  - @findable/docs@4.1.0

## 5.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/tag@5.0.1
  - @findable/docs@4.0.1
  - @findable/avatar@11.0.1

## 5.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/tag@5.0.0
  - @findable/docs@4.0.0
  - @findable/avatar@11.0.0

## 4.0.1
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/tag@4.1.1
  - @findable/avatar@10.0.6
  - @findable/docs@3.0.4

## 4.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 3.6.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 3.6.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 3.5.3
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 3.5.2
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 3.5.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 3.4.2 (2017-07-27)
* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 3.4.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 3.1.0 (2017-07-17)
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 3.0.1 (2017-07-13)
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 3.0.0 (2017-05-06)
* feature; updates tag dependency to 2.x ([ec6544f](https://bitbucket.org/atlassian/atlaskit/commits/ec6544f))
* breaking; introduces a peer dependency on @findable/tag version 2.x

## 2.0.2 (2017-04-27)
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 2.0.1 (2017-04-26)
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 2.0.0 (2017-04-05)
* refactor the tag-group component to use styled-components ([0a3c118](https://bitbucket.org/atlassian/atlaskit/commits/0a3c118))
* breaking; added peerDependency "styled-components", removed dependency "classnames"
* ISSUES CLOSED: AK-2034

## 1.0.7 (2017-04-02)
* fix; change one of the maintainers ([e9a3011](https://bitbucket.org/atlassian/atlaskit/commits/e9a3011))

## 1.0.6 (2017-03-28)
* fix; adds story for rounded tags in a tag group ([51bfe30](https://bitbucket.org/atlassian/atlaskit/commits/51bfe30))

## 1.0.5 (2017-03-23)
* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 1.0.3 (2017-03-21)
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.0.2 (2017-02-28)
* fix; adds warning ot usage.md about editing readme ([db6a143](https://bitbucket.org/atlassian/atlaskit/commits/db6a143))
* fix; removes jsdoc annotations, moves content to usage.md ([826a4e0](https://bitbucket.org/atlassian/atlaskit/commits/826a4e0))
* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 1.0.1 (2017-02-07)
* fix; Updates package to use scoped ak packages ([2d3fc62](https://bitbucket.org/atlassian/atlaskit/commits/2d3fc62))
