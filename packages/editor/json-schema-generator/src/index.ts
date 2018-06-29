/* tslint:disable:no-bitwise */
import * as ts from 'typescript';

import JSONSchemaNode, {
  SchemaNode,
  StringSchemaNode,
  ArraySchemaNode,
  ObjectSchemaNode,
  EnumSchemaNode,
  PrimitiveSchemaNode,
  RefSchemaNode,
  EmptySchemaNode,
  AnyOfSchemaNode,
  AllOfSchemaNode,
} from './json-schema-nodes';

import {
  extractLiteralValue,
  getTags,
  getTypeFromSymbol,
  isAnyType,
  isArrayType,
  isBooleanType,
  isInterfaceDeclaration,
  isIntersectionType,
  isLiteralType,
  isNonPrimitiveType,
  isNumberType,
  isObjectType,
  isSourceFile,
  isStringLiteralType,
  isStringType,
  isTypeAliasDeclaration,
  isUnionType,
} from './utils';

export default (
  file,
  flags,
  root = 'doc_node',
  description = 'Schema for Atlassian Document Format.',
) => {
  const files = [file];

  const program = ts.createProgram(files, { jsx: ts.JsxEmit.React });
  const checker = program.getTypeChecker();
  const typeIdToDefName: Map<number, string> = new Map();
  const experimentalNodes: Set<number> = new Set();

  const jsonSchema = new JSONSchemaNode('draft-04', description, root);

  let ticks = 0;
  program.getSourceFiles().forEach(walk);

  waitForTicks()
    .then(() => {
      jsonSchema.markAsUsed(root);
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(jsonSchema, null, 2));
    })
    .catch(console.error);

  function waitForTicks() {
    return new Promise(resolve => {
      const waitForTick = () => {
        process.nextTick(() => {
          ticks--;
          ticks > 0 ? waitForTick() : resolve();
        });
      };
      waitForTick();
    });
  }

  function walk(node: ts.Node) {
    if (isSourceFile(node)) {
      node.forEachChild(walk);
    } else if (isInterfaceDeclaration(node) || isTypeAliasDeclaration(node)) {
      const symbol: ts.Symbol = (node as any).symbol;
      const { name, ...rest } = getTags(symbol.getJsDocTags());
      if (name) {
        if (jsonSchema.hasDefinition(name)) {
          throw new Error(`Duplicate definition for ${name}`);
        }
        const type = checker.getTypeAtLocation(node);
        const defNode = getSchemaNodeFromType(type, rest);
        if (defNode) {
          jsonSchema.addDefinition(name, defNode);
          typeIdToDefName.set((type as any).id, name);
        }
      }
    } else {
      // If in future we need support for other nodes, this will help to debug
      // console.log(syntaxKindToName(node.kind));
      // node.forEachChild(walk);
    }
  }

  function shouldExclude(stage: string | undefined) {
    return (
      (flags.stage === undefined && stage !== undefined) ||
      (flags.stage !== undefined &&
        stage !== undefined &&
        stage !== flags.stage)
    );
  }

  function getSchemaNodeFromType(
    type: ts.Type,
    validators = {},
  ): SchemaNode | undefined {
    const typeId = (type as any).id;
    if (shouldExclude(validators['stage'])) {
      experimentalNodes.add(typeId);
      return;
    } else if (experimentalNodes.has(typeId)) {
      return;
    }

    if (typeIdToDefName.has(typeId)) {
      // Found a $ref
      // TODO: Fix any
      const nodeName = typeIdToDefName.get(typeId)!;
      jsonSchema.markAsUsed(nodeName);
      return new RefSchemaNode(`#/definitions/${nodeName}`);
    } else if (isStringType(type)) {
      return new StringSchemaNode(validators);
    } else if (isBooleanType(type)) {
      return new PrimitiveSchemaNode('boolean');
    } else if (isNumberType(type)) {
      return new PrimitiveSchemaNode('number', validators);
    } else if (isUnionType(type)) {
      const isEnum = type.types.every(t => isStringLiteralType(t));
      if (isEnum) {
        return new EnumSchemaNode(
          type.types.map(t => (t as ts.LiteralType).value),
        );
      } else {
        return new AnyOfSchemaNode(
          type.types.map(t => getSchemaNodeFromType(t)!).filter(Boolean),
        );
      }
    } else if (isIntersectionType(type)) {
      return new AllOfSchemaNode(
        type.types
          .map(
            t =>
              getSchemaNodeFromType(t, getTags(t.getSymbol()!.getJsDocTags()))!,
          )
          .filter(Boolean),
      );
    } else if (isArrayType(type)) {
      const node = new ArraySchemaNode([], validators);
      // [X, X | Y]
      if (!type.typeArguments) {
        const types = type.getNumberIndexType()!;

        // Look for all indexed type
        let i = 0;
        let prop: ts.Symbol;
        while ((prop = type.getProperty(`${i}`)!)) {
          node.push(getSchemaNodeFromType(getTypeFromSymbol(checker, prop)));
          i++;
        }

        /**
         * This will always be a Union type because it's not possible to write something like
         * interface X extends Array<X> {
         *  0: X;
         * }
         */
        if (isUnionType(types)) {
          node.push(getSchemaNodeFromType(types));
        }
      } else {
        const types = type.typeArguments;
        node.push(
          types.length === 1 && isAnyType(types[0]) // Array<any>
            ? []
            : types.map(t => getSchemaNodeFromType(t)!).filter(Boolean),
        );
      }
      return node;
    } else if (isObjectType(type)) {
      const obj = new ObjectSchemaNode(
        {},
        { additionalProperties: false, ...validators },
      );
      // Use node's queue to prevent circular dependency
      process.nextTick(() => {
        ticks++;
        const props = checker.getPropertiesOfType(type);
        props.forEach(prop => {
          const name = prop.getName();
          // Drop private properties __fileName, __fileType, etc
          if ((name[0] !== '_' || name[1] !== '_') && prop.valueDeclaration) {
            const propType = getTypeFromSymbol(checker, prop);
            const isRequired =
              (prop.getFlags() & ts.SymbolFlags.Optional) === 0;
            const validators = getTags(prop.getJsDocTags());
            const node = getSchemaNodeFromType(propType, validators);
            if (node) {
              obj.addProperty(name, node, isRequired);
            }
          }
        });
      });
      return obj;
    } else if (isLiteralType(type)) {
      // Using ConstSchemaNode doesn't pass validation
      return new EnumSchemaNode(extractLiteralValue(type));
    } else if (isNonPrimitiveType(type)) {
      // object
      return new EmptySchemaNode();
    }

    throw new Error(`TODO: ${checker.typeToString(type)} to be defined`);
  }
};
