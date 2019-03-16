// @flow
import { addNamedImport, removeNamedImport } from '../utils';

export default function fontFamily(root: any, j: any) {
  // Check if we import shared styles
  const sharedStylesImport = root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: '@findable/util-shared-styles',
    },
  });
  if (!sharedStylesImport.size()) {
    return root;
  }

  const codeFontImportSpecifier = sharedStylesImport.find(j.ImportSpecifier, {
    imported: { name: 'akFontFamily' },
  });
  if (!codeFontImportSpecifier.size()) {
    return root;
  }

  // Find what we are calling akGridSizeUnitless locally
  const localName = codeFontImportSpecifier.get(0).node.local.name;

  // Convert uses of the old akCodeFontFamily to template `${akCodeFontFamily()}px`
  root
    .find(j.Identifier, {
      name: localName,
    })
    .replaceWith(() => j.callExpression(j.identifier(localName), []));

  addNamedImport(
    root,
    j,
    '@findable/theme',
    'fontFamily',
    localName,
    sharedStylesImport,
  );
  removeNamedImport(
    root,
    j,
    '@findable/util-shared-styles',
    'akFontFamily',
    codeFontImportSpecifier,
  );

  return root;
}
