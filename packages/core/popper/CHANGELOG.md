# @findable/popper

## 0.4.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 0.4.0
- [minor] [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):

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

## 0.3.7
- [patch] [efc35d1](https://github.com/fnamazing/uiKit/commits/efc35d1):

  - Internal changes:
  	- Adding react-dom and build utils as dev dependencies
  	- Adding unit test for server side rendering use-case
  	- Adding unit test to cover Popper component

## 0.3.6
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 0.3.5
- [patch] [82fc5f5](https://github.com/fnamazing/uiKit/commits/82fc5f5):

  - Pinning react-popper to 1.0.2 to avoid recursive bug

## 0.3.4
- [patch] [0a297ba](https://github.com/fnamazing/uiKit/commits/0a297ba):

  - Packages should not be shown in the navigation, search and overview

## 0.3.3
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/theme@7.0.0

## 0.3.2
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/theme@6.2.1
  - @findable/button@10.0.0

## 0.3.1
- [patch] Fix referenceElement overriding ref from Reference component  [874d5bd](https://github.com/fnamazing/uiKit/commits/874d5bd)

## 0.3.0
- [minor] Adds replacementElement prop to enable onboarding use-case. See prop documentation [here](https://github.com/FezVrasta/react-popper#usage-without-a-reference-htmlelement) [1a752e6](https://github.com/fnamazing/uiKit/commits/1a752e6)

## 0.2.5
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 0.2.4
- [patch] Fixed popper placement offset to not fire deprecation warning. [4fcff1c](https://github.com/fnamazing/uiKit/commits/4fcff1c)

## 0.2.3
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 0.2.2
- [patch] Using the latest popper to avoid recursive setState calls. [9dceca9](https://github.com/fnamazing/uiKit/commits/9dceca9)

## 0.2.1
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 0.2.0



- [minor] Bumped react-popper version to get bug fixes, also added offset prop [a08b0c2](https://github.com/fnamazing/uiKit/commits/a08b0c2)
- [none] Updated dependencies [1d9e75a](https://github.com/fnamazing/uiKit/commits/1d9e75a)
- [none] Updated dependencies [a3109d3](https://github.com/fnamazing/uiKit/commits/a3109d3)
- [none] Updated dependencies [87d45d3](https://github.com/fnamazing/uiKit/commits/87d45d3)
- [none] Updated dependencies [a08b0c2](https://github.com/fnamazing/uiKit/commits/a08b0c2)

## 0.1.2
- [patch] Replace @findable/layer in date time picker with @findable/popper, changed configuration of flipBehaviour modifier to use viewport as the element boundary rather than the window. [4286672](https://github.com/fnamazing/uiKit/commits/4286672)
- [patch] Updated datetime-picker to use @findable/popper internally instead of @findable/layer. Minor fix to @findable/popper, boundariesElement for flipbehaviour is now viewport and not window. [f2159f4](https://github.com/fnamazing/uiKit/commits/f2159f4)
- [none] Updated dependencies [4286672](https://github.com/fnamazing/uiKit/commits/4286672)
- [none] Updated dependencies [f2159f4](https://github.com/fnamazing/uiKit/commits/f2159f4)

## 0.1.1
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/docs@5.0.2

## 0.1.0
- [minor] Dev release for popper [e987222](https://github.com/fnamazing/uiKit/commits/e987222)
