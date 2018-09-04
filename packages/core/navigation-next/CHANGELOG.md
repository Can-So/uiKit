# @atlaskit/navigation-next

## 3.7.3
- [patch] LayoutManagerWithViewController now will pass Collapse Listeners props to LayoutManager [881ba31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/881ba31)

## 3.7.2
- [patch] Fixing multiple skeleton load states, rendering product and container skeletons [68e49a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/68e49a1)

## 3.7.1
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 3.7.0
- [minor] Align styles and behaviours with updated designs [170fda7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/170fda7)

## 3.6.6
- [patch] Updated dependencies [90ba6bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90ba6bd)
  - @atlaskit/global-navigation@4.2.2
  - @atlaskit/analytics-namespaced-context@2.1.2
  - @atlaskit/analytics-listeners@4.0.0

## 3.6.5
- [patch] Update navigation item analytics to gracefully handle invalid or missing ID prop [c3e29af](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3e29af)

## 3.6.4
- [patch] Remove BackItem extra margin [bc2d997](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bc2d997)

## 3.6.3
- [patch] Update navigation item click analytics to use an attribute identifier rather than action subject ID. Also convert kebab-case ids to camelCase. [5efaeaf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5efaeaf)

## 3.6.2
- [patch] add better guards around browser globals for SSR [a3db793](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3db793)

## 3.6.1
- [patch] Fix navigation componentName analytics context attribute being placed underneath attributes. It will now appear in componentHierarchy correctly in the resulting event payload rather than componentName [ac34b7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac34b7a)



- [none] Updated dependencies [ac34b7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac34b7a)
  - @atlaskit/global-navigation@4.2.0
- [none] Updated dependencies [f02fb34](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f02fb34)
  - @atlaskit/global-navigation@4.2.0
- [none] Updated dependencies [20b8844](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/20b8844)
  - @atlaskit/analytics-listeners@3.4.0
  - @atlaskit/global-navigation@4.2.0
- [none] Updated dependencies [85ddb9e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85ddb9e)
  - @atlaskit/global-navigation@4.2.0
  - @atlaskit/analytics-listeners@3.4.0

## 3.6.0
- [minor] GoToItems in views automatically render a Spinner when their goTo prop matches the incoming view ID. [ac0084c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ac0084c)

## 3.5.2
- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/badge@9.1.1
  - @atlaskit/global-navigation@4.1.6

## 3.5.1
- [patch] Updated dependencies [dfa100e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfa100e)
  - @atlaskit/analytics-listeners@3.3.1
  - @atlaskit/analytics-namespaced-context@2.1.1
  - @atlaskit/global-navigation@4.1.5

## 3.5.0
- [minor] Instrument expanding and collapsing navigation with analytics [e7d32d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7d32d5)
- [none] Updated dependencies [e7d32d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7d32d5)

## 3.4.0
- [minor] Add an operational event for navigation UI initialisation within the LayerManagerWithViewController component [6c2fdd3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c2fdd3)
- [none] Updated dependencies [2d53fc1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d53fc1)
  - @atlaskit/analytics-listeners@3.3.0

## 3.3.6
- [patch] add switcher to nav-next ui components docs page [e083d63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e083d63)
- [none] Updated dependencies [e083d63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e083d63)
  - @atlaskit/select@5.0.10

## 3.3.5
- [patch] Updated dependencies [df22ad8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df22ad8)
  - @atlaskit/theme@6.0.0
  - @atlaskit/tooltip@12.0.9
  - @atlaskit/toggle@5.0.6
  - @atlaskit/select@5.0.9
  - @atlaskit/section-message@1.0.5
  - @atlaskit/lozenge@6.1.5
  - @atlaskit/icon@13.2.5
  - @atlaskit/global-navigation@4.1.4
  - @atlaskit/field-base@11.0.5
  - @atlaskit/dropdown-menu@6.1.8
  - @atlaskit/badge@9.1.0
  - @atlaskit/avatar@14.0.8
  - @atlaskit/docs@5.0.6

## 3.3.4

- [patch] Fix analytics instrumentation of custom component clicks. Custom components will no longer be wrapped with a div that listens to click events and instead will have their onClick prop wrapped with analytics. If custom components wish to send navigationItem click events, they should attach the onClick prop to a DOM element under their control. [4ab7c4e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ab7c4e)
- [none] Updated dependencies [06bf373](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/06bf373)
  - @atlaskit/global-navigation@4.1.3

## 3.3.3
- [patch] Fixing update active view method in ViewController [15f93f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/15f93f0)
- [patch] Updated dependencies [15f93f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/15f93f0)
  - @atlaskit/global-navigation@4.1.2

## 3.3.2
- [patch] Fixing dynamic styles on global nagivation [0b2daf0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b2daf0)
- [patch] Updated dependencies [0b2daf0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b2daf0)
  - @atlaskit/global-navigation@4.1.1

## 3.3.1
- [patch] Prevent page wrapper from growing beyond available space [ee25869](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee25869)
- [patch] Updated dependencies [ee25869](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee25869)

