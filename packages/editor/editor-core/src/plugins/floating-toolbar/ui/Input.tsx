import * as React from 'react';
import { Component } from 'react';
import { Input } from '../../../ui/PanelTextInput/styles';

export interface Props {
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  defaultValue?: string;
  placeholder?: string;
  onBlur?: (text: string) => void;
  onSubmit?: (text: string) => void;
}

export interface State {
  text: string;
}

export default class TextField extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: props.defaultValue || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.text !== nextProps.defaultValue) {
      this.setState({
        text: nextProps.defaultValue,
      });
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.text);
    }
  };

  handleBlur = e => {
    e.preventDefault();
    if (this.props.onBlur) {
      this.props.onBlur(this.state.text);
    }
  };

  render() {
    const { placeholder } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          value={this.state.text}
          onChange={this.handleChange}
          placeholder={placeholder}
          onBlur={this.handleBlur}
        />
      </form>
    );
  }
}
