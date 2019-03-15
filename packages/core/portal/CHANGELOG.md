# @atlaskit/portal

## 0.2.1
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/flag@10.0.1
  - @atlaskit/icon@16.0.5
  - @atlaskit/inline-dialog@10.0.1
  - @atlaskit/modal-dialog@8.0.2
  - @atlaskit/onboarding@7.0.1
  - @atlaskit/tooltip@13.0.1
  - @atlaskit/button@11.0.0

## 0.2.0
- [minor] [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):

  - Drop ES5 from all the flow modules

  ### Dropping CJS support in all @atlaskit packages

  As a breaking change, all @atlaskit packages will be dropping cjs distributions and will only distribute esm. This means all distributed code will be transpiled, but will still contain `import` and
  `export` declarations.

  The major reason for doing this is to allow us to support multiple entry points in packages, e.g:

  ```js
  import colors from `@atlaskit/theme/colors`;
  ```

  Previously this was sort of possible for consumers by doing something like:

  ```js
  import colors from `@atlaskit/theme/dist/esm/colors`;
  ```

  This has a couple of issues. 1, it treats the file system as API making internal refactors harder, we have to worry about how consumers might be using things that aren't *actually* supposed to be used. 2. We are unable to do this *internally* in @atlaskit packages. This leads to lots of packages bundling all of theme, just to use a single color, especially in situations where tree shaking fails.

  To support being able to use multiple entrypoints internally, we unfortunately cannot have multiple distributions as they would need to have very different imports from of their own internal dependencies.

  ES Modules are widely supported by all modern bundlers and can be worked around in node environments.

  We may choose to revisit this solution in the future if we find any unintended condequences, but we see this as a pretty sane path forward which should lead to some major bundle size decreases, saner API's and simpler package architecture.

  Please reach out to #fabric-build (if in Atlassian) or create an issue in [Design System Support](https://ecosystem.atlassian.net/secure/CreateIssue.jspa?pid=24670) (for external) if you have any questions or queries about this.

## 0.1.0
- [minor] [27cacd44ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/27cacd44ab):

  - Components inside Portal render after portal container element is attached to the DOM

## 0.0.18
- Updated dependencies [d7ef59d432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7ef59d432):
  - @atlaskit/docs@6.0.1
  - @atlaskit/button@10.1.2
  - @atlaskit/flag@9.1.9
  - @atlaskit/inline-dialog@9.0.14
  - @atlaskit/modal-dialog@7.2.1
  - @atlaskit/onboarding@6.1.16
  - @atlaskit/tooltip@12.1.15
  - @atlaskit/icon@16.0.0

## 0.0.17
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/button@10.1.1
  - @atlaskit/flag@9.1.8
  - @atlaskit/icon@15.0.2
  - @atlaskit/inline-dialog@9.0.13
  - @atlaskit/modal-dialog@7.1.1
  - @atlaskit/onboarding@6.1.14
  - @atlaskit/tooltip@12.1.13
  - @atlaskit/docs@6.0.0

## 0.0.16
- Updated dependencies [ab9b69c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab9b69c):
  - @atlaskit/docs@5.2.2
  - @atlaskit/button@10.0.1
  - @atlaskit/flag@9.1.6
  - @atlaskit/inline-dialog@9.0.11
  - @atlaskit/modal-dialog@7.0.13
  - @atlaskit/onboarding@6.1.11
  - @atlaskit/tooltip@12.1.11
  - @atlaskit/icon@15.0.0

## 0.0.15
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/flag@9.1.5
  - @atlaskit/icon@14.6.1
  - @atlaskit/inline-dialog@9.0.10
  - @atlaskit/modal-dialog@7.0.12
  - @atlaskit/onboarding@6.1.10
  - @atlaskit/tooltip@12.1.10
  - @atlaskit/button@10.0.0

## 0.0.14
- [patch] [1fb2c2a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1fb2c2a):

  - Fixed issue where tooltips and modals would initially render in the wrong location

## 0.0.13
- [patch] [3f5a4dd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f5a4dd):

  - Replaces our own check for dom in ssr with exenv package

## 0.0.12
- [patch] fixes problem with the DOM container for portal not creating a new stacking context [aaab348](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/aaab348)

## 0.0.11
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b71751b)

## 0.0.10
- [patch] Updated dependencies [65c6514](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/65c6514)
  - @atlaskit/docs@5.0.8
  - @atlaskit/button@9.0.13
  - @atlaskit/flag@9.0.11
  - @atlaskit/inline-dialog@9.0.6
  - @atlaskit/modal-dialog@7.0.2
  - @atlaskit/onboarding@6.0.2
  - @atlaskit/tooltip@12.1.1
  - @atlaskit/icon@14.0.0

## 0.0.9
- [patch] Updated dependencies [d5a043a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d5a043a)
  - @atlaskit/icon@13.8.1
  - @atlaskit/onboarding@6.0.1
  - @atlaskit/flag@9.0.10
  - @atlaskit/tooltip@12.0.14
  - @atlaskit/modal-dialog@7.0.0

## 0.0.8
- [patch] Updated dependencies [d9d2f0d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d9d2f0d)
- [none] Updated dependencies [89be4f1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/89be4f1)
  - @atlaskit/flag@9.0.9
  - @atlaskit/tooltip@12.0.13
  - @atlaskit/onboarding@6.0.0

## 0.0.7
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5d6d04)

## 0.0.6




- [patch] Updated dependencies [1d9e75a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1d9e75a)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8
- [none] Updated dependencies [a3109d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a3109d3)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8
- [none] Updated dependencies [87d45d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/87d45d3)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8
- [none] Updated dependencies [a08b0c2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a08b0c2)
  - @atlaskit/inline-dialog@9.0.0
  - @atlaskit/tooltip@12.0.8
  - @atlaskit/modal-dialog@6.0.8

## 0.0.5
- [patch] Adds missing dependency on babel-runtime [e41e465](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e41e465)
- [none] Updated dependencies [e41e465](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e41e465)
  - @atlaskit/tooltip@12.0.7

## 0.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/tooltip@12.0.5
  - @atlaskit/inline-dialog@8.0.4
  - @atlaskit/modal-dialog@6.0.6
  - @atlaskit/onboarding@5.1.4
  - @atlaskit/flag@9.0.4
  - @atlaskit/button@9.0.5
  - @atlaskit/icon@13.2.4

## 0.0.3
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/inline-dialog@8.0.3
  - @atlaskit/tooltip@12.0.4
  - @atlaskit/onboarding@5.1.3
  - @atlaskit/flag@9.0.3
  - @atlaskit/icon@13.2.2
  - @atlaskit/button@9.0.4
  - @atlaskit/docs@5.0.2
  - @atlaskit/modal-dialog@6.0.5

## 0.0.2
- [patch] Initial dev release of portal package [6d5c8c0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d5c8c0)
