import * as React from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import * as Styled from './styled';

interface Props {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: string;
}

interface State {
  isOpen: boolean;
  isHovered: boolean;
}

export class StatefulInlineDialog extends React.Component<Props, State> {
  state = {
    isOpen: false,
    isHovered: false,
  };

  openDialog = () => {
    this.setState({ isOpen: true });
  };

  closeDialog = () => {
    this.setState({ isOpen: false });
  };

  handleMouseOver = () => {
    this.setState({ isHovered: true });
    this.openDialog();
  };

  handleMouseOut = () => {
    this.setState({ isHovered: false });
    this.closeDialog();
  };

  render() {
    const { children, content, placement } = this.props;
    return (
      <Styled.InfoIconWrapper isHovered={this.state.isHovered}>
        <InlineDialog
          content={content}
          placement={placement}
          isOpen={this.state.isOpen}
        >
          <span
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          >
            {children}
          </span>
        </InlineDialog>
      </Styled.InfoIconWrapper>
    );
  }
}

export default StatefulInlineDialog;
