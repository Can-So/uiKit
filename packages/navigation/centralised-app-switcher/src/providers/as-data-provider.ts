import { Component, ReactNode } from 'react';

export interface ChildrenProps<D> {
  data: D | null;
  isLoading: boolean;
  error: any;
}

interface ChildrenCallback<D> {
  (props: ChildrenProps<D>): ReactNode;
}

export interface DataProviderProps<D> {
  children?: ChildrenCallback<D>;
}

export default function<D, P>(mapPropsToPromise: (props: P) => Promise<D> | D) {
  return class extends Component<P & DataProviderProps<D>> {
    state = {
      isLoading: true,
      data: null,
      error: null,
    };

    componentDidMount() {
      const dataSource = mapPropsToPromise(this.props);
      if (dataSource instanceof Promise) {
        dataSource
          .then((result: D) => {
            this.setState({
              data: result,
              isLoading: false,
            });
          })
          .catch(error => {
            this.setState({
              error,
              isLoading: false,
            });
          });
      } else {
        this.setState({
          data: dataSource,
          isLoading: false,
        });
      }
    }

    render() {
      const { isLoading, data, error } = this.state;
      const { children } = this.props;
      return (children as ChildrenCallback<D>)({
        data,
        isLoading,
        error,
      });
    }
  };
}
