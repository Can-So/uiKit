import { Component } from 'react';

interface ProviderState {
  isLoading: boolean;
}
interface ProviderProps {
  children(props: {
    data: {} | null;
    isLoading: boolean;
    error: {} | null;
  }): JSX.Element | string;
}

export default class MockProvider extends Component<
  ProviderProps,
  ProviderState
> {
  static defaultProps = {
    children: null,
  };

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

    if (!children) {
      return null;
    }

    return children({
      data: null,
      isLoading,
      error: null,
    });
  }
}
