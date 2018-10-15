import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditorView } from 'prosemirror-view';
import { intlShape, IntlShape, IntlProvider } from 'react-intl';

import {
  ProviderFactory,
  Transformer,
  BaseTheme,
  WidthProvider,
} from '@atlaskit/editor-common';
import { getUiComponent } from './create-editor';
import EditorActions from './actions';
import { EditorProps } from './types/editor-props';
import { ReactEditorView } from './create-editor';
import { EventDispatcher } from './event-dispatcher';
import EditorContext from './ui/EditorContext';
import { PortalProvider, PortalRenderer } from './ui/PortalProvider';
import { nextMajorVersion } from './version';

export * from './types';

export default class Editor extends React.Component<EditorProps, {}> {
  static defaultProps: EditorProps = {
    appearance: 'message',
    disabled: false,
    extensionHandlers: {},
  };

  static contextTypes = {
    editorActions: PropTypes.object,
    intl: intlShape,
  };

  context: {
    editorActions?: EditorActions;
    intl: IntlShape;
  };

  private providerFactory: ProviderFactory;
  private editorActions: EditorActions;

  constructor(props: EditorProps, context) {
    super(props);
    this.providerFactory = new ProviderFactory();
    this.deprecationWarnings(props);
    this.onEditorCreated = this.onEditorCreated.bind(this);
    this.onEditorDestroyed = this.onEditorDestroyed.bind(this);
    this.editorActions = (context || {}).editorActions || new EditorActions();
  }

  componentDidMount() {
    this.handleProviders(this.props);
  }

  componentWillReceiveProps(nextProps: EditorProps) {
    this.handleProviders(nextProps);
  }

  componentWillUnmount() {
    this.unregisterEditorFromActions();
    this.providerFactory.destroy();
  }

  onEditorCreated(instance: {
    view: EditorView;
    eventDispatcher: EventDispatcher;
    transformer?: Transformer<string>;
  }) {
    this.registerEditorForActions(
      instance.view,
      instance.eventDispatcher,
      instance.transformer,
    );
    if (this.props.shouldFocus) {
      if (!instance.view.hasFocus()) {
        setTimeout(() => {
          instance.view.focus();
        }, 0);
      }
    }
  }

  private deprecationWarnings(props) {
    const nextVersion = nextMajorVersion();
    const deprecatedProperties = {
      mediaProvider: {
        message:
          'To pass media provider use media property – <Editor media={{ provider }} />',
        type: 'removed',
      },
      allowTasksAndDecisions: {
        message:
          'To allow tasks and decisions use taskDecisionProvider – <Editor taskDecisionProvider={{ provider }} />',
        type: 'removed',
      },
      allowPlaceholderCursor: {
        type: 'removed',
      },
      allowInlineAction: {
        type: 'removed',
      },
      allowConfluenceInlineComment: {
        type: 'removed',
      },
      addonToolbarComponents: {
        type: 'removed',
      },
      cardProvider: {
        type: 'removed',
      },
      allowCodeBlocks: {
        message:
          'To disable codeBlocks use - <Editor allowBlockTypes={{ exclude: ["codeBlocks"] }} />',
      },
      allowLists: {},
      allowHelpDialog: {},
      allowGapCursor: {},
    };

    Object.keys(deprecatedProperties).forEach(property => {
      if (props.hasOwnProperty(property)) {
        const meta = deprecatedProperties[property];
        const type = meta.type || 'enabled by default';

        // tslint:disable-next-line:no-console
        console.warn(
          `${property} property is deprecated. ${meta.message ||
            ''} [Will be ${type} in editor-core@${nextVersion}]`,
        );
      }
    });

    if (!props.hasOwnProperty('appearance')) {
      // tslint:disable-next-line:no-console
      console.warn(
        `The default appearence is changing from "message" to "comment", to main current behaviour use <Editor appearance="message" />. [Will be changed in editor-core@${nextVersion}]`,
      );
    }

    if (
      props.hasOwnProperty('quickInsert') &&
      typeof props.quickInsert === 'boolean'
    ) {
      // tslint:disable-next-line:no-console
      console.warn(
        `quickInsert property is deprecated. [Will be enabled by default in editor-core@${nextVersion}]`,
      );
    }

    if (
      props.hasOwnProperty('allowTables') &&
      typeof props.allowTables !== 'boolean' &&
      !props.allowTables.advanced
    ) {
      // tslint:disable-next-line:no-console
      console.warn(
        `Advanced table options are deprecated (except isHeaderRowRequired) to continue using advanced table features use - <Editor allowTables={{ advanced: true }} /> [Will be changed in editor-core@${nextVersion}]`,
      );
    }
  }

  onEditorDestroyed(instance: {
    view: EditorView;
    transformer?: Transformer<string>;
  }) {
    this.unregisterEditorFromActions();
  }

