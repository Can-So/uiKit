import { components } from '@atlaskit/select';
import Tooltip from '@atlaskit/tooltip';
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
    const {
      selectProps: { clearValueLabel },
    } = this.props;
    return (
      <Tooltip content={clearValueLabel}>
        <components.ClearIndicator
          {...this.props}
          innerProps={{
            ...this.props.innerProps,
            onMouseDown: this.handleMouseDown,
          }}
        />
      </Tooltip>
    );
  }
}
