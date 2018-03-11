import * as React from 'react';
import { Component } from 'react';
import { Context } from '@atlaskit/media-core';

import { Card, Identifier, OnSelectChangeFunc } from '../src';

export interface SelectableCardProps {
  context: Context;
  identifier: Identifier;
  onSelectChange: OnSelectChangeFunc;
}

export class SelectableCard extends Component<
  SelectableCardProps,
  { selected: boolean }
> {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  render() {
    const { context, identifier, onSelectChange } = this.props;
    const { selected } = this.state;

    return (
      <Card
        context={context}
        identifier={identifier}
        appearance="image"
        selectable={true}
        selected={selected}
        onClick={this.onClick}
        onSelectChange={onSelectChange}
      />
    );
  }

  private onClick = (): void => {
    this.setState(prevState => {
      return {
        selected: !prevState.selected,
      };
    });
  };
}