  private registerEditorForActions(
    editorView: EditorView,
    eventDispatcher: EventDispatcher,
    contentTransformer?: Transformer<string>,
  ) {
    this.editorActions._privateRegisterEditor(
      editorView,
      eventDispatcher,
      contentTransformer,
    );
  }

  private unregisterEditorFromActions() {
    if (this.editorActions) {
      this.editorActions._privateUnregisterEditor();
    }
  }

  private handleProviders(props: EditorProps) {
    const {
      emojiProvider,
      mentionProvider,
      mediaProvider,
      taskDecisionProvider,
      contextIdentifierProvider,
      collabEditProvider,
      activityProvider,
      presenceProvider,
      macroProvider,
      legacyImageUploadProvider,
      media,
      collabEdit,
      quickInsert,
      UNSAFE_cards,
    } = props;
    this.providerFactory.setProvider('emojiProvider', emojiProvider);
    this.providerFactory.setProvider('mentionProvider', mentionProvider);
    this.providerFactory.setProvider(
      'taskDecisionProvider',
      taskDecisionProvider,
    );
    this.providerFactory.setProvider(
      'contextIdentifierProvider',
      contextIdentifierProvider,
    );
    this.providerFactory.setProvider(
      'mediaProvider',
      media && media.provider ? media.provider : mediaProvider,
    );
    this.providerFactory.setProvider(
      'imageUploadProvider',
      legacyImageUploadProvider,
    );
    this.providerFactory.setProvider(
      'collabEditProvider',
      collabEdit && collabEdit.provider
        ? collabEdit.provider
        : collabEditProvider,
    );
    this.providerFactory.setProvider('activityProvider', activityProvider);
    this.providerFactory.setProvider('presenceProvider', presenceProvider);
    this.providerFactory.setProvider('macroProvider', macroProvider);

    if (UNSAFE_cards && UNSAFE_cards.provider) {
      this.providerFactory.setProvider('cardProvider', UNSAFE_cards.provider);
    }

    if (quickInsert && typeof quickInsert !== 'boolean') {
      this.providerFactory.setProvider(
        'quickInsertProvider',
        quickInsert.provider,
      );
    }
  }

  handleSave = (view: EditorView): void => {
    if (!this.props.onSave) {
      return;
    }

    // ED-4021: if you type a short amount of content
    // inside a content-editable on Android, Chrome only sends a
    // compositionend when it feels like it.
    //
    // to work around the PM editable being out of sync with
    // the document, force a DOM sync before calling onSave
    // if we've already started typing
    if (view['inDOMChange']) {
      view['inDOMChange'].finish(true);
    }

    return this.props.onSave(view);
  };

  render() {
    const Component = getUiComponent(this.props.appearance!);

    const overriddenEditorProps = {
      ...this.props,
      onSave: this.props.onSave ? this.handleSave : undefined,
    };

    const editor = (
      <WidthProvider>
        <EditorContext editorActions={this.editorActions}>
          <PortalProvider
            render={portalProviderAPI => (
              <>
                <ReactEditorView
                  editorProps={overriddenEditorProps}
                  portalProviderAPI={portalProviderAPI}
                  providerFactory={this.providerFactory}
                  onEditorCreated={this.onEditorCreated}
                  onEditorDestroyed={this.onEditorDestroyed}
                  render={({ editor, view, eventDispatcher, config }) => (
                    <BaseTheme
                      dynamicTextSizing={this.props.allowDynamicTextSizing}
                    >
                      <Component
                        disabled={this.props.disabled}
                        editorActions={this.editorActions}
                        editorDOMElement={editor}
                        editorView={view}
                        providerFactory={this.providerFactory}
                        eventDispatcher={eventDispatcher}
                        maxHeight={this.props.maxHeight}
                        onSave={this.props.onSave ? this.handleSave : undefined}
                        onCancel={this.props.onCancel}
                        popupsMountPoint={this.props.popupsMountPoint}
                        popupsBoundariesElement={
                          this.props.popupsBoundariesElement
                        }
                        contentComponents={config.contentComponents}
                        primaryToolbarComponents={
                          config.primaryToolbarComponents
                        }
                        secondaryToolbarComponents={
                          config.secondaryToolbarComponents
                        }
                        insertMenuItems={this.props.insertMenuItems}
                        customContentComponents={this.props.contentComponents}
                        customPrimaryToolbarComponents={
                          this.props.primaryToolbarComponents
                        }
                        customSecondaryToolbarComponents={
                          this.props.secondaryToolbarComponents
                        }
                        addonToolbarComponents={
                          this.props.addonToolbarComponents
                        }
                        collabEdit={this.props.collabEdit}
                      />
                    </BaseTheme>
                  )}
                />
                <PortalRenderer portalProviderAPI={portalProviderAPI} />
              </>
            )}
          />
        </EditorContext>
      </WidthProvider>
    );

    return this.context.intl ? (
      editor
    ) : (
      <IntlProvider locale="en">{editor}</IntlProvider>
    );
  }
}
