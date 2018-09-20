import * as React from 'react';
import { PureComponent } from 'react';
import { Actions } from '../context/context';
import { Consumer } from '../consumers/consumer';

export type Mode = 'view' | 'edit';

export interface Props {
  render(actions: DocumentActions);
}

export interface DocumentActions {
  createDocument(value: any);
  editDocument();
  cancelEdit();
  updateDocument(value: any);
}

export default class WithDocumentActions extends PureComponent<Props> {
  private actionsMapper = (actions: Actions): DocumentActions => ({
    async createDocument(value: any) {
      actions.createDocument(value);
    },

    async editDocument() {
      actions.setDocumentMode('edit');
    },

    async updateDocument(value: any) {
      actions.updateDocument(value);
    },

    async cancelEdit() {
      actions.setDocumentMode('view');
    },
  });

  render() {
    return (
      <Consumer actionsMapper={this.actionsMapper}>
        {this.props.render}
      </Consumer>
    );
  }
}
