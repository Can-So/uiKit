import * as React from 'react';
import { PureComponent } from 'react';
import AlignmentButton from './AlignmentButton';

import { AlignmentWrapper } from './styles';
import { iconMap } from '../../plugins/alignment/ui/ToolbarAlignment';

export interface Props {
  selectedAlignment?: string;
  onClick: (value: string) => void;
  className?: string;
}

const alignmentOptions = [
  { title: 'Align left', value: 'left' },
  { title: 'Align center', value: 'center' },
  { title: 'Align right', value: 'right' },
];

export default class Alignment extends PureComponent<Props, any> {
  render() {
    const { onClick, selectedAlignment, className } = this.props;

    return (
      <AlignmentWrapper className={className} style={{ maxWidth: 3 * 32 }}>
        {alignmentOptions.map(alignment => {
          const { value, title } = alignment;
          return (
            <AlignmentButton
              content={iconMap[value]}
              key={value}
              value={value}
              label={title}
              onClick={onClick}
              isSelected={value === selectedAlignment}
            />
          );
        })}
      </AlignmentWrapper>
    );
  }
}
