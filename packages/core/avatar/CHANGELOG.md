# @atlaskit/avatar

## 14.1.1
- [patch] Update avatar index exports to fix babel transpilation bug [0208158](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0208158)

## 14.1.0
- [minor] Adds new theming API to Avatar and AvatarItem components [79dd93f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/79dd93f)

## 14.0.11
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/button@9.0.13
  - @atlaskit/field-base@11.0.8
  - @atlaskit/section-message@1.0.8
  - @atlaskit/toggle@5.0.9
  - @atlaskit/tooltip@12.1.1
  - @atlaskit/icon@14.0.0

## 14.0.10
- [patch] Fix bug where analytics was causing avatar to always have an onClick and render with onClick styles/attributes. [966f1fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/966f1fb)

## 14.0.8
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/tooltip@12.0.9
  - @atlaskit/toggle@5.0.6
  - @atlaskit/section-message@1.0.5
  - @atlaskit/icon@13.2.5
  - @atlaskit/field-base@11.0.5
  - @atlaskit/button@9.0.6
  - @atlaskit/docs@5.0.6

## 14.0.7
- [patch] updated the custom component proxy to be class instead of function to fix the errors related to innerRef [06690a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06690a6)
- [none] Updated dependencies [06690a6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06690a6)

## 14.0.6
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/tooltip@12.0.5
  - @atlaskit/field-base@11.0.3
  - @atlaskit/analytics-next@3.0.4
  - @atlaskit/toggle@5.0.5
  - @atlaskit/button@9.0.5
  - @atlaskit/theme@5.1.3
  - @atlaskit/section-message@1.0.4
  - @atlaskit/icon@13.2.4

## 14.0.5
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/tooltip@12.0.4
  - @atlaskit/icon@13.2.2
  - @atlaskit/toggle@5.0.4
  - @atlaskit/section-message@1.0.3
  - @atlaskit/button@9.0.4
  - @atlaskit/theme@5.1.2
  - @atlaskit/analytics-next@3.0.3
  - @atlaskit/docs@5.0.2
  - @atlaskit/field-base@11.0.2

## 14.0.4
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e331b5)
  - @atlaskit/tooltip@12.0.3
  - @atlaskit/field-base@11.0.1
  - @atlaskit/analytics-next@3.0.2
  - @atlaskit/toggle@5.0.3
  - @atlaskit/button@9.0.3
  - @atlaskit/theme@5.1.1
  - @atlaskit/section-message@1.0.2
  - @atlaskit/icon@13.2.1

## 14.0.3
- [patch] Update docs, change dev deps [25d6e48](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d6e48)
- [none] Updated dependencies [25d6e48](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d6e48)

## 14.0.2
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d4ab4)
  - @atlaskit/tooltip@12.0.1
  - @atlaskit/analytics-next@3.0.1
  - @atlaskit/toggle@5.0.1
  - @atlaskit/button@9.0.2
  - @atlaskit/docs@5.0.1

## 14.0.1
- [patch] Updated dependencies [e6b1985](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6b1985)
  - @atlaskit/tooltip@12.0.0
  - @atlaskit/icon@13.1.1

## 14.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/field-base@11.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/toggle@5.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/field-base@11.0.0
  - @atlaskit/analytics-next@3.0.0
  - @atlaskit/toggle@5.0.0
  - @atlaskit/button@9.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0

## 13.0.0

- [major] Remove unneeded componentType and functionType type exports [7724115](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7724115)
- [none] Updated dependencies [da63331](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da63331)
  - @atlaskit/button@8.2.5
- [none] Updated dependencies [7724115](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7724115)
  - @atlaskit/button@8.2.5

## 12.0.0
- [major] Split avatar-group into its own package [8a01bcd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a01bcd)
- [none] Updated dependencies [8a01bcd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a01bcd)

## 11.2.2
- [patch] Remove or update $FlowFixMe [e8ad98a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e8ad98a)
- [none] Updated dependencies [e8ad98a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e8ad98a)
  - @atlaskit/button@8.2.4
  - @atlaskit/icon@12.6.1
  - @atlaskit/dropdown-menu@5.2.1

## 11.2.1
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d0b2d)
- [none] Updated dependencies [25d0b2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d0b2d)
  - @atlaskit/tooltip@10.3.1
  - @atlaskit/button@8.2.2
  - @atlaskit/icon@12.3.1

## 11.2.0
- [minor] Fixes types for Flow 0.74 [dc50cd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc50cd2)
- [none] Updated dependencies [dc50cd2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc50cd2)
  - @atlaskit/tooltip@10.3.0
  - @atlaskit/button@8.2.0
  - @atlaskit/icon@12.2.0
  - @atlaskit/dropdown-menu@5.1.0

