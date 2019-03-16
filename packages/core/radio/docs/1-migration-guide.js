// @flow
import { md } from '@findable/docs';

export default md`
The goal of **@findable/radio** is to take **@findable/field-radio-group** and refactor it to:

- Normalise the API using conventions that have developed within ADG3 and the React ecosystem.
- Refactor out the **Stateless/Stateful** paradigm in favor of a more maintainable conditionally controlled component.
- Export more granular components to enable the consumption of atlaskit radio components for more use cases.

## Exports

Previously in **@findable/field-radio-group** the following components were exported:

- AkRadioGroup (default)
- AkRadioGroupStateless
- AkRadio

**@findable/radio no longer has a default export**. Furthermore, the following components are exported instead:

- RadioGroup
- Radio
- RadioInput
- RadioIcon

## RadioGroup:

While @findable/field-radio-group exported a stateful and stateless version of the RadioGroup component, @findable/radio has opted to unify these two components into a single conditionally controlled component.

In @findable/field-radio-group, users would pass in an \`items\` array to be rendered as a set of Radio components. The shape of this items array is more or less the same in @findable/radio, however the prop has now been renamed \`options\` to be more semantically consistent with other components of similar concern.

Other core changes are the following prop additions:

- \`value\`: This is an optional prop that is compared against the value of each passed in option. The matching option will be instantiated as a Radio component with isChecked set to true. If this prop is left undefined, the selection of any given radio is managed internally within the state of the RadioGroup component.

- \`defaultValue\`: This is an optional prop that is set as the value in state initially. Further interactions with radio options rendered by this RadioGroup will override this value with the internally managed checked state.

\*\`onRadioChange\` in field-radio-group is now \`onChange\` in @findable/radio.

Additionally, while \`defaultChecked\` use to be a valid property within the passed in items array in \`field-radio-group\`; this is no longer the case in \`@findable/radio\`, as the responsibility of this property is now passed up to the defaultValue prop on the RadioGroup component.

## Radio

The \`isChecked\` prop in field-radio-group has been replaced with the \`isChecked\` prop in @findable/radio, to inline it with conventions established both in native radio elements and within the context of React.

\`value\`: this used to accept a string in field-radio-base, this has now been expanded to accept both number and string values.

## RadioInput:

@findable/radio exports a RadioInput component, to enable usecase where serialisation of the checked value is necessary, and / or event handling is desired but label content is managed and displayed elsewhere.

For a more detailed description around the props of this component, please see the intro docs.

## RadioIcon:

@findable/radio exports a RadioIcon component, to enable usecases where displaying a checked or unchecked Radio is important, but event handling and label content is generally triggered / managed elsewhere (for example in the RadioSelect component from @findable/select).

This is a light wrapper around the radio glyph exported from @findable/icons, which provides stylistic wrapprs that are inline with ADG3 as well as light functionality around active, hover, checked and focused state. Please see the intro docs for more detailed prop information.
`;
