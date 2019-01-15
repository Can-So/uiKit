import { Component, ReactNode } from 'react';

interface ChildrenProps {
  data: any;
  isLoading: boolean;
  error: any;
}

export interface DataProviderProps {
  children: (props: ChildrenProps) => ReactNode | string;
}

export interface MapPropsToPromiseSignature<T> {
  (props: T): Promise<any> | any;
}

export default function<T extends DataProviderProps>(
  mapPropsToPromise: MapPropsToPromiseSignature<T>,
) {
  return class extends Component<T> {
    state = {
      isLoading: true,
      data: null,
      error: null,
    };

    componentDidMount() {
      const dataSource = mapPropsToPromise(this.props);
      if (dataSource instanceof Promise) {
        dataSource
          .then(result => {
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

      return children({
        data,
        isLoading,
        error,
      });
    }
  };
}
