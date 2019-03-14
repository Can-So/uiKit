# @atlaskit/textfield

## 0.3.1
- Updated dependencies [9d5cc39394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d5cc39394):
  - @atlaskit/docs@7.0.1
  - @atlaskit/analytics-next@4.0.1
  - @atlaskit/form@5.2.1
  - @atlaskit/theme@8.0.1
  - @atlaskit/button@11.0.0

## 0.3.0
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

## 0.2.0
- [minor] [e9b824bf86](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e9b824bf86):

  - **Breaking**: Changes to the `theme` prop. The type of this prop remains as `(ThemeTokens, ThemeProps) => ThemeTokens`.
    - The shape of `ThemeTokens` has changed. `container` and `input` keys are now required. The value of these keys are style objects.
    - More information has been added to ThemeProps.

  ```diff
  type ThemeTokens = {
  - backgroundColor: string
  - backgroundColorFocus: string
  - backgroundColorHover: string
  - borderColor: string
  - borderColorFocus: string
  - textColor: string
  - disabledTextColor: string
  - placeholderTextColor: string
  + container: Object,
  + input: Object
  }

  type ThemeProps = {
    appearance: ThemeAppearance,
    mode: 'dark' | 'light',
  +  isDisabled: boolean,
  +  isFocused: boolean,
  +  isHovered: boolean,
  +  isInvalid: boolean,
  +  isMonospaced: boolean,
  +  isCompact: boolean,
  +  width?: string | number,
  };
  ```

## 0.1.6
- [patch] [3d8322bd71](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d8322bd71):

  - Trival refactor: update a variable name

## 0.1.5
- [patch] [2e5dd50](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2e5dd50):

  - Update validation example to be compatible with the new Forms API
- Updated dependencies [647a46f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/647a46f):
  - @atlaskit/form@5.0.0

## 0.1.4
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/analytics-next@3.1.2
  - @atlaskit/button@10.1.1
  - @atlaskit/form@4.0.21
  - @atlaskit/theme@7.0.1
  - @atlaskit/docs@6.0.0

## 0.1.3
- [patch] [63f969d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/63f969d):

  - Fixed height of compact textfields to correctly be 32px instead of 28px

## 0.1.2
- [patch] [480a57c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/480a57c):

  - Convert to use new theme API.

## 0.1.1
- Updated dependencies [6998f11](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6998f11):
  - @atlaskit/docs@5.2.1
  - @atlaskit/analytics-next@3.1.1
  - @atlaskit/form@4.0.18
  - @atlaskit/theme@6.2.1
  - @atlaskit/button@10.0.0

## 0.1.0
- [minor] [62109bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/62109bd):

  - Refactor of field-text to remove field-base and normalise along api patterns established in other form components.
