import * as React from 'react';
import { PureComponent } from 'react';
import { State } from '../context/context';
import { Consumer } from './consumer';
import { default as Document } from '../components/document';

export interface Props {}

export default class DocumentBody extends PureComponent<Props> {
  private renderChild = (props: any) => {
    return <Document {...this.props} {...props} />;
  };

  private stateMapper = (state: State): any => {
    const { doc, hasError, isLoading, mode } = state;

    return {
      doc,
      hasError,
      isLoading,
      mode,
    };
  };

  private renderPropsMapper = (renderProps: any): any => {
    const { renderTitle, renderToolbar } = renderProps;
    return {
      renderTitle,
      renderToolbar,
    };
  };

  render() {
    return (
      <Consumer
        stateMapper={this.stateMapper}
        renderPropsMapper={this.renderPropsMapper}
      >
        {this.renderChild}
      </Consumer>
    );
  }
}
