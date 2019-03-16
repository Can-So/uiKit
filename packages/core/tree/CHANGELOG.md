# @findable/tree

## 5.0.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/icon@16.0.5
  - @findable/navigation@34.0.1
  - @findable/section-message@2.0.1
  - @findable/spinner@10.0.1
  - @findable/theme@8.0.1
  - @findable/button@11.0.0

## 5.0.0
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

## 4.1.11
- [patch] [e3b442c128](https://github.com/fnamazing/uiKit/commits/e3b442c128):

  - Adopting API changes in Icon for examples

## 4.1.10
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/navigation@33.3.9
  - @findable/section-message@1.0.16
  - @findable/icon@16.0.0

## 4.1.9
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/icon@15.0.2
  - @findable/navigation@33.3.8
  - @findable/section-message@1.0.14
  - @findable/spinner@9.0.13
  - @findable/theme@7.0.1
  - @findable/docs@6.0.0

## 4.1.8
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/icon@15.0.1
  - @findable/navigation@33.3.7
  - @findable/section-message@1.0.13
  - @findable/spinner@9.0.12
  - @findable/theme@7.0.0

## 4.1.7
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/navigation@33.3.6
  - @findable/section-message@1.0.12
  - @findable/icon@15.0.0

## 4.1.6
- [patch] [ce60809](https://github.com/fnamazing/uiKit/commits/ce60809):

  - Replace react-beautiful-dnd-next dependency with react-beautiful-dnd@10.0.2

## 4.1.5
- [patch] [6c250fe](https://github.com/fnamazing/uiKit/commits/6c250fe):

  - Upgrading react-beautiful-dnd-next to 10.0.0-beta.2

## 4.1.4
- [patch] [7b08fd4](https://github.com/fnamazing/uiKit/commits/7b08fd4):

  - Solving race condition when dropping and nesting at the same time

## 4.1.3
- [patch] [5de65a9](https://github.com/fnamazing/uiKit/commits/5de65a9):

  - Upgrading react-beautiful-dnd-next to 10.0.0-alpha.5

## 4.1.2
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 4.1.1
- [patch] Fixing drag&drop on clipped trees [b18ecfe](https://github.com/fnamazing/uiKit/commits/b18ecfe)

## 4.1.0
- [minor] Expanded parent item is collapsed while dragged. [192b3e2](https://github.com/fnamazing/uiKit/commits/192b3e2)

## 4.0.0
- [major] Implementing nesting and expanding parents while dragging [2bdbf04](https://github.com/fnamazing/uiKit/commits/2bdbf04)

## 3.0.4
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/navigation@33.1.11
  - @findable/section-message@1.0.8
  - @findable/icon@14.0.0

## 3.0.3
- [patch] Collapsing parent automatically when last child moved out [f4992db](https://github.com/fnamazing/uiKit/commits/f4992db)

## 3.0.2
- [patch] Fixing issue of not calling onDragStart when drag&drop starts [d7be874](https://github.com/fnamazing/uiKit/commits/d7be874)

## 3.0.1
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 3.0.0
- [major] Horizontal movement to disambiguate the case when the user is dropping at end of subtree [9ee9657](https://github.com/fnamazing/uiKit/commits/9ee9657)

## 2.0.6
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/spinner@9.0.6
  - @findable/section-message@1.0.5
  - @findable/navigation@33.1.5
  - @findable/icon@13.2.5
  - @findable/docs@5.0.6

## 2.0.5
- [patch] Bumping react-beautiful-dnd to version 9. Making use of use onBeforeDragStart for dynamic table [9cbd494](https://github.com/fnamazing/uiKit/commits/9cbd494)
- [none] Updated dependencies [9cbd494](https://github.com/fnamazing/uiKit/commits/9cbd494)
  - @findable/navigation@33.1.4

## 2.0.4
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/navigation@33.1.3
  - @findable/theme@5.1.3
  - @findable/spinner@9.0.5
  - @findable/section-message@1.0.4
  - @findable/icon@13.2.4

## 2.0.3
- [patch] Bumping react-beautiful-dnd to 8.0.7 to fix timing issue with onDragStart [812a39c](https://github.com/fnamazing/uiKit/commits/812a39c)

## 2.0.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/navigation@33.1.2
  - @findable/icon@13.2.2
  - @findable/section-message@1.0.3
  - @findable/theme@5.1.2
  - @findable/spinner@9.0.4
  - @findable/docs@5.0.2

## 2.0.1
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/theme@5.1.1
  - @findable/spinner@9.0.3
  - @findable/section-message@1.0.2
  - @findable/navigation@33.1.1
  - @findable/icon@13.2.1

## 2.0.0
- [major] Disabling drag&drop by default. [63de261](https://github.com/fnamazing/uiKit/commits/63de261)

## 1.1.0
- [minor] Introducing Drag&Drop functionality to atlaskit/tree [98fe2b5](https://github.com/fnamazing/uiKit/commits/98fe2b5)


- [none] Updated dependencies [87cd977](https://github.com/fnamazing/uiKit/commits/87cd977)
  - @findable/navigation@33.0.5
- [none] Updated dependencies [22efc08](https://github.com/fnamazing/uiKit/commits/22efc08)
  - @findable/navigation@33.0.5

## 1.0.1
- [patch] Update docs, change dev deps [25d6e48](https://github.com/fnamazing/uiKit/commits/25d6e48)
- [none] Updated dependencies [25d6e48](https://github.com/fnamazing/uiKit/commits/25d6e48)

## 1.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/navigation@33.0.0
  - @findable/icon@13.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/navigation@33.0.0
  - @findable/theme@5.0.0
  - @findable/spinner@9.0.0
  - @findable/docs@5.0.0
  - @findable/icon@13.0.0

## 0.1.2
- [patch] Updated dependencies [cdba8b3](https://github.com/fnamazing/uiKit/commits/cdba8b3)
  - @findable/spinner@8.0.0

## 0.1.1
- [patch] Bump version of spinner [1adf8d1](https://github.com/fnamazing/uiKit/commits/1adf8d1)

## 0.1.0
- [minor] Developer preview version of @findable/tree component [79b10a4](https://github.com/fnamazing/uiKit/commits/79b10a4)
