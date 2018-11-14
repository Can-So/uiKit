import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import { components } from '@atlaskit/select';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './i18n';

export class ClearIndicator extends React.PureComponent<any> {
  private handleMouseEnter = () => {
    this.props.selectProps.onClearIndicatorHover(true);
  };

  private handleMouseLeave = () => {
    this.props.selectProps.onClearIndicatorHover(false);
  };

  // We are overriding handleMouseDown to avoid focusing in the
  // input after clearing the value
  private handleMouseDown = event => {
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    this.props.clearValue();
    event.stopPropagation();
  };

  componentWillUnmount() {
    this.handleMouseLeave();
  }

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <components.ClearIndicator
          {...this.props}
          innerProps={{
            ...this.props.innerProps,
            onMouseDown: this.handleMouseDown,
          }}
        >
          <FormattedMessage {...messages.clear}>
            {(message: string) => <EditorCloseIcon label={message} />}
          </FormattedMessage>
        </components.ClearIndicator>
      </div>
    );
  }
}
