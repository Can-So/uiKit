# @findable/icon-file-type

## 3.0.5
- Updated dependencies [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):
  - @findable/docs@7.0.1
  - @findable/field-text@8.0.1
  - @findable/modal-dialog@8.0.2
  - @findable/theme@8.0.1
  - @findable/tooltip@13.0.1
  - @findable/button@11.0.0

## 3.0.4
- Updated dependencies [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):
  - @findable/button@10.1.3
  - @findable/docs@7.0.0
  - @findable/field-text@8.0.0
  - @findable/modal-dialog@8.0.0
  - @findable/theme@8.0.0
  - @findable/tooltip@13.0.0

## 3.0.3
- [patch] [1d1f6d1](https://github.com/fnamazing/uiKit/commits/1d1f6d1):

  - Make icon glyphs not import metadata

## 3.0.2
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/button@10.1.1
  - @findable/field-text@7.0.18
  - @findable/modal-dialog@7.1.1
  - @findable/theme@7.0.1
  - @findable/tooltip@12.1.13
  - @findable/docs@6.0.0

## 3.0.1
- Updated dependencies [d13242d](https://github.com/fnamazing/uiKit/commits/d13242d):
  - @findable/docs@5.2.3
  - @findable/button@10.0.4
  - @findable/field-text@7.0.16
  - @findable/modal-dialog@7.0.14
  - @findable/tooltip@12.1.12
  - @findable/theme@7.0.0

## 3.0.0
- [major] [ab9b69c](https://github.com/fnamazing/uiKit/commits/ab9b69c):

  - Remove onClick props as icon is only a presentational placeholder. Please wrap icon into a Button or a Link component.

## 2.0.1
- Updated dependencies [6998f11](https://github.com/fnamazing/uiKit/commits/6998f11):
  - @findable/docs@5.2.1
  - @findable/field-text@7.0.15
  - @findable/modal-dialog@7.0.12
  - @findable/theme@6.2.1
  - @findable/tooltip@12.1.10
  - @findable/button@10.0.0

## 2.0.0
- [patch] [29b160f](https://github.com/fnamazing/uiKit/commits/29b160f):

  - Simplify the icons build process

  Icons no longer need a custom `build` step to be accurate on npm. This
  has come about by renaming the `es5` folder to `cjs`. If you weren't reaching
  into our package's internals, you shouldn't notice.

- [major] [80304f0](https://github.com/fnamazing/uiKit/commits/80304f0):

  **NOTE** Unless you are using the `iconsInfo` export, this change is not breaking.

  - Rename `iconsInfo` to `metadata` to more accurately reflect its role

  This change comes with rethinking what is exported from this object,
  which no longer includes copies of the icons. If you need to rely on the
  metadata to get the packages, each should be required by your own code.

  The `icon-explorer` has an example of how to do this.
- Updated dependencies [b29bec1](https://github.com/fnamazing/uiKit/commits/b29bec1):
  - @findable/icon-build-process@0.1.0

## 1.0.4
- [patch] Update to use babel-7 for build processes [e7bb74d](https://github.com/fnamazing/uiKit/commits/e7bb74d)

## 1.0.3
- [patch] Adds missing implicit @babel/runtime dependency [b71751b](https://github.com/fnamazing/uiKit/commits/b71751b)

## 1.0.2
- [patch] Publish utils folder [272208b](https://github.com/fnamazing/uiKit/commits/272208b)

## 1.0.1
- [patch] icon-file-type and icon-object publish glyphs, svgs, and es5 instead of just dist [0823d35](https://github.com/fnamazing/uiKit/commits/0823d35)

## 1.0.0
- [major] Release icon-object and icon-file-type [709b239](https://github.com/fnamazing/uiKit/commits/709b239)
