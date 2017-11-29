import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { normalizeLanguage, languageList } from './supportedLanguages';
import { Theme, applyTheme } from './themes/themeBuilder';

export interface CodeBlockProps {
  /** The code to be formatted */
  text: string;
  /** The language in which the code is written */
  language?: string;
  /** Indicates whether or not to show line numbers */
  showLineNumbers?: boolean;
  /** A custom theme to be applied, implements the Theme interface */
  theme?: Theme;
}

export default class CodeBlock extends PureComponent<CodeBlockProps, {}> {
  static displayName = 'CodeBlock';

  static propTypes = {
    text: PropTypes.string.isRequired,
    language: PropTypes.oneOf(languageList),
    showLineNumbers: PropTypes.bool,
    theme: PropTypes.object,
  };

  static defaultProps = {
    showLineNumbers: true,
    language: 'md',
    theme: {},
  };

  handleCopy(event: any) {
    /**
     * We don't want to copy the markup after highlighting, but rather the preformatted text in the selection
     */
    const data = event.nativeEvent.clipboardData;
    if (data) {
      event.preventDefault();
      const selectedText = window.getSelection().toString();
      const document = `<!doctype html><html><head></head><body><pre>${
        selectedText
      }</pre></body></html>`;
      data.clearData();
      data.setData('text/html', document);
      data.setData('text/plain', selectedText);
    }
  }

  render() {
    const { language } = this.props;
    const {
      lineNumberContainerStyle,
      codeBlockStyle,
      codeContainerStyle,
    } = applyTheme(this.props.theme);
    const props = {
      language: normalizeLanguage(language),
      style: codeBlockStyle,
      showLineNumbers: this.props.showLineNumbers,
      PreTag: 'span',
      codeTagProps: { style: codeContainerStyle } as HTMLElement,
      lineNumberContainerStyle,
    };
    const codeText = this.props.text.toString();

    return (
      <SyntaxHighlighter {...props} onCopy={this.handleCopy}>
        {codeText}
      </SyntaxHighlighter>
    );
  }
}
