import { components } from '@atlaskit/select';
import * as React from 'react';

export class ClearIndicator extends React.PureComponent<any> {
  private handleMouseDown = event => {
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    this.props.clearValue();
    if (this.props.selectProps && !this.props.selectProps.isFocused) {
      event.stopPropagation();
    }
  };

  render() {
    return (
      <components.ClearIndicator
        {...this.props}
        innerProps={{
          ...this.props.innerProps,
          onMouseDown: this.handleMouseDown,
        }}
      />
    );
  }
}
