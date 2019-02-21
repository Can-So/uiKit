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
