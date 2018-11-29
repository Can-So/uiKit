# @atlaskit/textarea

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
