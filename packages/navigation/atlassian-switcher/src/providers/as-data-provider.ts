import { Component, ReactNode } from 'react';
import { isPromise } from '../utils/type-helper';

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
  (props: P): Promise<D> | D;
}

export interface DataProviderProps<D> {
  children: (props: ProviderResult<D> & { isLoading: boolean }) => ReactNode;
}

export default function<P, D>(
  mapPropsToPromise: PropsToPromiseMapper<Readonly<P>, D>,
) {
  return class extends Component<P & DataProviderProps<D>> {
    state: ProviderResult<D> = {
      status: 'loading',
      data: null,
    };

    componentDidMount() {
      const dataSource = mapPropsToPromise(this.props);

      if (isPromise<D>(dataSource)) {
        dataSource
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
      } else {
        this.setState({
          data: dataSource,
          status: 'complete',
        });
      }
    }

    render() {
      return this.props.children({
        ...this.state,
        isLoading: isLoading(this.state),
      });
    }
  };
}
