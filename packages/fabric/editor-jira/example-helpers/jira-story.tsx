import * as React from 'react';
import { PureComponent } from 'react';
import { action, storiesOf } from '@kadira/storybook';
import { pd } from 'pretty-data';
import {
  storyDecorator,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';
import InlineEdit from '@atlaskit/inline-edit';
import Spinner from '@atlaskit/spinner';
import { name, version } from '../package.json';
import Editor from '../src';
import MentionResource from './mentions/mention-resource';
import { MockActivityResource } from '@atlaskit/activity/dist/es5/support';

const analyticsHandler = (actionName, props) => action(actionName)(props);
const CANCEL_ACTION = () => action('Cancel')();
const SAVE_ACTION = () => action('Save')();
const mentionEncoder = (userId: string) => `/secure/ViewProfile?name=${userId}`;
let handleChange: (editor: Editor) => void;

storiesOf(name, module)
  .addDecorator(function(
    story: Function,
    context: { kind: string; story: string },
  ) {
    type Props = {};
    type State = {
      html: string;
      story?: any;
      prettify?: boolean;
      isMediaReady?: boolean;
    };
    class Demo extends PureComponent<Props, State> {
      state: State;

      constructor(props: Props) {
        super(props);
        handleChange = this.handleChange;
        this.state = {
          html: '',
          prettify: true,
          story: story(),
          isMediaReady: true,
        };
      }

      handleChange = (editor: Editor) => {
        this.setState({ isMediaReady: false });

        action('Change')();

        editor.value.then(value => {
          action('Value has been resolved')(value);
          this.setState({
            isMediaReady: true,
            html: value || '',
          });
        });
      };

      togglePrettify = () => {
        this.setState({ prettify: !this.state.prettify });
      };

      render() {
        const html = this.state.prettify
          ? pd.xml(this.state.html)
          : this.state.html;

        return (
          <div ref="root">
            {this.state.story}
            <fieldset style={{ marginTop: 20 }}>
              <legend>
                HTML (
                <input
                  type="checkbox"
                  checked={this.state.prettify}
                  onChange={this.togglePrettify}
                />
                <span
                  onClick={this.togglePrettify}
                  style={{ cursor: 'pointer' }}
                >
                  {' '}
                  prettify
                </span>
                )
              </legend>
              {this.state.isMediaReady ? (
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {html}
                </pre>
              ) : (
                <div style={{ padding: 20 }}>
                  <Spinner size="large" />
                </div>
              )}
            </fieldset>
          </div>
        );
      }
    }

    return <Demo />;
  })
  .addDecorator(storyDecorator(version))
  .add('Editor', () => <Editor onChange={handleChange} />)
  .add('Editor (allowLists)', () => (
    <Editor onChange={handleChange} allowLists={true} />
  ))
  .add('Editor (allowLinks)', () => (
    <Editor onChange={handleChange} allowLinks={true} />
  ))
  .add('Editor (allowAdvancedTextFormatting)', () => (
    <Editor onChange={handleChange} allowAdvancedTextFormatting={true} />
  ))
  .add('Editor (allowSubSup)', () => (
    <Editor onChange={handleChange} allowSubSup={true} />
  ))
  .add('Editor (allowTextColor)', () => (
    <Editor onChange={handleChange} allowTextColor={true} />
  ))
  .add('Editor (allowCodeBlock)', () => (
    <Editor onChange={handleChange} allowCodeBlock={true} />
  ))
  .add('Editor (allowBlockQuote)', () => (
    <Editor onChange={handleChange} allowBlockQuote={true} />
  ))
  .add('Editor (allowTables)', () => (
    <Editor onChange={handleChange} allowTables={true} />
  ))
  .add('Editor (Mentions)', () => (
    <Editor
      onChange={handleChange}
      mentionProvider={Promise.resolve(new MentionResource())}
      mentionEncoder={mentionEncoder}
    />
  ))
  .add('Editor (Recently viewed in link dialog)', () => (
    <Editor
      onChange={handleChange}
      allowLinks={true}
      activityProvider={Promise.resolve(new MockActivityResource())}
    />
  ))
  .add('Editor with InlineEdit', () => {
    const fabricEditor = (
      <Editor
        mediaProvider={storyMediaProviderFactory()}
        onChange={handleChange}
        isExpandedByDefault={true}
        allowLists={true}
        allowLinks={true}
        allowCodeBlock={true}
        allowAdvancedTextFormatting={true}
        allowSubSup={true}
        allowBlockQuote={true}
        defaultValue="Text"
      />
    );

    return (
      <InlineEdit
        areActionButtonsHidden={true}
        label="@atlaskit/editor-jira + @atlaskit/inline-edit"
        onCancel={action('onCancel')}
        onConfirm={action('onConfirm')}
        editView={<div style={{ flexGrow: 1 }}>{fabricEditor}</div>}
        readView={<div>Click me!</div>}
      />
    );
  })
  .add('Editor (Media)', () => (
    //  TODO: remove the following note and link after the login is not required anymore or there's better way to run the story.
    <div>
      <div style={{ padding: '5px 0' }}>
        ️️️⚠️ Atlassians, make sure you're logged into{' '}
        <a href="https://id.stg.internal.atlassian.com" target="_blank">
          staging Identity server
        </a>.
      </div>
      <Editor
        onChange={handleChange}
        mediaProvider={storyMediaProviderFactory()}
        onCancel={CANCEL_ACTION}
        onSave={SAVE_ACTION}
      />
    </div>
  ))
  .add('Editor (isDisabled)', () => {
    type Props = {};
    type State = { isDisabled: boolean };

    class Demo extends PureComponent<Props, State> {
      state = { isDisabled: true };

      render() {
        return (
          <div>
            <Editor
              isDisabled={this.state.isDisabled}
              isExpandedByDefault={true}
              onCancel={CANCEL_ACTION}
              onSave={SAVE_ACTION}
              onChange={handleChange}
            />

            <fieldset style={{ marginTop: 20 }}>
              <button onClick={this.toggleDisabled}>
                Toggle disabled state
              </button>
            </fieldset>
          </div>
        );
      }

      private toggleDisabled = () =>
        this.setState({ isDisabled: !this.state.isDisabled });
    }

    return <Demo />;
  })
  .add('Editor (All flags)', () => (
    <Editor
      onChange={handleChange}
      onCancel={CANCEL_ACTION}
      onSave={SAVE_ACTION}
      allowLists={true}
      allowLinks={true}
      allowCodeBlock={true}
      allowTables={true}
      allowAdvancedTextFormatting={true}
      allowSubSup={true}
      allowTextColor={true}
      allowBlockQuote={true}
      analyticsHandler={analyticsHandler}
      mediaProvider={storyMediaProviderFactory()}
      mentionProvider={Promise.resolve(new MentionResource())}
      mentionEncoder={mentionEncoder}
      // tslint:disable-next-line:jsx-no-lambda
      renderFooter={({ saveDisabled }) => (
        <div style={{ textAlign: 'right' }}>Some extra footer content</div>
      )}
    />
  ))
  .add('Editor with HTML Input', () => {
    type Props = {};
    type State = { input: string; output: string; key: number };
    class Demo extends PureComponent<Props, State> {
      state = { input: '', output: '', key: 1 };
      refs: {
        input: HTMLTextAreaElement;
      };

      render() {
        return (
          <div ref="root">
            <fieldset style={{ marginTop: 20, marginBottom: 20 }}>
              <legend>Input</legend>
              <textarea
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid lightgray',
                  fontFamily: 'monospace',
                  padding: 10,
                  width: '100%',
                  height: 100,
                }}
                ref="input"
              />
              <button onClick={this.handleImportClick}>Import</button>
            </fieldset>
            <Editor
              isExpandedByDefault={true}
              onCancel={CANCEL_ACTION}
              onChange={handleChange}
              onSave={SAVE_ACTION}
              defaultValue={this.state.input}
              key={this.state.key}
              allowLists={true}
              allowLinks={true}
              allowCodeBlock={true}
              allowAdvancedTextFormatting={true}
              allowSubSup={true}
              allowTextColor={true}
              allowBlockQuote={true}
              mediaProvider={storyMediaProviderFactory()}
              mentionProvider={Promise.resolve(new MentionResource())}
              mentionEncoder={mentionEncoder}
            />
          </div>
        );
      }

      private handleImportClick = () =>
        this.setState({
          input: this.refs.input.value,
          key: this.state.key + 1,
        });
    }

    return <Demo />;
  });
