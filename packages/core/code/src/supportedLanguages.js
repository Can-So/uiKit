// @flow
/* eslint import/no-dynamic-require: 0, global-require: 0 */
import SyntaxHighlighter from 'react-syntax-highlighter/prism-async-light';
import memoizeOne from 'memoize-one';

/*
 * Only load the base languages required to get other languages to work.
 */

import markup from 'react-syntax-highlighter/languages/prism/markup';
import markupTemplating from 'react-syntax-highlighter/languages/prism/markup-templating';
import clike from 'react-syntax-highlighter/languages/prism/clike';

/*
  Markup, markup-templating & clike are base languages required to get the others to work.
  Technically we could probably also async load those, but for simplicity sake we're just always loading them.
*/
SyntaxHighlighter.registerLanguage('markup', markup);
SyntaxHighlighter.registerLanguage('markup-templating', markupTemplating);
SyntaxHighlighter.registerLanguage('clike', clike);

const createAsyncLanguageLoader = (name, loader) => {
  return async () => {
    const { default: language } = await loader();
    SyntaxHighlighter.registerLanguage(name, language);
  };
};

export const languageLoaders = {
  coffeescript: createAsyncLanguageLoader('cofeescript', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_coffeescript" */ 'react-syntax-highlighter/languages/prism/coffeescript'),
  ),
  cpp: createAsyncLanguageLoader('cpp', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_cpp" */ 'react-syntax-highlighter/languages/prism/cpp'),
  ),
  csharp: createAsyncLanguageLoader('csharp', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_csharp" */ 'react-syntax-highlighter/languages/prism/csharp'),
  ),
  css: createAsyncLanguageLoader('css', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_css" */ 'react-syntax-highlighter/languages/prism/css'),
  ),
  d: createAsyncLanguageLoader('d', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_d" */ 'react-syntax-highlighter/languages/prism/d'),
  ),
  go: createAsyncLanguageLoader('go', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_go" */ 'react-syntax-highlighter/languages/prism/go'),
  ),
  groovy: createAsyncLanguageLoader('groovy', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_groovy" */ 'react-syntax-highlighter/languages/prism/groovy'),
  ),
  java: createAsyncLanguageLoader('java', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_java" */ 'react-syntax-highlighter/languages/prism/java'),
  ),
  javascript: createAsyncLanguageLoader('javascript', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_javascript" */ 'react-syntax-highlighter/languages/prism/javascript'),
  ),
  kotlin: createAsyncLanguageLoader('kotlin', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_kotlin" */ 'react-syntax-highlighter/languages/prism/kotlin'),
  ),
  lua: createAsyncLanguageLoader('lua', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_lua" */ 'react-syntax-highlighter/languages/prism/lua'),
  ),
  objectivec: createAsyncLanguageLoader('objectivec', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_objectivec" */ 'react-syntax-highlighter/languages/prism/objectivec'),
  ),
  php: createAsyncLanguageLoader('php', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_php" */ 'react-syntax-highlighter/languages/prism/php'),
  ),
  python: createAsyncLanguageLoader('python', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_python" */ 'react-syntax-highlighter/languages/prism/python'),
  ),
  ruby: createAsyncLanguageLoader('ruby', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_ruby" */ 'react-syntax-highlighter/languages/prism/ruby'),
  ),
  rust: createAsyncLanguageLoader('rust', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_rust" */ 'react-syntax-highlighter/languages/prism/rust'),
  ),
  scala: createAsyncLanguageLoader('scala', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_scala" */ 'react-syntax-highlighter/languages/prism/scala'),
  ),
  shell: createAsyncLanguageLoader('shell', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_bash" */ 'react-syntax-highlighter/languages/prism/bash'),
  ),
  sql: createAsyncLanguageLoader('sql', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_sql" */ 'react-syntax-highlighter/languages/prism/sql'),
  ),
  swift: createAsyncLanguageLoader('swift', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_swift" */ 'react-syntax-highlighter/languages/prism/swift'),
  ),
  typescript: createAsyncLanguageLoader('typescript', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_typescript" */ 'react-syntax-highlighter/languages/prism/typescript'),
  ),
  yaml: createAsyncLanguageLoader('yaml', () =>
    import(/* webpackChunkName: "react-syntax-highlighter_languages_prism_yaml" */ 'react-syntax-highlighter/languages/prism/yaml'),
  ),
};

/*
 * These values all those are supported by ADF.
 * The comments show mappings of these values to the corresponding
 * language definition file, or to that of the most
 * syntactically similar language supported by highlightjs
 */
