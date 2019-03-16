# @findable/textarea

## 0.3.1
- [patch] [90a14be594](https://github.com/fnamazing/uiKit/commits/90a14be594):

  - Fix broken type-helpers

## 0.3.0
- [minor] [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 0.2.6
- [patch] [1b952c437d](https://github.com/fnamazing/uiKit/commits/1b952c437d):

  - Change order of props spread to fix textarea focus glow, and smart resizing when onChange passed in

## 0.2.5
- Updated dependencies [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):
  - @findable/button@10.1.3
  - @findable/docs@7.0.0
  - @findable/analytics-next@4.0.0
  - @findable/theme@8.0.0

## 0.2.4
- [patch] [aab267bb3a](https://github.com/fnamazing/uiKit/commits/aab267bb3a):

  - Added test to make sure the props are passed down to hidden input

## 0.2.3
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/button@10.1.1
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 0.2.2
- [patch] [9e6b592](https://github.com/fnamazing/uiKit/commits/9e6b592):

  - Added tslib import for textarea

## 0.2.1
- [patch] [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):

  - Change API to experimental theming API to namespace component themes into separate contexts and make theming simpler. Update all dependant components.

## 0.2.0
- [minor] [76a8f1c](https://github.com/fnamazing/uiKit/commits/76a8f1c):

  - Convert @findable/textarea to Typescript
    - Dist paths have changed, if you are importing by exact file path you will need to update your imports `import '@findable/button/dist/es5/components/ButtonGroup'`
    - Flow types are not present any more, Typescript definitions are shipped instead

## 0.1.1
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/analytics-next@3.1.1
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 0.1.0
- [minor] [9d77c4e](https://github.com/fnamazing/uiKit/commits/9d77c4e):

  - New textarea package, meant to be a replacement for field-text-area, normalised component architecture, removed dependency on @findable/field-base, updated to use new @findable/theme api
