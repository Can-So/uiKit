import * as React from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import AkButton from '@atlaskit/button';
import AkTooltip from '@atlaskit/tooltip';
import { DeleteRowButtonWrap, InsertRowButtonInner } from './styles';

export interface ButtonProps {
  style?: object;
  onClick: () => void;
  onMouseEnter?: (SyntheticEvent) => void;
  onMouseLeave?: (SyntheticEvent) => void;
}

class DeleteRowButton extends React.Component<ButtonProps> {
  state = { hover: false };
  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
  };

  onMouseEnter = e => {
    this.setState({ hover: true });
    this.props.onMouseEnter!(e);
  };

  onMouseLeave = e => {
    this.setState({ hover: false });
    this.props.onMouseLeave!(e);
  };

  render() {
    const { style, onClick } = this.props;
    return (
      <DeleteRowButtonWrap
        style={style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <InsertRowButtonInner>
          <AkTooltip content="Remove row">
            <AkButton
              onClick={onClick}
              iconBefore={<CrossIcon label="Remove row" />}
              appearance={this.state.hover ? 'danger' : 'default'}
              spacing="none"
            />
          </AkTooltip>
        </InsertRowButtonInner>
      </DeleteRowButtonWrap>
    );
  }
}

export default DeleteRowButton;