export type ADFSupportedLanguages =
  | 'abap' // → sql
  | 'actionscript'
  | 'ada'
  | 'arduino'
  | 'autoit'
  | 'c' // → cpp
  | 'c++' // → cpp
  | 'coffeescript'
  | 'csharp' // → cs
  | 'css'
  | 'cuda' // → cpp
  | 'd'
  | 'dart'
  | 'delphi'
  | 'elixir'
  | 'erlang'
  | 'fortran'
  | 'foxpro' // → purebasic
  | 'go'
  | 'groovy'
  | 'haskell'
  | 'haxe'
  | 'html' // → xml
  | 'java'
  | 'javascript'
  | 'json'
  | 'julia'
  | 'kotlin'
  | 'latex' // → tex
  | 'livescript'
  | 'lua'
  | 'mathematica'
  | 'matlab'
  | 'objective-c' // → objectivec
  | 'objective-j' // → objectivec
  | 'objectpascal' // → delphi
  | 'ocaml'
  | 'octave' // → matlab
  | 'perl'
  | 'php'
  | 'powershell'
  | 'prolog'
  | 'puppet'
  | 'python'
  | 'qml'
  | 'r'
  | 'racket' // → lisp
  | 'restructuredtext' // → rest
  | 'ruby'
  | 'rust'
  | 'sass' // → less
  | 'scala'
  | 'scheme'
  | 'shell'
  | 'smalltalk'
  | 'sql'
  | 'standardml' // → sml
  | 'swift'
  | 'tcl'
  | 'tex'
  | 'text'
  | 'typescript'
  | 'vala'
  | 'vbnet'
  | 'verilog'
  | 'vhdl'
  | 'xml'
  | 'xquery';

