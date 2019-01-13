import { Component, ReactNode } from 'react';

interface ChildrenProps {
  data: any;
  isLoading: boolean;
  error: any;
}

export interface DataProviderProps {
  children: (props: ChildrenProps) => ReactNode | string;
}

export interface JiraDataProviderProps extends DataProviderProps {
  cloudId: string;
}

export default function(mapPropsToPromise) {
  return class extends Component<DataProviderProps | JiraDataProviderProps> {
    state = {
      isLoading: true,
      data: null,
      error: null,
    };

    componentDidMount() {
      const dataSources = mapPropsToPromise(this.props);

      Object.keys(dataSources)
        .reduce((resultingPromise, dataSourceKey) => {
          const dataSource = dataSources[dataSourceKey];
          if (dataSource instanceof Promise) {
            return Promise.all([resultingPromise, dataSource]).then(
              ([results, dataSourceResult]) => ({
                ...results,
                [dataSourceKey]: dataSourceResult,
              }),
            );
          } else {
            return resultingPromise.then(results => ({
              ...results,
              [dataSourceKey]: dataSource,
            }));
          }
        }, Promise.resolve({}))
        .then(results => {
          this.setState({
            data: results,
            isLoading: false,
          });
        })
        .catch(error => {
          this.setState({
            error,
            isLoading: false,
          });
        });
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
