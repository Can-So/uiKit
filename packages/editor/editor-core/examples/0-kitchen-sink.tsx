import * as React from 'react';
import styled from 'styled-components';

import Select from '@atlaskit/select';
import Button from '@atlaskit/button';

import { IntlProvider, addLocaleData } from 'react-intl';
import { ReactRenderer } from '@atlaskit/renderer';
import { colors } from '@atlaskit/theme';
import { ProviderFactory } from '@atlaskit/editor-common';

import enMessages from '../src/i18n/en';
import languages from '../src/i18n/languages';
import WithEditorActions from './../src/ui/WithEditorActions';
import {
  SaveAndCancelButtons,
  providers,
  mediaProvider,
  LOCALSTORAGE_defaultDocKey,
} from './5-full-page';
import LanguagePicker from '../example-helpers/LanguagePicker';
import EditorContext from './../src/ui/EditorContext';
import { EditorAppearance } from '../src/types';
import { EditorActions } from '../src';

import { extensionHandlers } from '../example-helpers/extension-handlers';
import { Provider as SmartCardProvider } from '@atlaskit/smart-card';
import ErrorReport, { Error } from '../example-helpers/ErrorReport';
import KitchenSinkEditor from '../example-helpers/KitchenSinkEditor';
import withSentry from '../example-helpers/withSentry';

const Container = styled.div`
  display: flex;
  margin-top: 0.5em;
`;

const Column: React.ComponentClass<React.HTMLAttributes<{}> & {}> = styled.div`
  flex: 1;
`;

const EditorColumn: React.ComponentClass<
  React.HTMLAttributes<{}> & { vertical: boolean }
> = styled.div`
  flex: 1;
  ${p =>
    p.vertical
      ? `border-right: 1px solid ${colors.N30}; min-height: 85vh`
      : `border-bottom: 1px solid ${colors.N30}`};
`;

const Controls = styled.div`
  border-bottom: 1px dashed ${colors.N50};
  padding: 1em;

  h5 {
    margin-bottom: 0.5em;
  }

  button {
    margin-left: 1em;
  }
`;

const appearanceOptions = [
  {
    label: 'Full page',
    value: 'full-page',
    description:
      'should be used for a full page editor where it is the user focus of the page',
  },
  {
    label: 'Comment',
    value: 'comment',
    description:
      'should be used for things like comments where you have a field input but require a toolbar & save/cancel buttons',
  },
  // {
  //   label: 'Chromeless',
  //   value: 'chromeless',
  //   description: 'is essentially the `comment` editor but without the editor chrome, like toolbar & save/cancel buttons'
  // },
  {
    label: 'Mobile',
    value: 'mobile',
    description:
      'should be used for the mobile web view. It is a full page editor version for mobile.',
  },
];

const docs = [
  { label: 'Empty document', value: null },
  { label: 'Example document', value: 'example-document.ts' },
  { label: 'With huge table', value: 'example-doc-with-huge-table.ts' },
  { label: 'With table', value: 'example-doc-with-table.ts' },
];

const formatAppearanceOption = (
  option: { label: string; description?: string },
  { context }: { context: string },
) => {
  if (context === 'menu') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>{option.label}</div>
        {option.description ? (
          <div
            style={{
              fontSize: 12,
              fontStyle: 'italic',
            }}
          >
            {option.description}
          </div>
        ) : null}
      </div>
    );
  }

  return option.label;
};

const selectStyles = {
  menu(styles: {}) {
    return { ...styles, zIndex: 9999 };
  },
};

export const Textarea = styled.textarea`
  box-sizing: border-box;
  border: 1px solid lightgray;
  font-family: monospace;
  font-size: 14px;
  padding: 1em;
  width: 100%;
  height: 80%;
`;

const LOCALSTORAGE_orientationKey =
  'fabric.editor.example.kitchen-sink.orientation';

