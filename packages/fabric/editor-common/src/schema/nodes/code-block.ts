import { NodeSpec, Node as PMNode } from 'prosemirror-model';
import { browser } from '../../utils';
import { Definition as Text } from './text';
import { NoMark } from './doc';

/**
 * @name codeBlock_node
 */
export interface Definition {
  type: 'codeBlock';
  content?: Array<Text & NoMark>;
  attrs?: {
    language?:
      | 'abap'
      | 'actionscript'
      | 'ada'
      | 'arduino'
      | 'autoit'
      | 'c'
      | 'c++'
      | 'clojure'
      | 'coffeescript'
      | 'csharp'
      | 'css'
      | 'cuda'
      | 'd'
      | 'dart'
      | 'delphi'
      | 'elixir'
      | 'erlang'
      | 'fortran'
      | 'foxpro'
      | 'go'
      | 'groovy'
      | 'haskell'
      | 'haxe'
      | 'html'
      | 'java'
      | 'javascript'
      | 'json'
      | 'julia'
      | 'kotlin'
      | 'latex'
      | 'livescript'
      | 'lua'
      | 'mathematica'
      | 'matlab'
      | 'objective-c'
      | 'objective-j'
      | 'objectpascal'
      | 'ocaml'
      | 'octave'
      | 'perl'
      | 'php'
      | 'powershell'
      | 'prolog'
      | 'puppet'
      | 'python'
      | 'qml'
      | 'r'
      | 'racket'
      | 'restructuredtext'
      | 'ruby'
      | 'rust'
      | 'sass'
      | 'scala'
      | 'scheme'
      | 'shell'
      | 'smalltalk'
      | 'sql'
      | 'standardml'
      | 'swift'
      | 'tcl'
      | 'tex'
      | 'typescript'
      | 'vala'
      | 'vbnet'
      | 'verilog'
      | 'vhdl'
      | 'xml'
      | 'xquery';
  };
}

const getLanguageFromEditorStyle = (dom: HTMLElement): string | undefined => {
  return dom.getAttribute('data-language') || undefined;
};

// example of BB style:
// <div class="codehilite language-javascript"><pre><span>hello world</span><span>\n</span></pre></div>
const getLanguageFromBitbucketStyle = (
  dom: HTMLElement,
): string | undefined => {
  if (dom && dom.classList.contains('codehilite')) {
    // code block html from Bitbucket always contains an extra new line
    return extractLanguageFromClass(dom.className);
  }
};

const extractLanguageFromClass = (className: string): string | undefined => {
  const languageRegex = /(?:^|\s)language-([^\s]+)/;
  const result = languageRegex.exec(className);
  if (result && result[1]) {
    return result[1];
  }
};

const removeLastNewLine = (dom: HTMLElement): HTMLElement => {
  const parent = dom && dom.parentElement;
  if (parent && parent.classList.contains('codehilite')) {
    dom.textContent = dom.textContent!.replace(/\n$/, '');
  }
  return dom;
};

export const codeBlock: NodeSpec = {
  attrs: { language: { default: null }, uniqueId: { default: null } },
  content: 'text*',
  marks: '',
  group: 'block',
  code: true,
  defining: true,
  parseDOM: [
    {
      tag: 'pre',
      preserveWhitespace: 'full',
      getAttrs: (dom: HTMLElement) => {
        const language =
          getLanguageFromBitbucketStyle(dom.parentElement!) ||
          getLanguageFromEditorStyle(dom.parentElement!) ||
          dom.getAttribute('data-language')!;
        dom = removeLastNewLine(dom);
        return { language };
      },
    },
    // Handle VSCode paste
    // Checking `white-space: pre-wrap` is too aggressive @see ED-2627
    {
      tag: 'div[style]',
      preserveWhitespace: 'full',
      getAttrs: (dom: HTMLElement) => {
        if (
          dom.style.whiteSpace === 'pre' ||
          (dom.style.fontFamily &&
            dom.style.fontFamily.toLowerCase().indexOf('monospace') > -1)
        ) {
          return {};
        }
        return false;
      },
    },
    // Handle GitHub/Gist paste
    {
      tag: 'table[style]',
      preserveWhitespace: 'full',
      getAttrs: (dom: HTMLElement) => {
        if (dom.querySelector('td[class*="blob-code"]')) {
          return {};
        }
        return false;
      },
    },
  ],
  toDOM(node) {
    const className = browser.ie && browser.ie_version <= 11 ? 'ie11' : '';
    return [
      'pre',
      { 'data-language': node.attrs.language, class: className },
      0,
    ];
  },
};

export const toJSON = (node: PMNode) => ({
  attrs: Object.keys(node.attrs).reduce((memo, key) => {
    if (key === 'uniqueId') {
      return memo;
    }

    if (key === 'language' && node.attrs.language === null) {
      return memo;
    }

    memo[key] = node.attrs[key];
    return memo;
  }, {}),
});
