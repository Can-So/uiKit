# @atlaskit/select

## 2.0.2
- [patch] Release to align @atlaskit/select styles and theme with ADG3 guideline.  [7468739](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/7468739)

## 2.0.1

## 2.0.0
- [major] Classname prop added, if this is given a value we surface logical semantic classes prefixed with the supplied value to enable styling via css otherwise a generated hash value is used.W e also now export icon components from the components object to facilitate easier customisation.  Previously this behaviour was enforced, and classes were given semantic values and prefixed with ‘react-select’ by default (i.e. react-select__dropdown-indicator) . See the following commit for details  https://github.com/JedWatson/react-select/commit/109d1aadb585cc5fd113d03309d80bd59b5eaf9b Also in this release, IE 11 display bugfix for centre alligned elements in a flex parent, fix for react15 compatibility, fix for bug where long tail values were not being truncated properly in the control [8d19b24](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/8d19b24)

## 1.3.1
- [patch] Update react-select version to fix flowtype errors [240a083](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/240a083)

## 1.3.0
- [minor] Update react-select dep in @atlaskit/select to alpha.10 [4073781](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4073781)

## 1.2.0
- [minor] @atlaskit/select now exports the createFilter [df7d845](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/df7d845)

## 1.1.1

- [patch] Re-export some exports from react-select for use in other packages. [eda9906](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/eda9906)

## 1.1.0
- [minor] Added default text-truncation behaviour for options in radio and checkbox selects [5b37cc1](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/5b37cc1)

## 1.0.0
- [major] Bump to React 16.3. [4251858](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/4251858)

## 0.3.0
- [minor] Added Creatable and AsyncCreatable exports, added menuPortalTarget prop to portal select menu, updated selects to expose intenral focus and blur methods' [a7b06f4](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/a7b06f4)

## 0.2.1
- [patch] Re-releasing due to potentially broken babel release [9ed0bba](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/9ed0bba)

## 0.2.0
- [minor] Update styled-components dependency to support versions 1.4.6 - 3 [ceccf30](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/ceccf30)

## 0.1.7
- [patch] updated the repository url to https://bitbucket.org/atlassian/atlaskit-mk-2 [1e57e5a](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1e57e5a)

## 0.1.6
- [patch] Update to alpha.6 and cleanup CountrySelect [c972f53](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/c972f53)

## 0.1.5
- [patch] Packages Flow types for elements components [3111e74](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/3111e74)

## 0.1.4

- [patch] misc updates to select package [bd000c7](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/bd000c7)

## 0.1.3
- [patch] added temporary SelectWraper to demonstrate validation [0ef5343](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/0ef5343)

## 0.1.2
- [patch] Resolved low hanging flow errors in field-base field-text comment icon item and website, $ [007de27](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/007de27)

## 0.1.1
- [patch] initial release of the select package [1b8e01d](https://bitbucket.org/atlassian/atlaskit-mk-2/commits/1b8e01d)

## 0.1.0
- Initial release
