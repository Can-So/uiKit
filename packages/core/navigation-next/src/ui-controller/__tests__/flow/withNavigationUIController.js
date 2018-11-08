// @flow

import React, { Component } from 'react';
import withNavigationUIController from '../../withNavigationUIController';

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
 * FoowithNavigationUIController
 */
const FoowithNavigationUIController = withNavigationUIController(Foo);

<FoowithNavigationUIController alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FoowithNavigationUIController />;
// $ExpectError - requiredButHasDefault wrong type
<FoowithNavigationUIController
  alwaysRequired="always"
  requiredButHasDefault={5}
/>;
// $ExpectError - optional wrong type
<FoowithNavigationUIController alwaysRequired="always" optional={5} />;

/**
 * Double Trouble
 */
const FooDoubleTrouble = withNavigationUIController(
  withNavigationUIController(Foo),
);

<FooDoubleTrouble alwaysRequired="always" />;
// $ExpectError - missing alwaysRequired
<FooDoubleTrouble />;
// $ExpectError - requiredButHasDefault wrong type
<FooDoubleTrouble alwaysRequired="always" requiredButHasDefault={5} />;
// $ExpectError - optional wrong type
<FooDoubleTrouble alwaysRequired="always" optional={5} />;
