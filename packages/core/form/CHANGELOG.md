# @findable/form

## 5.2.2
- [patch] [a1217df379](https://github.com/fnamazing/uiKit/commits/a1217df379):

  - Internal changes only. Form is now compatible with ssr.

## 5.2.1
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/calendar@7.0.20
  - @findable/checkbox@6.0.1
  - @findable/datetime-picker@7.0.1
  - @findable/dropdown-menu@7.0.1
  - @findable/droplist@8.0.1
  - @findable/field-radio-group@5.0.1
  - @findable/field-text@8.0.1
  - @findable/field-text-area@5.0.1
  - @findable/icon@16.0.5
  - @findable/inline-edit@8.0.1
  - @findable/modal-dialog@8.0.2
  - @findable/multi-select@12.0.1
  - @findable/radio@0.5.1
  - @findable/section-message@2.0.1
  - @findable/select@8.0.3
  - @findable/single-select@7.0.1
  - @findable/textfield@0.3.1
  - @findable/theme@8.0.1
  - @findable/toggle@6.0.1
  - @findable/tooltip@13.0.1
  - @findable/field-range@6.0.1
  - @findable/button@11.0.0
  - @findable/textarea@0.3.0

## 5.2.0
- [minor] [fe7683f9d6](https://github.com/fnamazing/uiKit/commits/fe7683f9d6):

  - Feature: Submit form on Cmd + Enter on Mac and Ctrl + Enter on Mac and Windows

## 5.1.8
- [patch] [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):

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

## 5.1.7
- Updated dependencies [e9b824bf86](https://github.com/fnamazing/uiKit/commits/e9b824bf86):
  - @findable/modal-dialog@7.2.4
  - @findable/textfield@0.2.0

## 5.1.6
- [patch] [887c85ffdc](https://github.com/fnamazing/uiKit/commits/887c85ffdc):

  - Form now provides a `getValues` function to it's child render function. The `getValues` function returns an object containing the current value of all fields.

## 5.1.5
- Updated dependencies [06713e0a0c](https://github.com/fnamazing/uiKit/commits/06713e0a0c):
  - @findable/datetime-picker@6.5.1
  - @findable/modal-dialog@7.2.3
  - @findable/select@7.0.0

## 5.1.4
- [patch] [0c0f20c9cf](https://github.com/fnamazing/uiKit/commits/0c0f20c9cf):

  - Fix typo in Field.js

## 5.1.3
- [patch] [a360a3d2b6](https://github.com/fnamazing/uiKit/commits/a360a3d2b6):

  - Bugfix: field entry in form state gets deleted when Field is unmounted
  - Bugfix: Shallow equal check in Field works correctly across different types

## 5.1.2
- Updated dependencies [d7ef59d432](https://github.com/fnamazing/uiKit/commits/d7ef59d432):
  - @findable/docs@6.0.1
  - @findable/button@10.1.2
  - @findable/calendar@7.0.17
  - @findable/checkbox@5.0.11
  - @findable/datetime-picker@6.3.25
  - @findable/dropdown-menu@6.1.26
  - @findable/droplist@7.0.18
  - @findable/field-radio-group@4.0.15
  - @findable/inline-edit@7.1.8
  - @findable/modal-dialog@7.2.1
  - @findable/multi-select@11.0.14
  - @findable/radio@0.4.6
  - @findable/section-message@1.0.16
  - @findable/select@6.1.19
  - @findable/single-select@6.0.12
  - @findable/toggle@5.0.15
  - @findable/tooltip@12.1.15
  - @findable/field-range@5.0.14
  - @findable/icon@16.0.0

## 5.1.1
- [patch] [58e7bc1](https://github.com/fnamazing/uiKit/commits/58e7bc1):

  - Added example of Form use within a ModalDialog - no changes required

## 5.1.0
- [minor] [b36a82f](https://github.com/fnamazing/uiKit/commits/b36a82f):

  - **feature:** Uses context to automatically assosiate a message to field. No upgrade changes required. Can remove fieldId prop on Message components if you are using that prop currently.

## 5.0.0
- [major] [647a46f](https://github.com/fnamazing/uiKit/commits/647a46f):

  - **Breaking:** this version is a major overhaul of the package.
    - **Conceptual changes:** The `Form` component must be the source of truth for the form state. This means you keep track of far less state in your application.
    - **API changes:** `Form`, `Field` and `CheckboxField` components use render props. This was done to maximise the flexiblity of the what can be rendered inside `Form` or `Field`s.
    - **Accessibility:** Creating accessible forms is easier than ever with this release. It is straight forward to link validation messages or helper text with a field. See the examples for details.

## 4.0.21
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/calendar@7.0.16
  - @findable/checkbox@5.0.9
  - @findable/datetime-picker@6.3.21
  - @findable/dropdown-menu@6.1.25
  - @findable/droplist@7.0.17
  - @findable/field-radio-group@4.0.14
  - @findable/field-range@5.0.12
  - @findable/field-text@7.0.18
  - @findable/field-text-area@4.0.14
  - @findable/icon@15.0.2
  - @findable/inline-edit@7.1.7
  - @findable/modal-dialog@7.1.1
  - @findable/multi-select@11.0.13
  - @findable/radio@0.4.4
  - @findable/section-message@1.0.14
  - @findable/select@6.1.13
  - @findable/single-select@6.0.11
  - @findable/theme@7.0.1
  - @findable/toggle@5.0.14
  - @findable/tooltip@12.1.13
  - @findable/docs@6.0.0

## 4.0.20
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/calendar@7.0.15
  - @findable/checkbox@5.0.8
  - @findable/datetime-picker@6.3.20
  - @findable/dropdown-menu@6.1.24
  - @findable/droplist@7.0.16
  - @findable/field-radio-group@4.0.13
  - @findable/field-range@5.0.11
  - @findable/field-text@7.0.16
  - @findable/field-text-area@4.0.13
  - @findable/icon@15.0.1
  - @findable/inline-edit@7.1.6
  - @findable/modal-dialog@7.0.14
  - @findable/multi-select@11.0.12
  - @findable/radio@0.4.3
  - @findable/section-message@1.0.13
  - @findable/select@6.1.10
  - @findable/single-select@6.0.10
  - @findable/toggle@5.0.13
  - @findable/tooltip@12.1.12
  - @findable/theme@7.0.0

## 4.0.19
- Updated dependencies [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):
  - @findable/docs@5.2.2
  - @findable/button@10.0.1
  - @findable/calendar@7.0.14
  - @findable/checkbox@5.0.7
  - @findable/datetime-picker@6.3.19
  - @findable/dropdown-menu@6.1.23
  - @findable/droplist@7.0.14
  - @findable/field-radio-group@4.0.12
  - @findable/inline-edit@7.1.5
  - @findable/modal-dialog@7.0.13
  - @findable/multi-select@11.0.11
  - @findable/radio@0.4.2
  - @findable/section-message@1.0.12
  - @findable/select@6.1.9
  - @findable/single-select@6.0.9
  - @findable/toggle@5.0.12
  - @findable/tooltip@12.1.11
  - @findable/icon@15.0.0

## 4.0.18
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/calendar@7.0.13
  - @findable/checkbox@5.0.6
  - @findable/datetime-picker@6.3.18
  - @findable/dropdown-menu@6.1.22
  - @findable/droplist@7.0.13
  - @findable/field-radio-group@4.0.11
  - @findable/field-text@7.0.15
  - @findable/field-text-area@4.0.12
  - @findable/icon@14.6.1
  - @findable/inline-edit@7.1.4
  - @findable/modal-dialog@7.0.12
  - @findable/multi-select@11.0.10
  - @findable/radio@0.4.1
  - @findable/section-message@1.0.11
  - @findable/select@6.1.8
  - @findable/single-select@6.0.8
  - @findable/theme@6.2.1
  - @findable/toggle@5.0.11
  - @findable/tooltip@12.1.10
  - @findable/field-range@5.0.9
  - @findable/button@10.0.0

## 4.0.17
- Updated dependencies [b42680b](https://github.com/fnamazing/uiKit/commits/b42680b):
  - @findable/radio@0.4.0

## 4.0.16
- Updated dependencies [8199088](https://github.com/fnamazing/uiKit/commits/8199088):
  - @findable/radio@0.3.0

## 4.0.15
- [patch] [e6d3f57](https://github.com/fnamazing/uiKit/commits/e6d3f57):

  - Check that content children of FormSection are valid elements before cloning

## 4.0.14
- [patch] [c8d935f"
d](https://github.com/fnamazing/uiKit/commits/c8d935f"
d):

  - Fixing form header styles

## 4.0.13
- [patch] Fixed rendering of FieldGroup legends [af05f8e](https://github.com/fnamazing/uiKit/commits/af05f8e)

## 4.0.12
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 4.0.11
- [patch] Empty form headings and sections no longer result in extra spacing [ac537db](https://github.com/fnamazing/uiKit/commits/ac537db)

## 4.0.10
- [patch] Updated dependencies [65c6514](https://github.com/fnamazing/uiKit/commits/65c6514)
  - @findable/docs@5.0.8
  - @findable/button@9.0.13
  - @findable/calendar@7.0.9
  - @findable/checkbox@5.0.2
  - @findable/datetime-picker@6.3.11
  - @findable/dropdown-menu@6.1.17
  - @findable/droplist@7.0.10
  - @findable/field-radio-group@4.0.8
  - @findable/inline-edit@7.1.1
  - @findable/modal-dialog@7.0.2
  - @findable/multi-select@11.0.7
  - @findable/section-message@1.0.8
  - @findable/select@6.0.2
  - @findable/single-select@6.0.6
  - @findable/toggle@5.0.9
  - @findable/tooltip@12.1.1
  - @findable/icon@14.0.0

## 4.0.9
- [patch] Updated dependencies [4194aa4](https://github.com/fnamazing/uiKit/commits/4194aa4)
  - @findable/datetime-picker@6.3.10
  - @findable/select@6.0.0

## 4.0.8
- [patch] Pulling the shared styles from @findable/theme and removed dependency on util-shraed-styles [7d51a09](https://github.com/fnamazing/uiKit/commits/7d51a09)

## 4.0.7
- [patch] Deprecates field-radio-group from form components. Adds @findable/radio to field components [dcdb61b](https://github.com/fnamazing/uiKit/commits/dcdb61b)

## 4.0.6
- [patch] Fix isRequired applied to all fields [cb73e27](https://github.com/fnamazing/uiKit/commits/cb73e27)

## 4.0.5
- [patch] Updated dependencies [80e1925](https://github.com/fnamazing/uiKit/commits/80e1925)
  - @findable/button@9.0.9
  - @findable/modal-dialog@7.0.1
  - @findable/select@5.0.18
  - @findable/checkbox@5.0.0

## 4.0.4
- [patch] Form validate now correctly returns fieldState & checks isRequired [87cea82](https://github.com/fnamazing/uiKit/commits/87cea82)

## 4.0.3
- [patch] Updated dependencies [d5a043a](https://github.com/fnamazing/uiKit/commits/d5a043a)
  - @findable/datetime-picker@6.3.7
  - @findable/icon@13.8.1
  - @findable/select@5.0.17
  - @findable/tooltip@12.0.14
  - @findable/modal-dialog@7.0.0

## 4.0.2
- [patch] Updated dependencies [9c66d4d](https://github.com/fnamazing/uiKit/commits/9c66d4d)
  - @findable/datetime-picker@6.3.6
  - @findable/select@5.0.16
  - @findable/webdriver-runner@0.1.0

## 4.0.1
- [patch] Adds sideEffects: false to allow proper tree shaking [b5d6d04](https://github.com/fnamazing/uiKit/commits/b5d6d04)

## 4.0.0
- [major] Removed required prop, consolidated the logic into the isRequired prop.  [d8d8107](https://github.com/fnamazing/uiKit/commits/d8d8107)

## 3.1.8
- [patch] Fix Form submit handlers being called when no onSubmit prop is passed [1086a6b](https://github.com/fnamazing/uiKit/commits/1086a6b)

## 3.1.6
- [patch] Updated dependencies [df22ad8](https://github.com/fnamazing/uiKit/commits/df22ad8)
  - @findable/theme@6.0.0
  - @findable/tooltip@12.0.9
  - @findable/toggle@5.0.6
  - @findable/single-select@6.0.4
  - @findable/select@5.0.9
  - @findable/section-message@1.0.5
  - @findable/multi-select@11.0.5
  - @findable/modal-dialog@6.0.9
  - @findable/inline-edit@7.0.6
  - @findable/icon@13.2.5
  - @findable/field-text-area@4.0.6
  - @findable/field-text@7.0.6
  - @findable/field-range@5.0.4
  - @findable/field-radio-group@4.0.5
  - @findable/droplist@7.0.7
  - @findable/dropdown-menu@6.1.8
  - @findable/datetime-picker@6.3.2
  - @findable/checkbox@4.0.4
  - @findable/calendar@7.0.5
  - @findable/button@9.0.6
  - @findable/docs@5.0.6

## 3.1.5
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://github.com/fnamazing/uiKit/commits/a4bd557)
  - @findable/tooltip@12.0.5
  - @findable/select@5.0.8
  - @findable/modal-dialog@6.0.6
  - @findable/multi-select@11.0.4
  - @findable/inline-edit@7.0.4
  - @findable/field-text-area@4.0.4
  - @findable/field-text@7.0.4
  - @findable/toggle@5.0.5
  - @findable/checkbox@4.0.3
  - @findable/calendar@7.0.4
  - @findable/button@9.0.5
  - @findable/theme@5.1.3
  - @findable/field-range@5.0.3
  - @findable/section-message@1.0.4
  - @findable/field-radio-group@4.0.4
  - @findable/datetime-picker@6.1.1
  - @findable/icon@13.2.4
  - @findable/droplist@7.0.5
  - @findable/dropdown-menu@6.1.5

## 3.1.4
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/select@5.0.7
  - @findable/tooltip@12.0.4
  - @findable/icon@13.2.2
  - @findable/toggle@5.0.4
  - @findable/single-select@6.0.3
  - @findable/section-message@1.0.3
  - @findable/multi-select@11.0.3
  - @findable/inline-edit@7.0.3
  - @findable/field-radio-group@4.0.3
  - @findable/checkbox@4.0.2
  - @findable/calendar@7.0.3
  - @findable/button@9.0.4
  - @findable/theme@5.1.2
  - @findable/field-range@5.0.2
  - @findable/field-text-area@4.0.3
  - @findable/field-text@7.0.3
  - @findable/docs@5.0.2
  - @findable/droplist@7.0.4
  - @findable/dropdown-menu@6.1.4
  - @findable/modal-dialog@6.0.5
  - @findable/datetime-picker@6.0.3

## 3.1.3
- [patch] Add a SSR test for every package, add react-dom and build-utils in devDependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
- [none] Updated dependencies [7e331b5](https://github.com/fnamazing/uiKit/commits/7e331b5)
  - @findable/tooltip@12.0.3
  - @findable/select@5.0.6
  - @findable/modal-dialog@6.0.4
  - @findable/inline-edit@7.0.2
  - @findable/field-text-area@4.0.2
  - @findable/field-text@7.0.2
  - @findable/toggle@5.0.3
  - @findable/checkbox@4.0.1
  - @findable/calendar@7.0.2
  - @findable/button@9.0.3
  - @findable/theme@5.1.1
  - @findable/field-range@5.0.1
  - @findable/section-message@1.0.2
  - @findable/field-radio-group@4.0.2
  - @findable/datetime-picker@6.0.2
  - @findable/icon@13.2.1
  - @findable/droplist@7.0.3
  - @findable/dropdown-menu@6.1.3

## 3.1.2
- [patch] Removed incorrect min-height for forms. Fixed select dev dep range for form. [186a2ee](https://github.com/fnamazing/uiKit/commits/186a2ee)
- [none] Updated dependencies [186a2ee](https://github.com/fnamazing/uiKit/commits/186a2ee)
  - @findable/select@5.0.5

## 3.1.1
- [patch] Update docs, change dev deps [25d6e48](https://github.com/fnamazing/uiKit/commits/25d6e48)
- [none] Updated dependencies [25d6e48](https://github.com/fnamazing/uiKit/commits/25d6e48)
  - @findable/single-select@6.0.2
  - @findable/select@5.0.4
  - @findable/multi-select@11.0.2

## 3.1.0
- [minor] Improvements & fixes for Form validation & state management [e33f19d](https://github.com/fnamazing/uiKit/commits/e33f19d)
- [minor] Updated dependencies [e33f19d](https://github.com/fnamazing/uiKit/commits/e33f19d)
  - @findable/select@5.0.3

## 3.0.1
- [patch] Updated dependencies [e6b1985](https://github.com/fnamazing/uiKit/commits/e6b1985)
  - @findable/tooltip@12.0.0
  - @findable/select@5.0.1
  - @findable/icon@13.1.1
  - @findable/droplist@7.0.1
  - @findable/dropdown-menu@6.1.1

## 3.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/tooltip@11.0.0
  - @findable/select@5.0.0
  - @findable/modal-dialog@6.0.0
  - @findable/single-select@6.0.0
  - @findable/multi-select@11.0.0
  - @findable/inline-edit@7.0.0
  - @findable/field-text-area@4.0.0
  - @findable/field-text@7.0.0
  - @findable/toggle@5.0.0
  - @findable/checkbox@4.0.0
  - @findable/calendar@7.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/field-range@5.0.0
  - @findable/docs@5.0.0
  - @findable/field-radio-group@4.0.0
  - @findable/datetime-picker@6.0.0
  - @findable/icon@13.0.0
  - @findable/droplist@7.0.0
  - @findable/dropdown-menu@6.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/tooltip@11.0.0
  - @findable/select@5.0.0
  - @findable/modal-dialog@6.0.0
  - @findable/single-select@6.0.0
  - @findable/multi-select@11.0.0
  - @findable/inline-edit@7.0.0
  - @findable/field-text-area@4.0.0
  - @findable/field-text@7.0.0
  - @findable/toggle@5.0.0
  - @findable/checkbox@4.0.0
  - @findable/calendar@7.0.0
  - @findable/button@9.0.0
  - @findable/theme@5.0.0
  - @findable/field-range@5.0.0
  - @findable/docs@5.0.0
  - @findable/field-radio-group@4.0.0
  - @findable/datetime-picker@6.0.0
  - @findable/icon@13.0.0
  - @findable/droplist@7.0.0
  - @findable/dropdown-menu@6.0.0

## 2.1.5
- [patch] fix styled-components syntax error [60c715f](https://github.com/fnamazing/uiKit/commits/60c715f)
- [none] Updated dependencies [60c715f](https://github.com/fnamazing/uiKit/commits/60c715f)
  - @findable/select@4.3.5

## 2.1.4
- [patch] Fix Field validator error on empty strings  [470a1fb](https://github.com/fnamazing/uiKit/commits/470a1fb)
- [patch] Updated dependencies [470a1fb](https://github.com/fnamazing/uiKit/commits/470a1fb)
  - @findable/select@4.3.2

## 2.1.3
- [patch] Fix $FlowFixMe and release packages [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
- [none] Updated dependencies [25d0b2d](https://github.com/fnamazing/uiKit/commits/25d0b2d)
  - @findable/tooltip@10.3.1
  - @findable/select@4.3.1
  - @findable/modal-dialog@5.2.5
  - @findable/single-select@5.2.1
  - @findable/multi-select@10.2.1
  - @findable/field-text-area@3.1.2
  - @findable/button@8.2.2
  - @findable/checkbox@3.1.2
  - @findable/calendar@6.1.3
  - @findable/field-radio-group@3.1.2
  - @findable/icon@12.3.1

## 2.1.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://github.com/fnamazing/uiKit/commits/e7756cd)
  - @findable/tooltip@10.2.1
  - @findable/select@4.2.3
  - @findable/modal-dialog@5.2.2
  - @findable/single-select@5.1.2
  - @findable/multi-select@10.1.2
  - @findable/inline-edit@6.1.3
  - @findable/field-text-area@3.1.1
  - @findable/field-text@6.0.4
  - @findable/button@8.1.2
  - @findable/toggle@4.0.3
  - @findable/theme@4.0.4
  - @findable/field-range@4.0.3
  - @findable/checkbox@3.0.6
  - @findable/calendar@6.1.2
  - @findable/field-radio-group@3.0.4
  - @findable/datetime-picker@5.2.1
  - @findable/icon@12.1.2
  - @findable/droplist@6.1.2
  - @findable/dropdown-menu@5.0.4

## 2.1.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/theme@4.0.3
  - @findable/single-select@5.1.1
  - @findable/select@4.2.1
  - @findable/multi-select@10.1.1
  - @findable/modal-dialog@5.1.1
  - @findable/inline-edit@6.1.2
  - @findable/icon@12.1.1
  - @findable/field-radio-group@3.0.3
  - @findable/droplist@6.1.1
  - @findable/dropdown-menu@5.0.3
  - @findable/checkbox@3.0.5
  - @findable/calendar@6.1.1
  - @findable/button@8.1.1
  - @findable/docs@4.1.1

## 2.1.0
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/single-select@5.1.0
  - @findable/modal-dialog@5.1.0
  - @findable/select@4.2.0
  - @findable/tooltip@10.2.0
  - @findable/dropdown-menu@5.0.2
  - @findable/inline-edit@6.1.0
  - @findable/icon@12.1.0
  - @findable/toggle@4.0.2
  - @findable/field-radio-group@3.0.2
  - @findable/checkbox@3.0.4
  - @findable/calendar@6.1.0
  - @findable/docs@4.1.0
  - @findable/theme@4.0.2
  - @findable/field-text-area@3.0.3
  - @findable/field-text@6.0.2
  - @findable/field-range@4.0.2
  - @findable/datetime-picker@5.2.0
  - @findable/multi-select@10.1.0
  - @findable/droplist@6.1.0
  - @findable/button@8.1.0

## 2.0.1
- [patch] Update readme's [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
- [patch] Updated dependencies [223cd67](https://github.com/fnamazing/uiKit/commits/223cd67)
  - @findable/tooltip@10.0.1
  - @findable/modal-dialog@5.0.1
  - @findable/select@4.0.1
  - @findable/datetime-picker@5.0.1
  - @findable/icon@12.0.1
  - @findable/toggle@4.0.1
  - @findable/inline-edit@6.0.1
  - @findable/field-radio-group@3.0.1
  - @findable/field-text-area@3.0.1
  - @findable/field-text@6.0.1
  - @findable/checkbox@3.0.1
  - @findable/calendar@6.0.1
  - @findable/button@8.0.1
  - @findable/theme@4.0.1
  - @findable/field-range@4.0.1
  - @findable/docs@4.0.1
  - @findable/droplist@6.0.1
  - @findable/dropdown-menu@5.0.1

## 2.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/tooltip@10.0.0
  - @findable/modal-dialog@5.0.0
  - @findable/select@4.0.0
  - @findable/datetime-picker@5.0.0
  - @findable/icon@12.0.0
  - @findable/toggle@4.0.0
  - @findable/single-select@5.0.0
  - @findable/multi-select@10.0.0
  - @findable/inline-edit@6.0.0
  - @findable/field-radio-group@3.0.0
  - @findable/field-text-area@3.0.0
  - @findable/field-text@6.0.0
  - @findable/checkbox@3.0.0
  - @findable/calendar@6.0.0
  - @findable/button@8.0.0
  - @findable/theme@4.0.0
  - @findable/field-range@4.0.0
  - @findable/docs@4.0.0
  - @findable/droplist@6.0.0
  - @findable/dropdown-menu@5.0.0

## 1.0.4
- [patch] Updated dependencies [6859cf6](https://github.com/fnamazing/uiKit/commits/6859cf6)
  - @findable/field-text@5.1.0
  - @findable/field-text-area@2.1.0

## 1.0.3
- [patch] Fix pinned field-text dep [050ad7b](https://github.com/fnamazing/uiKit/commits/050ad7b)

## 1.0.2
- [patch] Updated dependencies [d05b9e5](https://github.com/fnamazing/uiKit/commits/d05b9e5)
  - @findable/select@3.0.0
  - @findable/datetime-picker@4.0.0

## 1.0.0
- [patch] Form developer preview [d8b2b03](https://github.com/fnamazing/uiKit/commits/d8b2b03)
- [major] Form package developer preview release [9b28847](https://github.com/fnamazing/uiKit/commits/9b28847)
