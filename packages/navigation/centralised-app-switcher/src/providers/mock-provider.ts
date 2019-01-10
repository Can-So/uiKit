import React, { Component } from 'react';

export default class MockProvider extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
  }

  render() {
    const { isLoading } = this.state;
    const { children } = this.props;

    return children({
      data: null,
      isLoading,
      error: null,
    });
  }
}
