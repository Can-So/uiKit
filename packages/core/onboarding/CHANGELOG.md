# @findable/onboarding

## 7.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/icon@16.0.5
  - @findable/modal-dialog@8.0.2
  - @findable/popper@0.4.1
  - @findable/portal@0.2.1
  - @findable/progress-indicator@6.0.1
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

## 6.2.0
- [minor] [eb81a2de65](https://github.com/fnamazing/uiKit/commits/eb81a2de65):

  - Spotlight footer and header props will now only accept React components

## 6.1.17
- [patch] [d669123bbd](https://github.com/fnamazing/uiKit/commits/d669123bbd):

  - Enable auto focus by rendering components only after the portal has been attached to DOM.
- Updated dependencies [27cacd44ab](https://github.com/fnamazing/uiKit/commits/27cacd44ab):
  - @findable/modal-dialog@7.2.2
  - @findable/portal@0.1.0

## 6.1.16
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/modal-dialog@7.2.1
  - @findable/portal@0.0.18
  - @findable/icon@16.0.0

## 6.1.15
- [patch] [6855bec](https://github.com/fnamazing/uiKit/commits/6855bec):

  - Updated internal use of ModalDialog to use new composition API

## 6.1.14
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/button@10.1.1
  - @findable/icon@15.0.2
  - @findable/modal-dialog@7.1.1
  - @findable/popper@0.3.6
  - @findable/portal@0.0.17
  - @findable/progress-indicator@5.0.11
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 6.1.13
- [patch] [e59562a](https://github.com/fnamazing/uiKit/commits/e59562a):

  - Fix for visual bug in SpotlightCard component

## 6.1.12
- [patch] [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):

  - Change API to experimental theming API to namespace component themes into separate contexts and make theming simpler. Update all dependant components.

## 6.1.11
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/modal-dialog@7.0.13
  - @findable/portal@0.0.16
  - @findable/icon@15.0.0

## 6.1.10
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/icon@14.6.1
  - @findable/modal-dialog@7.0.12
  - @findable/popper@0.3.2
  - @findable/portal@0.0.15
  - @findable/progress-indicator@5.0.9
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 6.1.9
- [patch] [e151c1a](https://github.com/fnamazing/uiKit/commits/e151c1a):

  - Removes dependency on @findable/layer-manager

  As of component versions:

  - \`@findable/modal-dialog@7.0.0\`
  - \`@findable/tooltip@12.0.2\`
  - \`@findable/flag@9.0.6\`
  - \`@findable/onboarding@6.0.0\`

  No component requires \`LayerManager\` to layer correctly.

  You can safely remove this dependency and stop rendering \`LayerManager\` in your apps.

## 6.1.8
- Updated dependencies [1fb2c2a](https://github.com/fnamazing/uiKit/commits/1fb2c2a):
  - @findable/modal-dialog@7.0.9
  - @findable/portal@0.0.14

## 6.1.7
- Updated dependencies [3f5a4dd](https://github.com/fnamazing/uiKit/commits/3f5a4dd):
  - @findable/modal-dialog@7.0.8
  - @findable/portal@0.0.13

## 6.1.6
- [patch] [a637f5e](https://github.com/fnamazing/uiKit/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @findable/analytics-next HOCs to allow flow to type check properly

## 6.1.5
- [patch] [b332c91](https://github.com/fnamazing/uiKit/commits/b332c91):

  - upgrades verison of react-scrolllock to SSR safe version

## 6.1.4
- [patch] [9f91ea0](https://github.com/fnamazing/uiKit/commits/9f91ea0):

  - Adds visual regression test for ie11

## 6.1.3
- [patch] [4872a19](https://github.com/fnamazing/uiKit/commits/4872a19):

  * actions prop officially accepts Node type for text. Adds optional key to action type.

  Previously if you were using the actions prop like:

  ```jsx
  <Spotlight
    actions={[
      {
        text: <FormattedMessage defaultMessage="Next" />,
      },
      {
        text: <FormattedMessage defaultMessage="Skip" />,
      },
    ]}
  >
    Look at this feature
  </Spotlight>
  ```

  React would complain about duplicate keys. Now you can pass in
  a key for the action like:

  ```jsx
  <Spotlight
    actions={[
      {
        text: <FormattedMessage defaultMessage="Next" />,
        key: 'next',
      },
      {
        text: <FormattedMessage defaultMessage="Skip" />,
        key: 'skip',
      },
    ]}
  >
    Look at this feature
  </Spotlight>
  ```

## 6.1.2
- [patch] [2482922"
d](https://github.com/fnamazing/uiKit/commits/2482922"
d):

  - Remove unecessary alt text for modal image to avoid redundancy for screenreaders

## 6.1.1
- [patch] [0c7a57d"
d](https://github.com/fnamazing/uiKit/commits/0c7a57d"
d):

  - Fixes layering of blanket and spotlight components in IE11 and Edge

## 6.1.0
- [minor] Creates new SpotlightCard component. Internal refactor of Spotlight components. Spotlight state managed through context rather than local variable. [f9ba552](https://github.com/fnamazing/uiKit/commits/f9ba552)

## 6.0.4
- [patch] Updated dependencies [aaab348](https://github.com/fnamazing/uiKit/commits/aaab348)
  - @findable/modal-dialog@7.0.4
  - @findable/portal@0.0.12

## 6.0.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 6.0.2
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/layer-manager@5.0.13
  - @findable/modal-dialog@7.0.2
  - @findable/portal@0.0.10
  - @findable/icon@14.0.0

## 6.0.1
- [patch] Updated dependencies [d5a043a](https://github.com/fnamazing/uiKit/commits/d5a043a)
  - @findable/icon@13.8.1
  - @findable/layer-manager@5.0.12
  - @findable/modal-dialog@7.0.0

## 6.0.0
- [major] Add SpotlightTransition and require it wraps Spotlight to get both transitions and conditional rendering with proper transitions on unmount. [d9d2f0d](https://github.com/fnamazing/uiKit/commits/d9d2f0d)
- [patch] Upgrades Spotlight component to use @findable/portal package [89be4f1](https://github.com/fnamazing/uiKit/commits/89be4f1)
- [none] Updated dependencies [89be4f1](https://github.com/fnamazing/uiKit/commits/89be4f1)
  - @findable/portal@0.0.8
  - @findable/layer-manager@5.0.11

## 5.1.9
- [patch] Updated dependencies [9c66d4d](https://github.com/fnamazing/uiKit/commits/9c66d4d)
  - @findable/layer-manager@5.0.10
  - @findable/webdriver-runner@0.1.0

## 5.1.8
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 5.1.6
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/modal-dialog@6.0.9
  - @findable/layer-manager@5.0.6
  - @findable/icon@13.2.5
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 5.1.5
- [patch] Updated dependencies [8242529](https://github.com/fnamazing/uiKit/commits/8242529)
  - @findable/layer@5.0.5

## 5.1.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/modal-dialog@6.0.6
  - @findable/analytics-next@3.0.4
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/layer@5.0.4
  - @findable/layer-manager@5.0.5
  - @findable/icon@13.2.4

## 5.1.3
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/layer-manager@5.0.4
  - @findable/icon@13.2.2
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2
  - @findable/layer@5.0.3
  - @findable/modal-dialog@6.0.5

## 5.1.2
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/modal-dialog@6.0.4
  - @findable/analytics-next@3.0.2
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/layer@5.0.2
  - @findable/layer-manager@5.0.3
  - @findable/icon@13.2.1

## 5.1.1
- [patch] onboarding spotlight: fix margin affecting target position [0e33c70](https://github.com/fnamazing/uiKit/commits/0e33c70)
- [none] Updated dependencies [0e33c70](https://github.com/fnamazing/uiKit/commits/0e33c70)

## 5.1.0
- [minor] round corners for onboarding modal image [785e99a](https://github.com/fnamazing/uiKit/commits/785e99a)
- [none] Updated dependencies [785e99a](https://github.com/fnamazing/uiKit/commits/785e99a)

## 5.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/modal-dialog@6.0.1
  - @findable/analytics-next@3.0.1
  - @findable/button@9.0.2
  - @findable/docs@5.0.1

## 5.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/modal-dialog@6.0.0
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/layer@5.0.0
  - @findable/layer-manager@5.0.0
  - @findable/icon@13.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/modal-dialog@6.0.0
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/layer@5.0.0
  - @findable/layer-manager@5.0.0
  - @findable/icon@13.0.0

## 4.1.7
- [patch] Remove or update $FlowFixMe [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
- [none] Updated dependencies [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
  - @findable/button@8.2.4
  - @findable/icon@12.6.1
  - @findable/modal-dialog@5.2.6

## 4.1.6
- [patch] Fixes positioning issue when target is relatively positioned [11e8465](https://github.com/fnamazing/uiKit/commits/11e8465)
- [none] Updated dependencies [11e8465](https://github.com/fnamazing/uiKit/commits/11e8465)

## 4.1.5
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
- [none] Updated dependencies [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
  - @findable/modal-dialog@5.2.5
  - @findable/button@8.2.2
  - @findable/icon@12.3.1

## 4.1.4
- [patch] Replaces implementation of ScrollLock with [react-scrolllock](https://github.com/jossmac/react-scrolllock). Deprecates ScrollLock export in @findable/layer-manager. [497d50d](https://github.com/fnamazing/uiKit/commits/497d50d)
- [none] Updated dependencies [497d50d](https://github.com/fnamazing/uiKit/commits/497d50d)
  - @findable/layer-manager@4.3.1
  - @findable/layer@4.1.1
  - @findable/modal-dialog@5.2.4

## 4.1.3
- [patch] Adds autoFocus prop to FocusLock. Fixes scrolling bug in onboarding. [c9d606b](https://github.com/fnamazing/uiKit/commits/c9d606b)
- [none] Updated dependencies [c9d606b](https://github.com/fnamazing/uiKit/commits/c9d606b)
  - @findable/layer-manager@4.3.0
- Fixes scrolling problem when multiple spotlights are off-screen.

## 4.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/modal-dialog@5.2.2
  - @findable/button@8.1.2
  - @findable/theme@4.0.4
  - @findable/layer@4.0.3
  - @findable/layer-manager@4.2.1
  - @findable/icon@12.1.2

## 4.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/layer-manager@4.1.1
  - @findable/modal-dialog@5.1.1
  - @findable/icon@12.1.1
  - @findable/button@8.1.1
  - @findable/docs@4.1.1
  - @findable/layer@4.0.2

## 4.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/modal-dialog@5.1.0
  - @findable/layer-manager@4.1.0
  - @findable/icon@12.1.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/layer@4.0.1
  - @findable/button@8.1.0

## 4.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/layer-manager@4.0.1
  - @findable/modal-dialog@5.0.1
  - @findable/icon@12.0.1
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/docs@4.0.1

## 4.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/layer-manager@4.0.0
  - @findable/modal-dialog@5.0.0
  - @findable/icon@12.0.0
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/docs@4.0.0
  - @findable/layer@4.0.0

## 3.1.3
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/modal-dialog@4.0.5
  - @findable/layer-manager@3.0.4
  - @findable/button@7.2.5
  - @findable/theme@3.2.2
  - @findable/docs@3.0.4
  - @findable/layer@3.1.1

## 3.1.0
- [minor] support new property "targetNode" on spotlight component [48397b6](https://github.com/fnamazing/uiKit/commits/48397b6)

## 3.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 2.4.2
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 2.4.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 2.3.4
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 2.3.2
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 2.3.0
- [minor] Replace scrollBy and add websdriver test [66e7a56](https://github.com/fnamazing/uiKit/commits/66e7a56)

## 2.2.2
- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak mk 2 [bdeef5b](https://github.com/fnamazing/uiKit/commits/bdeef5b)

## 2.2.1
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://github.com/fnamazing/uiKit/commits/007de27)

## 2.2.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 2.1.0
- [minor] add subtle-link button appearance theme to spotlight [24d1fa2](https://github.com/fnamazing/uiKit/commits/24d1fa2)

## 2.0.8
- [patch] Update dependencies [623f8ca](https://github.com/fnamazing/uiKit/commits/623f8ca)

## 2.0.7
- [patch] more robust implementation of FocusLock [64dd1d8](https://github.com/fnamazing/uiKit/commits/64dd1d8)

## 2.0.6
- [patch] Refactor autoscroll logic in withScrollMeasurement HOC [2e90a74](https://github.com/fnamazing/uiKit/commits/2e90a74)

## 2.0.4
- [patch] Fix version ranges on button/layer-manager [7e7a211](https://github.com/fnamazing/uiKit/commits/7e7a211)
- [patch] update flow dep, fix flow errors  [722ad83](https://github.com/fnamazing/uiKit/commits/722ad83)
- [patch] Update Onboarding's Button usage to implement theming method. [5e6da46](https://github.com/fnamazing/uiKit/commits/5e6da46)

## 2.0.2
- [patch] Fix target regression from migration [fa6f973](https://github.com/fnamazing/uiKit/commits/fa6f973)
- [patch] Updated docs to reflect the addition of the blanketIsTinted prop to SpotLightManager [11bb25f](https://github.com/fnamazing/uiKit/commits/11bb25f)

## 1.0.0-beta (2017-09-19)
* feature; initial release
