import { components } from '@atlaskit/select';
import * as React from 'react';

export class ClearIndicator extends React.PureComponent<any> {
  private handleMouseDown = (event: React.MouseEvent) => {
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    this.props.clearValue();
    // Prevent focus when clear on blurred state
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