## 11.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/item@7.0.4
  - @atlaskit/icon@12.1.1
  - @atlaskit/field-base@10.1.1
  - @atlaskit/dropdown-menu@5.0.3
  - @atlaskit/button@8.1.1
  - @atlaskit/docs@4.1.1

## 11.1.0
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/tooltip@10.2.0
  - @atlaskit/item@7.0.3
  - @atlaskit/dropdown-menu@5.0.2
  - @atlaskit/icon@12.1.0
  - @atlaskit/toggle@4.0.2
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2
  - @atlaskit/field-base@10.1.0
  - @atlaskit/button@8.1.0

## 11.0.1
- [patch] Update readme's [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/tooltip@10.0.1
  - @atlaskit/item@7.0.1
  - @atlaskit/icon@12.0.1
  - @atlaskit/toggle@4.0.1
  - @atlaskit/field-base@10.0.1
  - @atlaskit/button@8.0.1
  - @atlaskit/theme@4.0.1
  - @atlaskit/docs@4.0.1
  - @atlaskit/dropdown-menu@5.0.1

## 11.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/tooltip@10.0.0
  - @atlaskit/item@7.0.0
  - @atlaskit/icon@12.0.0
  - @atlaskit/toggle@4.0.0
  - @atlaskit/field-base@10.0.0
  - @atlaskit/button@8.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/docs@4.0.0
  - @atlaskit/dropdown-menu@5.0.0

## 10.0.7
- [patch] Fix text color for items with href in AvatarGroup [2cbb9ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2cbb9ff)
- [none] Updated dependencies [2cbb9ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2cbb9ff)

## 10.0.6
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/icon@11.3.0
  - @atlaskit/tooltip@9.2.1
  - @atlaskit/toggle@3.0.2
  - @atlaskit/item@6.0.3
  - @atlaskit/field-base@9.0.3
  - @atlaskit/dropdown-menu@4.0.3
  - @atlaskit/button@7.2.5
  - @atlaskit/theme@3.2.2
  - @atlaskit/docs@3.0.4

## 10.0.4
- [patch] Fix clipping of dropdown items in avatar group for certain browsers [7b82fa6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7b82fa6)

## 10.0.3
- [patch] Fix avatars appearing clickable when no onClick or href prop is provided [e6fec4f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6fec4f)

## 10.0.2
- [patch] Fix native tooltips appearing for avatars without a src prop [6a3fb67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6a3fb67)

## 10.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 9.2.3
- [patch] Remove dependency on @atlaskit/polyfill as it is not being used. [f0f9307](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f0f9307)
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 9.2.2
- [patch] Makes packages Flow types compatible with version 0.67 [25daac0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25daac0)

## 9.2.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 9.2.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 9.1.0
- [minor] Create skeleton representations of various components [cd628e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cd628e4)

## 9.0.4
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 9.0.2
- [patch] Remove babel-plugin-react-flow-props-to-prop-types [06c1f08](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06c1f08)

## 9.0.1
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 9.0.0
- [major] onAvatarClick prop on AvatarGroup now has a second argument. This second argument is the item that was clicked on. [23a488e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23a488e)

## 8.4.1
- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak mk 2 [bdeef5b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bdeef5b)

## 8.4.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 8.3.10
- [patch] update flow dep, fix flow errors  [722ad83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/722ad83)
- [patch] update flow dep, fix flow errors  [722ad83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/722ad83)

## 8.3.6
- [patch] migrating avatar package to new repo [f3f5e51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3f5e51)

## 8.3.5 (2017-11-30)
* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))

