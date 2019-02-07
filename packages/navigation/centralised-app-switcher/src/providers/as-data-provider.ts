import { Component, ReactNode } from 'react';

export interface ChildrenProps<D> {
  data: D | null;
  isLoading: boolean;
  error: any;
}

interface ChildrenCallback<D> {
  (props: ChildrenProps<D>): ReactNode;
}

interface PropsToPromiseMapper<P, D> {
  (props: P): Promise<D> | D;
}

export interface DataProviderProps<D> {
  children: ChildrenCallback<D>;
}

export default function<D, P>(mapPropsToPromise: PropsToPromiseMapper<P, D>) {
  return class extends Component<P & DataProviderProps<D>> {
    state = {
      isLoading: true,
      data: null,
      error: null,
    };

    componentDidMount() {
      /**
       *  We deliberately trick TypeScript to think this.props is of type P here,
       *  otherwise, although P is subset of "P & DataProviderProps<D>",
       *  it would complain that it is incompatible with mapPropsToPromise arguments type.
       */
      const dataSource = mapPropsToPromise((this.props as unknown) as P);
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
      return children({
        data,
        isLoading,
        error,
      });
    }
  };
}
