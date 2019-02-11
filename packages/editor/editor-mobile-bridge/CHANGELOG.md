# @atlaskit/editor-mobile-bridge

## 6.7.11
- [patch] [7ad6037cca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ad6037cca):

  - ED-6048: fixed bullet point not showing up until text inserted

## 6.7.10
- [patch] [557a2b5734](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/557a2b5734):

  - ED-5788: bump prosemirror-view and prosemirror-model

## 6.7.9
- [patch] [01935688f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/01935688f8):

  - FM-1494: turned off CSS properties overflow and overflow-scrolling

## 6.7.8
- Updated dependencies [69c8d0c19c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/69c8d0c19c):
  - @atlaskit/editor-common@31.0.0
  - @atlaskit/editor-core@98.0.0
  - @atlaskit/editor-test-helpers@6.3.17
  - @atlaskit/renderer@38.0.0
  - @atlaskit/emoji@54.0.0
  - @atlaskit/editor-json-transformer@4.1.8
  - @atlaskit/task-decision@11.1.8
  - @atlaskit/media-core@27.0.0

## 6.7.7
- [patch] [e2eca7e6d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e2eca7e6d5):

  - ED-6111: fixed renderer rendering unsupported content with some ADF

## 6.7.6
- [patch] [4a52fa0b89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a52fa0b89):

  - ED-6050: enabled layouts (mobile editor)

## 6.7.5
- [patch] [2db7577588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2db7577588):

  - ED-5924: Fixes handling of node deletion for composition events.

## 6.7.4
- Updated dependencies [85d5d168fd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/85d5d168fd):
  - @atlaskit/editor-common@30.0.0
  - @atlaskit/editor-core@97.0.0
  - @atlaskit/renderer@37.0.0
  - @atlaskit/emoji@53.0.0
  - @atlaskit/editor-json-transformer@4.1.7
  - @atlaskit/editor-test-helpers@6.3.12
  - @atlaskit/task-decision@11.1.6
  - @atlaskit/media-core@26.2.0

## 6.7.3
- [patch] [4e764a26d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e764a26d4):

  - ED-6070: Don't render proper mediaCard on mobile until we have a valid collection

## 6.7.2
- Updated dependencies [dadef80](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dadef80):
  - @atlaskit/editor-common@29.0.0
  - @atlaskit/editor-core@96.0.0
  - @atlaskit/renderer@36.0.0
  - @atlaskit/emoji@52.0.0
  - @atlaskit/editor-json-transformer@4.1.6
  - @atlaskit/editor-test-helpers@6.3.11
  - @atlaskit/task-decision@11.1.5
  - @atlaskit/media-core@26.1.0

## 6.7.1
- [patch] [060f2da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/060f2da):

  - ED-5991: bumped prosemirror-view to 1.6.8

## 6.7.0
- [minor] [df30c63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df30c63):

  - ED-5723: Enables typeahead support for mobile editor

  * Added a new bridge `typeAheadBridge`, which contains `typeAheadQuery()` and `dismissTypeAhead()`
    * `typeAheadQuery(query: string, trigger: string)` - This will notify integrators when a user is attempting to filter down a list.
    * `dismissTypeAhead` - Call this to dismiss any typeahead related content.
  * Added bridge function `insertTypeAheadItem()`, which currently only supports inserting mentions.
    * `insertTypeAheadItem(type: 'mention', payload: string)` - Payload is a stringified JSON blob containing the information to insert a mention in this scenario.
  * Added bridge function `setFocus()` to handle returning the focus to the editor after a native interaction.
  * Added new promise `getAccountId`, which is used to highlight the current user's mention.

## 6.6.1
- Updated dependencies [0c116d6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c116d6):
  - @atlaskit/editor-json-transformer@4.1.5
  - @atlaskit/editor-test-helpers@6.3.8
  - @atlaskit/editor-common@28.0.2
  - @atlaskit/renderer@35.0.1
  - @atlaskit/editor-core@95.0.0
  - @atlaskit/mention@16.0.0

## 6.6.0
- [minor] [c0dc7e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c0dc7e3):

  - FS-3360 - Support state analytics attribute with values new or existing. Implement for web, and mobile support via mobile-bridge.