## 8.3.4 (2017-11-28)
* bug fix; fix avatar group having less width than its children (issues closed: ak-3872) ([e88ee42](https://bitbucket.org/atlassian/atlaskit/commits/e88ee42))


## 8.3.3 (2017-11-23)
* bug fix; fix avatar group's more items dropdown not being tabbable (issues closed: ak-3707) ([a0ee45d](https://bitbucket.org/atlassian/atlaskit/commits/a0ee45d))

## 8.3.2 (2017-11-20)
* bug fix; fS-3907 Use Tooltip component in Avatar ([2126336](https://bitbucket.org/atlassian/atlaskit/commits/2126336))

## 8.3.1 (2017-11-16)
* bug fix; avatar flex styles are now explicit to fix Firefox issue (issues closed: ak-3898) ([73ac57d](https://bitbucket.org/atlassian/atlaskit/commits/73ac57d))

## 8.3.0 (2017-11-16)
* feature; added a new prop background in AvatarItem to have custom background (issues closed: ak-3706) ([e93888c](https://bitbucket.org/atlassian/atlaskit/commits/e93888c))

## 8.2.4 (2017-11-15)
* bug fix; fix incorrect border radius on Avatars (issues closed: ak-3897) ([6570495](https://bitbucket.org/atlassian/atlaskit/commits/6570495))

## 8.2.3 (2017-11-15)
* bug fix; explicitly disable tooltip on avatar when rendered in a group dropdown ([593f2e9](https://bitbucket.org/atlassian/atlaskit/commits/593f2e9))

## 8.2.2 (2017-11-15)
* bug fix; improve avatar perf by caching  styled components (issues closed: ak-3699) ([0e6fa65](https://bitbucket.org/atlassian/atlaskit/commits/0e6fa65))

## 8.2.1 (2017-11-14)
* bug fix; add additional link target options (issues closed: ak-3886) ([a932aa8](https://bitbucket.org/atlassian/atlaskit/commits/a932aa8))

## 8.2.0 (2017-11-14)
* feature; aK-3883 Expose boundariesElement property on AvatarGroup component ([78001fd](https://bitbucket.org/atlassian/atlaskit/commits/78001fd))

## 8.1.0 (2017-11-13)
* feature; add support for focus presence type (issues closed: ak-3758) ([06b6da3](https://bitbucket.org/atlassian/atlaskit/commits/06b6da3))
* bug fix; AvatarGroup more indicator fixed in Firefox (issues closed: ak-3791) ([6c9464e](https://bitbucket.org/atlassian/atlaskit/commits/6c9464e))

## 8.0.11 (2017-11-02)
* bug fix; added missing dependencies (issues closed: ak-3782) ([4dbc3ef](https://bitbucket.org/atlassian/atlaskit/commits/4dbc3ef))

## 8.0.10 (2017-10-26)
* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))


## 8.0.9 (2017-10-22)
* bug fix; update dependencies for react-16 ([077d1ad](https://bitbucket.org/atlassian/atlaskit/commits/077d1ad))


## 8.0.8 (2017-10-15)
* bug fix; fix borked styles caused by missing semicolons in CSS (issues closed: ak-3694) ([07e0c54](https://bitbucket.org/atlassian/atlaskit/commits/07e0c54))

## 8.0.7 (2017-10-13)
* bug fix; add polyfill from AK polyfills package (issues closed: ak-3667) ([a841e6d](https://bitbucket.org/atlassian/atlaskit/commits/a841e6d))

## 8.0.6 (2017-10-09)
* bug fix; remove the console error Invalid prop types for border ([de45a14](https://bitbucket.org/atlassian/atlaskit/commits/de45a14))


## 8.0.5 (2017-09-18)
* bug fix; fix avatar isInteractive style ([1296049](https://bitbucket.org/atlassian/atlaskit/commits/1296049))


## 8.0.4 (2017-09-12)
* bug fix; avatars now display in Firefox when used in an Avatar Group ([1db854f](https://bitbucket.org/atlassian/atlaskit/commits/1db854f))

## 8.0.3 (2017-09-11)
* bug fix; limit avatar + more count to maxCount size (issues closed: ak-3472) ([3516192](https://bitbucket.org/atlassian/atlaskit/commits/3516192))

## 8.0.1 (2017-09-05)
* bug fix; update dark theme color palette (issues closed: ak-3172) ([d23e55f](https://bitbucket.org/atlassian/atlaskit/commits/d23e55f))

## 8.0.0 (2017-08-11)
* bug fix; fix the theme-dependency ([db90333](https://bitbucket.org/atlassian/atlaskit/commits/db90333))
* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* feature; dark mode for avatar ([3eb7531](https://bitbucket.org/atlassian/atlaskit/commits/3eb7531))

## 7.0.0 (2017-08-11)
* breaking; affects internal styled-components implementation ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* breaking; implement dark mode theme ([d14522a](https://bitbucket.org/atlassian/atlaskit/commits/d14522a))
* feature; dark mode for avatar ([3eb7531](https://bitbucket.org/atlassian/atlaskit/commits/3eb7531))

## 6.4.5 (2017-08-04)
* bug fix; moves babel-plugin-react-flow-props-to-prop-types to a devDependency ([6378b88](https://bitbucket.org/atlassian/atlaskit/commits/6378b88))

## 6.4.4 (2017-08-03)
* bug fix; fixes uncaught type error in avatar by consuming latest util-shared-styles (issues closed: ak-3067) ([be705fa](https://bitbucket.org/atlassian/atlaskit/commits/be705fa))

## 6.4.3 (2017-07-28)
* fix; fixes avatars devDeps to include lozenge and button-group ([d9ae05f](https://bitbucket.org/atlassian/atlaskit/commits/d9ae05f))

## 6.4.2 (2017-07-27)
* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 6.4.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))


## 6.1.0 (2017-07-17)
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 5.0.0 (2017-07-12)
* feature; added the xxlarge size to Avatar ([5cfbfb5](https://bitbucket.org/atlassian/atlaskit/commits/5cfbfb5))
* feature; adds AvatarGroup export with 'stack' and 'grid' appearances ([59dac0c](https://bitbucket.org/atlassian/atlaskit/commits/59dac0c))
* feature; adds AvatarItem named export to Avatar ([9939bfd](https://bitbucket.org/atlassian/atlaskit/commits/9939bfd))
* feature; adds name prop to Avatar (replaces label) ([5cfe547](https://bitbucket.org/atlassian/atlaskit/commits/5cfe547))
* feature; adds tooltips for Avatars ([816402a](https://bitbucket.org/atlassian/atlaskit/commits/816402a))
* feature; avatar how handles href, onClick and arbitrary \`component\` prop functionality ([763e00c](https://bitbucket.org/atlassian/atlaskit/commits/763e00c))
* feature; presence prop now accepts a react element in addition to its enumerable values (rep ([dfcc3f7](https://bitbucket.org/atlassian/atlaskit/commits/dfcc3f7))
* feature; replaced presenceBorderColor prop with \`borderColor\` ([0e4c171](https://bitbucket.org/atlassian/atlaskit/commits/0e4c171))

* breaking; Removed presenceBorderColor prop (replaced with \`borderColor\`)
* breaking; \`icon\` prop has been replaced with a more accepting \`presence\` prop
* breaking; Label prop has been replaced with \`name\`

## 4.0.6 (2017-06-27)
* fix; when src is removed after mount show default image ([d3e9e2a](https://bitbucket.org/atlassian/atlaskit/commits/d3e9e2a))

## 4.0.4 (2017-05-26)
* fix; change align-items: middle to align-items: center ([8740b22](https://bitbucket.org/atlassian/atlaskit/commits/8740b22))
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))

## 4.0.3 (2017-05-23)
* fix; update util-shared-styles and util-readme dependencies ([9c0e218](https://bitbucket.org/atlassian/atlaskit/commits/9c0e218))

## 4.0.2 (2017-05-11)
* fix; load avatar from src prop correctly ([d94798e](https://bitbucket.org/atlassian/atlaskit/commits/d94798e))

## 4.0.1 (2017-05-10)
* fix; testing releasing more than 5 packages at a time ([e69b832](https://bitbucket.org/atlassian/atlaskit/commits/e69b832))

## 4.0.0 (2017-05-03)
* feature; optional square avatar appearance ([c43c905](https://bitbucket.org/atlassian/atlaskit/commits/c43c905))
* breaking; Previously you could pass a custom Presence to an Avatar via the Avatar's children. Now, these custom Presence or icon elements should be passed to the new 'icon' prop. This change has been made to avoid overloading the concept of Presence and to make the API clearer.
* ISSUES CLOSED: AK-1645

## 3.0.3 (2017-04-27)
* fix; isolate getPresenceSVG in its own module so we only export a single React Component ([ca8e14b](https://bitbucket.org/atlassian/atlaskit/commits/ca8e14b))
* fix; remove unused constants.js, import correctly from Avatar component for tests ([fcaccb9](https://bitbucket.org/atlassian/atlaskit/commits/fcaccb9))

## 3.0.2 (2017-04-27)
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 3.0.1 (2017-04-26)
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 3.0.0 (2017-04-13)
* null refactor avatar to styled-components ([21a371c](https://bitbucket.org/atlassian/atlaskit/commits/21a371c))
* breaking; added peerDependency "styled-components", removed dependency "classnames"
* ISSUES CLOSED: AK-2099

## 2.1.5 (2017-04-04)
* fix; fixes avatar to be able to be tested using mocha and jsdom ([7a0f9fb](https://bitbucket.org/atlassian/atlaskit/commits/7a0f9fb))

## 2.1.4 (2017-03-23)
* fix; Empty commit to release the component ([49c08ee](https://bitbucket.org/atlassian/atlaskit/commits/49c08ee))

## 2.1.2 (2017-03-21)
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 2.1.0 (2017-03-06)
* feature; adds 'xsmall' size to avatar appearance (16px) ([d8da663](https://bitbucket.org/atlassian/atlaskit/commits/d8da663))

## 2.0.2 (2017-02-16)
* fix; refactor stories to use // rather than http:// ([a0826cf](https://bitbucket.org/atlassian/atlaskit/commits/a0826cf))

## 2.0.1 (2017-02-10)
* fix; Dummy commit to release components to registry ([5bac43b](https://bitbucket.org/atlassian/atlaskit/commits/5bac43b))
