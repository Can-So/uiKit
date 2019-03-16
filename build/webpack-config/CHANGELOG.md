# @findable/webpack-config

## 2.0.9
- [patch] [3b48f804d7](https://github.com/fnamazing/uiKit/commits/3b48f804d7):

  - Prefer atlaskit:src over module when building

## 2.0.8
- [patch] [0744bd168d](https://github.com/fnamazing/uiKit/commits/0744bd168d):

  - Prefer atlaskit:src over module when building

## 2.0.7
- [patch] [1b9e213](https://github.com/fnamazing/uiKit/commits/1b9e213):

  - Make local builds 20s faster

## 2.0.6
- [patch] [eb19d6a](https://github.com/fnamazing/uiKit/commits/eb19d6a):

  - Disable some stats to make webpack faster

## 2.0.5
- [patch] [92d8324](https://github.com/fnamazing/uiKit/commits/92d8324):

  - Fix build not exiting with non-zero exit code on failure

## 2.0.4
- [patch] suppress "export not found" warnings for ts transpiling in webpack [9baa015](https://github.com/fnamazing/uiKit/commits/9baa015)

## 2.0.3
- [patch] Upgrade to webpack 4 [ea8a4bb](https://github.com/fnamazing/uiKit/commits/ea8a4bb)
- [patch] Updated dependencies [ea8a4bb](https://github.com/fnamazing/uiKit/commits/ea8a4bb)
  - bolt-fs-loader@0.0.1

## 2.0.2
- [patch] Migrate Profilecard to AKM2 DIR-553 [9bac948](https://github.com/fnamazing/uiKit/commits/9bac948)

## 2.0.1
- [patch] adds environment variable for whether the atlaskit website is running locally, in staging or in production [a04c1c5](https://github.com/fnamazing/uiKit/commits/a04c1c5)

## 2.0.0
- [major] Updated website to use iframe to load examples. Example loader now in a separate react app. Webpack config refactored to compile separate example loader, chunking refactored to be more performant with the new website changes. Updated modal-dialog to use new component structure to optionally specify a Body wrapping component. [e1fdfd8](https://github.com/fnamazing/uiKit/commits/e1fdfd8)
