// @flow
import React, { Component } from 'react';
import { colors } from '@findable/theme';
import HomeCircleIcon from '../glyph/home-circle';

export default class Example extends Component<{}, {}> {
  render() {
    return (
      <div>
        <HomeCircleIcon
          primaryColor="rebeccapurple"
          secondaryColor="yellow"
          size="xlarge"
          label=""
        />
        <HomeCircleIcon
          primaryColor={colors.B500}
          secondaryColor={colors.B75}
          size="xlarge"
          label=""
        />
      </div>
    );
  }
}
