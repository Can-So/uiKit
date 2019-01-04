import * as ts from 'typescript';
import * as XRegExp from 'xregexp';

const getArrayElement = (args: any, index: number): any | undefined =>
  args && args.length > index ? args[index] : undefined;

// Note: only parses "new RegExp(<expression>, <options>)" expressions
export default function xregexpTransformer<
  T extends ts.Node
>(): ts.TransformerFactory<T> {
  return context => {
    const visit: ts.Visitor = node => {
      // TODO: parse "new XRegExp" and transform it to "new RegExp"
      if (ts.isNewExpression(node) && node.expression.getText() === 'RegExp') {
        const pattern: any = getArrayElement(node.arguments, 0);
        const flags: any = getArrayElement(node.arguments, 1);

        // note: for some reason there are extras slashes
        const p = pattern
          .getText()
          .replace(/\\\\p/g, '\\p')
          .slice(1, -1);
        const f = flags.getText().slice(1, -1);

        const xregexp = new XRegExp(p, f);
        const newPattern = ts.createStringLiteral(xregexp.source);
        return ts.updateNew(node, node.expression, undefined, [
          newPattern,
          flags,
        ]);
      }
      return ts.visitEachChild(node, child => visit(child), context);
    };
    return node => ts.visitNode(node, visit);
  };
}