## 6.5.6
- Updated dependencies [cbb8cb5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cbb8cb5):
  - @atlaskit/editor-common@28.0.0
  - @atlaskit/editor-core@94.0.0
  - @atlaskit/editor-test-helpers@6.3.7
  - @atlaskit/renderer@35.0.0
  - @atlaskit/emoji@51.0.0
  - @atlaskit/editor-json-transformer@4.1.4
  - @atlaskit/task-decision@11.1.4
  - @atlaskit/media-core@26.0.0

## 6.5.5
- Updated dependencies [72d37fb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/72d37fb):
  - @atlaskit/editor-common@27.0.0
  - @atlaskit/editor-core@93.0.0
  - @atlaskit/editor-test-helpers@6.3.6
  - @atlaskit/renderer@34.0.0
  - @atlaskit/emoji@50.0.0
  - @atlaskit/editor-json-transformer@4.1.3
  - @atlaskit/task-decision@11.1.3
  - @atlaskit/media-core@25.0.0

## 6.5.4
- Updated dependencies [e858305](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e858305):
  - @atlaskit/editor-json-transformer@4.1.2
  - @atlaskit/editor-test-helpers@6.3.5
  - @atlaskit/renderer@33.0.4
  - @atlaskit/task-decision@11.1.2
  - @atlaskit/editor-common@26.0.0
  - @atlaskit/editor-core@92.0.19

## 6.5.3
- Updated dependencies [00c648e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/00c648e):
- Updated dependencies [a17bb0e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a17bb0e):
- Updated dependencies [99f08a0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/99f08a0):
  - @atlaskit/editor-core@92.0.9
  - @atlaskit/renderer@33.0.3
  - @atlaskit/status@0.3.0

## 6.5.2
- Updated dependencies [b3738ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b3738ea):
  - @atlaskit/editor-common@25.0.0
  - @atlaskit/editor-core@92.0.0
  - @atlaskit/renderer@33.0.0
  - @atlaskit/emoji@49.0.0
  - @atlaskit/editor-json-transformer@4.1.1
  - @atlaskit/editor-test-helpers@6.3.4
  - @atlaskit/task-decision@11.1.1
  - @atlaskit/media-core@24.7.0

## 6.5.1
- Updated dependencies [647a46f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/647a46f):
  - @atlaskit/select@6.1.14
  - @atlaskit/textfield@0.1.5
  - @atlaskit/form@5.0.0

## 6.5.0
- [minor] [462b70f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/462b70f):

  - ED-5819: Enables support for text color on mobile

## 6.4.10
- Updated dependencies [1205725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1205725):
  - @atlaskit/task-decision@11.0.10
  - @atlaskit/editor-common@24.0.0
  - @atlaskit/editor-core@91.1.0
  - @atlaskit/editor-json-transformer@4.1.0
  - @atlaskit/editor-test-helpers@6.3.3
  - @atlaskit/renderer@32.1.0

## 6.4.9
- Updated dependencies [80f765b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/80f765b):
  - @atlaskit/editor-common@23.0.0
  - @atlaskit/editor-core@91.0.0
  - @atlaskit/renderer@32.0.0
  - @atlaskit/emoji@48.0.0
  - @atlaskit/editor-json-transformer@4.0.25
  - @atlaskit/editor-test-helpers@6.3.2
  - @atlaskit/task-decision@11.0.9
  - @atlaskit/media-core@24.6.0

## 6.4.8
- [patch] [f5d4e83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f5d4e83):

  - ED-5866: Fixes incorrect return from Mocked Emoji provider.

## 6.4.7
- [patch] [43501db](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/43501db):

  - ED-5812: Fixes some regressions in the mobile editor

  Including:
   * Disables mediaGoup lazy loading.
   * Fixes unsupported emoji content.
   * Fixes missed call to Android bridge for block state.

## 6.4.6
- [patch] [e01ea01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e01ea01):

  - Bump to match @atlaskit/docs dep

## 6.4.5
- [patch] [d3d0d67](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d3d0d67):

  - Mobile bridge can be public and updated the description

## 6.4.4
- [patch] [7190767](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7190767):

  - Fixes empty collection name and API naming mismatches

## 6.4.3
- [patch] [7515804](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7515804):

  - Fixes requesting media auth for empty string collections.

## 6.4.2
- [patch] [0a297ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a297ba):

  - Packages should not be shown in the navigation, search and overview

## 6.4.1
- [patch] [232238c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/232238c):

  - ED-5866: Turn off lazy loading for images on mobile.

## 6.4.0
- [minor] [008c694](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/008c694):

  - ED-5584: Capture emoji requests for native processing on iOS only.

