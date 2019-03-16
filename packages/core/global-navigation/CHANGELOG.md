# @findable/global-navigation

## 6.1.2
- [patch] [94acafec27](https://github.com/fnamazing/uiKit/commits/94acafec27):

  - Adds the error page according to the designs.

## 6.1.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/analytics-next@4.0.1
  - @findable/avatar@15.0.1
  - @findable/blanket@8.0.1
  - @findable/drawer@3.0.1
  - @findable/dropdown-menu@7.0.1
  - @findable/field-radio-group@5.0.1
  - @findable/icon@16.0.5
  - @findable/logo@10.0.1
  - @findable/modal-dialog@8.0.2
  - @findable/navigation-next@5.0.1
  - @findable/section-message@2.0.1
  - @findable/spinner@10.0.1
  - @findable/theme@8.0.1
  - @findable/toggle@6.0.1
  - @findable/button@11.0.0
  - @findable/analytics-listeners@5.0.0
  - @findable/analytics-namespaced-context@3.0.0
  - @findable/notification-indicator@5.0.0
  - @findable/notification-log-client@4.0.0
  - @findable/atlassian-switcher@0.2.0

## 6.1.0
- [minor] [b08df363b7](https://github.com/fnamazing/uiKit/commits/b08df363b7):

  - Add atlassian-switcher prefetch trigger in global-navigation

## 6.0.0
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

## 5.7.6
- Updated dependencies [6ee7b60c4a](https://github.com/fnamazing/uiKit/commits/6ee7b60c4a):
  - @findable/atlassian-switcher@0.1.0

## 5.7.5
- Updated dependencies [e7fa9e1308](https://github.com/fnamazing/uiKit/commits/e7fa9e1308):
  - @findable/atlassian-switcher@0.0.9

## 5.7.4
- Updated dependencies [ebfdf1e915](https://github.com/fnamazing/uiKit/commits/ebfdf1e915):
  - @findable/atlassian-switcher@0.0.8

## 5.7.3
- Updated dependencies [8a70a0db9f](https://github.com/fnamazing/uiKit/commits/8a70a0db9f):
  - @findable/atlassian-switcher@0.0.7

## 5.7.2
- Updated dependencies [3437ac9990](https://github.com/fnamazing/uiKit/commits/3437ac9990):
  - @findable/atlassian-switcher@0.0.6

## 5.7.1
- [patch] [9184dbf08b](https://github.com/fnamazing/uiKit/commits/9184dbf08b):

  - Fixing package.json issue with atlassian-switcher

## 5.7.0
- [minor] [308109b557](https://github.com/fnamazing/uiKit/commits/308109b557):

  - Adding Atlassian Switcher integration

## 5.6.0
- [minor] [8c149b1613](https://github.com/fnamazing/uiKit/commits/8c149b1613):

  - Add the ability to contolr the notification drawer

## 5.5.3
- [patch] [4c9a6d2187](https://github.com/fnamazing/uiKit/commits/4c9a6d2187):

  - Correcting attribute name in analytics event

## 5.5.2
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/avatar@14.1.8
  - @findable/button@10.1.2
  - @findable/drawer@2.7.1
  - @findable/dropdown-menu@6.1.26
  - @findable/field-radio-group@4.0.15
  - @findable/modal-dialog@7.2.1
  - @findable/navigation-next@4.1.2
  - @findable/section-message@1.0.16
  - @findable/toggle@5.0.15
  - @findable/icon@16.0.0

## 5.5.1
- [patch] [a4b0717](https://github.com/fnamazing/uiKit/commits/a4b0717):

  - Updated analytics events triggered by the notification-indicator

## 5.5.0
- [minor] [52224f1](https://github.com/fnamazing/uiKit/commits/52224f1):

  - Add new properties to global-navigation to be able to inject and use new Settings drawer

## 5.4.0
- [minor] [6ce6b0c](https://github.com/fnamazing/uiKit/commits/6ce6b0c):

  - Support onCloseComplete

## 5.3.8
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/avatar@14.1.7
  - @findable/badge@9.2.2
  - @findable/blanket@7.0.12
  - @findable/button@10.1.1
  - @findable/drawer@2.6.1
  - @findable/dropdown-menu@6.1.25
  - @findable/field-radio-group@4.0.14
  - @findable/icon@15.0.2
  - @findable/logo@9.2.6
  - @findable/modal-dialog@7.1.1
  - @findable/navigation-next@4.0.9
  - @findable/section-message@1.0.14
  - @findable/spinner@9.0.13
  - @findable/theme@7.0.1
  - @findable/toggle@5.0.14
  - @findable/analytics-listeners@4.1.4
  - @findable/analytics-namespaced-context@2.1.5
  - @findable/notification-indicator@4.0.6
  - @findable/notification-log-client@3.1.1
  - @findable/docs@6.0.0

## 5.3.7
- [patch] [bee7762](https://github.com/fnamazing/uiKit/commits/bee7762):

  - Fixes a double scrollbar issue that happens on windows when connected to a mouse

## 5.3.6
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/blanket@7.0.11
  - @findable/button@10.0.4
  - @findable/drawer@2.5.4
  - @findable/dropdown-menu@6.1.24
  - @findable/field-radio-group@4.0.13
  - @findable/icon@15.0.1
  - @findable/logo@9.2.5
  - @findable/modal-dialog@7.0.14
  - @findable/navigation-next@4.0.8
  - @findable/section-message@1.0.13
  - @findable/spinner@9.0.12
  - @findable/toggle@5.0.13
  - @findable/theme@7.0.0
  - @findable/avatar@14.1.6
  - @findable/badge@9.2.1

## 5.3.5
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/avatar@14.1.5
  - @findable/button@10.0.1
  - @findable/drawer@2.5.3
  - @findable/dropdown-menu@6.1.23
  - @findable/field-radio-group@4.0.12
  - @findable/modal-dialog@7.0.13
  - @findable/navigation-next@4.0.7
  - @findable/section-message@1.0.12
  - @findable/toggle@5.0.12
  - @findable/icon@15.0.0

## 5.3.4
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/avatar@14.1.4
  - @findable/blanket@7.0.10
  - @findable/drawer@2.5.2
  - @findable/dropdown-menu@6.1.22
  - @findable/field-radio-group@4.0.11
  - @findable/icon@14.6.1
  - @findable/logo@9.2.4
  - @findable/modal-dialog@7.0.12
  - @findable/navigation-next@4.0.6
  - @findable/section-message@1.0.11
  - @findable/spinner@9.0.11
  - @findable/theme@6.2.1
  - @findable/toggle@5.0.11
  - @findable/analytics-listeners@4.1.1
  - @findable/button@10.0.0

## 5.3.3
- [patch] [4d9040d](https://github.com/fnamazing/uiKit/commits/4d9040d):

  - Uses the latest version of @findable/drawer

## 5.3.2
- Updated dependencies [8e753fc](https://github.com/fnamazing/uiKit/commits/8e753fc):
  - @findable/navigation-next@4.0.0

## 5.3.1
- [patch] [3e7125a](https://github.com/fnamazing/uiKit/commits/3e7125a):

  - Fixes a bug that prevented the notification badge from clearing when the notification drawer is opened.

## 5.3.0
- [minor] [ffb0d5a](https://github.com/fnamazing/uiKit/commits/ffb0d5a):

  - Support global navigation drawer widths

## 5.2.1
- [patch] [ad45749](https://github.com/fnamazing/uiKit/commits/ad45749):

  - Update flow types to use object spread instead of intersection and reference GlobalItem via ElementConfig rather than its props directly

## 5.2.0
- [minor] [0d4946e](https://github.com/fnamazing/uiKit/commits/0d4946e):

  - Adds badgeCount to the analytics event that's fired when notification icon is clicked

## 5.1.2
- [patch] [a637f5e](https://github.com/fnamazing/uiKit/commits/a637f5e):

  - Refine and fix some flow type errors found by fixing @findable/analytics-next HOCs to allow flow to type check properly

## 5.1.1
- [patch] [d427e8a](https://github.com/fnamazing/uiKit/commits/d427e8a):

  - Adds tests to global-navigation. Removes a bit of dead code

## 5.1.0
- [minor] [96a854f](https://github.com/fnamazing/uiKit/commits/96a854f):

  - This release makes the notification icon and badge a built-in into global-navigation. Introduces 4 new props which let the products configure the notification.

## 5.0.5
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 5.0.4
- [patch] Bump @findable/drawer dependency to fix positioning issues within the drawer for dropdowns and other fixed position elements. [3c34445](https://github.com/fnamazing/uiKit/commits/3c34445)

## 5.0.3
- [patch] Fixes an erroneous for an improper prop validation. Basic code cleanup and adds tests for GlobalNavigation. [a4e9f03](https://github.com/fnamazing/uiKit/commits/a4e9f03)

## 5.0.2
- [patch] Fix scrollbars from displaying unnecessarily in global-navigation dropdown menus [28e6739](https://github.com/fnamazing/uiKit/commits/28e6739)

## 5.0.1
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/avatar@14.0.11
  - @findable/drawer@2.1.1
  - @findable/dropdown-menu@6.1.17
  - @findable/modal-dialog@7.0.2
  - @findable/navigation-next@3.15.5
  - @findable/section-message@1.0.8
  - @findable/icon@14.0.0

## 5.0.0
- [major] BREAKING: appSwitcherComponent now completely replaces the GlobalItem component altogether, rather than replacing the wrapping element for a GlobalItem. The props provided to this component have changed. If you still want to use a GlobalItem inside your appSwitcherComponent you should spread these props onto that GlobalItem before applying your own props. FIXES: fix issue with global-navigation drawer 'controlled' status not updating. update how appSwitcher component is handled to fix tooltip and hover state issues. [ac88888](https://github.com/fnamazing/uiKit/commits/ac88888)

## 4.6.0
- [minor] Allow both href and onClick for product logo at the same time [34b1c13](https://github.com/fnamazing/uiKit/commits/34b1c13)

## 4.5.2
- [patch] Fix issues with tooltips and hover states in items that render as dropdown menus. [ad36064](https://github.com/fnamazing/uiKit/commits/ad36064)

## 4.5.1
- [patch] Fix drawer screen events not firing on subsequent opens of a drawer after the initial one [7eb5248](https://github.com/fnamazing/uiKit/commits/7eb5248)

## 4.5.0
- [minor] Fire keyboardShortcut pressed analytics event when closing a drawer with the ESC key [6bea7d0](https://github.com/fnamazing/uiKit/commits/6bea7d0)

## 4.4.4
- [patch] Adds the new hideTooltipOnMouseDown was required since global-navigation and navigation-next are using onMouseDown and onMouseUp iteractions [8719daf](https://github.com/fnamazing/uiKit/commits/8719daf)

## 4.4.3
- [patch] fixing remount component on GlobalItem component [e71825a](https://github.com/fnamazing/uiKit/commits/e71825a)

## 4.4.2
- [patch] fixing HelpIcon active on children :hover [ae95dad](https://github.com/fnamazing/uiKit/commits/ae95dad)

## 4.4.1
- [patch] Do not cache CustomComponent in GlobalItem [372795f](https://github.com/fnamazing/uiKit/commits/372795f)

## 4.4.0
- [minor] Exposes a new prop shouldUnmountOnExit in @findable/drawer which let's the consumer decide if the contents of the drawer should be retained on unmount. Exposes 4 new props, one for each drawer to let the product decide if the contents of the drawer should be retained on drawerClose [2988998](https://github.com/fnamazing/uiKit/commits/2988998)

## 4.3.4
- [patch] bump dep on navigation-next [4af6c6a](https://github.com/fnamazing/uiKit/commits/4af6c6a)

## 4.3.3
- [patch] Bumping dependency on navigation-next. [d591e69](https://github.com/fnamazing/uiKit/commits/d591e69)

## 4.3.2
- [patch] Updated dependencies [d5a043a](https://github.com/fnamazing/uiKit/commits/d5a043a)
  - @findable/icon@13.8.1
  - @findable/onboarding@6.0.1
  - @findable/modal-dialog@7.0.0

## 4.3.1
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 4.3.0
- [minor] Add UI analytics event for dismissing global navigation drawers [e7d5eac](https://github.com/fnamazing/uiKit/commits/e7d5eac)
- [patch] Updated dependencies [501378a](https://github.com/fnamazing/uiKit/commits/501378a)
  - @findable/drawer@2.0.0

## 4.2.2
- [patch] Updated dependencies [90ba6bd](https://github.com/fnamazing/uiKit/commits/90ba6bd)
  - @findable/navigation-next@3.6.6
  - @findable/analytics-namespaced-context@2.1.2
  - @findable/analytics-listeners@4.0.0

## 4.2.1
- [patch] Notification badge icon should show 9+ instead of 1x [d716569](https://github.com/fnamazing/uiKit/commits/d716569)

## 4.2.0

- [minor] Add screen analytics events for navigation drawers [f02fb34](https://github.com/fnamazing/uiKit/commits/f02fb34)


- [none] Updated dependencies [ac34b7a](https://github.com/fnamazing/uiKit/commits/ac34b7a)
  - @findable/navigation-next@3.6.1
- [none] Updated dependencies [f02fb34](https://github.com/fnamazing/uiKit/commits/f02fb34)
  - @findable/navigation-next@3.6.1
- [none] Updated dependencies [20b8844](https://github.com/fnamazing/uiKit/commits/20b8844)
  - @findable/analytics-listeners@3.4.0
  - @findable/navigation-next@3.6.1
- [none] Updated dependencies [85ddb9e](https://github.com/fnamazing/uiKit/commits/85ddb9e)
  - @findable/navigation-next@3.6.1
  - @findable/analytics-listeners@3.4.0

## 4.1.6
- [patch] Updated dependencies [b12f7e6](https://github.com/fnamazing/uiKit/commits/b12f7e6)
  - @findable/badge@9.1.1
  - @findable/navigation-next@3.5.2

## 4.1.5
- [patch] Updated dependencies [dfa100e](https://github.com/fnamazing/uiKit/commits/dfa100e)
  - @findable/analytics-listeners@3.3.1
  - @findable/analytics-namespaced-context@2.1.1
  - @findable/navigation-next@3.5.1

## 4.1.4
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/section-message@1.0.5
  - @findable/onboarding@5.1.6
  - @findable/navigation-next@3.3.5
  - @findable/modal-dialog@6.0.9
  - @findable/icon@13.2.5
  - @findable/dropdown-menu@6.1.8
  - @findable/drawer@1.0.6
  - @findable/blanket@7.0.5
  - @findable/badge@9.1.0
  - @findable/avatar@14.0.8
  - @findable/docs@5.0.6

## 4.1.3
- [patch] Fix navigationItem click events not firing for help and profile icons [06bf373](https://github.com/fnamazing/uiKit/commits/06bf373)

- [none] Updated dependencies [06bf373](https://github.com/fnamazing/uiKit/commits/06bf373)
  - @findable/navigation-next@3.3.4
- [patch] Updated dependencies [4ab7c4e](https://github.com/fnamazing/uiKit/commits/4ab7c4e)
  - @findable/navigation-next@3.3.4

## 4.1.2
- [patch] Updated dependencies [15f93f0](https://github.com/fnamazing/uiKit/commits/15f93f0)
  - @findable/navigation-next@3.3.3

## 4.1.1
- [patch] Updated dependencies [0b2daf0](https://github.com/fnamazing/uiKit/commits/0b2daf0)
  - @findable/navigation-next@3.3.2

## 4.1.0

- [minor] Instrument analytics for global nav item clicks. These events will be captured if using the FabricAnalyticsListeners component. [b77a884](https://github.com/fnamazing/uiKit/commits/b77a884)

- [none] Updated dependencies [f7432a2](https://github.com/fnamazing/uiKit/commits/f7432a2)
  - @findable/navigation-next@3.3.0
- [none] Updated dependencies [b77a884](https://github.com/fnamazing/uiKit/commits/b77a884)
  - @findable/navigation-next@3.3.0
- [patch] Updated dependencies [51e9bee](https://github.com/fnamazing/uiKit/commits/51e9bee)
  - @findable/navigation-next@3.3.0

## 4.0.7
- [patch] Remove unused dependancy on navigation-next [2d3b1ee](https://github.com/fnamazing/uiKit/commits/2d3b1ee)
- [patch] Updated dependencies [2d3b1ee](https://github.com/fnamazing/uiKit/commits/2d3b1ee)

## 4.0.6

- [patch] Add variable name displayNames for anonymous function SFC components to improve debugging experience [1602872](https://github.com/fnamazing/uiKit/commits/1602872)

- [none] Updated dependencies [50d469f](https://github.com/fnamazing/uiKit/commits/50d469f)
  - @findable/drawer@1.0.5
  - @findable/navigation-next@3.2.4
- [none] Updated dependencies [1602872](https://github.com/fnamazing/uiKit/commits/1602872)
  - @findable/navigation-next@3.2.4
- [none] Updated dependencies [2e148df](https://github.com/fnamazing/uiKit/commits/2e148df)
  - @findable/navigation-next@3.2.4

## 4.0.5
- [patch] Updated dependencies [626244b](https://github.com/fnamazing/uiKit/commits/626244b)
  - @findable/drawer@1.0.4
  - @findable/navigation-next@3.2.1

## 4.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/modal-dialog@6.0.6
  - @findable/onboarding@5.1.4
  - @findable/theme@5.1.3
  - @findable/badge@9.0.4
  - @findable/section-message@1.0.4
  - @findable/drawer@1.0.3
  - @findable/blanket@7.0.4
  - @findable/icon@13.2.4
  - @findable/dropdown-menu@6.1.5
  - @findable/avatar@14.0.6

## 4.0.3
- [patch] Updated dependencies [6438477](https://github.com/fnamazing/uiKit/commits/6438477)
  - @findable/drawer@1.0.2
  - @findable/navigation-next@3.1.3

## 4.0.2
- [patch] Pass through href for product logo [d40f193](https://github.com/fnamazing/uiKit/commits/d40f193)
- [patch] Updated dependencies [d40f193](https://github.com/fnamazing/uiKit/commits/d40f193)

## 4.0.1
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/navigation-next@3.1.1
  - @findable/onboarding@5.1.3
  - @findable/icon@13.2.2
  - @findable/section-message@1.0.3
  - @findable/drawer@1.0.1
  - @findable/theme@5.1.2
  - @findable/badge@9.0.3
  - @findable/blanket@7.0.3
  - @findable/docs@5.0.2
  - @findable/dropdown-menu@6.1.4
  - @findable/avatar@14.0.5
  - @findable/modal-dialog@6.0.5

## 4.0.0
- [major] Support controlled and uncontrolled drawers in Global Navigation. Update icons for starred drawer and help menu. Remove people drawer from Global navigation. [d0733a7](https://github.com/fnamazing/uiKit/commits/d0733a7)
- [none] Updated dependencies [d0733a7](https://github.com/fnamazing/uiKit/commits/d0733a7)
  - @findable/navigation-next@3.0.3

## 3.0.2
- [patch] Update docs, change dev deps [25d6e48](https://github.com/fnamazing/uiKit/commits/25d6e48)
- [none] Updated dependencies [25d6e48](https://github.com/fnamazing/uiKit/commits/25d6e48)
  - @findable/navigation-next@3.0.2
  - @findable/avatar@14.0.3

## 3.0.1
- [patch] Significant overhaul of API. Publish docs. [532892d](https://github.com/fnamazing/uiKit/commits/532892d)
- [patch] Updated dependencies [532892d](https://github.com/fnamazing/uiKit/commits/532892d)
  - @findable/navigation-next@3.0.0

## 3.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/modal-dialog@6.0.0
  - @findable/onboarding@5.0.0
  - @findable/theme@5.0.0
  - @findable/badge@9.0.0
  - @findable/drawer@1.0.0
  - @findable/docs@5.0.0
  - @findable/blanket@7.0.0
  - @findable/navigation-next@2.0.0
  - @findable/icon@13.0.0
  - @findable/dropdown-menu@6.0.0
  - @findable/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/modal-dialog@6.0.0
  - @findable/onboarding@5.0.0
  - @findable/theme@5.0.0
  - @findable/badge@9.0.0
  - @findable/drawer@1.0.0
  - @findable/docs@5.0.0
  - @findable/blanket@7.0.0
  - @findable/navigation-next@2.0.0
  - @findable/icon@13.0.0
  - @findable/dropdown-menu@6.0.0
  - @findable/avatar@14.0.0

## 2.1.4


- [none] Updated dependencies [da63331](https://github.com/fnamazing/uiKit/commits/da63331)
  - @findable/navigation-next@1.0.3
  - @findable/modal-dialog@5.2.8
  - @findable/dropdown-menu@5.2.3
  - @findable/avatar@13.0.0
- [patch] Updated dependencies [7724115](https://github.com/fnamazing/uiKit/commits/7724115)
  - @findable/avatar@13.0.0
  - @findable/navigation-next@1.0.3
  - @findable/modal-dialog@5.2.8
  - @findable/dropdown-menu@5.2.3

## 2.1.3
- [patch] Updated dependencies [8a01bcd](https://github.com/fnamazing/uiKit/commits/8a01bcd)
  - @findable/avatar@12.0.0
  - @findable/navigation-next@1.0.2
  - @findable/modal-dialog@5.2.7
  - @findable/dropdown-menu@5.2.2

## 2.1.2
- [patch] Updated dependencies [0c9d7b1](https://github.com/fnamazing/uiKit/commits/0c9d7b1)
  - @findable/navigation-next@1.0.1

## 2.1.1
- [patch] Updated dependencies [50ca31b](https://github.com/fnamazing/uiKit/commits/50ca31b)
  - @findable/drawer@0.1.1

## 2.1.0
- [minor] Add productHref prop [c9595c4](https://github.com/fnamazing/uiKit/commits/c9595c4)

## 2.0.0
- [major] Extract standalone Drawer component. Remove drawer state from navigation state manager navigation-next. Stop exporting Drawer component in global-navigation [d11307b](https://github.com/fnamazing/uiKit/commits/d11307b)
- [major] Updated dependencies [d11307b](https://github.com/fnamazing/uiKit/commits/d11307b)
  - @findable/navigation-next@1.0.0
  - @findable/drawer@0.1.0

## 1.0.0
- [major] Update props api for global-navigation. Change the way ResizeControl works in navigation-next [1516d79](https://github.com/fnamazing/uiKit/commits/1516d79)
- [major] Updated dependencies [1516d79](https://github.com/fnamazing/uiKit/commits/1516d79)
  - @findable/navigation-next@0.3.4

## 0.1.3
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [patch] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/onboarding@4.1.2
  - @findable/theme@4.0.4
  - @findable/navigation-next@0.3.3
  - @findable/icon@12.1.2
  - @findable/dropdown-menu@5.0.4

## 0.1.2
- [patch] Updated dependencies [7200aa4](https://github.com/fnamazing/uiKit/commits/7200aa4)
  - @findable/navigation-next@0.3.2

## 0.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [patch] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/onboarding@4.1.1
  - @findable/navigation-next@0.3.1
  - @findable/icon@12.1.1
  - @findable/dropdown-menu@5.0.3
  - @findable/blanket@6.0.3
  - @findable/avatar@11.1.1
  - @findable/docs@4.1.1

## 0.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/onboarding@4.1.0
  - @findable/navigation-next@0.3.0
  - @findable/dropdown-menu@5.0.2
  - @findable/avatar@11.1.0
  - @findable/icon@12.1.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/blanket@6.0.2

## 0.0.10
- [patch] Updated dependencies [ba0ba79](https://github.com/fnamazing/uiKit/commits/ba0ba79)
  - @findable/navigation-next@0.2.2

## 0.0.9
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/navigation-next@0.2.1
  - @findable/onboarding@4.0.1
  - @findable/icon@12.0.1
  - @findable/theme@4.0.1
  - @findable/blanket@6.0.1
  - @findable/docs@4.0.1
  - @findable/dropdown-menu@5.0.1
  - @findable/avatar@11.0.1

## 0.0.8
- [patch] Updated dependencies [41f5218](https://github.com/fnamazing/uiKit/commits/41f5218)
  - @findable/navigation-next@0.2.0

## 0.0.7
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/navigation-next@0.1.3
  - @findable/onboarding@4.0.0
  - @findable/icon@12.0.0
  - @findable/theme@4.0.0
  - @findable/blanket@6.0.0
  - @findable/docs@4.0.0
  - @findable/dropdown-menu@5.0.0
  - @findable/avatar@11.0.0

## 0.0.6
- [patch] Updated dependencies [615e77c](https://github.com/fnamazing/uiKit/commits/615e77c)
  - @findable/navigation-next@0.1.2

## 0.0.5
- [patch] Updated dependencies [3882051](https://github.com/fnamazing/uiKit/commits/3882051)
  - @findable/navigation-next@0.1.1

## 0.0.4
- [patch] Bumping dep on navigation-next [548787e](https://github.com/fnamazing/uiKit/commits/548787e)

## 0.0.3
- [patch] Rename props to be in sync with navigation-next package [1fde1da](https://github.com/fnamazing/uiKit/commits/1fde1da)

## 0.0.2
- [patch] Add global-navigation package [41a4d1c](https://github.com/fnamazing/uiKit/commits/41a4d1c)
- [patch] Updated dependencies [7c99742](https://github.com/fnamazing/uiKit/commits/7c99742)
  - @findable/navigation-next@0.0.7