## 3.3.0
- [minor] Instrument analytics for global and product nav item clicks. These will automatically be captured when using the FabricAnalyticsListeners component to listen for them. Note that some event data attributes rely on the ViewRenderer and LayoutManagerWithViewController being used instead of manual component composition. [51e9bee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51e9bee)
- [patch] Updated dependencies [f7432a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f7432a2)
  - @atlaskit/analytics-next@3.0.5
  - @atlaskit/global-navigation@4.1.0
- [none] Updated dependencies [b77a884](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b77a884)
  - @atlaskit/global-navigation@4.1.0

## 3.2.4
- [patch] Add variable name displayNames for anonymous function SFC components to improve debugging experience [2e148df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e148df)
- [none] Updated dependencies [50d469f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/50d469f)
  - @atlaskit/global-navigation@4.0.6

## 3.2.3
- [patch]  Update icon color for selected navigation item [d0ab79d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0ab79d)
- [patch] Updated dependencies [d0ab79d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0ab79d)

## 3.2.2
- [patch] Reintroduce navigation z-index [44ac36b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44ac36b)
- [none] Updated dependencies [44ac36b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/44ac36b)

## 3.2.1
- [patch] Updated dependencies [626244b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/626244b)
  - @atlaskit/global-navigation@4.0.5

## 3.2.0
- [minor] export wrapped LayoutManager component which is connected to the views API and handles the content navigation automatically. export skeleton components for the Item and ContainerHeader. Renderer now accepts components as a 'type'. [f48e761](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f48e761)
- [none] Updated dependencies [f48e761](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f48e761)

## 3.1.3
- [patch] Updated dependencies [6438477](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6438477)
  - @atlaskit/global-navigation@4.0.3

## 3.1.2
- [patch] Prevent square focus ring on nav resizer icon [a3663d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3663d3)
- [none] Updated dependencies [a3663d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3663d3)

## 3.1.1
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/select@5.0.7
  - @atlaskit/global-navigation@4.0.1
  - @atlaskit/logo@9.0.2
  - @atlaskit/tooltip@12.0.4
  - @atlaskit/icon@13.2.2
  - @atlaskit/toggle@5.0.4
  - @atlaskit/section-message@1.0.3
  - @atlaskit/theme@5.1.2
  - @atlaskit/lozenge@6.1.3
  - @atlaskit/badge@9.0.3
  - @atlaskit/docs@5.0.2
  - @atlaskit/dropdown-menu@6.1.4
  - @atlaskit/avatar@14.0.5
  - @atlaskit/field-base@11.0.2

## 3.1.0
- [minor] add collapse listeners [90199a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90199a5)
- [none] Updated dependencies [90199a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/90199a5)

## 3.0.3
- [patch] Updated dependencies [d0733a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d0733a7)
  - @atlaskit/global-navigation@4.0.0

## 3.0.2
- [patch] Update docs, change dev deps [25d6e48](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d6e48)
- [none] Updated dependencies [25d6e48](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25d6e48)
  - @atlaskit/select@5.0.4
  - @atlaskit/avatar@14.0.3
  - @atlaskit/global-navigation@3.0.2

## 3.0.1
- [patch] fix icon imports [df7e2e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df7e2e0)
- [none] Updated dependencies [df7e2e0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df7e2e0)

## 3.0.0
- [major] Significant overhaul of API. Publish docs. [532892d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/532892d)
- [none] Updated dependencies [532892d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/532892d)
  - @atlaskit/global-navigation@3.0.1

## 2.0.1
- [patch] Updated dependencies [e6b1985](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e6b1985)
  - @atlaskit/tooltip@12.0.0
  - @atlaskit/select@5.0.1
  - @atlaskit/icon@13.1.1
  - @atlaskit/dropdown-menu@6.1.1
  - @atlaskit/avatar@14.0.1

## 2.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/select@5.0.0
  - @atlaskit/logo@9.0.0
  - @atlaskit/field-base@11.0.0
  - @atlaskit/toggle@5.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/badge@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/dropdown-menu@6.0.0
  - @atlaskit/avatar@14.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/tooltip@11.0.0
  - @atlaskit/select@5.0.0
  - @atlaskit/logo@9.0.0
  - @atlaskit/field-base@11.0.0
  - @atlaskit/toggle@5.0.0
  - @atlaskit/theme@5.0.0
  - @atlaskit/lozenge@6.0.0
  - @atlaskit/badge@9.0.0
  - @atlaskit/docs@5.0.0
  - @atlaskit/icon@13.0.0
  - @atlaskit/dropdown-menu@6.0.0
  - @atlaskit/avatar@14.0.0

## 1.1.0
- [minor] Added nav-next "Switcher" component. Minor fixes and dep bump for select. [ed5d8d1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed5d8d1)
- [none] Updated dependencies [ed5d8d1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed5d8d1)
  - @atlaskit/select@4.4.0

## 1.0.3
- [patch] Updated dependencies [7724115](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7724115)
  - @atlaskit/avatar@13.0.0
  - @atlaskit/dropdown-menu@5.2.3

