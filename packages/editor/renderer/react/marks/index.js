import Code from './code';
import Em from './em';
import Link from './link';
import Strike from './strike';
import Strong from './strong';
import Subsup from './subsup';
import TextColor from './textColor';
import Underline from './underline';
import Action from './action';
import Breakout from './breakout';
import Alignment from './alignment';
import Indentation from './indentation';
import Annotation from './annotation';
// Stage0
import ConfluenceInlineComment from './confluence-inline-comment';
export var markToReact = {
    code: Code,
    em: Em,
    link: Link,
    strike: Strike,
    strong: Strong,
    subsup: Subsup,
    textColor: TextColor,
    underline: Underline,
    action: Action,
    annotation: Annotation,
    // Stage0
    confluenceInlineComment: ConfluenceInlineComment,
    breakout: Breakout,
    alignment: Alignment,
    indentation: Indentation,
};
export var toReact = function (mark) {
    return markToReact[mark.type.name];
};
export { Code, Em, Link, Strike, Strong, Subsup, TextColor, Underline, Action, Breakout, Annotation, };
//# sourceMappingURL=index.js.map