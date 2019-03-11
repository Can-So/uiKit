# @atlaskit/adf-utils

## 5.7.2
- Updated dependencies [76299208e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76299208e6):
  - @atlaskit/docs@7.0.0

## 5.7.1
- [patch] [60ea09b0cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/60ea09b0cc):

  - ED-6246 Improves types and adds more metadata to errors

## 5.7.0
- [minor] [4d8d759bf9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4d8d759bf9):

  -  [ED-6255] Migrate ADFNode type to ADFEntity

## 5.6.3
- [patch] [e83a441140](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e83a441140):

  - Revert type change to width/height attributes for media node

## 5.6.2
- [patch] [09696170ec](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/09696170ec):

  - Bumps prosemirror-utils to 0.7.6

## 5.6.1
- [patch] [14fe1381ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/14fe1381ba):

  - ED-6118: ensure media dimensions are always integers, preventing invalid ADF

## 5.6.0
- [minor] [be706e55f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/be706e55f6):

  - ED-6154 Adds `array` validation support

## 5.5.0
- [minor] [a5b5a5098e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a5b5a5098e):

  - Adds index to visitor

## 5.4.2
- [patch] [76ed7f0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/76ed7f0):

  - Update Specs

## 5.4.1
- [patch] [57cffcb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/57cffcb):

  - Need tslib

## 5.4.0
- [minor] [1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):

  - Move schema to its own package

## 5.3.4
- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @atlaskit/editor-common@23.0.0

## 5.3.3
- [patch] [34df084](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/34df084):

  - Fix layout schema and enable breakout layouts in renderer

## 5.3.2
- Updated dependencies [58b84fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/58b84fa):
  - @atlaskit/docs@6.0.0

## 5.3.1
- [patch] [0a297ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a297ba):

  - Packages should not be shown in the navigation, search and overview

## 5.3.0
- [minor] [a1b03d0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1b03d0):

  - ED-3890 Adds Indentation support on paragraphs and headings

## 5.2.0
- [minor] [94094fe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/94094fe):

  - Adds support for links around images

## 5.1.9
- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @atlaskit/editor-common@22.0.0

## 5.1.8
- [patch] [416fbb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/416fbb3):

  - ED-3298: codeBlocks inside lists

## 5.1.7
- [patch] [409e610](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/409e610):

  - Fix schema block marks name inconsistency

## 5.1.6
- [patch] [df33a8b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df33a8b):

  - Fix block marks validation

## 5.1.5
- [patch] [d3bb11f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3bb11f):

  - Fixing validator for alignment marks

## 5.1.4
- [patch] [4e2a3b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e2a3b1):

  - Fixes validating marks with multiple possible branch

## 5.1.3
- [patch] [a1fb551](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1fb551):

  - Fixed style attribute ADF error for Fabric Status

## 5.1.2
- [patch] [11d4b85](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/11d4b85):

  - ED-5606 Adds union attrs support to validator

## 5.1.1
- [patch] [b19b7bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b19b7bb):

  - ED-5721 Validator now supports optional content

## 5.1.0
- [minor] [b440439](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b440439):

  - Add breakout mark to editor, renderer and adf-utils

## 5.0.1
- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @atlaskit/editor-common@21.0.0

## 5.0.0
- [major] [e1db106](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1db106):

  * New validator API

  ### Breaking Change

  **Old API**

  ```
  export type ValidationMode = 'strict' | 'loose';

  validator(
    nodes?: Array<string>,
    marks?: Array<string>,
    validationMode?: ValidationMode,
  )
  ```

  **New API**

  We introduced a new `allowPrivateAttributes` option. It allows attributes starting with `__` without validation.

  ```
  export type ValidationMode = 'strict' | 'loose';

  export interface ValidationOptions {
    mode?: ValidationMode;
    allowPrivateAttributes?: boolean;
  }

  validator(
    nodes?: Array<string>,
    marks?: Array<string>,
    options?: ValidationOptions,
  )
  ```

