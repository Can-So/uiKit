# @findable/analytics-namespaced-context

## 3.0.0
- [major] [9d5cc39394](https://github.com/fnamazing/uiKit/commits/9d5cc39394):

  - Dropped ES5 distributables from the typescript packages

## 2.2.1
- Updated dependencies [76299208e6](https://github.com/fnamazing/uiKit/commits/76299208e6):
  - @findable/analytics-listeners@4.2.1
  - @findable/docs@7.0.0
  - @findable/analytics-next@4.0.0

## 2.2.0
- [minor] [8c65a38bfc](https://github.com/fnamazing/uiKit/commits/8c65a38bfc):

  - enable noImplicitAny for elements analytics packages. Fix related issues.

## 2.1.5
- Updated dependencies [58b84fa](https://github.com/fnamazing/uiKit/commits/58b84fa):
  - @findable/analytics-next@3.1.2
  - @findable/analytics-listeners@4.1.4
  - @findable/docs@6.0.0

## 2.1.4
- [patch] Analytics event's 'source' field from GasPayload type is now optional. In most cases, the 'source' field is expected to be set by the integrator through AnalyticsContext. Thus it's recommended that components do not set it to avoid overriding the one provided by the integrating product. Analytics listeners are handling the case where the 'source' field couldn't be found by setting the default value "unknown" before sending the event through the client. [1c0ea95](https://github.com/fnamazing/uiKit/commits/1c0ea95)

## 2.1.3
- [patch] fixed imports, docs and made GasPayload package attributes optional [6be5eed](https://github.com/fnamazing/uiKit/commits/6be5eed)
- [patch] use createAndFire function from analytics-next [095f356](https://github.com/fnamazing/uiKit/commits/095f356)
- [patch] Fixed TS errors and code improvements [b290312](https://github.com/fnamazing/uiKit/commits/b290312)
- [patch] enable analytics-next TDs on analytics-listeners and analytics-namespaced-context [e65f377](https://github.com/fnamazing/uiKit/commits/e65f377)

## 2.1.2
- [patch] Updated dependencies [90ba6bd](https://github.com/fnamazing/uiKit/commits/90ba6bd)
  - @findable/analytics-listeners@4.0.0

## 2.1.1
- [patch] Updated dependencies [dfa100e](https://github.com/fnamazing/uiKit/commits/dfa100e)
  - @findable/analytics-listeners@3.3.1

## 2.1.0

- [minor] Add NavigationContext component that provides context to events fired on the navigation channel [89225ce](https://github.com/fnamazing/uiKit/commits/89225ce)
- [patch] Updated dependencies [808b55b](https://github.com/fnamazing/uiKit/commits/808b55b)
  - @findable/analytics-listeners@3.2.0
- [none] Updated dependencies [89225ce](https://github.com/fnamazing/uiKit/commits/89225ce)
  - @findable/analytics-listeners@3.2.0

## 2.0.3
- [patch] Fix es5 exports of some of the newer modules [3f0cd7d](https://github.com/fnamazing/uiKit/commits/3f0cd7d)
- [none] Updated dependencies [3f0cd7d](https://github.com/fnamazing/uiKit/commits/3f0cd7d)
  - @findable/analytics-gas-types@3.1.3

## 2.0.2
- [patch] Updated dependencies [acd86a1](https://github.com/fnamazing/uiKit/commits/acd86a1)
  - @findable/button@9.0.4
  - @findable/analytics-next@3.0.3
  - @findable/docs@5.0.2
  - @findable/analytics-gas-types@3.1.2

## 2.0.1
- [patch] fixes problem with modules not being exported [80e90ed](https://github.com/fnamazing/uiKit/commits/80e90ed)

## 2.0.0

- [major] Updates to React ^16.4.0 [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
- [major] Updated dependencies [563a7eb](https://github.com/fnamazing/uiKit/commits/563a7eb)
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/docs@5.0.0
  - @findable/analytics-gas-types@3.0.0
- [major] Updated dependencies [7edb866](https://github.com/fnamazing/uiKit/commits/7edb866)
  - @findable/analytics-next@3.0.0
  - @findable/button@9.0.0
  - @findable/docs@5.0.0
  - @findable/analytics-gas-types@3.0.0

## 1.0.3
- [patch] Move the tests under src and club the tests under unit, integration and visual regression [f1a9069](https://github.com/fnamazing/uiKit/commits/f1a9069)
- [none] Updated dependencies [f1a9069](https://github.com/fnamazing/uiKit/commits/f1a9069)
  - @findable/analytics-gas-types@2.1.4

## 1.0.2
- [patch] Add missing dependencies to packages to get the website to build [9c32280](https://github.com/fnamazing/uiKit/commits/9c32280)


- [none] Updated dependencies [99446e3](https://github.com/fnamazing/uiKit/commits/99446e3)
  - @findable/docs@4.2.2
- [none] Updated dependencies [9bac948](https://github.com/fnamazing/uiKit/commits/9bac948)
  - @findable/docs@4.2.2

## 1.0.1
- [patch] wrapper for analytics-next AnalyticsContext to add a namespace [91e5997](https://github.com/fnamazing/uiKit/commits/91e5997)
