# @findable/datetime-picker

## 7.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/calendar@7.0.20
  - @findable/field-text@8.0.1
  - @findable/icon@16.0.5
  - @findable/modal-dialog@8.0.2
  - @findable/popper@0.4.1
  - @findable/select@8.0.3
  - @findable/theme@8.0.1
  - @findable/field-range@6.0.1
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

## 6.5.1
- Updated dependencies [06713e0a0c](https://github.com/fnamazing/uiKit/commits/06713e0a0c):
  - @findable/modal-dialog@7.2.3
  - @findable/select@7.0.0

## 6.5.0
- [minor] [a48dddb43c](https://github.com/fnamazing/uiKit/commits/a48dddb43c):

  - onChange will only be fired when a complete datetime is supplied by the user

## 6.4.2
- [patch] [0cd7f505b3](https://github.com/fnamazing/uiKit/commits/0cd7f505b3):

  - Iso date parsing on IE11 and Edge is now consistent with other browsers

## 6.4.1
- [patch] [348d3aed19](https://github.com/fnamazing/uiKit/commits/348d3aed19):

  - Datepicker will now reset the focused date on the calendar every time it is opened

## 6.4.0
- [minor] [52827feffb](https://github.com/fnamazing/uiKit/commits/52827feffb):

  - onChange is now called only when the user selects or clears a value. The date passed to onChange will always be a valid date

## 6.3.25
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/calendar@7.0.17
  - @findable/field-base@11.0.14
  - @findable/modal-dialog@7.2.1
  - @findable/select@6.1.19
  - @findable/field-range@5.0.14
  - @findable/icon@16.0.0

## 6.3.24
- [patch] [55e0a3a](https://github.com/fnamazing/uiKit/commits/55e0a3a):

  - Fixes keyboard entry bug
- [patch] [075dfa2](https://github.com/fnamazing/uiKit/commits/075dfa2):

  - Allowing control of input value in datetime-picker

## 6.3.23
- [patch] [4c4bdc5](https://github.com/fnamazing/uiKit/commits/4c4bdc5):

  - AK-5672 - Refactor parseTime by separating logic and concerns into smaller, testable functions. Fixes meridiem issues.
- [patch] [58a40bf](https://github.com/fnamazing/uiKit/commits/58a40bf):

  - Factoring in meridiem for 24hr time in editable

## 6.3.22
- [patch] [5c548ea](https://github.com/fnamazing/uiKit/commits/5c548ea):

  - Removing extraneous wrapping span around icons which was causing an accessibility error

## 6.3.21
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/button@10.1.1
  - @findable/calendar@7.0.16
  - @findable/field-base@11.0.13
  - @findable/field-range@5.0.12
  - @findable/field-text@7.0.18
  - @findable/icon@15.0.2
  - @findable/modal-dialog@7.1.1
  - @findable/popper@0.3.6
  - @findable/select@6.1.13
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 6.3.20
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/calendar@7.0.15
  - @findable/field-base@11.0.12
  - @findable/field-range@5.0.11
  - @findable/field-text@7.0.16
  - @findable/icon@15.0.1
  - @findable/modal-dialog@7.0.14
  - @findable/popper@0.3.3
  - @findable/select@6.1.10
  - @findable/theme@7.0.0

## 6.3.19
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/calendar@7.0.14
  - @findable/field-base@11.0.11
  - @findable/modal-dialog@7.0.13
  - @findable/select@6.1.9
  - @findable/icon@15.0.0

## 6.3.18
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/calendar@7.0.13
  - @findable/field-text@7.0.15
  - @findable/icon@14.6.1
  - @findable/modal-dialog@7.0.12
  - @findable/popper@0.3.2
  - @findable/select@6.1.8
  - @findable/theme@6.2.1
  - @findable/field-range@5.0.9
  - @findable/button@10.0.0

## 6.3.17
- [patch] [b332c91](https://github.com/fnamazing/uiKit/commits/b332c91):

  - upgrades verison of react-scrolllock to SSR safe version

## 6.3.16
- [patch] Datetime Picker modal sticks to bottom, if needed [0149735](https://github.com/fnamazing/uiKit/commits/0149735)

## 6.3.15
- [patch] Added logic to onCalendarChange for impossibly large dates. These dates now get converted to the last day of the month, as opposed to default js behaviour. '2018-02-31' now converts to '2018-02-28' as opposed to '2018-03-02' [4b23458](https://github.com/fnamazing/uiKit/commits/4b23458)

## 6.3.14
- [patch] Fixing blank state for datetime-picker in Firefox.  [0e6d838](https://github.com/fnamazing/uiKit/commits/0e6d838)

## 6.3.13
- [patch] Updated dependencies [1a752e6](https://github.com/fnamazing/uiKit/commits/1a752e6)
  - @findable/popper@0.3.0

## 6.3.12
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 6.3.11
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/calendar@7.0.9
  - @findable/field-base@11.0.8
  - @findable/modal-dialog@7.0.2
  - @findable/select@6.0.2
  - @findable/icon@14.0.0

## 6.3.10
- [patch] Updated dependencies [4194aa4](https://github.com/fnamazing/uiKit/commits/4194aa4)
  - @findable/select@6.0.0

## 6.3.9
- [patch] Fixes bug on next and prev month navigation. [c4770a0](https://github.com/fnamazing/uiKit/commits/c4770a0)

## 6.3.8
- [patch] TimePicker not longer throws console error when input cleared [dba1bb0](https://github.com/fnamazing/uiKit/commits/dba1bb0)

## 6.3.7
- [patch] Updated dependencies [d5a043a](https://github.com/fnamazing/uiKit/commits/d5a043a)
  - @findable/icon@13.8.1
  - @findable/select@5.0.17
  - @findable/modal-dialog@7.0.0

## 6.3.6
- [patch] Updated dependencies [9c66d4d](https://github.com/fnamazing/uiKit/commits/9c66d4d)
  - @findable/select@5.0.16
  - @findable/webdriver-runner@0.1.0

## 6.3.5
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 6.3.3
- [patch] Updating datetime-picker and select styles [981b96c](https://github.com/fnamazing/uiKit/commits/981b96c)

## 6.3.2
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/select@5.0.9
  - @findable/popper@0.2.1
  - @findable/modal-dialog@6.0.9
  - @findable/icon@13.2.5
  - @findable/field-text@7.0.6
  - @findable/field-range@5.0.4
  - @findable/field-base@11.0.5
  - @findable/calendar@7.0.5
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 6.3.1


- [patch] Removed some broken styles from the datetime-picker menu [87d45d3](https://github.com/fnamazing/uiKit/commits/87d45d3)

- [none] Updated dependencies [1d9e75a](https://github.com/fnamazing/uiKit/commits/1d9e75a)
  - @findable/popper@0.2.0
  - @findable/modal-dialog@6.0.8
  - @findable/field-base@11.0.4
- [none] Updated dependencies [a3109d3](https://github.com/fnamazing/uiKit/commits/a3109d3)
  - @findable/field-base@11.0.4
  - @findable/popper@0.2.0
  - @findable/modal-dialog@6.0.8
- [none] Updated dependencies [87d45d3](https://github.com/fnamazing/uiKit/commits/87d45d3)
  - @findable/popper@0.2.0
  - @findable/modal-dialog@6.0.8
  - @findable/field-base@11.0.4
- [patch] Updated dependencies [a08b0c2](https://github.com/fnamazing/uiKit/commits/a08b0c2)
  - @findable/popper@0.2.0
  - @findable/modal-dialog@6.0.8
  - @findable/field-base@11.0.4

## 6.3.0
- [minor] added formatDisplayLabel prop to timePicker and datePicker to enable configuration of the label string rendered in the input [bce02a8](https://github.com/fnamazing/uiKit/commits/bce02a8)
- [none] Updated dependencies [bce02a8](https://github.com/fnamazing/uiKit/commits/bce02a8)

## 6.2.0
- [minor] Added parseDateValue prop to datetimepicker which accepts a function that takes an iso datestring, a date value, a time value and a zone value and returns an object containing a formatted dateValue, timeValue and zoneValue. The defaultProp uses date-fn's parse and format functions under the hood.  [6249709](https://github.com/fnamazing/uiKit/commits/6249709)
- [none] Updated dependencies [6249709](https://github.com/fnamazing/uiKit/commits/6249709)

## 6.1.2
- [patch] Replace @findable/layer in date time picker with @findable/popper, changed configuration of flipBehaviour modifier to use viewport as the element boundary rather than the window. [4286672](https://github.com/fnamazing/uiKit/commits/4286672)
- [patch] Updated datetime-picker to use @findable/popper internally instead of @findable/layer. Minor fix to @findable/popper, boundariesElement for flipbehaviour is now viewport and not window. [f2159f4](https://github.com/fnamazing/uiKit/commits/f2159f4)
- [patch] Updated dependencies [4286672](https://github.com/fnamazing/uiKit/commits/4286672)
  - @findable/popper@0.1.2
- [none] Updated dependencies [f2159f4](https://github.com/fnamazing/uiKit/commits/f2159f4)

## 6.1.1
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/select@5.0.8
  - @findable/modal-dialog@6.0.6
  - @findable/field-base@11.0.3
  - @findable/field-text@7.0.4
  - @findable/analytics-next@3.0.4
  - @findable/calendar@7.0.4
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/field-range@5.0.3
  - @findable/layer@5.0.4
  - @findable/icon@13.2.4

## 6.1.0
- [minor] Added parseInputValue prop to datePicker and timePicker, which allows for the customisation of logic around parsing input values into the requisite date object. Also added datePickerProps and timePickerProps props to dateTimePicker to expose these two (and later other datePicker and timePicker explicit props) at the dateTimePicker level [9a75b8b](https://github.com/fnamazing/uiKit/commits/9a75b8b)
- [none] Updated dependencies [9a75b8b](https://github.com/fnamazing/uiKit/commits/9a75b8b)

## 6.0.3
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/select@5.0.7
  - @findable/icon@13.2.2
  - @findable/calendar@7.0.3
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/field-range@5.0.2
  - @findable/field-text@7.0.3
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2
  - @findable/layer@5.0.3
  - @findable/modal-dialog@6.0.5
  - @findable/field-base@11.0.2

## 6.0.2
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/select@5.0.6
  - @findable/modal-dialog@6.0.4
  - @findable/field-base@11.0.1
  - @findable/field-text@7.0.2
  - @findable/analytics-next@3.0.2
  - @findable/calendar@7.0.2
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/field-range@5.0.1
  - @findable/layer@5.0.2
  - @findable/icon@13.2.1

## 6.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/select@5.0.2
  - @findable/modal-dialog@6.0.1
  - @findable/field-text@7.0.1
  - @findable/analytics-next@3.0.1
  - @findable/calendar@7.0.1
  - @findable/button@9.0.2
  - @findable/docs@5.0.1

## 6.0.0
- [major] Provides analytics for common component interations. See the [Instrumented Components](https://atlaskit.atlassian.com/packages/core/analytics-next) section for more details. If you are using enzyme for testing you will have to use [our forked version of the library](https://atlaskit.atlassian.com/docs/guides/testing#we-use-a-forked-version-of-enzyme). [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/select@5.0.0
  - @findable/modal-dialog@6.0.0
  - @findable/field-base@11.0.0
  - @findable/field-text@7.0.0
  - @findable/analytics-next@3.0.0
  - @findable/calendar@7.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/field-range@5.0.0
  - @findable/docs@5.0.0
  - @findable/layer@5.0.0
  - @findable/icon@13.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/select@5.0.0
  - @findable/modal-dialog@6.0.0
  - @findable/field-base@11.0.0
  - @findable/field-text@7.0.0
  - @findable/analytics-next@3.0.0
  - @findable/calendar@7.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/field-range@5.0.0
  - @findable/docs@5.0.0
  - @findable/layer@5.0.0
  - @findable/icon@13.0.0

## 5.4.5
- [patch] Updated dependencies [da661fd](https://github.com/fnamazing/uiKit/commits/da661fd)
  - @findable/select@4.5.2

## 5.4.4
- [patch] atlaskit/select now invokes a makeAnimated function to wrap passed in components in default animated behaviour. As this invocation returns a new set of react components each time, we've also implemented a lightweight component cache using memoize-one and react-fast-compare. Additionally updates made to datetime-picker to not instantiate a new component on render everytime (for performance reasons as well as to satisfy our caching logic), we now also pass relevant state values through the select as props to be ingested by our custom components, instead of directly capturing them within lexical scope.  [9b01264](https://github.com/fnamazing/uiKit/commits/9b01264)
- [patch] Updated dependencies [9b01264](https://github.com/fnamazing/uiKit/commits/9b01264)
  - @findable/select@4.5.0

## 5.4.3
- [patch] Fix disabled dates could be selected with keyboard [832b4ab](https://github.com/fnamazing/uiKit/commits/832b4ab)
- [patch] Updated dependencies [832b4ab](https://github.com/fnamazing/uiKit/commits/832b4ab)

## 5.4.2
- [patch] Fix Calendar width increasing for some months [29ffb24](https://github.com/fnamazing/uiKit/commits/29ffb24)
- [patch] Updated dependencies [29ffb24](https://github.com/fnamazing/uiKit/commits/29ffb24)
  - @findable/calendar@6.2.2

## 5.4.1
- [patch] Calendar chevrons use large versions [a973ac3](https://github.com/fnamazing/uiKit/commits/a973ac3)
- [patch] Updated dependencies [a973ac3](https://github.com/fnamazing/uiKit/commits/a973ac3)
  - @findable/calendar@6.2.1

## 5.4.0
- [minor] Visual changes to match ADG3 guidelines [059d111](https://github.com/fnamazing/uiKit/commits/059d111)
- [minor] Updated dependencies [059d111](https://github.com/fnamazing/uiKit/commits/059d111)
  - @findable/calendar@6.2.0

## 5.3.3
- [patch] Updated dependencies [b53da28](https://github.com/fnamazing/uiKit/commits/b53da28)
  - @findable/select@4.3.6

## 5.3.2
- [patch] Remove or update $FlowFixMe [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
- [none] Updated dependencies [e8ad98a](https://github.com/fnamazing/uiKit/commits/e8ad98a)
  - @findable/field-text@6.1.1
  - @findable/button@8.2.4
  - @findable/icon@12.6.1
  - @findable/modal-dialog@5.2.6

## 5.3.1
- [patch] TimePicker timesIsEditable invalid values are set to empty strings  [b710290](https://github.com/fnamazing/uiKit/commits/b710290)
- [patch] Updated dependencies [b710290](https://github.com/fnamazing/uiKit/commits/b710290)

## 5.3.0
- [minor] Backspace now clears input & fixed tab clearing input [5783a8d](https://github.com/fnamazing/uiKit/commits/5783a8d)
- [minor] Updated dependencies [5783a8d](https://github.com/fnamazing/uiKit/commits/5783a8d)

## 5.2.1
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/select@4.2.3
  - @findable/modal-dialog@5.2.2
  - @findable/field-base@10.1.2
  - @findable/field-text@6.0.4
  - @findable/button@8.1.2
  - @findable/theme@4.0.4
  - @findable/field-range@4.0.3
  - @findable/layer@4.0.3
  - @findable/calendar@6.1.2
  - @findable/icon@12.1.2

## 5.2.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/modal-dialog@5.1.0
  - @findable/select@4.2.0
  - @findable/icon@12.1.0
  - @findable/calendar@6.1.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/layer@4.0.1
  - @findable/field-text@6.0.2
  - @findable/field-range@4.0.2
  - @findable/field-base@10.1.0
  - @findable/button@8.1.0

## 5.1.0
- [minor] Fixed DatetimePicker not clearing input on ESC  [c58f3db](https://github.com/fnamazing/uiKit/commits/c58f3db)

## 5.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/modal-dialog@5.0.1
  - @findable/select@4.0.1
  - @findable/icon@12.0.1
  - @findable/field-base@10.0.1
  - @findable/field-text@6.0.1
  - @findable/calendar@6.0.1
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/field-range@4.0.1
  - @findable/docs@4.0.1

## 5.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/modal-dialog@5.0.0
  - @findable/select@4.0.0
  - @findable/icon@12.0.0
  - @findable/field-base@10.0.0
  - @findable/field-text@6.0.0
  - @findable/calendar@6.0.0
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/field-range@4.0.0
  - @findable/docs@4.0.0
  - @findable/layer@4.0.0

## 4.1.1
- [patch] Fix DateTimePicker not setting TimePicker value [0c073e6](https://github.com/fnamazing/uiKit/commits/0c073e6)

## 4.1.0
- [minor] Updated dependencies [59ab4a6](https://github.com/fnamazing/uiKit/commits/59ab4a6)
  - @findable/select@3.1.0

## 4.0.4
- [patch] Fixes for parsing & formatting of values [0c843bc](https://github.com/fnamazing/uiKit/commits/0c843bc)

## 4.0.3
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/icon@11.3.0
  - @findable/select@3.0.2
  - @findable/modal-dialog@4.0.5
  - @findable/field-base@9.0.3
  - @findable/field-text@5.0.3
  - @findable/calendar@5.0.3
  - @findable/button@7.2.5
  - @findable/theme@3.2.2
  - @findable/field-range@3.0.2
  - @findable/docs@3.0.4
  - @findable/layer@3.1.1

## 4.0.2
- [patch] Fix create option being displayed when timeIsEditable is false [7e99ba3](https://github.com/fnamazing/uiKit/commits/7e99ba3)

## 4.0.1
- [patch] Updated dependencies [92ae24e](https://github.com/fnamazing/uiKit/commits/92ae24e)
  - @findable/select@3.0.1

## 4.0.0
- [major] Updated dependencies [d05b9e5](https://github.com/fnamazing/uiKit/commits/d05b9e5)
  - @findable/select@3.0.0

## 3.1.1
- [patch] Updated dependencies [7468739](https://github.com/fnamazing/uiKit/commits/7468739)
  - @findable/select@2.0.2

## 3.1.0
- [minor] Add dateFormat prop to customise the display format of dates [3daced9](https://github.com/fnamazing/uiKit/commits/3daced9)

## 3.0.5
- [patch] Fixed subtle appearance on focus [2b1e018](https://github.com/fnamazing/uiKit/commits/2b1e018)

## 3.0.4
- [patch] Better styles for disabled dates [866c497](https://github.com/fnamazing/uiKit/commits/866c497)

## 3.0.3
- [patch] Added appearance prop to enable subtle (no icon) appearance   [c10fd5d](https://github.com/fnamazing/uiKit/commits/c10fd5d)

## 3.0.2
- [patch] Remove unused dependencies [3cfb3fe](https://github.com/fnamazing/uiKit/commits/3cfb3fe)

## 3.0.1
- [patch] Added isInvalid prop to DateTimePicker DatePicker & TimePicker [101c306](https://github.com/fnamazing/uiKit/commits/101c306)

## 2.0.6
- [patch] Added timeIsEditable prop to enable user created times [4695e5d](https://github.com/fnamazing/uiKit/commits/4695e5d)

## 2.0.3
- [patch] Change pickers to use fixed positioning and scroll lock to allow them to break out of modals. [d4981fe](https://github.com/fnamazing/uiKit/commits/d4981fe)

## 2.0.2
- [patch] Fix datetime picker without a value and defaultValue not working [a88aee0](https://github.com/fnamazing/uiKit/commits/a88aee0)

## 2.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 1.0.1
- [patch] Fix picker value not being able to be set programatically [17c7a15](https://github.com/fnamazing/uiKit/commits/17c7a15)
- [patch] Fix `isDisabled` not restricting pickers from opening [f396f2e](https://github.com/fnamazing/uiKit/commits/f396f2e)

## 1.0.0
- [major] QoL and consistency changes to the calendar and datetime-picker APIs. Added the ability to specify a string to the DateTimePicker component. Remove stateless components and make each component stateless or stateful using the controlled / uncontrolled pattern. Misc prop renames for consistency. [ab21d8e](https://github.com/fnamazing/uiKit/commits/ab21d8e)

## 0.7.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 0.7.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://github.com/fnamazing/uiKit/commits/ceccf30)

## 0.6.2
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 0.6.1
- [patch] Packages Flow types for elements components [3111e74](https://github.com/fnamazing/uiKit/commits/3111e74)

## 0.6.0
- [minor] Make all internal state able to be controlled or uncontrolled obviating the need for the usage of stateless components. [3d81d42](https://github.com/fnamazing/uiKit/commits/3d81d42)

## 0.5.0
- [minor] Add React 16 support. [12ea6e4](https://github.com/fnamazing/uiKit/commits/12ea6e4)

## 0.4.0
- [minor] datetime picker will take full width if width is not passes [7a9add1](https://github.com/fnamazing/uiKit/commits/7a9add1)

## 0.3.3
- [patch] Update dependencies [623f8ca](https://github.com/fnamazing/uiKit/commits/623f8ca)

## 0.3.2
- [patch] calling onchange on hook when datepickers is set to empty state [9e288cc](https://github.com/fnamazing/uiKit/commits/9e288cc)

## 0.3.0
- [minor] add autoFocus prop to DateTimePicker [c8de434](https://github.com/fnamazing/uiKit/commits/c8de434)

## 0.2.0
- [minor] DateTimePicker is now controlled. [1318f4e](https://github.com/fnamazing/uiKit/commits/1318f4e)
- [minor] Add DateTimePickerStateless component. Fix issue where DateTimePicker tries to call selectField on the dualPicker, which didn't exist. Add ability to have a controlled DateTimePicker. [4bd0167](https://github.com/fnamazing/uiKit/commits/4bd0167)
- [minor] Add DateTimePickerStateless and refactor DateTimePicker to use that internally, and expose DateTimePickerStateless as public API. [bbbadf5](https://github.com/fnamazing/uiKit/commits/bbbadf5)

## 0.1.2
- [patch] bump icon dependency [da14956](https://github.com/fnamazing/uiKit/commits/da14956)

## 0.1.0
- [minor] Added TimePicker and DateTimePicker. Improved docs and examples. [4b49f4d](4b49f4d)

## 0.0.5
- [patch] Use correct dependencies  [7b178b1](7b178b1)
- [patch] Adding responsive behavior to the editor. [e0d9867](e0d9867)
