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
import Editor, { EditorProps } from './../src/editor';
import {
  SaveAndCancelButtons,
  ExampleEditor,
  providers,
  mediaProvider,
  analyticsHandler,
  quickInsertProvider,
} from './5-full-page';
import LanguagePicker from '../example-helpers/LanguagePicker';
import EditorContext from './../src/ui/EditorContext';
import { EditorAppearance } from '../src/types';
import { EditorActions } from '../src';
import {
  cardProvider,
  customInsertMenuItems,
} from '@atlaskit/editor-test-helpers';
import { extensionHandlers } from '../example-helpers/extension-handlers';

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
};

const Container = styled.div`
  display: flex;
  margin-top: 0.5em;
`;

const Column: React.ComponentClass<
  React.HTMLAttributes<{}> & { vertical?: boolean }
> = styled.div`
  flex: 1;

  ${p =>
    typeof p.vertical === 'boolean'
      ? p.vertical
        ? `border-right: 1px solid ${colors.N30}; min-height: 85vh`
        : `border-bottom: 1px solid ${colors.N30}`
      : ''}
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
  {
    label: 'Message',
    value: 'message',
    description: 'used for Stride; has now been deprecated.',
  },
  // {
  //   label: 'Inline comment',
  //   value: 'inline-comment',
  //   description: 'should be used for inline comments; no toolbar is displayed',
  // },
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

const formatAppearanceOption = (option, { context }) => {
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
  menu(styles) {
    return { ...styles, zIndex: 9999 };
  },
};

export const Textarea: any = styled.textarea`
  box-sizing: border-box;
  border: 1px solid lightgray;
  font-family: monospace;
  font-size: 14px;

  padding: 1em;

  width: 100%;
  height: 80%;
`;
export default class FullPageRendererExample extends React.Component<
  Props,
  State
> {
  private getDefaultADF = () => {
    const localADF =
      (localStorage &&
        localStorage.getItem('fabric.editor.example.full-page')) ||
      undefined;

    if (localADF) {
      return JSON.parse(localADF);
    } else {
      return { version: 1, type: 'doc', content: [] };
    }
  };

  state: State = {
    locale: 'en',
    messages: enMessages,
    adf: this.getDefaultADF(),
    adfInput: JSON.stringify(this.getDefaultADF(), null, 2),
    appearance: 'full-page',
    showADF: false,
    disabled: false,
    vertical: false,
  };

  private inputRef: HTMLTextAreaElement | null;
  private popupMountPoint: HTMLElement | null;

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
                  onChange={opt => {
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
                      onChange={opt => this.loadDocument(opt, actions)}
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
                    <Button
                      onClick={() => {
                        this.setState(state => ({
                          vertical: !state.vertical,
                        }));
                      }}
                    >
                      Display {!this.state.vertical ? 'Vertical' : 'Horizontal'}
                    </Button>

                    <Button
                      appearance={this.state.disabled ? 'primary' : 'default'}
                      onClick={() => {
                        this.setState(state => ({
                          disabled: !state.disabled,
                        }));
                      }}
                    >
                      {!this.state.disabled ? 'Disable' : 'Enable'} editor
                    </Button>

                    <Button
                      appearance="primary"
                      onClick={() => {
                        this.setState(state => ({
                          showADF: !state.showADF,
                        }));
                      }}
                    >
                      {!this.state.showADF ? 'Show' : 'Hide'} current ADF
                    </Button>
                  </Column>
                </Container>
              </Controls>
              <Container
                style={{
                  flexDirection: this.state.vertical ? 'column' : 'row',
                }}
              >
                <Column vertical={!this.state.vertical}>
                  <IntlProvider
                    locale={this.getLocalTag(locale)}
                    messages={messages}
                  >
                    <Editor
                      appearance={this.state.appearance}
                      analyticsHandler={analyticsHandler}
                      quickInsert={{
                        provider: Promise.resolve(quickInsertProvider),
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
                      allowGapCursor={true}
                      allowTextAlignment={true}
                      allowTemplatePlaceholders={{ allowInserting: true }}
                      UNSAFE_cards={{
                        provider: Promise.resolve(cardProvider),
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
                      defaultValue={this.state.adf}
                      disabled={this.state.disabled}
                      onChange={() => this.onEditorChange(actions)}
                      popupsMountPoint={this.popupMountPoint || undefined}
                      primaryToolbarComponents={
                        <>
                          <LanguagePicker
                            languages={languages}
                            locale={locale}
                            onChange={this.loadLocale}
                          />
                          <SaveAndCancelButtons editorActions={actions} />
                        </>
                      }
                    />
                  </IntlProvider>
                </Column>
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
                      <ReactRenderer
                        document={this.state.adf}
                        adfStage="stage0"
                        dataProviders={ProviderFactory.create({
                          ...providers,
                          mediaProvider,
                        })}
                        // @ts-ignore
                        appearance={this.state.appearance}
                      />
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

  private importADF = actions => {
    if (!this.inputRef) {
      return;
    }

    actions.replaceDocument(this.state.adfInput);

    this.setState({
      showADF: false,
    });
  };

  private loadDocument = async (opt, actions: EditorActions) => {
    if (opt.value === null) {
      actions.clear();
      return;
    }

    const docModule = await import(`../example-helpers/${opt.value}`);
    const adf = docModule.exampleDocument;

    actions.replaceDocument(adf);
  };

  private onEditorChange = async editorActions => {
    const adf = await editorActions.getValue();
    this.setState({ adf, adfInput: JSON.stringify(adf, null, 2) });
  };

  private handleInputChange = event => {
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