## 4.1.0
- [minor] [4f5830f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4f5830f):

  - ED-4200: add page layout support to generator and ADF schema

## 4.0.4
- [patch] [e8052e1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e8052e1):

  - Add main field to adf-utils package.json

## 4.0.3
- [patch] [653b6a9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/653b6a9):

  - removed optional attributes from adf-builder module for status node
- [patch] [cd5471b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cd5471b):

  - added style attribute for Status node in ADF schema

## 4.0.2
- [patch] [6201223"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6201223"
d):

  - Add examples.

## 4.0.1
- [patch] Fix floating number validation [ea027b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea027b8)

## 4.0.0
- [major] Wrap invalid node with unsupported node [fb60e39](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb60e39)

## 3.0.1
- [patch] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @atlaskit/editor-common@20.0.0

## 3.0.0
- [major] New validator API [db2d466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/db2d466)

## 2.2.6
- [patch] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @atlaskit/editor-common@19.0.0

## 2.2.5
- [patch] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @atlaskit/editor-common@18.0.0

## 2.2.4
- [patch] make attris in ADFNode optioanla as not every node have this value [df13878](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df13878)

## 2.2.3
- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/editor-common@17.0.0

## 2.2.2
- [patch] Fix .d.ts file names [3d6c0fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d6c0fd)

## 2.2.1
- [patch] .es.js files now reference es2015 builds instead of es5 [98034c7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/98034c7)

## 2.2.0
- [minor] FS-2961 Introduce status component and status node in editor [7fe2b0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7fe2b0a)

## 2.1.5
- [patch] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @atlaskit/editor-common@16.0.0

## 2.1.4
- [patch] Update TS to 3.0 [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
- [none] Updated dependencies [f68d367](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f68d367)
  - @atlaskit/editor-common@15.0.7

## 2.1.3
- [patch] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @atlaskit/editor-common@15.0.0

## 2.1.2
- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/editor-common@14.0.11

## 2.1.1
- [patch] ED-5178: added card node to default schema [51e7446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51e7446)
- [none] Updated dependencies [51e7446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/51e7446)
  - @atlaskit/editor-common@14.0.8

## 2.1.0
- [minor] ED-4421 ADF Validator [fd7e953](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fd7e953)
- [none] Updated dependencies [fd7e953](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fd7e953)
  - @atlaskit/json-schema-generator@1.1.0
  - @atlaskit/editor-common@14.0.4

## 2.0.5
- [patch] Fix es5 exports of some of the newer modules [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)
- [none] Updated dependencies [3f0cd7d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3f0cd7d)

## 2.0.4





- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @atlaskit/editor-common@14.0.0
- [none] Updated dependencies [61df453](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61df453)
  - @atlaskit/editor-common@14.0.0
- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @atlaskit/editor-common@14.0.0
- [none] Updated dependencies [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)
  - @atlaskit/editor-common@14.0.0
- [patch] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/editor-common@14.0.0

## 2.0.3
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/editor-common@13.2.7
  - @atlaskit/docs@5.0.2

## 2.0.2
- [patch] Include type files to release [02cae82](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/02cae82)

## 2.0.1
- [patch] Fix types for top level imports [61cd06b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61cd06b)

## 2.0.0


- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/editor-common@13.0.0
  - @atlaskit/docs@5.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/editor-common@13.0.0
  - @atlaskit/docs@5.0.0

## 1.0.1
- [patch] Fix failing master build [1e2faf4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e2faf4)

- [none] Updated dependencies [5f6ec84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f6ec84)
  - @atlaskit/editor-common@12.0.0

## 1.0.0
- [major] Add @atlaskit/adf-utils package [dd2efd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd2efd5)
- [none] Updated dependencies [dd2efd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd2efd5)
  - @atlaskit/editor-common@11.4.0