export type Props = {};
export type State = {
  locale: string;
  messages: { [key: string]: string };

  adf: object | undefined;
  adfInput: string;

  appearance: EditorAppearance;
  showADF: boolean;
  disabled: boolean;
  vertical: boolean;

  errors: Array<Error>;
  showErrors: boolean;
  waitingToValidate: boolean;
};

class FullPageRendererExample extends React.Component<Props, State> {
  private getJSONFromStorage = (key: string, fallback: any = undefined) => {
    const localADF = (localStorage && localStorage.getItem(key)) || undefined;

    return localADF ? JSON.parse(localADF) : fallback;
  };

  private getDefaultADF = () =>
    this.getJSONFromStorage(LOCALSTORAGE_defaultDocKey, {
      version: 1,
      type: 'doc',
      content: [],
    });

  private getDefaultOrientation = () =>
    this.getJSONFromStorage(LOCALSTORAGE_orientationKey, { vertical: true });

  state: State = {
    locale: 'en',
    messages: enMessages,
    adf: this.getDefaultADF(),
    adfInput: JSON.stringify(this.getDefaultADF(), null, 2),
    appearance: 'full-page',
    showADF: false,
    disabled: false,
    vertical: this.getDefaultOrientation().vertical,
    errors: [],
    showErrors: false,
    waitingToValidate: false,
  };

  private dataProviders = ProviderFactory.create({
    ...providers,
    mediaProvider,
  });

  private inputRef: HTMLTextAreaElement | null;
  private popupMountPoint: HTMLElement | null;

  showHideADF = () =>
    this.setState(state => ({
      showADF: !state.showADF,
    }));

  showHideErrors = () =>
    this.setState(state => ({
      showErrors: !state.showErrors,
    }));

  enableDisableEditor = () =>
    this.setState(state => ({
      disabled: !state.disabled,
    }));

  switchEditorOrientation = () => {
    const vertical = !this.state.vertical;
    this.setState({ vertical });

    localStorage.setItem(
      LOCALSTORAGE_orientationKey,
      JSON.stringify({ vertical: vertical }),
    );
  };

