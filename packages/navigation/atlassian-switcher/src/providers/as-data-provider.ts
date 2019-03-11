import { Component, ReactNode } from 'react';

export interface ResultComplete<T> {
  status: 'complete';
  data: T;
}

export interface ResultLoading {
  status: 'loading';
  data: null;
}

export interface ResultError {
  status: 'error';
  error: any;
  data: null;
}

export const isComplete = <T>(
  result: ProviderResult<T>,
): result is ResultComplete<T> => result.status === 'complete';

export const isError = <T>(result: ProviderResult<T>): result is ResultError =>
  result.status === 'error';

export const isLoading = <T>(
  result: ProviderResult<T>,
): result is ResultLoading => result.status === 'loading';

export type ProviderResult<T> = ResultComplete<T> | ResultLoading | ResultError;

interface PropsToPromiseMapper<P, D> {
  (props: P): Promise<D>;
}

export interface DataProviderProps<D> {
  children: (props: ProviderResult<D> & { isLoading: boolean }) => ReactNode;
}

export default function<P, D>(
  mapPropsToPromise: PropsToPromiseMapper<Readonly<P>, D>,
  mapPropsToInitialValue?: PropsToPromiseMapper<Readonly<P>, D | void>,
) {
  return class extends Component<P & DataProviderProps<D>> {
    state: ProviderResult<D> = {
      status: 'loading',
      data: null,
    };

    componentDidMount() {
      if (mapPropsToInitialValue) {
        mapPropsToInitialValue(this.props).then(initialValue => {
          if (initialValue !== undefined) {
            this.setState({
              data: initialValue,
              status: 'complete',
            });
          }
        });
      }

      mapPropsToPromise(this.props)
        .then(result => {
          this.setState({
            data: result,
            status: 'complete',
          });
        })
        .catch(error => {
          this.setState({
            error,
            status: 'error',
          });
        });
    }

    render() {
      return this.props.children({
        ...this.state,
        isLoading: isLoading(this.state),
      });
    }
  };
}
