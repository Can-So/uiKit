import * as React from 'react';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { browser } from '@atlaskit/editor-common';
import CloseIcon from '@atlaskit/icon/glyph/editor/close';
import Modal from '@atlaskit/modal-dialog';
import {
  Header,
  ContentWrapper,
  Line,
  Content,
  ColumnRight,
  ColumnLeft,
  Row,
  CodeSm,
  CodeMd,
  CodeLg,
  Title,
} from './styles';
import * as keymaps from '../../../keymaps';
import ToolbarButton from '../../../ui/ToolbarButton';
import { closeHelpCommand } from '../';

// tslint:disable-next-line:variable-name
const AkModalDialog: React.ComponentClass<any> = Modal;

export interface Format {
  name: string;
  type: string;
  keymap?: Function;
  autoFormatting?: Function;
}

export const formatting: Format[] = [
  {
    name: 'Bold',
    type: 'strong',
    keymap: () => keymaps.toggleBold,
    autoFormatting: () => (
      <span>
        <CodeLg>**Bold**</CodeLg>
      </span>
    ),
  },
  {
    name: 'Italic',
    type: 'em',
    keymap: () => keymaps.toggleItalic,
    autoFormatting: () => (
      <span>
        <CodeLg>*Italic*</CodeLg>
      </span>
    ),
  },
  {
    name: 'Underline',
    type: 'underline',
    keymap: () => keymaps.toggleUnderline,
  },
  {
    name: 'Strikethrough',
    type: 'strike',
    keymap: () => keymaps.toggleStrikethrough,
    autoFormatting: () => (
      <span>
        <CodeLg>~~strikethrough~~</CodeLg>
      </span>
    ),
  },
  {
    name: 'Heading 1',
    type: 'heading',
    autoFormatting: () => (
      <span>
        <CodeSm>#</CodeSm> + <CodeLg>space</CodeLg>
      </span>
    ),
  },
  {
    name: 'Heading 5',
    type: 'heading',
    autoFormatting: () => (
      <span>
        <CodeLg>#####</CodeLg> + <CodeLg>space</CodeLg>
      </span>
    ),
  },
  {
    name: 'Numbered list',
    type: 'orderedList',
    keymap: () => keymaps.toggleOrderedList,
    autoFormatting: () => (
      <span>
        <CodeSm>1.</CodeSm> + <CodeLg>space</CodeLg>
      </span>
    ),
  },
  {
    name: 'Bulleted list',
    type: 'bulletList',
    keymap: () => keymaps.toggleBulletList,
    autoFormatting: () => (
      <span>
        <CodeSm>*</CodeSm> + <CodeLg>space</CodeLg>
      </span>
    ),
  },
  {
    name: 'Quote',
    type: 'blockquote',
    keymap: () => keymaps.toggleBlockQuote,
    autoFormatting: () => (
      <span>
        <CodeLg>></CodeLg> + <CodeLg>space</CodeLg>
      </span>
    ),
  },
  {
    name: 'Code block',
    type: 'codeBlock',
    autoFormatting: () => (
      <span>
        <CodeLg>```</CodeLg>
      </span>
    ),
  },
  {
    name: 'Divider',
    type: 'rule',
    keymap: () => keymaps.insertRule,
    autoFormatting: () => (
      <span>
        <CodeLg>---</CodeLg>
      </span>
    ),
  },
  {
    name: 'Link',
    type: 'link',
    keymap: ({ appearance }) =>
      appearance && appearance !== 'message' ? keymaps.addLink : undefined,
    autoFormatting: () => (
      <span>
        <CodeLg>[Link](http://a.com)</CodeLg>
      </span>
    ),
  },
  {
    name: 'Code',
    type: 'code',
    keymap: () => keymaps.toggleCode,
    autoFormatting: () => (
      <span>
        <CodeLg>`code`</CodeLg>
      </span>
    ),
  },
  {
    name: 'Actions',
    type: 'taskItem',
    autoFormatting: () => (
      <span>
        <CodeSm>[]</CodeSm> + <CodeLg>space</CodeLg>
      </span>
    ),
  },
  {
    name: 'Decisions',
    type: 'decisionItem',
    autoFormatting: () => (
      <span>
        <CodeSm>&lt;&gt;</CodeSm> + <CodeLg>space</CodeLg>
      </span>
    ),
  },
  {
    name: 'Emoji',
    type: 'emoji',
    autoFormatting: () => (
      <span>
        <CodeLg>:</CodeLg>
      </span>
    ),
  },
  {
    name: 'Mention',
    type: 'mention',
    autoFormatting: () => (
      <span>
        <CodeLg>@</CodeLg>
      </span>
    ),
  },
];

export const getSupportedFormatting = (schema: Schema): Format[] => {
  return formatting.filter(
    format => schema.nodes[format.type] || schema.marks[format.type],
  );
};

export const getComponentFromKeymap = (keymap): any => {
  const currentMap = keymap[browser.mac ? 'mac' : 'windows'];
  const keyParts = currentMap.replace(/\-(?=.)/g, ' + ').split(' ');
  return (
    <span>
      {keyParts.map((part, index) => {
        if (part === '+') {
          return <span key={`${currentMap}-${index}`}>{' + '}</span>;
        } else if (part === 'Cmd') {
          return <CodeSm key={`${currentMap}-${index}`}>⌘</CodeSm>;
        } else if (
          ['ctrl', 'alt', 'opt', 'shift'].indexOf(part.toLowerCase()) >= 0
        ) {
          return (
            <CodeMd key={`${currentMap}-${index}`}>{part.toLowerCase()}</CodeMd>
          );
        }
        return <CodeSm key={`${currentMap}-${index}`}>{part}</CodeSm>;
      })}
    </span>
  );
};

export interface Props {
  editorView: EditorView;
  isVisible: boolean;
  appearance?: string;
}

// tslint:disable-next-line:variable-name
const ModalHeader = ({ onClose, showKeyline }) => (
  <Header showKeyline={showKeyline}>
    Keyboard shortcuts
    <div>
      <ToolbarButton
        onClick={onClose}
        title="Close help dialog"
        iconBefore={<CloseIcon label="Close help dialog" size="large" />}
      />
    </div>
  </Header>
);

export default class HelpDialog extends React.Component<Props, any> {
  private formatting: Format[];

  constructor(props) {
    super(props);
    const { schema } = this.props.editorView.state;
    this.formatting = getSupportedFormatting(schema);
  }

  closeDialog = () => {
    const { state: { tr }, dispatch } = this.props.editorView;
    closeHelpCommand(tr, dispatch);
  };

  handleEsc = e => {
    if (e.key === 'Escape' && this.props.isVisible) {
      this.closeDialog();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <AkModalDialog
        width="large"
        onClose={this.closeDialog}
        header={ModalHeader}
      >
        <ContentWrapper>
          <Line />
          <Content>
            <ColumnLeft>
              <Title>Text Formatting</Title>
              <div>
                {this.formatting
                  .filter(form => {
                    const keymap = form.keymap && form.keymap(this.props);
                    return keymap && keymap[browser.mac ? 'mac' : 'windows'];
                  })
                  .map(form => (
                    <Row key={`textFormatting-${form.name}`}>
                      <span>{form.name}</span>
                      {getComponentFromKeymap(
                        form.keymap!({ appearance: this.props.appearance }),
                      )}
                    </Row>
                  ))}
              </div>
            </ColumnLeft>
            <ColumnRight>
              <Title>Markdown</Title>
              <div>
                {this.formatting.map(
                  form =>
                    form.autoFormatting && (
                      <Row key={`autoFormatting-${form.name}`}>
                        <span>{form.name}</span>
                        {form.autoFormatting()}
                      </Row>
                    ),
                )}
              </div>
            </ColumnRight>
          </Content>
        </ContentWrapper>
      </AkModalDialog>
    );
  }
}