## 6.3.4
- [patch] [94094fe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/94094fe):

  - Adds support for links around images

## 6.3.3
- [patch] [3a7224a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3a7224a):

  - ED-5677: enabled quickInsert and gapCursor by default (quickInsert: except for mobile appearance)

## 6.3.2
- [patch] [3061b52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3061b52):

  - AK-5723 - adjust files in package.json to ensure correct publishing of dist/package.json

## 6.3.1
- [patch] [345b45c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/345b45c):

  - Update @atlaskit/button inside @atlaskit/editor-mobile-bridge

## 6.3.0
- [minor] [086f816](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/086f816):

  - FS-3150 - Support status in the editor-mobile-bridge

## 6.2.1
- Updated dependencies [7e8b4b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7e8b4b9):
  - @atlaskit/editor-common@22.0.0
  - @atlaskit/editor-core@89.0.0
  - @atlaskit/renderer@31.0.0
  - @atlaskit/emoji@47.0.0
  - @atlaskit/editor-json-transformer@4.0.22
  - @atlaskit/editor-test-helpers@6.2.19
  - @atlaskit/task-decision@11.0.4
  - @atlaskit/media-core@24.5.0

## 6.2.0
- [minor] [dfcb816](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfcb816):

  - ED-5818: Add support for inserting block nodes

  Bridge API now supports inserting:
  * Tables
  * Panels
  * Codeblocks
  * Block Quotes
  * Actions
  * Decisions

## 6.1.0
- [minor] [ab6d96b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab6d96b):

  - ED-5710: Fixes calling media upfront.

  We now only call for the media auth, when rendering / loading a media item.

## 6.0.0
- [major] [6d6522b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d6522b):

  - Refactor mentions to use TypeAhead plugin

## 5.6.0
- [minor] [d901563](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d901563):

  - FM-1388: Add bridge API to both editor and renderer to set padding

## 5.5.0
- [minor] [586100b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/586100b):

  - ED-5584: Added Emoji support to the renderer.

## 5.4.1
- [patch] [05a4cf3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/05a4cf3):

  - FM-1358: Fixes scrolling lag when encountering a shadow

## 5.4.0
- [minor] [611d8a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/611d8a5):

  - ED-5707 Enable pinch to zoom in Renderer

## 5.3.0
- [minor] [13a108f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/13a108f):

  - Updated package bundle

## 5.2.4
- Updated dependencies [2c21466](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2c21466):
  - @atlaskit/editor-common@21.0.0
  - @atlaskit/editor-core@88.0.0
  - @atlaskit/renderer@30.0.0
  - @atlaskit/editor-json-transformer@4.0.21
  - @atlaskit/editor-test-helpers@6.2.16
  - @atlaskit/task-decision@11.0.2
  - @atlaskit/media-core@24.4.0

## 5.2.3
- [patch] [f6c3f01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f6c3f01):

  - ED-5586: Removes padding from editor and renderer for mobile.

## 5.2.2
- [patch] [3756327](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3756327):

  - ED-5588: Fixes font size changing when rotating viewport on iOS.

## 5.2.1
- [patch] [a9eb99f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a9eb99f):

  - ED-5510: fix deleting last character in a cell in Safari

## 5.2.0
- [minor] [f5696d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f5696d5):

  - ED-5606: Added support for sending task update events to native for handling

## 5.1.0
- [minor] [d793999](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d793999):

  - ED-5583: Pass all link events to native for handling

## 5.0.4
- [patch] [e5e040c"
d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e5e040c"
d):

  - Fixes passing null to renderer before we have content. ED-5587

## 5.0.3
- [patch] Fixed rendering media in the renderer. FM-1280 [00aaf8e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/00aaf8e)

## 5.0.2
- [patch] Fixes rendering elements on iOS before scrolling ends. FM-1277 [9d3029b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d3029b)

## 5.0.1
- [patch] ED-5513: render table that respects columns widths except on mobile [716bb9d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/716bb9d)

## 5.0.0
- [major] Media refactor and fileID upfront [052ce89](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/052ce89)

## 4.0.15
- [patch] Fixing the padding and the renderer bridge content [e550390](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e550390)

## 4.0.14
- [patch] Updated dependencies [b1ce691](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b1ce691)
  - @atlaskit/editor-common@20.0.0
  - @atlaskit/editor-core@86.0.0
  - @atlaskit/renderer@29.0.0
  - @atlaskit/editor-json-transformer@4.0.18
  - @atlaskit/editor-test-helpers@6.2.7
  - @atlaskit/task-decision@11.0.1
  - @atlaskit/media-core@24.3.0