## 1.0.2
- [patch] Updated dependencies [8a01bcd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a01bcd)
  - @atlaskit/avatar@12.0.0
  - @atlaskit/dropdown-menu@5.2.2

## 1.0.1
- [patch] Fix export 'brightness' was not found in 'chromatism' warning/error in navigation-next [0c9d7b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c9d7b1)

## 1.0.0
- [major] Extract standalone Drawer component. Remove drawer state from navigation state manager navigation-next. Stop exporting Drawer component in global-navigation [d11307b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d11307b)

## 0.3.4
- [patch] Update props api for global-navigation. Change the way ResizeControl works in navigation-next [1516d79](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1516d79)

## 0.3.3
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/tooltip@10.2.1
  - @atlaskit/field-base@10.1.2
  - @atlaskit/toggle@4.0.3
  - @atlaskit/theme@4.0.4
  - @atlaskit/lozenge@5.0.4
  - @atlaskit/logo@8.1.2
  - @atlaskit/icon@12.1.2
  - @atlaskit/dropdown-menu@5.0.4

## 0.3.2
- [patch] Add title prop to Group component that will render a title for the group. This is an easier alternative to specifying a separate title item within the group itself. [7200aa4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7200aa4)

## 0.3.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/theme@4.0.3
  - @atlaskit/lozenge@5.0.3
  - @atlaskit/icon@12.1.1
  - @atlaskit/logo@8.1.1
  - @atlaskit/field-base@10.1.1
  - @atlaskit/dropdown-menu@5.0.3
  - @atlaskit/badge@8.0.3
  - @atlaskit/avatar@11.1.1
  - @atlaskit/docs@4.1.1

## 0.3.0
- [none] Updated dependencies [9d20f54](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d20f54)
  - @atlaskit/tooltip@10.2.0
  - @atlaskit/dropdown-menu@5.0.2
  - @atlaskit/avatar@11.1.0
  - @atlaskit/icon@12.1.0
  - @atlaskit/toggle@4.0.2
  - @atlaskit/logo@8.1.0
  - @atlaskit/docs@4.1.0
  - @atlaskit/theme@4.0.2
  - @atlaskit/lozenge@5.0.2
  - @atlaskit/badge@8.0.2
  - @atlaskit/field-base@10.1.0

## 0.2.2
- [patch] Fix goTo items not working with href properties. If they have an href, they will prevent the default link action and transition instead, however, they will still be able to be opened in a new tab via middle/right click. [ba0ba79](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ba0ba79)

## 0.2.1
- [patch] Updated dependencies [223cd67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/223cd67)
  - @atlaskit/tooltip@10.0.1
  - @atlaskit/icon@12.0.1
  - @atlaskit/toggle@4.0.1
  - @atlaskit/logo@8.0.1
  - @atlaskit/field-base@10.0.1
  - @atlaskit/theme@4.0.1
  - @atlaskit/lozenge@5.0.1
  - @atlaskit/badge@8.0.1
  - @atlaskit/docs@4.0.1
  - @atlaskit/dropdown-menu@5.0.1
  - @atlaskit/avatar@11.0.1

## 0.2.0
- [minor] rename NavAPI to ViewState and export a RootViewSubscriber and a ContainerViewSubscriber instead of NavAPISubscriber. we now have independent view state managers for root and container views. [41f5218](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/41f5218)

## 0.1.3
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/tooltip@10.0.0
  - @atlaskit/icon@12.0.0
  - @atlaskit/toggle@4.0.0
  - @atlaskit/logo@8.0.0
  - @atlaskit/field-base@10.0.0
  - @atlaskit/theme@4.0.0
  - @atlaskit/lozenge@5.0.0
  - @atlaskit/badge@8.0.0
  - @atlaskit/docs@4.0.0
  - @atlaskit/dropdown-menu@5.0.0
  - @atlaskit/avatar@11.0.0

## 0.1.2
- [patch] navigation-next Item should be updated when new props are different than previous [615e77c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/615e77c)

## 0.1.1
- [patch] add some reducer util functions [3882051](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3882051)

## 0.1.0
- [minor] export basic renderer [a53eda9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a53eda9)

## 0.0.7
- [patch] Exports types for global-navigation to consume [7c99742](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7c99742)

## 0.0.6
- [patch] Add debug prop to NavigationProvider that enables Nav API debug logging [018d77d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/018d77d)

## 0.0.5
- [patch] Updated dependencies [d662caa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d662caa)
  - @atlaskit/icon@11.3.0
  - @atlaskit/tooltip@9.2.1
  - @atlaskit/logo@7.0.1
  - @atlaskit/dropdown-menu@4.0.3
  - @atlaskit/theme@3.2.2
  - @atlaskit/badge@7.1.2
  - @atlaskit/avatar@10.0.6
  - @atlaskit/docs@3.0.4
  - @atlaskit/lozenge@4.0.1

## 0.0.4
- [patch] port nav views API to ak. only has support for root views atm. also renderer isn't finalised. [25805b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25805b8)

## 0.0.2
- [patch] release @atlaskit/navigation-next [33492df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/33492df)
