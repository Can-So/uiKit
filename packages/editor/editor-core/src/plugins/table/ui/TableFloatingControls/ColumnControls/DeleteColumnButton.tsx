import * as React from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import AkButton from '@atlaskit/button';
import AkTooltip from '@atlaskit/tooltip';
import { DeleteColumnButtonWrap, InsertColumnButtonInner } from './styles';

export interface ButtonProps {
  style?: object;
  onClick?: () => void;
  onMouseEnter?: (SyntheticEvent) => void;
  onMouseLeave?: (SyntheticEvent) => void;
}

class DeleteColumnButton extends React.Component<ButtonProps> {
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
      <DeleteColumnButtonWrap
        style={style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <InsertColumnButtonInner>
          <AkTooltip content="Remove column" position="top">
            <AkButton
              onClick={onClick}
              iconBefore={<CrossIcon size="small" label="Remove column" />}
              appearance={this.state.hover ? 'danger' : 'default'}
              spacing="none"
            />
          </AkTooltip>
        </InsertColumnButtonInner>
      </DeleteColumnButtonWrap>
    );
  }
}

export default DeleteColumnButton;