export const SUPPORTED_LANGUAGES = Object.freeze([
  {
    name: 'PHP',
    alias: ['php', 'php3', 'php4', 'php5'],
    value: 'php',
  },
  {
    name: 'Java',
    alias: ['java'],
    value: 'java',
  },
  {
    name: 'CSharp',
    alias: ['csharp', 'c#'],
    value: 'cs',
  },
  {
    name: 'Python',
    alias: ['python', 'py'],
    value: 'python',
  },
  {
    name: 'JavaScript',
    alias: ['javascript', 'js'],
    value: 'javascript',
  },
  {
    name: 'Html',
    alias: ['html'],
    value: 'xml',
  },
  {
    name: 'C++',
    alias: ['c++', 'cpp', 'clike'],
    value: 'cpp',
  },
  {
    name: 'Ruby',
    alias: ['ruby', 'rb', 'duby'],
    value: 'ruby',
  },
  {
    name: 'Objective-C',
    alias: ['objective-c', 'objectivec', 'obj-c', 'objc'],
    value: 'objectivec',
  },
  {
    name: 'C',
    alias: ['c'],
    value: 'cpp',
  },
  {
    name: 'Swift',
    alias: ['swift'],
    value: 'swift',
  },
  {
    name: 'TeX',
    alias: ['tex', 'latex'],
    value: 'tex',
  },
  {
    name: 'Shell',
    alias: ['shell', 'bash', 'sh', 'ksh', 'zsh'],
    value: 'shell',
  },
  {
    name: 'Scala',
    alias: ['scala'],
    value: 'scala',
  },
  {
    name: 'Go',
    alias: ['go'],
    value: 'go',
  },
  {
    name: 'ActionScript',
    alias: ['actionscript', 'actionscript3', 'as'],
    value: 'actionscript',
  },
  {
    name: 'ColdFusion',
    alias: ['coldfusion'],
    value: 'xml',
  },
  {
    name: 'JavaFX',
    alias: ['javafx', 'jfx'],
    value: 'java',
  },
  {
    name: 'VbNet',
    alias: ['vbnet', 'vb.net'],
    value: 'vbnet',
  },
  {
    name: 'JSON',
    alias: ['json'],
    value: 'json',
  },
  {
    name: 'MATLAB',
    alias: ['matlab'],
    value: 'matlab',
  },
  {
    name: 'Groovy',
    alias: ['groovy'],
    value: 'groovy',
  },
  {
    name: 'SQL',
    alias: [
      'sql',
      'postgresql',
      'postgres',
      'plpgsql',
      'psql',
      'postgresql-console',
      'postgres-console',
      'tsql',
      't-sql',
      'mysql',
      'sqlite',
    ],
    value: 'sql',
  },
  {
    name: 'R',
    alias: ['r'],
    value: 'r',
  },
  {
    name: 'Perl',
    alias: ['perl', 'pl'],
    value: 'perl',
  },
  {
    name: 'Lua',
    alias: ['lua'],
    value: 'lua',
  },
  {
    name: 'Delphi',
    alias: ['delphi', 'pas', 'pascal', 'objectpascal'],
    value: 'delphi',
  },
  {
    name: 'XML',
    alias: ['xml'],
    value: 'xml',
  },
  {
    name: 'TypeScript',
    alias: ['typescript', 'ts'],
    value: 'typescript',
  },
  {
    name: 'CoffeeScript',
    alias: ['coffeescript', 'coffee-script', 'coffee'],
    value: 'coffeescript',
  },
  {
    name: 'Haskell',
    alias: ['haskell', 'hs'],
    value: 'haskell',
  },
  {
    name: 'Puppet',
    alias: ['puppet'],
    value: 'puppet',
  },
  {
    name: 'Arduino',
    alias: ['arduino'],
    value: 'arduino',
  },
  {
    name: 'Fortran',
    alias: ['fortran'],
    value: 'fortran',
  },
  {
    name: 'Erlang',
    alias: ['erlang', 'erl'],
    value: 'erlang',
  },
  {
    name: 'PowerShell',
    alias: ['powershell', 'posh', 'ps1', 'psm1'],
    value: 'powershell',
  },
  {
    name: 'Haxe',
    alias: ['haxe', 'hx', 'hxsl'],
    value: 'haxe',
  },
  {
    name: 'Elixir',
    alias: ['elixir', 'ex', 'exs'],
    value: 'elixir',
  },
  {
    name: 'Verilog',
    alias: ['verilog', 'v'],
    value: 'verilog',
  },
  {
    name: 'Rust',
    alias: ['rust'],
    value: 'rust',
  },
  {
    name: 'VHDL',
    alias: ['vhdl'],
    value: 'vhdl',
  },
  {
    name: 'Sass',
    alias: ['sass'],
    value: 'less',
  },
  {
    name: 'OCaml',
    alias: ['ocaml'],
    value: 'ocaml',
  },
  {
    name: 'Dart',
    alias: ['dart'],
    value: 'dart',
  },
  {
    name: 'CSS',
    alias: ['css'],
    value: 'css',
  },
  {
    name: 'reStructuredText',
    alias: ['restructuredtext', 'rst', 'rest'],
    value: 'rest',
  },
  {
    name: 'ObjectPascal',
    alias: ['objectpascal'],
    value: 'delphi',
  },
  {
    name: 'Kotlin',
    alias: ['kotlin'],
    value: 'kotlin',
  },
  {
    name: 'D',
    alias: ['d'],
    value: 'd',
  },
  {
    name: 'Octave',
    alias: ['octave'],
    value: 'matlab',
  },
  {
    name: 'QML',
    alias: ['qbs', 'qml'],
    value: 'qml',
  },
  {
    name: 'Prolog',
    alias: ['prolog'],
    value: 'prolog',
  },
  {
    name: 'FoxPro',
    alias: ['foxpro', 'vfp', 'clipper', 'xbase'],
    value: 'vbnet',
  },
  {
    name: 'Scheme',
    alias: ['scheme', 'scm'],
    value: 'scheme',
  },
  {
    name: 'CUDA',
    alias: ['cuda', 'cu'],
    value: 'cpp',
  },
  {
    name: 'Julia',
    alias: ['julia', 'jl'],
    value: 'julia',
  },
  {
    name: 'Racket',
    alias: ['racket', 'rkt'],
    value: 'lisp',
  },
  {
    name: 'Ada',
    alias: ['ada', 'ada95', 'ada2005'],
    value: 'ada',
  },
  {
    name: 'Tcl',
    alias: ['tcl'],
    value: 'tcl',
  },
  {
    name: 'Mathematica',
    alias: ['mathematica', 'mma', 'nb'],
    value: 'mathematica',
  },
  {
    name: 'Autoit',
    alias: ['autoit'],
    value: 'autoit',
  },
  {
    name: 'StandardML',
    alias: ['standardmL', 'sml', 'standardml'],
    value: 'sml',
  },
  {
    name: 'Objective-J',
    alias: ['objective-j', 'objectivej', 'obj-j', 'objj'],
    value: 'objectivec',
  },
  {
    name: 'Smalltalk',
    alias: ['smalltalk', 'squeak', 'st'],
    value: 'smalltalk',
  },
  {
    name: 'Vala',
    alias: ['vala', 'vapi'],
    value: 'vala',
  },
  {
    name: 'ABAP',
    alias: ['abap'],
    value: 'sql',
  },
  {
    name: 'LiveScript',
    alias: ['livescript', 'live-script'],
    value: 'livescript',
  },
  {
    name: 'XQuery',
    alias: ['xquery', 'xqy', 'xq', 'xql', 'xqm'],
    value: 'xquery',
  },
  {
    name: 'PlainText',
    alias: ['text', 'plaintext'],
    value: 'text',
  },
  {
    name: 'Yaml',
    alias: ['yaml', 'yml'],
    value: 'yaml',
  },
]);

export const normalizeLanguage = memoizeOne((language?: string): string => {
  if (!language) {
    return '';
  }
  const match = SUPPORTED_LANGUAGES.find(val => {
    return val.name === language || val.alias.includes(language);
  });
  // Fallback to plain monospaced text if language passed but not supported
  return match ? match.value : 'text';
});
