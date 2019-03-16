// @flow
import React from 'react';
import { Example, code } from '@findable/docs';
import md from './docs-util/md';
import PropChanges from './docs-util/propChanges';
import { propChanges } from './docs-util/propChangeData';

const itemShape = `Array<{
  heading: string
  item: Array<{
    content?: Node,
    description?: string,
    label?: string,
    tooltipDescription?: string,
    tooltipPosition?: 'top' | 'bottom' | 'left',
    value?: string | number,
    filterValues?: Array<string>,
    isDisabled?: boolean,
    isSelected?: boolean,
    elemBefore?: Node,
  }>
}>`;

const optionShape = `Array<{
  [any]: string,
  options?: Array<{[any]: string}>
}>`;

export default md`
  **@findable/select** aims to align the varying use cases for the previous single-select and multi-select packages
  into one package. This guide will cover the differences that you need to be aware of in **@findable/select**
  for you to update from **@findable/multi-select** and **@findable/single-select**

  ## Contents
  * [Prop upgrade table](#prop-upgrade-table)
  * [Validation](#validation)
  * [Options](#options)
    * [elemBefore](#elembefore)
    * [tooltipDescription & tooltipPosition](#tooltipdescription---tooltipposition)
    * [filterValues](#filtervalues)
    * [description](#description)

  <a name="prop-upgrade-table"></a>
  ## Prop upgrade table:

  ${<PropChanges data={propChanges} />}

  <a name="validation"></a>
  ## Validation

  We no longer support the \`invalidMessage\`, \`isInvalid\` and \`required\` props.
  Validation messages are now a concern of the [@findable/form](/packages/core/form) package.
  We do however, provide a validateState prop, which takes a string value of either \`success\` or \`error\` which augments the border of the trigger.
  See the example below:

  ${(
    <Example
      packageName="@findable/select"
      Component={require('../examples/05-validation').default}
      source={require('!!raw-loader!../examples/05-validation')}
      title="validation example"
    />
  )}

  <a name="options"></a>
  ## Options

  We no longer enforce opinions on the shape of your passed in options (previously named items in single and multi select).
  Previously options had the following shape:

  ${code`${itemShape}`}

  We've simplified this to the following:

  ${code`${optionShape}`}

  By default, @findable/select forms very few opinions about the shape of your passed in options.
  The only attribute @findable/select really forces any opinions on, is whether or not your option object has an option property of its own.
  This is used to identify whether or not a group hierarchy has been used, so that @findable/select can augment our internal options map and render groups accordingly.
  Otherwise, by default @findable/select will filter based on the \`value\` property and render the specified \`label\` value.
  However @findable/select provides you with a series of props to augment this behaviour at multiple levels of use, please see the **custom data structures** section of our [api docs](/packages/core/select/docs/api).
  for more details.

  While the shape of each item is much less explicit, due to how @findable/select exposes component customisation, the same functionality that the previous item shape enabled
  can still be achieved, without locking you down to any particular set of opinions. For example:

  <a name="elemBefore"></a>
  ### elemBefore

  While elemBefore is no longer an explicitly supported property on passed in options,
  @findable/select exposes a formatOptionLabel method of the following shape

  ${code`(option, { context, inputValue, selectedValue }) => Node`}

  Passing in a formatOptionLabel prop that takes option data to render an element before the label text would look like this:

  ${(
    <Example
      packageName="@findable/select"
      Component={require('../examples/18-element-before').default}
      source={require('!!raw-loader!../examples/18-element-before')}
      title="Element Before example"
    />
  )}

  For more information on how to customise filtering and displaying options / values please see the custom data structures section of our [api docs](/packages/core/select/docs/api)

  <a name="tooltipdescription---tooltipposition"></a>
  ### tooltipDescription & tooltipPosition

  Previously @findable/single-select & @findable/multi-select optionally rendered @findable/tooltip, depending on whether or not a tooltipDescription was passed in.
  This is no longer the case in @findable/select in the interest of not depending on more @atlaskit packages than needed.

  However, with the **component customisation api** section of our (api docs)(/packages/core/select/docs/api#components-api) wrapping your options in an @findable/tooltip instance
  and feeding it an associated description, is a relatively simple task. The example below illustrates how you might go about doing this:

  ${(
    <Example
      packageName="@findable/select"
      Component={require('../examples/19-tooltip').default}
      source={require('!!raw-loader!../examples/19-tooltip')}
      title="Tooltip example"
    />
  )}

  <a name="filtervalues"></a>
  ### filterValues

  Previously @findable/single-select and @findable/multi-select items optionally contained a filterValues prop with the following shape:

  ${code`filterValues: Array<string>`}

  The intention behind this was to allow you to pass through a series of string values through which
  the internal filtering logic would be able to reduce search results on.

  @findable/select surfaces a variety of configurations for customising how
  options get filtered, that mean that this prop is no longer necessary.

  For a more detailed explanation of these configurations,
  please see the 'Custom Filter' section of the [api page](/packages/core/select/docs/api)

  If you do however want to use this pattern, below is how you could enable that in @findable/select.

  ${(
    <Example
      packageName="@findable/select"
      Component={require('../examples/20-filterValues').default}
      source={require('!!raw-loader!../examples/20-filterValues')}
      title="FilterValues example"
    />
  )}

  <a name="description"></a>
  ### description
  
  Similar to elemBefore, you can recreate the functionality provided by the **description** property in items,
  by using the \`formatOptionLabel\` prop @findable/select provides you. See below for an example of how to do this:

  ${(
    <Example
      packageName="@findable/select"
      Component={require('../examples/21-options-with-description').default}
      source={require('!!raw-loader!../examples/21-options-with-description')}
      title="options with description example"
    />
  )}
`;
