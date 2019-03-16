# @findable/analytics-next-types

## 4.0.1
- [patch] [90a14be594](https://github.com/fnamazing/uiKit/commits/90a14be594):

  - Fix broken type-helpers

## 4.0.0
- [major] [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 3.2.0
- [minor] [c3fa0b6](https://github.com/fnamazing/uiKit/commits/c3fa0b6):

  - Added support for props of Sum type

## 3.1.2
- [patch] [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):

  - Converted @findable/button to Typescript
    - Dist paths have changed, if you are importing by exact file path you will need to update your imports
      - E.g. `import '@findable/button/dist/cjs/components/ButtonGroup';` would need to be updated to `import '@findable/button/dist/es5/components/ButtonGroup'`
    - Flow types are not present any more, Typescript definitions are shipped instead

- Updated dependencies [bfac186](https://github.com/fnamazing/uiKit/commits/bfac186):
  - @findable/type-helpers@2.0.0

## 3.1.1
- [patch] Loosen AnalyticsEventPayload type to cater for Screen events [2d4b52e](https://github.com/fnamazing/uiKit/commits/2d4b52e)

## 3.1.0
- [minor] Expose UIAnalyticsEvent class [2fe5c09](https://github.com/fnamazing/uiKit/commits/2fe5c09)

## 3.0.1
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)

## 3.0.0
- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)

## 2.1.10
- [patch] Move the tests under src and club the tests under unit, integration and visual regression [f1a9069](https://github.com/fnamazing/uiKit/commits/f1a9069)

## 2.1.9
- [patch] Use proper analytics-next types [a6ac341](https://github.com/fnamazing/uiKit/commits/a6ac341)
