# @findable/analytics-next

## 4.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/field-text@8.0.1
  - @findable/button@11.0.0

## 4.0.0
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

## 3.2.1
- [patch] [8de4c3f](https://github.com/fnamazing/uiKit/commits/8de4c3f):

  - Added missing export

## 3.2.0
- [minor] [c3fa0b6](https://github.com/fnamazing/uiKit/commits/c3fa0b6):

  - Added support for props of Sum type

## 3.1.2
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/field-text@7.0.18
  - @findable/docs@6.0.0

## 3.1.1
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/field-text@7.0.15
  - @findable/button@10.0.0

## 3.1.0
- [minor] [cffeed0](https://github.com/fnamazing/uiKit/commits/cffeed0):

  - Type `withAnalyticsEvents` and `withAnalyticsContext` HOCs so that they do not lose flow types of the components they wrap when chained together.

    This will fix flow types not flowing through all of the components that we have instrumented with analytics as they are typically wrapped with both HOCs. To get flow types flowing
    through your components again, upgrade them to the latest version and also update their @findable/analytics-next dependency to the latest version.

    We also now export `AnalyticsContextWrappedComp` and `AnalyticsEventsWrappedComp` parameterised types that allow you to explicitly type components wrapped with these HOCs which is necessary in cases where the HOC wrapping is extracted into another function.

## 3.0.11
- [patch] [d903ab5](https://github.com/fnamazing/uiKit/commits/d903ab5):

  - Updates list of instrumented components

## 3.0.10
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 3.0.9
- [patch] adds missing babel-runtime dependency to package json [93b031a](https://github.com/fnamazing/uiKit/commits/93b031a)

## 3.0.8
- [patch] Fixing analytics events for checkbox/radio/select [3e428e3](https://github.com/fnamazing/uiKit/commits/3e428e3)

## 3.0.7
- [patch] Loosen AnalyticsEventPayload type to cater for Screen events [2d4b52e](https://github.com/fnamazing/uiKit/commits/2d4b52e)

## 3.0.5
- [patch] Loosen AnalyticsEventCreator return type [f7432a2](https://github.com/fnamazing/uiKit/commits/f7432a2)
- [none] Updated dependencies [f7432a2](https://github.com/fnamazing/uiKit/commits/f7432a2)

## 3.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/field-text@7.0.4
  - @findable/button@9.0.5

## 3.0.3
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/button@9.0.4
  - @findable/field-text@7.0.3
  - @findable/docs@5.0.2

## 3.0.2
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/field-text@7.0.2
  - @findable/button@9.0.3

## 3.0.1
- [patch] Move analytics tests and replace elements to core [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
- [none] Updated dependencies [49d4ab4](https://github.com/fnamazing/uiKit/commits/49d4ab4)
  - @findable/field-text@7.0.1
  - @findable/button@9.0.2
  - @findable/docs@5.0.1

## 3.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/field-text@7.0.0
  - @findable/button@9.0.0
  - @findable/docs@5.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/field-text@7.0.0
  - @findable/button@9.0.0
  - @findable/docs@5.0.0

## 2.1.9
- [patch] removes requirement of children to be a single React node [53cba6b](https://github.com/fnamazing/uiKit/commits/53cba6b)
- [none] Updated dependencies [53cba6b](https://github.com/fnamazing/uiKit/commits/53cba6b)

## 2.1.8
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/button@8.1.1
  - @findable/docs@4.1.1

## 2.1.7
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/docs@4.1.0
  - @findable/field-text@6.0.2
  - @findable/button@8.1.0

## 2.1.6
- [patch] Unpublish fake TS declaration file [ec9f11f](https://github.com/fnamazing/uiKit/commits/ec9f11f)
- [none] Updated dependencies [ec9f11f](https://github.com/fnamazing/uiKit/commits/ec9f11f)

## 2.1.5
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/field-text@6.0.1
  - @findable/button@8.0.1
  - @findable/docs@4.0.1

## 2.1.4
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/field-text@6.0.0
  - @findable/button@8.0.0
  - @findable/docs@4.0.0

## 2.1.3
- [patch] Removed ambient typescript type declaration file from analytics-next - this may be a breaking change for typescript consumers [290d804](https://github.com/fnamazing/uiKit/commits/290d804)
- [none] Updated dependencies [290d804](https://github.com/fnamazing/uiKit/commits/290d804)

## 2.1.2
- [patch] Fix prop callbacks specified in the create event map to not change reference values each render and instead only update when the original prop callback changes [586a80c](https://github.com/fnamazing/uiKit/commits/586a80c)
- [none] Updated dependencies [586a80c](https://github.com/fnamazing/uiKit/commits/586a80c)

## 2.1.1
- [patch] Updated dependencies [d662caa](https://github.com/fnamazing/uiKit/commits/d662caa)
  - @findable/field-text@5.0.3
  - @findable/button@7.2.5
  - @findable/docs@3.0.4

## 2.1.0
- [minor] Export cleanProps function that can be used to strip analytics props provided by our HOCs, useful when spreading props to a child element [973d6ea](https://github.com/fnamazing/uiKit/commits/973d6ea)

## 2.0.0
- [major] Bump to React 16.3. [4251858](https://github.com/fnamazing/uiKit/commits/4251858)

## 1.1.10
- [patch] Adjusted exports to prevent attempted exporting of flow types in built code. [183ee96](https://github.com/fnamazing/uiKit/commits/183ee96)

## 1.1.9
- [patch] Updates flow types of withAnalyticsEvents and withAnalyticsContext HOCs [26778bc](https://github.com/fnamazing/uiKit/commits/26778bc)
- [patch] Uses element config flow type with button deprecation warnings hoc [a9aa90a](https://github.com/fnamazing/uiKit/commits/a9aa90a)

## 1.1.8
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://github.com/fnamazing/uiKit/commits/c3b018a)

## 1.1.7
- [patch] Fix/revert TS TDs in analytics-next [1284d32](https://github.com/fnamazing/uiKit/commits/1284d32)

## 1.1.6
- [patch] Fix analytics-next TS type definition [9faaa5f](https://github.com/fnamazing/uiKit/commits/9faaa5f)
- [patch] Fix analytics-next TS type definition [7e26229](https://github.com/fnamazing/uiKit/commits/7e26229)

## 1.1.5
- [patch] Add analytics events for click and show actions of media-card [031d5da](https://github.com/fnamazing/uiKit/commits/031d5da)
- [patch] Add analytics events for click and show actions of media-card [b361185](https://github.com/fnamazing/uiKit/commits/b361185)

## 1.1.4
- [patch] fixes problem with withAnalyticsEvents HOC passing old function props to wrapped component [c88b030](https://github.com/fnamazing/uiKit/commits/c88b030)

## 1.1.3
- [patch] adds displayName to analytics HOCs [f69ccad](https://github.com/fnamazing/uiKit/commits/f69ccad)

## 1.1.2
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://github.com/fnamazing/uiKit/commits/9ed0bba)

## 1.1.1
- [patch] Remove min requirement of node 8 for analytics-next [c864671](https://github.com/fnamazing/uiKit/commits/c864671)

## 1.1.0
- [minor] adds createAndFireEvent utility method and updates docs [24a93fc](https://github.com/fnamazing/uiKit/commits/24a93fc)

## 1.0.3
- [patch] fixes flow type problem with wrapping stateless functional components in withAnalyticsEvents [8344ffb](https://github.com/fnamazing/uiKit/commits/8344ffb)

## 1.0.2
- [patch] Adds action key to analytics payload type [7deeaef](https://github.com/fnamazing/uiKit/commits/7deeaef)

## 1.0.1
- [patch] updated the repository url to https://github.com/fnamazing/uiKit [1e57e5a](https://github.com/fnamazing/uiKit/commits/1e57e5a)

## 1.0.0
- [major] release @findable/analytics-next package [80695ea](https://github.com/fnamazing/uiKit/commits/80695ea)
