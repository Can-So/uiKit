import * as tslib_1 from "tslib";
import { commonMacro } from './common-macro';
import { parseAttrs } from '../utils/attrs';
import { title } from '../utils/title';
var SUPPORTED_CODEBOCK_LANGUAGES = [
    'abap',
    'actionscript',
    'ada',
    'arduino',
    'autoit',
    'c',
    'c++',
    'clojure',
    'coffeescript',
    'csharp',
    'css',
    'cuda',
    'd',
    'dart',
    'delphi',
    'elixir',
    'erlang',
    'fortran',
    'foxpro',
    'go',
    'groovy',
    'haskell',
    'haxe',
    'html',
    'java',
    'javascript',
    'json',
    'julia',
    'kotlin',
    'latex',
    'livescript',
    'lua',
    'mathematica',
    'matlab',
    'objective-c',
    'objective-j',
    'objectpascal',
    'ocaml',
    'octave',
    'perl',
    'php',
    'powershell',
    'prolog',
    'puppet',
    'python',
    'qml',
    'r',
    'racket',
    'restructuredtext',
    'ruby',
    'rust',
    'sass',
    'scala',
    'scheme',
    'shell',
    'smalltalk',
    'sql',
    'standardml',
    'swift',
    'tcl',
    'tex',
    'typescript',
    'vala',
    'vbnet',
    'verilog',
    'vhdl',
    'xml',
    'xquery',
];
export var codeMacro = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema, context = _a.context;
    return commonMacro(input.substring(position), schema, {
        keyword: 'code',
        paired: true,
        context: context,
        rawContentProcessor: rawContentProcessor,
    });
};
var rawContentProcessor = function (rawAttrs, rawContent, length, schema, context) {
    var output = [];
    var codeBlock = schema.nodes.codeBlock;
    var parsedAttrs = parseAttrs(rawAttrs);
    var trimedContent = rawContent.replace(/^\s+|\s+$/g, '');
    var textNode = trimedContent.length
        ? schema.text(trimedContent)
        : undefined;
    if (parsedAttrs.title) {
        output.push(title(parsedAttrs.title, schema));
    }
    var nodeAttrs = tslib_1.__assign({}, parsedAttrs, { language: getCodeLanguage(parsedAttrs) });
    output.push(codeBlock.createChecked(nodeAttrs, textNode));
    return {
        type: 'pmnode',
        nodes: output,
        length: length,
    };
};
function getCodeLanguage(attrs) {
    var e_1, _a;
    var keys = Object.keys(attrs).map(function (key) { return key.toLowerCase(); });
    try {
        for (var SUPPORTED_CODEBOCK_LANGUAGES_1 = tslib_1.__values(SUPPORTED_CODEBOCK_LANGUAGES), SUPPORTED_CODEBOCK_LANGUAGES_1_1 = SUPPORTED_CODEBOCK_LANGUAGES_1.next(); !SUPPORTED_CODEBOCK_LANGUAGES_1_1.done; SUPPORTED_CODEBOCK_LANGUAGES_1_1 = SUPPORTED_CODEBOCK_LANGUAGES_1.next()) {
            var language = SUPPORTED_CODEBOCK_LANGUAGES_1_1.value;
            if (keys.indexOf(language) !== -1) {
                return language;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (SUPPORTED_CODEBOCK_LANGUAGES_1_1 && !SUPPORTED_CODEBOCK_LANGUAGES_1_1.done && (_a = SUPPORTED_CODEBOCK_LANGUAGES_1.return)) _a.call(SUPPORTED_CODEBOCK_LANGUAGES_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (keys.indexOf('objc') !== -1) {
        return 'objective-c';
    }
    return 'java';
}
//# sourceMappingURL=code-macro.js.map