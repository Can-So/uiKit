- ED-3890 Adds Indentation support on paragraphs and headings

**New Feature: Indentation**

Use the new `allowIndentation` prop to enable this feature.

```
// Enable indentation support for `heading` and `paragraph`
allowIndentation?: boolean;
```

**Minor bug fixes**

- ED-5841 Alignment is getting removed inside Table on load
- ED-5842 Alignment mark aligns empty placeholder
- ED-5843 Remove block marks on backspace when document is empty
- ED-5846 Fix React warning in renderer
- ED-5863 Fix alignment copy-paste
- ED-5865 Alignment shouldn't be disabled when Cmd + A
