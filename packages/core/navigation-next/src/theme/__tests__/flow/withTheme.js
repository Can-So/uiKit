// @flow

import React, { Component } from 'react';
import withTheme, { withContentTheme, withGlobalTheme } from '../../withTheme';

type FooProps = {
  alwaysRequired: string,
  optional?: string,
  requiredButHasDefault: string,
};
class Foo extends Component<FooProps> {
  static defaultProps = {
    requiredButHasDefault: 'default Yo',
  };
  render() {
    return null;
  }
}

/**
 * Foo
 */
<Foo alwaysRequired="always" />;

// $ExpectError - missing alwaysRequired
<Foo />;
// $ExpectError - requiredButHasDefault wrong type
<Foo alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<Foo alwaysRequired="always" optional={5} />;

/**
 * FooWithTheme
 */
const FooWithTheme = withTheme()(Foo);

<FooWithTheme alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithTheme />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithTheme alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithTheme alwaysRequired="always" optional={5} />;

/**
 * FooWithContentTheme
 */

const FooWithContentTheme = withContentTheme(Foo);

<FooWithContentTheme alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithContentTheme />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithContentTheme alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithContentTheme alwaysRequired="always" optional={5} />;

/**
 * FooWithGlobalTheme
 */

const FooWithGlobalTheme = withGlobalTheme(Foo);

<FooWithGlobalTheme alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithGlobalTheme />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithGlobalTheme alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithGlobalTheme alwaysRequired="always" optional={5} />;

/**
 * FooWithDoubleTheme - will it work with multiple HOCs
 */
const FooWithDoubleTheme = withTheme()(withTheme()(Foo));

<FooWithDoubleTheme alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithDoubleTheme />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithDoubleTheme alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithDoubleTheme alwaysRequired="always" optional={5} />;

/**
 * FooWithDoubleContentTheme - will it work with multiple HOCs
 */
const FooWithDoubleContentTheme = withContentTheme(withContentTheme(Foo));

<FooWithDoubleContentTheme alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithDoubleContentTheme />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithDoubleContentTheme alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithDoubleContentTheme alwaysRequired="always" optional={5} />;

/**
 * FooWithDoubleGlobalTheme - will it work with multiple HOCs
 */
const FooWithDoubleGlobalTheme = withGlobalTheme(withGlobalTheme(Foo));

<FooWithDoubleGlobalTheme alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooWithDoubleGlobalTheme />;
// $ExpectError - requiredButHasDefault wrong type
<FooWithDoubleGlobalTheme alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooWithDoubleGlobalTheme alwaysRequired="always" optional={5} />;