  render() {
    const { locale, messages } = this.state;
    return (
      <EditorContext>
        <WithEditorActions
          render={actions => (
            <div>
              <div
                ref={ref => (this.popupMountPoint = ref)}
                style={{
                  zIndex: 9999,
                }}
              />
              <Controls>
                <Select
                  formatOptionLabel={formatAppearanceOption}
                  options={appearanceOptions}
                  defaultValue={appearanceOptions.find(
                    opt => opt.value === this.state.appearance,
                  )}
                  onChange={(opt: { value: EditorAppearance }) => {
                    this.setState({
                      appearance: opt.value,
                    });
                  }}
                  styles={selectStyles}
                />

                <Container>
                  <Column>
                    <Select
                      formatOptionLabel={formatAppearanceOption}
                      options={docs}
                      onChange={(opt: any) => this.loadDocument(opt, actions)}
                      placeholder="Load an example document..."
                      styles={selectStyles}
                    />
                  </Column>
                  <Column
                    style={{
                      flex: 0,
                      alignItems: 'center',
                      display: 'flex',
                    }}
                  >
                    <Button onClick={this.switchEditorOrientation}>
                      Display {!this.state.vertical ? 'Vertical' : 'Horizontal'}
                    </Button>

                    <Button
                      appearance={this.state.disabled ? 'primary' : 'default'}
                      onClick={this.enableDisableEditor}
                    >
                      {!this.state.disabled ? 'Disable' : 'Enable'} editor
                    </Button>

                    <Button
                      appearance={
                        this.state.errors.length ? 'danger' : 'subtle'
                      }
                      isSelected={this.state.showErrors}
                      onClick={this.showHideErrors}
                      isLoading={this.state.waitingToValidate}
                    >
                      {this.state.errors.length} errors
                    </Button>

                    <Button
                      appearance="primary"
                      isSelected={this.state.showADF}
                      onClick={this.showHideADF}
                    >
                      {!this.state.showADF ? 'Show' : 'Hide'} current ADF
                    </Button>
                  </Column>
                </Container>
                <Container>
                  {this.state.showErrors && (
                    <ErrorReport errors={this.state.errors} />
                  )}
                </Container>
              </Controls>
              <Container
                style={{
                  flexDirection: !this.state.vertical ? 'column' : 'row',
                }}
              >
                <EditorColumn vertical={this.state.vertical}>
                  <IntlProvider
                    locale={this.getLocalTag(locale)}
                    messages={messages}
                  >
                    <KitchenSinkEditor
                      actions={actions}
                      adf={this.state.adf}
                      disabled={this.state.disabled}
                      appearance={this.state.appearance}
                      popupMountPoint={this.popupMountPoint || undefined}
                      onDocumentChanged={this.onDocumentChanged}
                      onDocumentValidated={this.onDocumentValidated}
                      primaryToolbarComponents={
                        <React.Fragment>
                          <LanguagePicker
                            languages={languages}
                            locale={locale}
                            onChange={this.loadLocale}
                          />
                          <SaveAndCancelButtons editorActions={actions} />
                        </React.Fragment>
                      }
                    />
                  </IntlProvider>
                </EditorColumn>
                <Column>
                  {!this.state.showADF ? (
                    <div
                      style={{
                        paddingTop:
                          this.state.appearance === 'full-page'
                            ? '132px'
                            : undefined,
                      }}
                    >
                      <IntlProvider
                        locale={this.getLocalTag(locale)}
                        messages={messages}
                      >
                        <SmartCardProvider>
                          <ReactRenderer
                            document={this.state.adf}
                            adfStage="stage0"
                            dataProviders={this.dataProviders}
                            extensionHandlers={extensionHandlers}
                            // @ts-ignore
                            appearance={this.state.appearance}
                          />
                        </SmartCardProvider>
                      </IntlProvider>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '1em',
                        height: '100%',
                      }}
                    >
                      <Textarea
                        innerRef={ref => (this.inputRef = ref)}
                        value={this.state.adfInput}
                        onChange={this.handleInputChange}
                      />
                      <Button onClick={() => this.importADF(actions)}>
                        Import ADF
                      </Button>
                    </div>
                  )}
                </Column>
              </Container>
            </div>
          )}
        />
      </EditorContext>
    );
  }

  private importADF = (actions: EditorActions) => {
    if (!this.inputRef) {
      return;
    }

    actions.replaceDocument(this.state.adfInput, false);

    this.setState({
      showADF: false,
    });
  };

  private loadDocument = async (
    opt: { value: string | null },
    actions: EditorActions,
  ) => {
    if (opt.value === null) {
      actions.clear();
      return;
    }

    const docModule = await import(`../example-helpers/${opt.value}`);
    const adf = docModule.exampleDocument;

    actions.replaceDocument(adf, false);
  };

  private onDocumentChanged = (adf: any) => {
    this.setState({ adf, adfInput: JSON.stringify(adf, null, 2) });

    // run dat validation spinner
    if (!this.state.waitingToValidate) {
      this.setState({ waitingToValidate: true });
    }
  };

  private onDocumentValidated = (errors?: Array<Error>) => {
    this.setState({ errors: errors || [], waitingToValidate: false });
  };

  private handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    this.setState({ adfInput: event.target.value });
    // the user loads the ADF via the load button; we just update the
    // state of the textarea here
  };

  private loadLocale = async (locale: string) => {
    const localeData = await import(`react-intl/locale-data/${this.getLocalTag(
      locale,
    )}`);
    addLocaleData(localeData.default);
    const messages = await import(`../src/i18n/${locale}`);
    this.setState({ locale, messages: messages.default });
  };

  private getLocalTag = (locale: string) => locale.substring(0, 2);
}

export default withSentry(FullPageRendererExample);
