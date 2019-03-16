# @findable/calendar

## 7.0.20
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/icon@16.0.5
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 7.0.19
- [patch] [f8cf9e271e](https://github.com/fnamazing/uiKit/commits/f8cf9e271e):

  - Internal changes only. Calendar is now ssr-friendly.

## 7.0.18
- Updated dependencies [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):
  - @findable/button@10.1.3
  - @findable/icon@16.0.4
  - @findable/docs@7.0.0
  - @findable/analytics-next@4.0.0
  - @findable/theme@8.0.0

## 7.0.17
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/icon@16.0.0

## 7.0.16
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/button@10.1.1
  - @findable/icon@15.0.2
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 7.0.15
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/icon@15.0.1
  - @findable/theme@7.0.0

## 7.0.14
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/icon@15.0.0

## 7.0.13
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/icon@14.6.1
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 7.0.12
- [patch] [21f5216](https://github.com/fnamazing/uiKit/commits/21f5216):

  - Remove enzyme-to-json as it is used in our jestFrameworkSetup.js

## 7.0.11
- [patch] [a637f5e](https://github.com/fnamazing/uiKit/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @findable/analytics-next HOCs to allow flow to type check properly

## 7.0.10
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 7.0.9
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/icon@14.0.0

## 7.0.8
- [patch] Fixes bug on next and prev month navigation. [c4770a0](https://github.com/fnamazing/uiKit/commits/c4770a0)

## 7.0.7
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 7.0.5
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/icon@13.2.5
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 7.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/analytics-next@3.0.4
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/icon@13.2.4

## 7.0.3
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/icon@13.2.2
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2

## 7.0.2
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/analytics-next@3.0.2
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/icon@13.2.1

## 7.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/analytics-next@3.0.1
  - @findable/button@9.0.2
  - @findable/docs@5.0.1

## 7.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/icon@13.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/icon@13.0.0

## 6.2.2
- [patch] Fix Calendar width increasing for some months [29ffb24](https://github.com/fnamazing/uiKit/commits/29ffb24)
- [patch] Updated dependencies [29ffb24](https://github.com/fnamazing/uiKit/commits/29ffb24)

## 6.2.1
- [patch] Calendar chevrons use large versions [a973ac3](https://github.com/fnamazing/uiKit/commits/a973ac3)
- [patch] Updated dependencies [a973ac3](https://github.com/fnamazing/uiKit/commits/a973ac3)

## 6.2.0
- [minor] Visual changes to match ADG3 guidelines [059d111](https://github.com/fnamazing/uiKit/commits/059d111)
- [minor] Updated dependencies [059d111](https://github.com/fnamazing/uiKit/commits/059d111)

## 6.1.3
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
- [none] Updated dependencies [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
  - @findable/button@8.2.2
  - @findable/icon@12.3.1

## 6.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/button@8.1.2
  - @findable/theme@4.0.4
  - @findable/icon@12.1.2

## 6.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/icon@12.1.1
  - @findable/button@8.1.1
  - @findable/docs@4.1.1

## 6.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/icon@12.1.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/button@8.1.0


## 6.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/icon@12.0.1
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/docs@4.0.1

## 6.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/icon@12.0.0
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/docs@4.0.0

## 5.0.4
- [patch] Fix issue causing a mouseup to select a date. It is now bound to click. [1cd0b7e](https://github.com/fnamazing/uiKit/commits/1cd0b7e)

## 5.0.3
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/button@7.2.5
  - @findable/theme@3.2.2
  - @findable/docs@3.0.4

## 5.0.1
- [patch] Better styles for disabled dates [866c497](https://github.com/fnamazing/uiKit/commits/866c497)

## 5.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 4.0.0
- [major] QoL and consistency changes to the calendar and datetime-picker APIs. Added the ability to specify a string to the DateTimePicker component. Remove stateless components and make each component stateless or stateful using the controlled / uncontrolled pattern. Misc prop renames for consistency. [ab21d8e](https://github.com/fnamazing/uiKit/commits/ab21d8e)

## 3.2.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 3.2.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 3.1.3
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 3.1.2
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 3.1.1
- [patch] Flatten examples for easier consumer use [145b632](https://github.com/fnamazing/uiKit/commits/145b632)

## 3.1.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 3.0.13
- [patch] Fixed issue where hovering over a disabled date would not show a disabled cursor. [5c21f9b](https://github.com/fnamazing/uiKit/commits/5c21f9b)

## 3.0.12
- [patch] Fix calendar dates not being selectable in IE11 [a65e3b0](https://github.com/fnamazing/uiKit/commits/a65e3b0)

## 3.0.10
- [patch] stopped disabled dates from triggering onClick prop [3b42698](https://github.com/fnamazing/uiKit/commits/3b42698)

## 3.0.9
- [patch] did some clean up with accessibility of calendar [48797f2](https://github.com/fnamazing/uiKit/commits/48797f2)

## 3.0.6
- [patch] bump icon dependency [da14956](https://github.com/fnamazing/uiKit/commits/da14956)

## 3.0.4
- [patch] Use correct dependencies  [7b178b1](7b178b1)
- [patch] Adding responsive behavior to the editor. [e0d9867](e0d9867)
