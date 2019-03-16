# @findable/analytics-gas-types

## 4.0.0
- [major] [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 3.2.5
- Updated dependencies [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):
  - @findable/docs@7.0.0

## 3.2.4
- [patch] [a3b8046](https://github.com/fnamazing/uiKit/commits/a3b8046):

  - Add more specific types to analytics-listener webclient type

## 3.2.3
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/docs@6.0.0

## 3.2.2
- [patch] Analytics event's 'source' field from GasPayload type is now optional. In most cases, the 'source' field is expected to be set by the integrator through AnalyticsContext. Thus it's recommended that components do not set it to avoid overriding the one provided by the integrating product. Analytics listeners are handling the case where the 'source' field couldn't be found by setting the default value "unknown" before sending the event through the client. [1c0ea95](https://github.com/fnamazing/uiKit/commits/1c0ea95)

## 3.2.1
- [patch] fixed imports, docs and made GasPayload package attributes optional [6be5eed](https://github.com/fnamazing/uiKit/commits/6be5eed)

## 3.2.0
- [minor] Update GasPayload to include proper format for screen events [85ddb9e](https://github.com/fnamazing/uiKit/commits/85ddb9e)

## 3.1.3
- [patch] Fix es5 exports of some of the newer modules [3f0cd7d](https://github.com/fnamazing/uiKit/commits/3f0cd7d)

## 3.1.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/docs@5.0.2

## 3.1.1
- [patch] FS-2020 add session id to typeahead plugin inside editor [5ae463f](https://github.com/fnamazing/uiKit/commits/5ae463f)

## 3.1.0
- [minor] Allow sending of search queries in analytics events [e5f14e9](https://github.com/fnamazing/uiKit/commits/e5f14e9)

## 3.0.0


- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/docs@5.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/docs@5.0.0

## 2.1.4
- [patch] Move the tests under src and club the tests under unit, integration and visual regression [f1a9069](https://github.com/fnamazing/uiKit/commits/f1a9069)

## 2.1.3
- [patch] Update changelogs to remove duplicate [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
- [none] Updated dependencies [cc58e17](https://github.com/fnamazing/uiKit/commits/cc58e17)
  - @findable/docs@4.1.1

## 2.1.2
- [none] Updated dependencies [9d20f54](https://github.com/fnamazing/uiKit/commits/9d20f54)
  - @findable/docs@4.1.0

## 2.1.1
- [patch] Updated dependencies [1e80619](https://github.com/fnamazing/uiKit/commits/1e80619)
  - @findable/docs@4.0.0

## 2.1.0
- [minor] Export individual event types as constants [9be1db0](https://github.com/fnamazing/uiKit/commits/9be1db0)

## 2.0.0
- [major] added new package analytics-gas-types [4d238a6](https://github.com/fnamazing/uiKit/commits/4d238a6)
