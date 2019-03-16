# @findable/modal-dialog

## 8.0.2
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/avatar@15.0.1
  - @findable/blanket@8.0.1
  - @findable/checkbox@6.0.1
  - @findable/field-radio-group@5.0.1
  - @findable/field-text@8.0.1
  - @findable/form@5.2.1
  - @findable/icon@16.0.5
  - @findable/inline-dialog@10.0.1
  - @findable/portal@0.2.1
  - @findable/select@8.0.3
  - @findable/textfield@0.3.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 8.0.1
- [patch] [0f764dbd7c](https://github.com/fnamazing/uiKit/commits/0f764dbd7c):

  - Modal-dialog no longer shows unnecessary scrollbars in modern browsers

## 8.0.0
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

## 7.3.0
- [minor] [f26a3d0235](https://github.com/fnamazing/uiKit/commits/f26a3d0235):

  - Added media queries to make Modal Dialogs Responsive

## 7.2.4
- Updated dependencies [e9b824bf86](https://github.com/fnamazing/uiKit/commits/e9b824bf86):
  - @findable/form@5.1.7
  - @findable/textfield@0.2.0

## 7.2.3
- [patch] [06713e0a0c](https://github.com/fnamazing/uiKit/commits/06713e0a0c):

  - popup select "target" is now a function that must resolve to a node

## 7.2.2
- [patch] [a7670c1488](https://github.com/fnamazing/uiKit/commits/a7670c1488):

  - Enabling handling focus in model-dialog by rendering component in model-dialog only after portal in model-dialog is attached to DOM.
- Updated dependencies [27cacd44ab](https://github.com/fnamazing/uiKit/commits/27cacd44ab):
  - @findable/portal@0.1.0

## 7.2.1
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/avatar@14.1.8
  - @findable/button@10.1.2
  - @findable/checkbox@5.0.11
  - @findable/field-radio-group@4.0.15
  - @findable/form@5.1.2
  - @findable/inline-dialog@9.0.14
  - @findable/portal@0.0.18
  - @findable/select@6.1.19
  - @findable/icon@16.0.0

## 7.2.0
- [minor] [07c4cd1](https://github.com/fnamazing/uiKit/commits/07c4cd1):

  - **Feature**: `components` prop now has an optional `container` entry that is wrapped around the header, body and footer. This provides compatibility for forms with fields in the body, and submit buttons in the footer
  - **API changes:**
    - The `header`, `body` and `footer` props have been deprecated; such custom components should be passed within the `components` prop instead.
    - Custom `Body` components passed in using the new method must contain a `ref` element; this can be done using forwardRef, as seen in the `custom` example.
  - **Documentation:** Examples have been updated to demonstrate the new container prop, as well as utilise the new composition method for custom header/body/footers.

## 7.1.2
- [patch] [2686f21](https://github.com/fnamazing/uiKit/commits/2686f21):

  - Removed example demonstrating deprecated reference behaviour

## 7.1.1
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/avatar@14.1.7
  - @findable/blanket@7.0.12
  - @findable/button@10.1.1
  - @findable/checkbox@5.0.9
  - @findable/field-radio-group@4.0.14
  - @findable/field-text@7.0.18
  - @findable/icon@15.0.2
  - @findable/inline-dialog@9.0.13
  - @findable/portal@0.0.17
  - @findable/select@6.1.13
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 7.1.0
- [minor] [7f99dec](https://github.com/fnamazing/uiKit/commits/7f99dec):

  - Fix usage of PopupSelect inside ModalDialog

## 7.0.14
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/blanket@7.0.11
  - @findable/button@10.0.4
  - @findable/checkbox@5.0.8
  - @findable/field-radio-group@4.0.13
  - @findable/field-text@7.0.16
  - @findable/icon@15.0.1
  - @findable/inline-dialog@9.0.12
  - @findable/theme@7.0.0
  - @findable/avatar@14.1.6

## 7.0.13
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/avatar@14.1.5
  - @findable/button@10.0.1
  - @findable/checkbox@5.0.7
  - @findable/field-radio-group@4.0.12
  - @findable/inline-dialog@9.0.11
  - @findable/portal@0.0.16
  - @findable/icon@15.0.0

## 7.0.12
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/avatar@14.1.4
  - @findable/blanket@7.0.10
  - @findable/checkbox@5.0.6
  - @findable/field-radio-group@4.0.11
  - @findable/field-text@7.0.15
  - @findable/icon@14.6.1
  - @findable/inline-dialog@9.0.10
  - @findable/portal@0.0.15
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 7.0.11
- [patch] [abd3a39](https://github.com/fnamazing/uiKit/commits/abd3a39):

  - Bump react-beautiful-dnd dependency to v10.0.2

## 7.0.10
- [patch] [e151c1a](https://github.com/fnamazing/uiKit/commits/e151c1a):

  - Removes dependency on @findable/layer-manager

  As of component versions:

  - \`@findable/modal-dialog@7.0.0\`
  - \`@findable/tooltip@12.0.2\`
  - \`@findable/flag@9.0.6\`
  - \`@findable/onboarding@6.0.0\`

  No component requires \`LayerManager\` to layer correctly.

  You can safely remove this dependency and stop rendering \`LayerManager\` in your apps.

## 7.0.9
- [patch] [1fb2c2a](https://github.com/fnamazing/uiKit/commits/1fb2c2a):

  - Fixed issue where tooltips and modals would initially render in the wrong location

## 7.0.8
- Updated dependencies [3f5a4dd](https://github.com/fnamazing/uiKit/commits/3f5a4dd):
  - @findable/portal@0.0.13

## 7.0.7
- [patch] [a637f5e](https://github.com/fnamazing/uiKit/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @findable/analytics-next HOCs to allow flow to type check properly

## 7.0.6
- [patch] [7cbd729](https://github.com/fnamazing/uiKit/commits/7cbd729):

  - Fixes visual bug where header and footer keylines appeared below textboxes and other components

## 7.0.5
- [patch] [72bc8da](https://github.com/fnamazing/uiKit/commits/72bc8da):

  - Removes reference to window in initial state to properly support ssr
- [patch] [b332c91](https://github.com/fnamazing/uiKit/commits/b332c91):

  - upgrades verison of react-scrolllock to SSR safe version

## 7.0.4
- [patch] Updated dependencies [aaab348](https://github.com/fnamazing/uiKit/commits/aaab348)
  - @findable/portal@0.0.12

## 7.0.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 7.0.2
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/avatar@14.0.11
  - @findable/button@9.0.13
  - @findable/checkbox@5.0.2
  - @findable/field-radio-group@4.0.8
  - @findable/inline-dialog@9.0.6
  - @findable/layer-manager@5.0.13
  - @findable/portal@0.0.10
  - @findable/icon@14.0.0

## 7.0.1
- [patch] Updated dependencies [80e1925](https://github.com/fnamazing/uiKit/commits/80e1925)
  - @findable/button@9.0.9
  - @findable/checkbox@5.0.0

## 7.0.0
- [patch] Updates dependency on portal [b46385f](https://github.com/fnamazing/uiKit/commits/b46385f)
- [major] Changes the pattern for using dialogs. Adds ModalTransition component to @findable/modal-dialog. See the [migration guide](http://atlaskit.atlassian.com/packages/core/modal-dialog/docs/migration) for more information. [d5a043a](https://github.com/fnamazing/uiKit/commits/d5a043a)

## 6.0.12
- [patch] Bump react-focus-lock to fix issues with selecting text in Safari. [62dc9fc](https://github.com/fnamazing/uiKit/commits/62dc9fc)

## 6.0.11
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 6.0.9
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/layer-manager@5.0.6
  - @findable/inline-dialog@9.0.2
  - @findable/icon@13.2.5
  - @findable/field-text@7.0.6
  - @findable/field-radio-group@4.0.5
  - @findable/checkbox@4.0.4
  - @findable/button@9.0.6
  - @findable/blanket@7.0.5
  - @findable/avatar@14.0.8
  - @findable/docs@5.0.6

## 6.0.8




- [patch] Updated dependencies [1d9e75a](https://github.com/fnamazing/uiKit/commits/1d9e75a)
  - @findable/inline-dialog@9.0.0
- [none] Updated dependencies [a3109d3](https://github.com/fnamazing/uiKit/commits/a3109d3)
  - @findable/inline-dialog@9.0.0
- [none] Updated dependencies [87d45d3](https://github.com/fnamazing/uiKit/commits/87d45d3)
  - @findable/inline-dialog@9.0.0
- [none] Updated dependencies [a08b0c2](https://github.com/fnamazing/uiKit/commits/a08b0c2)
  - @findable/inline-dialog@9.0.0

## 6.0.7
- [patch] Bumping react-beautiful-dnd to version 9. Making use of use onBeforeDragStart for dynamic table [9cbd494](https://github.com/fnamazing/uiKit/commits/9cbd494)
- [none] Updated dependencies [9cbd494](https://github.com/fnamazing/uiKit/commits/9cbd494)

## 6.0.6
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/inline-dialog@8.0.4
  - @findable/field-text@7.0.4
  - @findable/analytics-next@3.0.4
  - @findable/checkbox@4.0.3
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/blanket@7.0.4
  - @findable/field-radio-group@4.0.4
  - @findable/layer-manager@5.0.5
  - @findable/icon@13.2.4
  - @findable/avatar@14.0.6

## 6.0.5
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/inline-dialog@8.0.3
  - @findable/layer-manager@5.0.4
  - @findable/icon@13.2.2
  - @findable/field-radio-group@4.0.3
  - @findable/checkbox@4.0.2
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/field-text@7.0.3
  - @findable/blanket@7.0.3
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2
  - @findable/avatar@14.0.5

## 6.0.4
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/inline-dialog@8.0.2
  - @findable/field-text@7.0.2
  - @findable/analytics-next@3.0.2
  - @findable/checkbox@4.0.1
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/blanket@7.0.2
  - @findable/field-radio-group@4.0.2
  - @findable/layer-manager@5.0.3
  - @findable/icon@13.2.1
  - @findable/avatar@14.0.4

## 6.0.3
- [patch] Upgrading react-beautiful-dnd to 8.0.1 [87cd977](https://github.com/fnamazing/uiKit/commits/87cd977)
- [patch] Upgrading react-beautiful-dnd to 8.0.0 [22efc08](https://github.com/fnamazing/uiKit/commits/22efc08)
- [none] Updated dependencies [87cd977](https://github.com/fnamazing/uiKit/commits/87cd977)
- [none] Updated dependencies [22efc08](https://github.com/fnamazing/uiKit/commits/22efc08)

## 6.0.2
- [patch] Upgrading react-beautiful-dnd to 8.0.5 [6052132](https://github.com/fnamazing/uiKit/commits/6052132)
- [none] Updated dependencies [6052132](https://github.com/fnamazing/uiKit/commits/6052132)

## 6.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/inline-dialog@8.0.1
  - @findable/field-text@7.0.1
  - @findable/analytics-next@3.0.1
  - @findable/button@9.0.2
  - @findable/docs@5.0.1
  - @findable/blanket@7.0.1
  - @findable/field-radio-group@4.0.1
  - @findable/avatar@14.0.2

## 6.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/inline-dialog@8.0.0
  - @findable/field-text@7.0.0
  - @findable/analytics-next@3.0.0
  - @findable/checkbox@4.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/blanket@7.0.0
  - @findable/field-radio-group@4.0.0
  - @findable/layer-manager@5.0.0
  - @findable/icon@13.0.0
  - @findable/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/inline-dialog@8.0.0
  - @findable/field-text@7.0.0
  - @findable/analytics-next@3.0.0
  - @findable/checkbox@4.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/docs@5.0.0
  - @findable/blanket@7.0.0
  - @findable/field-radio-group@4.0.0
  - @findable/layer-manager@5.0.0
  - @findable/icon@13.0.0
  - @findable/avatar@14.0.0

## 5.2.8


- [none] Updated dependencies [da63331](https://github.com/fnamazing/uiKit/commits/da63331)
  - @findable/button@8.2.5
  - @findable/avatar@13.0.0
- [patch] Updated dependencies [7724115](https://github.com/fnamazing/uiKit/commits/7724115)
  - @findable/avatar@13.0.0
  - @findable/button@8.2.5

## 5.2.7
- [patch] Updated dependencies [8a01bcd](https://github.com/fnamazing/uiKit/commits/8a01bcd)
  - @findable/avatar@12.0.0

## 5.2.6
- [patch] Remove or update $FlowFixMe [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
- [none] Updated dependencies [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
  - @findable/field-text@6.1.1
  - @findable/button@8.2.4
  - @findable/field-radio-group@3.1.3
  - @findable/icon@12.6.1
  - @findable/avatar@11.2.2

## 5.2.5
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
- [none] Updated dependencies [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
  - @findable/inline-dialog@7.1.3
  - @findable/button@8.2.2
  - @findable/checkbox@3.1.2
  - @findable/field-radio-group@3.1.2
  - @findable/icon@12.3.1
  - @findable/avatar@11.2.1

## 5.2.4
- [patch] Replaces implementation of ScrollLock with [react-scrolllock](https://github.com/jossmac/react-scrolllock). Deprecates ScrollLock export in @findable/layer-manager. [497d50d](https://github.com/fnamazing/uiKit/commits/497d50d)
- [none] Updated dependencies [497d50d](https://github.com/fnamazing/uiKit/commits/497d50d)
  - @findable/layer-manager@4.3.1

## 5.2.3
- [patch] Upgrading react-beautiful-dnd dependency to ^7.1.3 [024b7fb](https://github.com/fnamazing/uiKit/commits/024b7fb)
- [patch] Updated dependencies [024b7fb](https://github.com/fnamazing/uiKit/commits/024b7fb)

## 5.2.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/inline-dialog@7.1.2
  - @findable/field-text@6.0.4
  - @findable/button@8.1.2
  - @findable/theme@4.0.4
  - @findable/checkbox@3.0.6
  - @findable/field-radio-group@3.0.4
  - @findable/layer-manager@4.2.1
  - @findable/icon@12.1.2

## 5.2.1
- [patch] Removes tabbable and focusin dependencies [274e773](https://github.com/fnamazing/uiKit/commits/274e773)
- [none] Updated dependencies [274e773](https://github.com/fnamazing/uiKit/commits/274e773)

## 5.2.0
- [minor] Deprecates the ability to pass a function to the autoFocus prop. Changes implementation of FocusLock to use [react-focus-lock](https://github.com/theKashey/react-focus-lock). [5b1ab0b](https://github.com/fnamazing/uiKit/commits/5b1ab0b)

- [none] Updated dependencies [5b1ab0b](https://github.com/fnamazing/uiKit/commits/5b1ab0b)
  - @findable/layer-manager@4.2.0
- [none] Updated dependencies [de9690b](https://github.com/fnamazing/uiKit/commits/de9690b)
  - @findable/layer-manager@4.2.0

## 5.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/layer-manager@4.1.1
  - @findable/inline-dialog@7.1.1
  - @findable/icon@12.1.1
  - @findable/field-radio-group@3.0.3
  - @findable/checkbox@3.0.5
  - @findable/button@8.1.1
  - @findable/blanket@6.0.3
  - @findable/avatar@11.1.1
  - @findable/docs@4.1.1

## 5.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/inline-dialog@7.1.0
  - @findable/layer-manager@4.1.0
  - @findable/avatar@11.1.0
  - @findable/icon@12.1.0
  - @findable/field-radio-group@3.0.2
  - @findable/checkbox@3.0.4
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/field-text@6.0.2
  - @findable/blanket@6.0.2
  - @findable/button@8.1.0

## 5.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/layer-manager@4.0.1
  - @findable/icon@12.0.1
  - @findable/inline-dialog@7.0.1
  - @findable/field-radio-group@3.0.1
  - @findable/field-text@6.0.1
  - @findable/checkbox@3.0.1
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/blanket@6.0.1
  - @findable/docs@4.0.1
  - @findable/avatar@11.0.1

## 5.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/layer-manager@4.0.0
  - @findable/icon@12.0.0
  - @findable/inline-dialog@7.0.0
  - @findable/field-radio-group@3.0.0
  - @findable/field-text@6.0.0
  - @findable/checkbox@3.0.0
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/blanket@6.0.0
  - @findable/docs@4.0.0
  - @findable/avatar@11.0.0

## 4.0.5
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/layer-manager@3.0.4
  - @findable/inline-dialog@6.0.2
  - @findable/field-radio-group@2.0.3
  - @findable/field-text@5.0.3
  - @findable/checkbox@2.0.2
  - @findable/button@7.2.5
  - @findable/theme@3.2.2
  - @findable/blanket@5.0.2
  - @findable/avatar@10.0.6
  - @findable/docs@3.0.4

## 4.0.2
- [patch] AK-4416 changes meaning of autofocus prop values [c831a3d](https://github.com/fnamazing/uiKit/commits/c831a3d)

## 4.0.1
- [patch] Add possibility to display heading in modal in one line (with ellipsis if content is wider than modal) [30883b4](https://github.com/fnamazing/uiKit/commits/30883b4)

## 4.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 3.5.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 3.5.0
- [minor] Updated website to use iframe to load examples. Example loader now in a separate react app. Webpack config refactored to compile separate example loader, chunking refactored to be more performant with the new website changes. Updated modal-dialog to use new component structure to optionally specify a Body wrapping component. [e1fdfd8](https://github.com/fnamazing/uiKit/commits/e1fdfd8)

## 3.4.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 3.3.15
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 3.3.14
- [patch] Fix react-beautiful-dnd position issues when used inside a modal dialog [cfda546](https://github.com/fnamazing/uiKit/commits/cfda546)

## 3.3.12
- [patch] Remove babel-plugin-react-flow-props-to-prop-types [06c1f08](https://github.com/fnamazing/uiKit/commits/06c1f08)

## 3.3.11
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 3.3.9
- [patch] Updated inline-dialog to include boundaries element prop, updated Layer to have dynamic boolean escapeWithReference property, updated modal-dialog Content component with overflow-x:hidden' [cb72752](https://github.com/fnamazing/uiKit/commits/cb72752)

## 3.3.8
- [patch] Prevent window from being scrolled programmatically [3e3085c](https://github.com/fnamazing/uiKit/commits/3e3085c)

## 3.3.5
- [patch] Migrate Navigation from Ak repo to ak mk 2 repo, Fixed flow typing inconsistencies in ak mk 2 [bdeef5b](https://github.com/fnamazing/uiKit/commits/bdeef5b)

## 3.3.4
- [patch] Fix modal appearing behind navigation's drawer blanket when layer manager is not used [a6c6e5e](https://github.com/fnamazing/uiKit/commits/a6c6e5e)

## 3.3.3
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://github.com/fnamazing/uiKit/commits/007de27)

## 3.3.2
- [patch] Fix modal height being clipped by destination parent [c30e7b0](https://github.com/fnamazing/uiKit/commits/c30e7b0)

## 3.3.1
- [patch] Migration of Blanket to mk2 repo [1c55d97](https://github.com/fnamazing/uiKit/commits/1c55d97)

## 3.3.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 3.2.5
- [patch] Migrate modal-dialog to ak mk 2 update deps and add flow types [a91cefe](https://github.com/fnamazing/uiKit/commits/a91cefe)

## 3.2.4 (2017-11-30)
* bug fix; fix modal dialog not shrinking to viewport height in IE11 (issues closed: ak-3879) ([d3bb5cd](https://bitbucket.org/atlassian/atlaskit/commits/d3bb5cd))

## 3.2.3 (2017-11-30)
* bug fix; release stories with fixed console errors ([3321c2b](https://bitbucket.org/atlassian/atlaskit/commits/3321c2b))

## 3.2.2 (2017-11-17)
* bug fix; bumping internal dependencies to latest major version ([3aefbce](https://bitbucket.org/atlassian/atlaskit/commits/3aefbce))

## 3.2.1 (2017-11-13)
* bug fix; remove chrome from the wrapping dialog (issues closed: #67) ([21f3a0e](https://bitbucket.org/atlassian/atlaskit/commits/21f3a0e))

## 3.2.0 (2017-10-26)
* bug fix; add deprecation warning to spotlight package ([3ea2312](https://bitbucket.org/atlassian/atlaskit/commits/3ea2312))
* feature; cleanup layer-manager and modal-dialog in preparation for onboarding ([02a516b](https://bitbucket.org/atlassian/atlaskit/commits/02a516b))

## 3.1.3 (2017-10-26)
* bug fix; fix to rebuild stories ([793b2a7](https://bitbucket.org/atlassian/atlaskit/commits/793b2a7))

## 3.1.2 (2017-10-22)
* bug fix; update styled-components dep and react peerDep ([6a67bf8](https://bitbucket.org/atlassian/atlaskit/commits/6a67bf8))

## 3.1.1 (2017-10-12)
* bug fix; bumps version of Page (issues closed: ak-3680) ([8713649](https://bitbucket.org/atlassian/atlaskit/commits/8713649))

## 3.1.0 (2017-10-11)
* feature; add chromeless option to modal to support Connect JSAPI ([5ca6a65](https://bitbucket.org/atlassian/atlaskit/commits/5ca6a65))

## 3.0.2 (2017-10-05)
* bug fix; resolve error in modal dialog (issues closed: ak-3623) ([2052679](https://bitbucket.org/atlassian/atlaskit/commits/2052679))

## 3.0.1 (2017-09-26)
* bug fix; update webpack raw path (issues closed: ak-3589) ([0aa9737](https://bitbucket.org/atlassian/atlaskit/commits/0aa9737))

## 3.0.0 (2017-09-13)
* breaking; onDialogDismissed = onClose, isOpen prop removed, just render the modal to display it ([3819bac](https://bitbucket.org/atlassian/atlaskit/commits/3819bac))
* breaking; major overhaul to modal implementation and behaviour (issues closed: ak-2972, ak-3343) ([3819bac](https://bitbucket.org/atlassian/atlaskit/commits/3819bac))

## 2.6.0 (2017-08-07)
* feature; Added support for custom modal heights, with the new `ModalDialog.height` prop. It accepts a number (converted to `px`) or string (not converted to `px`, so you can use any unit you like such as `%`, `vh`, etc). (issues closed: ak-1723) ([3c1f537](https://bitbucket.org/atlassian/atlaskit/commits/3c1f537))

## 2.5.2 (2017-07-27)
* fix; rename jsnext:main to jsnext:experimental:main temporarily ([c7508e0](https://bitbucket.org/atlassian/atlaskit/commits/c7508e0))

## 2.5.1 (2017-07-25)
* fix; use class transform in loose mode in babel to improve load performance in apps ([fde719a](https://bitbucket.org/atlassian/atlaskit/commits/fde719a))

## 2.2.0 (2017-07-17)
* fix; rerelease, failed prepublish scripts ([5fd82f8](https://bitbucket.org/atlassian/atlaskit/commits/5fd82f8))

## 2.2.0 (2017-07-17)
* feature; added ES module builds to dist and add jsnext:main to most ADG packages ([ea76507](https://bitbucket.org/atlassian/atlaskit/commits/ea76507))

## 2.1.2 (2017-06-15)
* fix; avoid unwanted re-render of modal children when state/props change ([7ae6324](https://bitbucket.org/atlassian/atlaskit/commits/7ae6324))

## 2.1.1 (2017-05-26)
* fix; add prop-types as a dependency to avoid React 15.x warnings ([92598eb](https://bitbucket.org/atlassian/atlaskit/commits/92598eb))
* fix; pin react-lorem-component version to avoid newly released broken version ([6f3d9c6](https://bitbucket.org/atlassian/atlaskit/commits/6f3d9c6))

## 2.1.0 (2017-05-06)
* feature; animated entry/exit of modal dialog ([e721aaa](https://bitbucket.org/atlassian/atlaskit/commits/e721aaa))

## 2.0.0 (2017-05-05)
* switch modal styling to styled-components ([f9510b4](https://bitbucket.org/atlassian/atlaskit/commits/f9510b4))
* breaking; Modal dialog now has a peerDependency on the styled-components package.
* ISSUES CLOSED: AK-2290

## 1.3.3 (2017-05-03)
* fix; Fix child position:fixed elements being clipped ([fc0a894](https://bitbucket.org/atlassian/atlaskit/commits/fc0a894))

## 1.3.2 (2017-04-27)
* fix; update legal copy to be more clear. Not all modules include ADG license. ([f3a945e](https://bitbucket.org/atlassian/atlaskit/commits/f3a945e))

## 1.3.1 (2017-04-26)
* fix; update legal copy and fix broken links for component README on npm. New contribution and ([0b3e454](https://bitbucket.org/atlassian/atlaskit/commits/0b3e454))

## 1.3.0 (2017-04-20)
* feature; removed explicit style! imports, set style-loader in webpack config ([891fc3c](https://bitbucket.org/atlassian/atlaskit/commits/891fc3c))

## 1.2.15 (2017-03-31)
* fix; update modal story to use latest navigation devDep ([5ed9946](https://bitbucket.org/atlassian/atlaskit/commits/5ed9946))
* fix; update modal story to use latest navigation devDep ([c074080](https://bitbucket.org/atlassian/atlaskit/commits/c074080))

## 1.2.14 (2017-03-29)
* fix; only show scrolling keylines when header or footer shown ([fd1c68a](https://bitbucket.org/atlassian/atlaskit/commits/fd1c68a))

## 1.2.13 (2017-03-29)
* fix; fire onDialogDismissed when clicking on blanket directly below modal ([1c9efb0](https://bitbucket.org/atlassian/atlaskit/commits/1c9efb0))

## 1.2.10 (2017-03-21)
* fix; render rounded corners correctly when header/footer omitted ([724480d](https://bitbucket.org/atlassian/atlaskit/commits/724480d))
* fix; maintainers for all the packages were added ([261d00a](https://bitbucket.org/atlassian/atlaskit/commits/261d00a))

## 1.2.9 (2017-02-28)
* fix; dummy commit to release stories ([3df5d9f](https://bitbucket.org/atlassian/atlaskit/commits/3df5d9f))

## 1.2.7 (2017-02-28)
* fix; dummy commit to fix broken stories and missing registry pages ([a31e92a](https://bitbucket.org/atlassian/atlaskit/commits/a31e92a))

## 1.2.7 (2017-02-28)
* fix; dummy commit to release stories for components ([a105c02](https://bitbucket.org/atlassian/atlaskit/commits/a105c02))

## 1.2.6 (2017-02-28)
* fix; removes jsdoc annotations and moves content to usage.md ([14f941a](https://bitbucket.org/atlassian/atlaskit/commits/14f941a))

## 1.2.5 (2017-02-27)
* empty commit to make components release themselves ([5511fbe](https://bitbucket.org/atlassian/atlaskit/commits/5511fbe))

## 1.2.4 (2017-02-13)
* Fix types for modal-dialog typescript declaration file ([533adea](https://bitbucket.org/atlassian/atlaskit/commits/533adea))

## 1.2.3 (2017-02-08)
* fix; trigger modal close handler on esc key in older browsers ([a692683](https://bitbucket.org/atlassian/atlaskit/commits/a692683))

## 1.2.2 (2017-02-07)
* fix; render dropdown in modal above footer ([2b76812](https://bitbucket.org/atlassian/atlaskit/commits/2b76812))

## 1.2.1 (2017-02-06)
* fix; layer navigation at correct level so it works with modal ([5bef9db](https://bitbucket.org/atlassian/atlaskit/commits/5bef9db))
