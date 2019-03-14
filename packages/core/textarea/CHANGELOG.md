# @atlaskit/textarea

## 0.2.6
- [patch] [1b952c437d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b952c437d):

  - Change order of props spread to fix textarea focus glow, and smart resizing when onChange passed in

## 0.2.5
- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/button@10.1.3
  - @atlaskit/docs@7.0.0
  - @atlaskit/analytics-next@4.0.0
  - @atlaskit/theme@8.0.0

## 0.2.4
- [patch] [aab267bb3a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/aab267bb3a):

  - Added test to make sure the props are passed down to hidden input

## 0.2.3
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/button@10.1.1
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 0.2.2
- [patch] [9e6b592](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9e6b592):

  - Added tslib import for textarea

## 0.2.1
- [patch] [d13242d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d13242d):

  - Change API to experimental theming API to namespace component themes into separate contexts and make theming simpler. Update all dependant components.

## 0.2.0
- [minor] [76a8f1c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76a8f1c):

  - Convert @atlaskit/textarea to Typescript
    - Dist paths have changed, if you are importing by exact file path you will need to update your imports `import '@atlaskit/button/dist/es5/components/ButtonGroup'`
    - Flow types are not present any more, Typescript definitions are shipped instead

## 0.1.1
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 0.1.0
- [minor] [9d77c4e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d77c4e):

  - New textarea package, meant to be a replacement for field-text-area, normalised component architecture, removed dependency on @atlaskit/field-base, updated to use new @atlaskit/theme api
