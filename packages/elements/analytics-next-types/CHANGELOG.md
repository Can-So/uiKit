# @atlaskit/analytics-next-types

## 3.1.2
- [patch] [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):

  - Converted @atlaskit/button to Typescript
    - Dist paths have changed, if you are importing by exact file path you will need to update your imports
      - E.g. `import '@atlaskit/button/dist/cjs/components/ButtonGroup';` would need to be updated to `import '@atlaskit/button/dist/es5/components/ButtonGroup'`
    - Flow types are not present any more, Typescript definitions are shipped instead

- Updated dependencies [bfac186](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfac186):
  - @atlaskit/type-helpers@2.0.0

## 3.1.1
- [patch] Loosen AnalyticsEventPayload type to cater for Screen events [2d4b52e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2d4b52e)

## 3.1.0
- [minor] Expose UIAnalyticsEvent class [2fe5c09](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2fe5c09)

## 3.0.1
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)

## 3.0.0
- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)

## 2.1.10
- [patch] Move the tests under src and club the tests under unit, integration and visual regression [f1a9069](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f1a9069)

## 2.1.9
- [patch] Use proper analytics-next types [a6ac341](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6ac341)
