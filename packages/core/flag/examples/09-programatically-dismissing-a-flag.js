// @flow

import React, { Component, type Node } from 'react';
import Button from '@findable/button';
import InfoIcon from '@findable/icon/glyph/info';
import { gridSize } from '@findable/theme';
import Flag, { FlagGroup } from '../src';

type State = {
  flags: Array<Node>,
};

export default class ProgrammaticFlagDismissExample extends Component<
  void,
  State,
> {
  state = {
    flags: [
      <Flag
        id="flag1"
        key="flag1"
        title="Can I leave yet?"
        description="Dismiss me by clicking the button on the page"
        icon={<InfoIcon label="Info" />}
      />,
    ],
  };

  dismissFlag = () => {
    this.setState({ flags: [] });
  };

  render() {
    return (
      <div>
        <p style={{ padding: `${gridSize() * 2}px` }}>
          <Button appearance="primary" onClick={this.dismissFlag}>
            Dismiss the Flag
          </Button>
        </p>
        <FlagGroup>{this.state.flags}</FlagGroup>
      </div>
    );
  }
}
