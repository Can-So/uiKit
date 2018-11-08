// @flow

import React, { Component } from 'react';
import withNavigationViewController from '../../withNavigationViewController';

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
 * FoowithNavigationViewController
 */
const FoowithNavigationViewController = withNavigationViewController(Foo);

<FoowithNavigationViewController alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FoowithNavigationViewController />;
// $ExpectError - requiredButHasDefault wrong type
<FoowithNavigationViewController
  alwaysRequired="always"
  requiredButHasDefault={5}
/>;
// $ExpectError - optional wrong type
<FoowithNavigationViewController alwaysRequired="always" optional={5} />;

/**
 * Double Trouble
 */
const FooDoubleTrouble = withNavigationViewController(
  withNavigationViewController(Foo),
);

<FooDoubleTrouble alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooDoubleTrouble />;
// $ExpectError - requiredButHasDefault wrong type
<FooDoubleTrouble alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooDoubleTrouble alwaysRequired="always" optional={5} />;