## 4.0.13
- [patch] Updated dependencies [8a1ccf2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a1ccf2)
  - @atlaskit/renderer@28.0.1
  - @atlaskit/editor-core@85.6.0
  - @atlaskit/task-decision@11.0.0

## 4.0.12
- [patch] Updated dependencies [6e510d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e510d8)
  - @atlaskit/editor-core@85.5.1
  - @atlaskit/editor-common@19.3.2
  - @atlaskit/media-core@24.2.2
  - @atlaskit/renderer@28.0.0

## 4.0.11
- [patch] Updated dependencies [2afa60d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2afa60d)
  - @atlaskit/editor-common@19.0.0
  - @atlaskit/editor-core@85.0.0
  - @atlaskit/renderer@27.0.0
  - @atlaskit/editor-json-transformer@4.0.17
  - @atlaskit/editor-test-helpers@6.2.6
  - @atlaskit/media-core@24.2.0

## 4.0.10
- [patch] Updated dependencies [8b2c4d3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8b2c4d3)
- [patch] Updated dependencies [3302d51](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3302d51)
  - @atlaskit/editor-common@18.0.0
  - @atlaskit/editor-core@84.0.0
  - @atlaskit/renderer@26.0.0
  - @atlaskit/editor-json-transformer@4.0.16
  - @atlaskit/editor-test-helpers@6.2.5
  - @atlaskit/media-core@24.1.0

## 4.0.9
- [patch] Updated dependencies [23c7eca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/23c7eca)
  - @atlaskit/editor-json-transformer@4.0.15
  - @atlaskit/editor-test-helpers@6.2.4
  - @atlaskit/editor-core@83.0.0
  - @atlaskit/renderer@25.0.0

## 4.0.8
- [patch] change grey to gray to keep consistent across editor pkgs [1b2a0b3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b2a0b3)

## 4.0.7
- [patch] ED-5424: fix telepointers in collab editing [643a860](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/643a860)

## 4.0.6
- [patch] Updated dependencies [ef76f1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ef76f1f)
  - @atlaskit/editor-json-transformer@4.0.13
  - @atlaskit/editor-common@17.0.1
  - @atlaskit/editor-core@82.0.0
  - @atlaskit/editor-test-helpers@6.1.3

## 4.0.5
- [patch] Updated dependencies [927ae63](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/927ae63)
  - @atlaskit/editor-common@17.0.0
  - @atlaskit/editor-core@81.0.0
  - @atlaskit/editor-test-helpers@6.1.2
  - @atlaskit/renderer@24.0.0
  - @atlaskit/editor-json-transformer@4.0.12
  - @atlaskit/media-core@24.0.0

## 4.0.4
- [patch] Remove mention calls from the bridge [3b04be7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3b04be7)

## 4.0.3
- [patch] ED-5346: prosemirror upgrade [5bd4432](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bd4432)

## 4.0.2
- [patch] Updated dependencies [2a6410f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2a6410f)
  - @atlaskit/editor-common@16.2.0
  - @atlaskit/editor-core@80.5.0
  - @atlaskit/renderer@23.0.0

## 4.0.1
- [patch] Fix the flash bug on scroll in iOS webviews [6c047b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c047b4)

## 4.0.0
- [major] Adding renderer to the mobile bridge [3b4c276](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3b4c276)

## 3.0.11
- [patch] Fixing the android bridge change [6d5e0a9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d5e0a9)

## 3.0.10
- [patch] Fixing the scroll after setting content on Mobile [0a03e2d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0a03e2d)

## 3.0.9
- [patch] Fix the tap hightlight and padding [ffd3b8a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ffd3b8a)

## 3.0.8
- [patch] Updated dependencies [6e1d642](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6e1d642)
  - @atlaskit/editor-core@80.0.0
  - @atlaskit/editor-json-transformer@4.0.11
  - @atlaskit/editor-test-helpers@6.0.9
  - @atlaskit/media-core@23.2.0

## 3.0.7
- [patch] Sending block formatting changes separately [96c9414](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/96c9414)

## 3.0.6
- [patch] Making the media resolution aysnc [c6bacea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c6bacea)

