# @atlaskit/editor-common

## 13.0.2
- [patch] ED-4676, text in table header should be bold y default. [1bf849c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bf849c)
- [patch] Updated dependencies [1bf849c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bf849c)

## 13.0.1
- [patch] ED-5063 always render tables to full width of container [4342d93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4342d93)
- [none] Updated dependencies [4342d93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4342d93)

## 13.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/563a7eb)
  - @atlaskit/media-card@30.0.0
  - @atlaskit/profilecard@4.0.0
  - @atlaskit/editor-json-transformer@4.0.0
  - @atlaskit/editor-test-helpers@5.0.0
  - @atlaskit/mention@14.0.0
  - @atlaskit/emoji@38.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/icon@13.0.0
- [major] Updated dependencies [7edb866](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7edb866)
  - @atlaskit/media-card@30.0.0
  - @atlaskit/profilecard@4.0.0
  - @atlaskit/mention@14.0.0
  - @atlaskit/emoji@38.0.0
  - @atlaskit/editor-json-transformer@4.0.0
  - @atlaskit/editor-test-helpers@5.0.0
  - @atlaskit/media-core@22.0.0
  - @atlaskit/icon@13.0.0

## 12.0.0

- [major] Refactor existing 'paste' slice handling code, to use common utilities. Remove unused linkifySlice export from editor-common. [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
- [none] Updated dependencies [5f6ec84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5f6ec84)
  - @atlaskit/editor-test-helpers@4.2.4
  - @atlaskit/editor-json-transformer@3.1.8
- [none] Updated dependencies [5958588](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5958588)
  - @atlaskit/editor-test-helpers@4.2.4
  - @atlaskit/editor-json-transformer@3.1.8

## 11.4.6



- [patch] Updated dependencies [c98857e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c98857e)
  - @atlaskit/mention@13.1.10
  - @atlaskit/editor-test-helpers@4.2.3
- [patch] Updated dependencies [8a125a7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a125a7)
  - @atlaskit/mention@13.1.10
  - @atlaskit/editor-test-helpers@4.2.3
- [patch] Updated dependencies [cacfb53](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cacfb53)
  - @atlaskit/mention@13.1.10
  - @atlaskit/editor-test-helpers@4.2.3

## 11.4.5
- [patch] Updated dependencies [6f51fdb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6f51fdb)

## 11.4.4


- [patch] Updated dependencies [f897c79](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f897c79)
  - @atlaskit/emoji@37.0.0
- [none] Updated dependencies [cacf096](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cacf096)
  - @atlaskit/emoji@37.0.0

## 11.4.3
- [patch] ED-5034 unify full-width sizes of media, tables and extensions [dac304d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dac304d)
- [none] Updated dependencies [dac304d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dac304d)

## 11.4.2
- [patch] Updated dependencies [9a1b6a2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a1b6a2)
  - @atlaskit/media-card@29.1.9

## 11.4.1
- [patch] FS-1704 - Bug fix - copy and pasting of rendered actions/decisions into the editor [9d47846](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d47846)
- [none] Updated dependencies [9d47846](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d47846)

## 11.4.0
- [minor] Add @atlaskit/adf-utils package [dd2efd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd2efd5)
- [none] Updated dependencies [dd2efd5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd2efd5)

## 11.3.14
- [patch] Replace Portal component with ReactDOM.createPortal [17b638b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/17b638b)
- [none] Updated dependencies [17b638b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/17b638b)

## 11.3.13
- [patch] ED-4420: added unsupported nodes [f33ac3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f33ac3c)
- [none] Updated dependencies [f33ac3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f33ac3c)

## 11.3.12


- [none] Updated dependencies [8c711bd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c711bd)
  - @atlaskit/editor-test-helpers@4.2.1
  - @atlaskit/emoji@36.0.2
- [patch] Updated dependencies [42ee1ea](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/42ee1ea)
  - @atlaskit/media-core@21.0.0
  - @atlaskit/emoji@36.0.2
  - @atlaskit/media-card@29.1.8
  - @atlaskit/editor-test-helpers@4.2.1

## 11.3.11
- [patch] Move removing nulls to the transformer instead of only in the tests. ED-4496 [617d8c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/617d8c1)
- [none] Updated dependencies [617d8c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/617d8c1)
  - @atlaskit/editor-json-transformer@3.1.6

## 11.3.10
- [patch] Updated dependencies [d7dca64](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d7dca64)
  - @atlaskit/mention@13.1.4

## 11.3.9


- [patch] [refactor] Use ParseRule->context to prevent pasting layoutColumn/layoutSections inside each other. [541341e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/541341e)
- [patch] [refactor] Use ParseRule->context to prevent nesting bodiedExtensions on paste. [fe383b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe383b4)
- [none] Updated dependencies [2625ade](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2625ade)
  - @atlaskit/editor-test-helpers@4.2.0
- [none] Updated dependencies [e3c6479](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e3c6479)
  - @atlaskit/editor-test-helpers@4.2.0
- [none] Updated dependencies [541341e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/541341e)
  - @atlaskit/editor-test-helpers@4.2.0
- [none] Updated dependencies [fe383b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fe383b4)
  - @atlaskit/editor-test-helpers@4.2.0

## 11.3.8
- [patch] Updated dependencies [8d5053e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d5053e)
  - @atlaskit/emoji@36.0.1
  - @atlaskit/mention@13.1.3
  - @atlaskit/editor-json-transformer@3.1.5
  - @atlaskit/editor-test-helpers@4.1.9

## 11.3.7
- [patch] Updated dependencies [0cf2f52](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0cf2f52)
  - @atlaskit/emoji@36.0.0
  - @atlaskit/mention@13.1.2
  - @atlaskit/editor-json-transformer@3.1.4
  - @atlaskit/editor-test-helpers@4.1.8

## 11.3.6
- [patch] Bitbucket images were displaying at 100% of the container, and not respect max-width of the image. ED-4946 [370c812](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/370c812)
- [none] Updated dependencies [370c812](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/370c812)
  - @atlaskit/media-card@29.1.6

## 11.3.5
- [patch] Updated dependencies [c57e9c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c57e9c1)
  - @atlaskit/media-card@29.1.5
  - @atlaskit/emoji@35.1.4
  - @atlaskit/editor-test-helpers@4.1.7
  - @atlaskit/media-core@20.0.0

## 11.3.4
- [patch] ED-4934: fix table styles by avoiding circular imports [d1375ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d1375ee)
- [none] Updated dependencies [d1375ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d1375ee)

## 11.3.3
- [patch] Fixing the cursor navigation between inline nodes [b9e3213](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9e3213)
- [none] Updated dependencies [b9e3213](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b9e3213)

## 11.3.2
- [patch] ED-4520, date renderer should render UTC value of date. [28e3c31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/28e3c31)
- [none] Updated dependencies [28e3c31](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/28e3c31)

## 11.3.1
- [patch] ED-4924: fix table control styles [377ebeb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/377ebeb)
- [none] Updated dependencies [377ebeb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/377ebeb)

## 11.3.0
- [minor] Remove pinned prosemirror-model@1.4.0 and move back to caret ranges for prosemirror-model@^1.5.0 [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
- [none] Updated dependencies [4faccc0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4faccc0)
  - @atlaskit/editor-test-helpers@4.1.5
  - @atlaskit/editor-json-transformer@3.1.3

## 11.2.11
- [patch] Removing unnecessary throw of error [bfa8b69](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfa8b69)
- [none] Updated dependencies [bfa8b69](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bfa8b69)

## 11.2.10
- [patch] Bump prosemirror-view to 1.3.3 to fix issue where newlines in code-blocks would vanish in IE11. (ED-4830) [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
- [none] Updated dependencies [fc5a082](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fc5a082)
  - @atlaskit/editor-test-helpers@4.1.4

## 11.2.9
- [patch] ED-4741, adding support for date node in renderer. [2460f47](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2460f47)
- [none] Updated dependencies [2460f47](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2460f47)

## 11.2.8



- [patch] Updated dependencies [74a0d46](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/74a0d46)
  - @atlaskit/media-card@29.1.3
- [patch] Updated dependencies [6c6f078](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6c6f078)
  - @atlaskit/media-card@29.1.3
- [patch] Updated dependencies [5bb26b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5bb26b4)
  - @atlaskit/media-card@29.1.3

## 11.2.7
- [patch] ED-4848: make wide table mode responsive [862ea96](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/862ea96)
- [none] Updated dependencies [862ea96](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/862ea96)

## 11.2.6
- [patch] Design updates for /QuickInsert™️ menu [4e4825e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e4825e)
- [none] Updated dependencies [4e4825e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4e4825e)

## 11.2.5
- [patch] Add Table breakout mode in renderer [0d3b375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d3b375)
- [none] Updated dependencies [0d3b375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0d3b375)

## 11.2.4
- [patch] ED-4713 Add stage 0 support in json-schema-generator [cce275f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cce275f)
- [none] Updated dependencies [cce275f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cce275f)
  - @atlaskit/json-schema-generator@1.0.1

## 11.2.3
- [patch] ED-4489 Fix can't submit with enter using Korean and Japanese IME [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
- [none] Updated dependencies [0274524](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0274524)
  - @atlaskit/editor-test-helpers@4.1.3

## 11.2.2
- [patch] Fixing extension select and refactor [eca44eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eca44eb)
- [none] Updated dependencies [eca44eb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eca44eb)

## 11.2.1
- [patch] Clean Changelogs - remove duplicates and empty entries [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
- [none] Updated dependencies [e7756cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e7756cd)
  - @atlaskit/media-card@29.1.2
  - @atlaskit/emoji@35.1.1
  - @atlaskit/mention@13.1.1
  - @atlaskit/editor-json-transformer@3.1.2
  - @atlaskit/editor-test-helpers@4.1.2
  - @atlaskit/media-core@19.1.3
  - @atlaskit/icon@12.1.2

## 11.2.0
- [minor] ED-4654 add minimum 128px column width to tables [6ee43d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ee43d8)
- [none] Updated dependencies [6ee43d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ee43d8)

## 11.1.2
- [patch] Update changelogs to remove duplicate [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cc58e17)
  - @atlaskit/media-card@29.1.1
  - @atlaskit/editor-json-transformer@3.1.1
  - @atlaskit/editor-test-helpers@4.1.1
  - @atlaskit/media-core@19.1.2
  - @atlaskit/icon@12.1.1

## 11.1.1
- [patch] ED-3474 add redesigned table numbering column, fix table styling regressions [1bef41a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bef41a)
- [none] Updated dependencies [1bef41a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bef41a)

## 11.1.0
- [none] Updated dependencies [7217164](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7217164)
  - @atlaskit/editor-test-helpers@4.1.0
  - @atlaskit/mention@13.1.0
  - @atlaskit/emoji@35.1.0
  - @atlaskit/editor-json-transformer@3.1.0

## 11.0.7
- [patch] Updated dependencies [2de7ce7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2de7ce7)
  - @atlaskit/media-card@29.0.3

## 11.0.6
- [patch] Update and lock prosemirror-model version to 1.4.0 [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
- [none] Updated dependencies [febf753](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febf753)
  - @atlaskit/editor-test-helpers@4.0.7
  - @atlaskit/editor-json-transformer@3.0.11

## 11.0.5
- [patch] Adding breakout to extensions [3d1b0ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d1b0ab)
- [none] Updated dependencies [3d1b0ab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d1b0ab)
  - @atlaskit/editor-test-helpers@4.0.6

## 11.0.4
- [patch] ED-4818: add inlineCard to schema [a303cbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a303cbd)
- [none] Updated dependencies [a303cbd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a303cbd)
  - @atlaskit/editor-test-helpers@4.0.4

## 11.0.3
- [patch] Updated dependencies [823caef](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/823caef)
  - @atlaskit/media-card@29.0.2

## 11.0.2
- [patch] Updated dependencies [732d2f5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/732d2f5)
  - @atlaskit/media-card@29.0.1

## 11.0.1
- [patch] Strip empty optional attributes from the link mark in editor-json-transformer [c3b3100](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b3100)
- [none] Updated dependencies [c3b3100](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b3100)
  - @atlaskit/editor-json-transformer@3.0.10

## 11.0.0
- [major] makes styled-components a peer dependency and upgrades version range from 1.4.6 - 3 to ^3.2.6 [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
- [patch] Updated dependencies [1e80619](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e80619)
  - @atlaskit/media-card@29.0.0
  - @atlaskit/emoji@35.0.7
  - @atlaskit/mention@13.0.0
  - @atlaskit/editor-json-transformer@3.0.9
  - @atlaskit/editor-test-helpers@4.0.3
  - @atlaskit/media-core@19.0.0
  - @atlaskit/icon@12.0.0

## 10.1.10
- [patch] ED-4789: fix sticky toolbars [6d09683](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d09683)
- [none] Updated dependencies [6d09683](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d09683)

## 10.1.9
- [patch] Updated dependencies [1c87e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c87e5a)
  - @atlaskit/media-card@28.0.6
  - @atlaskit/emoji@35.0.6
  - @atlaskit/mention@12.0.3
  - @atlaskit/editor-json-transformer@3.0.8
  - @atlaskit/editor-test-helpers@4.0.2

## 10.1.8
- [patch] Updated dependencies [5ee48c4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5ee48c4)
  - @atlaskit/emoji@35.0.5
  - @atlaskit/media-core@18.1.2

## 10.1.7
- [patch] Quick Insert menu for internal editor things [370344f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/370344f)
- [none] Updated dependencies [370344f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/370344f)

## 10.1.6
- [patch] ED-4689 add __confluenceMetadata to link mark schema [e76e4b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e76e4b4)
- [none] Updated dependencies [e76e4b4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e76e4b4)

## 10.1.5
- [patch] FEF-1329 Fix catastrophic failure when editing pages with images [da4d2d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da4d2d4)
- [none] Updated dependencies [da4d2d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da4d2d4)

## 10.1.4
- [patch] Updated dependencies [35d547f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d547f)
  - @atlaskit/media-card@28.0.5

## 10.1.3
- [patch] Add support for relative links [41eb1c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/41eb1c1)
- [none] Updated dependencies [41eb1c1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/41eb1c1)

## 10.1.2
- [patch] ED-4447 Fix image breakout rendering [b73e05d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b73e05d)
- [none] Updated dependencies [b73e05d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b73e05d)

## 10.1.1
- [patch] Updated dependencies [639ae5e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/639ae5e)
  - @atlaskit/mention@12.0.2

## 10.1.0
- [minor] Adds in adf traversor [450db2e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/450db2e)
- [minor] Updated dependencies [450db2e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/450db2e)

## 10.0.3
- [none] Updated dependencies [ba702bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ba702bc)
  - @atlaskit/mention@12.0.0

## 10.0.2
- [patch] ED-4221 Fix toolbar style inconsistencies [f3fb6b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3fb6b8)
- [none] Updated dependencies [f3fb6b8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f3fb6b8)

## 10.0.1
- [patch] Updated dependencies [bd26d3c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd26d3c)
  - @atlaskit/emoji@35.0.1
  - @atlaskit/media-core@18.1.1
  - @atlaskit/media-card@28.0.1

## 10.0.0
- [patch] ED-4570, application card without icon should render properly. [714ab32](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/714ab32)
- [none] Updated dependencies [febc44d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/febc44d)
  - @atlaskit/editor-test-helpers@4.0.0
  - @atlaskit/emoji@35.0.0
  - @atlaskit/editor-json-transformer@3.0.7

## 9.4.0
- [minor] Add stage0 support to validator [1b5cc7f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b5cc7f)
- [none] Updated dependencies [1b5cc7f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b5cc7f)

## 9.3.10
- [patch] ED-4643: added support for "wide" layout for tables [8c146ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c146ee)
- [none] Updated dependencies [8c146ee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8c146ee)

## 9.3.9
- [patch] Support external media in bitbucket transformer and image uploader [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
- [patch] ED-4656: enable extension inside bodiedExtension [74f84c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/74f84c6)
- [none] Updated dependencies [8fd4dd1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8fd4dd1)
  - @atlaskit/editor-test-helpers@3.1.8
  - @atlaskit/mention@11.1.4
  - @atlaskit/emoji@34.2.0
  - @atlaskit/editor-json-transformer@3.0.6

## 9.3.8
- [patch] ED-4569 Fix ADF schema issue for application card link pattern [fb831b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb831b1)
- [none] Updated dependencies [fb831b1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/fb831b1)

## 9.3.7
- [patch] Adding borders for colors in color picker [dc842ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc842ac)
- [none] Updated dependencies [dc842ac](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dc842ac)

## 9.3.6
- [patch] Disable overlay for mediaSingle [147bc84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/147bc84)
- [none] Updated dependencies [147bc84](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/147bc84)

## 9.3.5
- [patch] ED-4120 support placeholder text in renderer [616a6a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/616a6a5)
- [patch] Updated dependencies [616a6a5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/616a6a5)

## 9.3.4
- [patch] Fix validation for badge number [3ef21cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ef21cd)
- [patch] ED-4523 implement contexual delete [9591127](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9591127)
- [none] Updated dependencies [3ef21cd](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3ef21cd)
- [patch] Updated dependencies [9591127](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9591127)

## 9.3.3
- [patch] Revert schema change [d6634bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d6634bc)

## 9.3.1
- [patch] Fixing up the re-rendering of tables on paste [31f28fa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/31f28fa)

## 9.3.0
- [minor] Adding support for external images [9935105](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9935105)

## 9.2.14
- [patch] ED-4568, adding support for panel types success and error in renderer. [1aef8d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1aef8d2)

## 9.2.13
- [patch] Adding progress loader for cloud pickers [e22266c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e22266c)

## 9.2.11
- [patch] ED-4431, selecting block extension creates a wrng selection. [c078cf2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c078cf2)

## 9.2.10
- [patch] Bump to prosemirror-view@1.3.0 [faea319](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/faea319)

## 9.2.8
- [patch] ED-4336 support loading dynamic/"auto" tables from confluence to fixed-width tables [0c2f72a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0c2f72a)

## 9.2.7
- [patch] ED-4454: fix setting while bg color for table header cells [83aecb3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/83aecb3)

## 9.2.5
- [patch] ED-4459, JIRA transformer should return unicode for emoji node. [107bf1e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/107bf1e)

## 9.2.4
- [patch] added gap cursor [5d81c8b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d81c8b)

## 9.2.2
- [patch] ED-3633, fixing paragarph margins inside table. [9d8c2a4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9d8c2a4)

## 9.2.1
- [patch] ED-4334 fix column size calculation bug; don't emit default col/rowspan attrs [eb8f140](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eb8f140)

## 9.2.0
- [minor] Add initial Page Layouts supports for Confluence. Doesn't currently support different layout types / enforcing column constraints in the editor. [ec8f6d8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec8f6d8)

## 9.1.0
- [minor] Add a generic type ahead plugin [445c66b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/445c66b)

## 9.0.1
- [patch] Unskipping the backwards compat test [1bbf22e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1bbf22e)

## 8.1.27
- [patch] Removing redundant array item from schema [ab8533d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ab8533d)

## 8.1.25
- [patch] Added missing dependencies and added lint rule to catch them all [0672503](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0672503)

## 8.1.24
- [patch] Fixing the nested link issue on paste [5d20a1f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5d20a1f)

## 8.1.22
- [patch] change table node builder constructor for tests, remove tableWithAttrs [cf43535](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/cf43535)

## 8.1.20
- [patch] support table colwidth in renderer, fix other table properties in email renderer [f78bef4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f78bef4)

## 8.1.19
- [patch] make tableCell/tableHeader attrs object optional [a6e1882](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6e1882)

## 8.1.18
- [patch] ED-4094: fix ADF generation for inline code [ee9c394](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ee9c394)

## 8.1.17
- [patch] Adding Media inside lists [07d3dff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/07d3dff)

## 8.1.16
- [patch] ED-3476 add table breakout mode [7cd4dfa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7cd4dfa)

## 8.1.14
- [patch] Remove dependency on prosemirror-schema-basic from editor-common [a1ed03a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a1ed03a)

## 8.1.10
- [patch] Move types/interfaces for ExtensionHandlers to editor-common [3d26cab](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3d26cab)

## 8.1.9
- [patch] Upgrading ProseMirror Libs [35d14d5](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/35d14d5)

## 8.1.8
- [patch] ED-3990: No longer allow bodiedExtensions in table cells in ADF [c02a81a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c02a81a)

## 8.1.5
- [patch] Add "sideEffects: false" to AKM2 packages to allow consumer's to tree-shake [c3b018a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3b018a)

## 8.1.4
- [patch] table cell/header attributes in the Confluence transformer [9415aaa](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9415aaa)

## 8.1.3
- [patch] add additional confluence link metadata attributes [6ddf3d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6ddf3d4)

## 8.1.2
- [patch] ED-4030 Don't reload Image cards again after upload is done [9aff937](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9aff937)

## 8.1.1
- [patch] Use fab:adf to convert Macros and fallback [ece6c43](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ece6c43)

## 8.1.0
- [minor] Add analytics events for click and show actions of media-card [031d5da](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/031d5da)

## 8.0.5
- [patch] Changing table cell schema to not allow nesting of bodied extensions in it. [bac680c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bac680c)

## 8.0.3
- [patch] Add full width and wide layout support for single image [ae72acf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ae72acf)

## 8.0.0
- [major] updated media-core peer dependency, this requires dependents to install new media-core version [47b459a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/47b459a)

## 7.0.2
- [patch] support __confluenceMetadata property on link mark [b17f847](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b17f847)

## 7.0.0
- [major] Use media-core as peerDependency [c644812](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c644812)

## 6.3.17
- [patch] make colwidth an array of numbers in schema [369b522](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/369b522)

## 6.3.16
- [patch] Add key as an optional parameter to applicationCard actions [28be081](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/28be081)

## 6.3.12
- [patch] Table columns should not resize when typing [59728cc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/59728cc)

## 6.3.8
- [patch] Fix for styled-components types to support v1.4.x [75a2375](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/75a2375)

## 6.3.6
- [patch] JSON encoding results in invalid ADF for table nodes [8a8d663](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8a8d663)

## 6.3.5
- [patch] fix tables in json schema [4b67c37](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4b67c37)

## 6.3.3
- [patch] Adding support for reactions [1b74cff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b74cff)

## 6.3.2
- [patch] add span and background attribs for table nodes in renderer [8af61df](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8af61df)

## 6.3.0
- [minor] Introduce the placeholder node to the ADF [2441f92](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/2441f92)

## 6.2.0
- [minor] add support for <fab:adf> and confluence decision list transforms [e08eccc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e08eccc)
- [minor] add support for <fab:adf> and confluence decision list transforms [f43f928](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f43f928)
- [minor] advanced features for tables [e0bac20](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e0bac20)

## 6.1.9
- [patch] Encode and decode for Extension schemaVersion [0335988](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0335988)

## 6.1.8
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 6.1.3
- [patch] Move media provider and state manager to editor-core [0601da7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0601da7)

## 6.1.2
- [patch] Add the placeholder text node to the schema [330993f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/330993f

## 6.1.0
- [minor] Fixing content expression of bodiedExtension node. [38b81ad](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/38b81ad)

## 6.0.4
- [patch] bump mention to 9.1.1 to fix mention autocomplete bug [c7708c6](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c7708c6)

## 6.0.3
- [patch] Remove monospace font-style for code marks. [b92c81e](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/b92c81e)

## 6.0.2
- [patch] Removing SMB from URL-whitelist [dfe77d2](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dfe77d2)

## 6.0.1
- [patch] Add additional inline nodes to unknownBlock [f330ca1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f330ca1)

## 6.0.0
- [patch] cket-transformer/__tests__/_schema-builder.ts [a6e77ff](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a6e77ff)
- [major] move MediaItem to renderer, bump icons [5e71725](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5e71725)

## 5.10.3
- [patch] Change JSON schema to ensure that first child of list-item is always paragraph [9a36594](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9a36594)

## 5.10.0
- [minor] FS-1624 Add new popupsScrollableElement props to editor to handle case when mountPoint is different than the scrollable element. [7d669bc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7d669bc)

## 5.9.4
- [patch] Insert media group instead of single image inside table [5b4aaa0](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b4aaa0)

## 5.9.3
- [patch] Fix getValidDocument to wrap top level inline nodes [c82a941](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c82a941)
- [patch] Fix unknown node validator [419f4fc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/419f4fc)

## 5.9.1
- [patch] fix extension replacement with empty content [e151446](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e151446)

## 5.9.0
- [minor] move table nodes from prosemirror-tables to editor-common [630c9ae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/630c9ae)
- [patch] fixed extension node content field [41c7958](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/41c7958)

## 5.8.1
- [patch] Fixing nesting of blocks in JSON schema. [ed5c5ca](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ed5c5ca)

## 5.8.0
- [minor] added new panelType [9f693b9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f693b9)

## 5.7.3
- [patch] Revert the change of block nesting in JSON schema. [dd19d0f](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dd19d0f)

## 5.7.0
- [minor] Fixing JSON schema for block nesting. [92c8f93](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/92c8f93)

## 5.6.0
- [minor] added date plugin [f7b8a33](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f7b8a33)

## 5.5.1
- [patch] Fix schema definition of mediaSingle node [ade0fc9](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ade0fc9)

## 5.5.0
- [minor] Add React 16 support. [12ea6e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/12ea6e4)

## 5.4.1
- [patch] Use media-test-helpers instead of hardcoded values [f2b92f8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f2b92f8)

## 5.3.0
- [patch] Remove duplicate implementation of ProviderFactory from @atlaskit/editor-core, in favour of only one implementation in @atlaskit/editor-common [535cb8c](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/535cb8c)
- [minor] bump prosemirror-tables to 0.5.2 [32b6bbe](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/32b6bbe)
- [patch] FS-1601 Don't use async/await in mention-with-providers to allow usage of synchronous promise by consumer [e464412](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e464412)
- [minor] added tasks/actions to full-page editor [49d3343](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/49d3343)

## 5.1.10
- [patch] We now use ProseMirror Schema to validate document [d059d6a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/d059d6a)

## 5.1.9
- [patch] Added floating toolbar to media single [46fdd15](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/46fdd15)

## 5.1.8
- [patch] Allow inline contents inside headings. [738631b](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/738631b)

## 5.1.7

- [patch] Updated media-card Appearance type to include "auto" [e1f8390](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1f8390)

## 5.1.4
- [patch] Support copy/pasting emoji from Bitbucket into the Editor [a8ca5d4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a8ca5d4)

## 5.1.3
- [patch] replaced inlineMacro node with inlineExtension node [a43f891](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a43f891)

## 5.1.2
- [patch] Bumped emoji to v31 [c4365e4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c4365e4)
- [patch] Bumped emoji to v31 [207e0fc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/207e0fc)
- [patch] Fix the issue where originalContent isn't passed down to extension handlers [c3cdea3](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c3cdea3)

## 5.1.1
- [patch] Add Serializer for Single image [03405bf](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/03405bf)

## 5.1.0
- [minor] FS-1461 added ContextIdentifierProvider interface to editor [0aeea41](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0aeea41)

## 5.0.6
- [patch] Add default center layout support for single image [6113e02](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6113e02)

## 5.0.3
- [patch] Only bodiedExtension has content [6d4caae](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/6d4caae)

## 5.0.0
- [major] Rename singleImage to mediaSingle. Replaced alignment and display attributes with layout. [0b97f0a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0b97f0a)

## 4.4.0
- [minor] Addes in extension node [e52d336](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e52d336)

## 4.3.0
- [minor] Remove support for images with data URI's for Bitbucket's image node in the editor [e055dee](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e055dee)

## 4.2.0
- [minor] split extension node [4303d49](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4303d49)

## 4.1.0
- [patch] Remove singleImage from editor-cq schema [f5c1ecb](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f5c1ecb)

## 4.0.1
- [patch] added extension node [ec73cb8](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ec73cb8)

## 4.0.0
- [major] Update signature onClick event on filmstrip (renderer) [30bdfcc](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/30bdfcc)
- [major] Update signature onClick event on filmstrip (renderer) [dbced25](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/dbced25)
- [major] Update signature onClick event on filmstrip (renderer) [7ee4743](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7ee4743)

## 3.12.0
- [patch] Fix dependencies [9f9de42](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9f9de42)

## 3.11.2
- [patch] Adding separate transformer packages. [f734c01](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/f734c01)

## 3.11.0
- [minor] Move validators from renderer to editor-common [3e2fd00](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3e2fd00)

## 3.10.0
- [minor] Added single image to schema; insertFile renamed to insertFiles. [1c6b005](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1c6b005)

## 3.9.12
- [patch] @atlaskit/emoji bumped to ^30.3.3 for big emoji scrolling bugfix [095d6ba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/095d6ba)

## 3.9.11
- [patch] bump icon dependency [da14956](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/da14956)

## 3.9.6
- [patch] Updated media-card Appearance type to include "auto" [e1f8390](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/e1f8390)

## 3.9.4
- [patch] re-enable backwards compatibility tests [32e0ccb](32e0ccb)

## 3.9.3
- [patch] Upgrade mention to ^8.1.0 in editor and renderer [48b5af4](48b5af4)

## 3.9.1
- [patch] Restore accessLevel attribute for mention node [a83619f](a83619f)

## 3.8.3
- [patch] Use correct dependencies  [7b178b1](7b178b1)
- [patch] Adding responsive behavior to the editor. [e0d9867](e0d9867)

## 3.8.0
- [minor] Upgrade Media Editor packages [193c8a0](193c8a0)
