import * as React from 'react';
import { PureComponent } from 'react';

import ToolbarButton from '../../ToolbarButton';

export interface Props {
  value: string;
  label: string;
  isSelected?: boolean;
  onClick: (value: string) => void;
  content: React.ReactElement<any>;
}

class AlignmentButton extends PureComponent<Props> {
  render() {
    const { label, isSelected, content } = this.props;
    return (
      <ToolbarButton
        disabled={false}
        selected={isSelected}
        title={label}
        onClick={this.onClick}
        iconBefore={content}
      />
    );
  }

  onClick = e => {
    const { onClick, value } = this.props;
    e.preventDefault();
    onClick(value);
  };
}

export default AlignmentButton;