## 3.0.5
- [patch] Updated dependencies [7545979](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7545979)
  - @atlaskit/editor-core@79.0.0
  - @atlaskit/editor-json-transformer@4.0.8
  - @atlaskit/media-core@23.1.0

## 3.0.4
- [patch] Updated dependencies [911a570](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/911a570)
  - @atlaskit/media-core@23.0.2
  - @atlaskit/editor-json-transformer@4.0.7
  - @atlaskit/editor-core@78.0.0

## 3.0.3
- [patch] Updated dependencies [b12f7e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b12f7e6)
  - @atlaskit/mention@15.0.6
  - @atlaskit/editor-json-transformer@4.0.6
  - @atlaskit/editor-core@77.1.4

## 3.0.2
- [patch] Allow all nodes and fix load time on Mobile [a9080a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a9080a7)

## 3.0.1
- [patch] update the dependency of react-dom to 16.4.2 due to vulnerability in previous versions read https://reactjs.org/blog/2018/08/01/react-v-16-4-2.html for details [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
- [none] Updated dependencies [a4bd557](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a4bd557)
  - @atlaskit/mention@15.0.5
  - @atlaskit/editor-core@77.0.2

## 3.0.0




- [patch] Synchronous property "serviceHost" as part of many Interfaces in media components (like MediaApiConfig) is removed and replaced with asynchronous "baseUrl" as part of Auth object. [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
- [none] Updated dependencies [597e0bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/597e0bd)
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-core@77.0.0
- [none] Updated dependencies [61df453](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/61df453)
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-core@77.0.0
- [none] Updated dependencies [812a39c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/812a39c)
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-core@77.0.0
- [none] Updated dependencies [c8eb097](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c8eb097)
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-core@77.0.0
- [major] Updated dependencies [d02746f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d02746f)
  - @atlaskit/media-core@23.0.0
  - @atlaskit/editor-json-transformer@4.0.4
  - @atlaskit/editor-core@77.0.0

## 2.0.7
- [patch] Upgrade to webpack 4 [ea8a4bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8a4bb)
- [none] Updated dependencies [ea8a4bb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea8a4bb)

## 2.0.6
- [patch] Updated dependencies [acd86a1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/acd86a1)
  - @atlaskit/mention@15.0.2
  - @atlaskit/editor-json-transformer@4.0.3
  - @atlaskit/editor-core@76.4.5
  - @atlaskit/media-core@22.2.1

## 2.0.5
- [patch] Updated dependencies [f6bf6c8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f6bf6c8)
  - @atlaskit/mention@15.0.0
  - @atlaskit/editor-core@76.1.0

## 2.0.4
- [patch] ED-4961 refactor block-type plugin [b88ca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b88ca64)
- [patch] Updated dependencies [b88ca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b88ca64)
  - @atlaskit/editor-core@76.0.23

## 2.0.3
- [patch]  ED-4960, refactoring text formatting plugin. [f4a0996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4a0996)
- [none] Updated dependencies [f4a0996](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4a0996)
  - @atlaskit/editor-core@76.0.16

## 2.0.2
- [patch] Fixing CSS issues [93d3ccf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/93d3ccf)

## 2.0.1


- [none] Updated dependencies [25353c3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/25353c3)
  - @atlaskit/editor-core@76.0.0
  - @atlaskit/editor-json-transformer@4.0.1
- [patch] Updated dependencies [38c0543](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38c0543)
  - @atlaskit/editor-core@76.0.0
  - @atlaskit/editor-json-transformer@4.0.1

## 2.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/editor-json-transformer@4.0.0
  - @atlaskit/mention@14.0.0
  - @atlaskit/editor-core@75.0.0
  - @atlaskit/media-core@22.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/mention@14.0.0
  - @atlaskit/editor-json-transformer@4.0.0
  - @atlaskit/editor-core@75.0.0
  - @atlaskit/media-core@22.0.0

## 1.0.8



- [patch] Updated dependencies [c98857e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c98857e)
  - @atlaskit/mention@13.1.10
  - @atlaskit/editor-core@74.0.16
- [patch] Updated dependencies [8a125a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a125a7)
  - @atlaskit/mention@13.1.10
  - @atlaskit/editor-core@74.0.16
- [patch] Updated dependencies [cacfb53](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cacfb53)
  - @atlaskit/mention@13.1.10
  - @atlaskit/editor-core@74.0.16

## 1.0.7
- [patch] ED-4964: refactor lists state [81f1a95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/81f1a95)
- [none] Updated dependencies [81f1a95](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/81f1a95)
  - @atlaskit/editor-core@74.0.1

## 1.0.6
- [patch] Updated dependencies [af0cde6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/af0cde6)
  - @atlaskit/editor-core@74.0.0
  - @atlaskit/editor-json-transformer@3.1.7

## 1.0.5


- [none] Updated dependencies [8c711bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c711bd)
  - @atlaskit/editor-core@73.9.26
- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-core@21.0.0
  - @atlaskit/editor-core@73.9.26

## 1.0.4
- [patch] Updated dependencies [d7dca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7dca64)
  - @atlaskit/mention@13.1.4
  - @atlaskit/editor-core@73.9.10

## 1.0.3
- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @atlaskit/mention@13.1.3
  - @atlaskit/editor-json-transformer@3.1.5
  - @atlaskit/editor-core@73.9.5

## 1.0.2
- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @atlaskit/mention@13.1.2
  - @atlaskit/editor-json-transformer@3.1.4
  - @atlaskit/editor-core@73.9.2

## 1.0.1
- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/editor-core@73.8.19
  - @atlaskit/media-core@20.0.0

## 1.0.0
- [major] Added support for blocks and lists [b5a920b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5a920b)
- [none] Updated dependencies [b5a920b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5a920b)
  - @atlaskit/editor-core@73.8.12

## 0.2.4
- [patch] Bump prosemirror-view to 1.3.3 to fix issue where newlines in code-blocks would vanish in IE11. (ED-4830) [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
- [none] Updated dependencies [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
  - @atlaskit/editor-core@73.8.3

## 0.2.3
- [patch] ED-4489 Fix can't submit with enter using Korean and Japanese IME [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
- [none] Updated dependencies [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
  - @atlaskit/editor-core@73.7.8

## 0.2.2
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/mention@13.1.1
  - @atlaskit/editor-json-transformer@3.1.2
  - @atlaskit/editor-core@73.7.5
  - @atlaskit/media-core@19.1.3

## 0.2.1
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/editor-json-transformer@3.1.1
  - @atlaskit/editor-core@73.7.1
  - @atlaskit/media-core@19.1.2

## 0.2.0
- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @atlaskit/editor-core@73.5.0
  - @atlaskit/mention@13.1.0
  - @atlaskit/editor-json-transformer@3.1.0

## 0.1.9
- [patch] Provided bridge implementation to support Media on iOS. [43875e6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/43875e6)

## 0.1.8
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/mention@13.0.0
  - @atlaskit/editor-json-transformer@3.0.9
  - @atlaskit/editor-core@73.0.0
  - @atlaskit/media-core@19.0.0

## 0.1.7
- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/mention@12.0.3
  - @atlaskit/editor-json-transformer@3.0.8
  - @atlaskit/editor-core@72.2.2

## 0.1.6
- [patch] Updated dependencies [639ae5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/639ae5e)
  - @atlaskit/mention@12.0.2
  - @atlaskit/editor-core@72.1.8

## 0.1.5
- [none] Updated dependencies [ba702bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ba702bc)
  - @atlaskit/mention@12.0.0
  - @atlaskit/editor-core@72.0.6

## 0.1.4
- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @atlaskit/editor-core@72.0.0
  - @atlaskit/editor-json-transformer@3.0.7

## 0.1.3
- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @atlaskit/mention@11.1.4
  - @atlaskit/editor-json-transformer@3.0.6
  - @atlaskit/editor-core@71.4.0

## 0.1.2
- [patch] Bump to prosemirror-view@1.3.0 [faea319](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/faea319)

## 0.1.0
- [minor] Media APIs exposed to mobile clients and can be used by native media components [31c66f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/31c66f4)

## 0.0.17
- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 0.0.14
- [patch] enabled minimization @ mobile bridge [95703e3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/95703e3)

## 0.0.13
- [patch] Implemented setContent for editor mobile native-to-web bridge [b5c150b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b5c150b)

## 0.0.11
- [patch] Fix running 'run.if.package.changed' script in cases like master branch or package being dependent only [d90ab10](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d90ab10)

## 0.0.9
- [patch] Small changes in build process for editor-mobile-bridge [78d543a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/78d543a)

## 0.0.8
- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 0.0.3
- [patch] Fix dependency [d4bcbf4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d4bcbf4)

## 0.0.2
- [patch] editor-mobile-bridge module introduced [4a338f6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4a338f6)
