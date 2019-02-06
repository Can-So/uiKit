import * as React from 'react';

import { EditorView } from 'prosemirror-view';

import {
  cardProvider,
  customInsertMenuItems,
} from '@atlaskit/editor-test-helpers';

import { validator, ErrorCallback, Entity } from '@atlaskit/adf-utils';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';

import Editor from './../src/editor';
import { EditorAppearance } from '../src/types';
import { EditorActions } from '../src';

import {
  providers,
  mediaProvider,
  analyticsHandler,
  quickInsertProvider,
} from '../examples/5-full-page';
import { extensionHandlers } from './extension-handlers';
import { Error } from './ErrorReport';

export type Props = {
  actions: EditorActions;
  appearance: EditorAppearance;
  adf?: object;
  disabled?: boolean;
  primaryToolbarComponents: React.ReactElement<any>;
  popupMountPoint?: HTMLElement;
  validationTimeout?: number;
  onDocumentChanged?: (adf) => void;
  onDocumentValidated?: (errors?: Error[]) => void;
};

export type State = {
  editorView: EditorView;
};

const DEFAULT_VALIDATION_TIMEOUT = 500;

export default class KitchenSinkEditor extends React.Component<Props, State> {
  private quickInsertProviderPromise = Promise.resolve(quickInsertProvider);
  private cardProviderPromise = Promise.resolve(cardProvider);

  private validatorTimeout?: number;
  private editorView?: EditorView;

  render() {
    const {
      actions,
      appearance,
      adf,
      disabled,
      primaryToolbarComponents,
      popupMountPoint,
    } = this.props;
    return (
      <SmartCardProvider>
        <Editor
          appearance={appearance}
          analyticsHandler={analyticsHandler}
          quickInsert={{
            provider: this.quickInsertProviderPromise,
          }}
          allowCodeBlocks={{ enableKeybindingsForIDE: true }}
          allowLists={true}
          allowTextColor={true}
          allowTables={{
            advanced: true,
          }}
          allowBreakout={true}
          allowJiraIssue={true}
          allowUnsupportedContent={true}
          allowPanel={true}
          allowExtension={{
            allowBreakout: true,
          }}
          allowRule={true}
          allowDate={true}
          allowLayouts={{
            allowBreakout: true,
          }}
          allowTextAlignment={true}
          allowTemplatePlaceholders={{ allowInserting: true }}
          UNSAFE_cards={{
            provider: this.cardProviderPromise,
          }}
          allowStatus={true}
          {...providers}
          media={{
            provider: mediaProvider,
            allowMediaSingle: true,
            allowResizing: true,
          }}
          insertMenuItems={customInsertMenuItems}
          extensionHandlers={extensionHandlers}
          placeholder="Type something here, and watch it render to the side!"
          shouldFocus={true}
          defaultValue={adf}
          disabled={disabled}
          onChange={() => this.onEditorChanged(actions)}
          popupsMountPoint={popupMountPoint}
          primaryToolbarComponents={primaryToolbarComponents}
        />
      </SmartCardProvider>
    );
  }

  componentDidMount() {
    // grab view
    this.editorView = this.props.actions._privateGetEditorView();

    // validate immediately
    this.validateDocument();
  }

  componentWillReceiveProps(newProps: Props) {
    if (this.props.actions !== newProps.actions) {
      this.editorView = newProps.actions._privateGetEditorView();
    }

    if (this.props.adf !== newProps.adf) {
      // set timeout to re-validate
      if (this.validatorTimeout) {
        window.clearTimeout(this.validatorTimeout);
      }

      this.validatorTimeout = window.setTimeout(
        this.validateDocument,
        this.props.validationTimeout || DEFAULT_VALIDATION_TIMEOUT,
      );
    }
  }

  private onEditorChanged = async (editorActions: EditorActions) => {
    const { onDocumentChanged } = this.props;
    if (onDocumentChanged) {
      const adf = await editorActions.getValue();
      onDocumentChanged(adf);
    }
  };

  private validateDocument = () => {
    const doc = this.props.adf;

    if (!this.editorView || !doc || !this.props.onDocumentValidated) {
      return;
    }

    const schema = this.editorView.state.schema;

    const marks = Object.keys(schema.marks);
    const nodes = Object.keys(schema.nodes);
    const errors: Array<Error> = [];

    const errorCb: ErrorCallback = (entity, error) => {
      errors.push({
        entity,
        error,
      });

      return entity;
    };

    validator(nodes, marks, {
      allowPrivateAttributes: true,
    })(doc as Entity, errorCb);

    this.props.onDocumentValidated(errors);
  };
}
