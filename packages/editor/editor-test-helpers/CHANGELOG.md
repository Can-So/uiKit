# @atlaskit/editor-test-helpers

## 3.1.7
- [patch] Extensions should have text [64e32a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/64e32a2)

## 3.1.6
- [patch] Adding support for external images [9935105](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9935105)

## 3.1.5
- [patch] ED-4431, selecting block extension creates a wrng selection. [c078cf2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c078cf2)

## 3.1.4


- [patch] Bump to prosemirror-view@1.3.0 [faea319](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/faea319)

## 3.1.3

## 3.1.2
- [patch] Handle pasting of page-layouts to prevent unpredictable node-splitting behaviour. Will now 'unwrap' the contents of a layout if the slice is a partial range across page layouts, or if we are attempting to paste a layout inside a layout. We now always handle dispatching the transaction to handle paste ourselves (instead of falling back to PM). [f4ca7ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f4ca7ac)

## 3.1.1

## 3.1.0
- [minor] Add a generic type ahead plugin [445c66b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/445c66b)

## 3.0.8
- [patch] ED-4294: fix editing bodiedExtension nodes [35d2648](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d2648)

## 3.0.7
- [patch] fix deletion of lists and other elements placed after tables; bump prosemirror-commands to 1.0.7 [162960f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/162960f)

## 3.0.6

## 3.0.5

## 3.0.4
- [patch] Remove old chai reference which does not allow using editor-test-helpers in non-atlaskit TS packages [ea627e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ea627e4)

## 3.0.3
- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 3.0.2

## 3.0.1
- [patch] change table node builder constructor for tests, remove tableWithAttrs [cf43535](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf43535)

## 3.0.0
- [major] CFE-1004: Rename anything "macro" to "extension" (i.e: MacroProvider to ExtensionProvider) [453aa52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/453aa52)

## 2.1.1
- [patch] ED-3476 add table breakout mode [7cd4dfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cd4dfa)

## 2.1.0

## 2.0.14
- [patch] Show upload button during recents load in media picker. + Inprove caching for auth provider used in examples [929731a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/929731a)

## 2.0.13
- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 2.0.12
- [patch] Remove JSDOM warning in CI [309af83](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/309af83)

## 2.0.11

## 2.0.10

## 2.0.9
- [patch] CFE-846: Add support to extension handlers (lite version) [4ea9ffe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4ea9ffe)

## 2.0.8
- [patch] restrict nested bodiedExtensions [2583534](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2583534)

## 2.0.7

## 2.0.6

## 2.0.5
- [patch] support __confluenceMetadata property on link mark [b17f847](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b17f847)

## 2.0.4

## 2.0.3

## 2.0.2
- [patch] make colwidth an array of numbers in schema [369b522](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/369b522)

## 2.0.1

## 2.0.0
- [major] Remove linkCreateContext from default options and add userAuthProvider [fc2ca7a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc2ca7a)

## 1.9.2

## 1.9.1
- [patch] Enforce minimum version of w3c-keyname to be >= 1.1.8 [dc120b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc120b9)

## 1.9.0
- [minor] add support for <fab:adf> and confluence decision list transforms [e08eccc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e08eccc)
- [minor] add support for <fab:adf> and confluence decision list transforms [f43f928](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f43f928)
- [minor] advanced features for tables [e0bac20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0bac20)

## 1.8.11
- [patch] Encode and decode for Extension schemaVersion [0335988](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0335988)

## 1.8.10
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 1.8.9
- [patch] Fix issue with having multiple Dropzone elements listening at the same time with Editor and MediaPicker [d37de20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d37de20)

## 1.8.8
- [patch] Move media provider and state manager to editor-core [0601da7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0601da7)

## 1.8.7
- [patch] bump editor-common to 6.1.2 [bb7802e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bb7802e)

## 1.8.6
- [patch] Allow macro provider to handle auto conversion during paste [b2c83f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b2c83f8)

## 1.8.5
- [patch] cket-transformer/__tests__/_schema-builder.ts [a6e77ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6e77ff)

## 1.8.4

## 1.8.3
- [patch] fix extension replacement with empty content [e151446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e151446)

## 1.8.2

## 1.8.1
- [patch] Remove placeholderBaseUrl config option from the Confluence Macro Provider [1583960](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1583960)

## 1.8.0
- [minor] added date plugin [f7b8a33](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f7b8a33)

## 1.7.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 1.6.1
- [patch] Use media-test-helpers instead of hardcoded values [f2b92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f2b92f8)

## 1.6.0

## 1.5.0

## 1.4.5
- [patch] Add support for single image wrap left/right layout [59d9a74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59d9a74)

## 1.4.4

## 1.4.3

## 1.4.2

## 1.4.1

## 1.4.0
- [minor] Add Serializer for Single image [03405bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03405bf)
- [minor] Add Serializer for Single image [03405bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03405bf)

## 1.3.0

- [minor] FS-1461 added ContextIdentifierProvider interface to editor [0aeea41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0aeea41)
- [minor] FS-1461 added ContextIdentifierProvider interface to editor [0aeea41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0aeea41)

## 1.2.9

## 1.2.8

## 1.2.7

## 1.2.6



- [patch] Rename singleImage to mediaSingle. Replaced alignment and display attributes with layout. [0b97f0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b97f0a)
- [patch] Rename singleImage to mediaSingle. Replaced alignment and display attributes with layout. [0b97f0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b97f0a)

## 1.2.5

## 1.2.4

## 1.2.3

## 1.2.2
- [patch] split extension node [4303d49](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4303d49)
- [patch] split extension node [4303d49](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4303d49)

## 1.2.1

## 1.2.0

## 1.1.3

## 1.1.2
- [patch] added extension node [ec73cb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec73cb8)
- [patch] added extension node [ec73cb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec73cb8)

## 1.1.1

## 1.1.0
- [patch] Fix dependencies [9f9de42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f9de42)
- [patch] Fix dependencies [9f9de42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f9de42)

## 0.8.15

## 0.8.14

## 0.8.13

## 0.8.12

## 0.8.11

## 0.8.10

## 0.8.9

## 0.8.8

## 0.8.7

## 0.8.6

## 0.8.5

## 0.8.4

## 0.8.2

## 0.8.1
- [patch] Restore accessLevel attribute for mention node [a83619f](a83619f)
- [patch] Restore accessLevel attribute for mention node [a83619f](a83619f)

## 0.8.0

## 0.7.3

## 0.7.2

## 0.7.1

## 0.7.0
