import * as ts from 'typescript';
import * as XRegExp from 'xregexp';

export interface XRegexpPluginOptions {
  some?: string;
}

const getArrayElement = (args: any, index: number): any | undefined =>
  args && args.length > index ? args[index] : undefined;

export default function myTransformerPlugin(
  program: ts.Program,
  opts: XRegexpPluginOptions,
) {
  return {
    before(ctx: ts.TransformationContext) {
      return (sourceFile: ts.SourceFile) => {
        function visitor(node: ts.Node): ts.Node {
          if (ts.isRegularExpressionLiteral(node)) {
            // result: [ <expr>, <group1>, <group2>, <index>, <expr> ]
            const result = node.getText().match(/\/(.*)\/([a-zA-Z]*).*$/);

            // note: <group2> is '' if undefined or no data
            const pattern = getArrayElement(result, 1);
            const flags = getArrayElement(result, 2);

            const xregexp = new XRegExp(pattern, flags);
            return ts.createRegularExpressionLiteral(
              '/' + xregexp.source + '/' + flags,
            );
          } else if (
            ts.isNewExpression(node) &&
            node.expression.getText() === 'RegExp'
          ) {
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
          } else if (
            ts.isCallExpression(node) &&
            node.expression.getText() === 'RegExp'
          ) {
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
            return ts.updateCall(node, node.expression, undefined, [
              newPattern,
              flags,
            ]);
          }
          return ts.visitEachChild(node, visitor, ctx);
        }
        return ts.visitEachChild(sourceFile, visitor, ctx);
      };
    },
  };
}
