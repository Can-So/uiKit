import { inlines } from './inlines';
var supportedLanguageInWiki = [
    'actionscript',
    'ada',
    'applescript',
    'bash',
    'c',
    'c#',
    'c++',
    'cpp',
    'css',
    'erlang',
    'go',
    'groovy',
    'haskell',
    'html',
    'java',
    'javascript',
    'js',
    'json',
    'lua',
    'none',
    'nyan',
    'objc',
    'perl',
    'php',
    'python',
    'r',
    'rainbow',
    'ruby',
    'scala',
    'sh',
    'sql',
    'swift',
    'visualbasic',
    'xml',
    'yaml',
];
export var codeBlock = function (node) {
    var result = '';
    node.forEach(function (n) {
        result += inlines(n, node);
    });
    if (supportedLanguageInWiki.indexOf(node.attrs.language) !== -1) {
        return "{code:" + node.attrs.language + "}" + result + "{code}";
    }
    else {
        return "{code}" + result + "{code}";
    }
};
//# sourceMappingURL=code-block.js.map