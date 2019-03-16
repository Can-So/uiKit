export default function redundantNames(root, j) {
  root.find(j.ImportDeclaration, {
    source: {
      type: 'Literal',
      value: '@atlaskit/theme'
    }
  }).find(j.ImportSpecifier).filter(function (node) {
    // Filter renamed imports
    var n = node.get().value;
    return n.imported.name !== n.local.name;
  }).filter(function (node) {
    // Filter imports where true import name is unused in document
    var n = node.get().value;
    return root.find(j.Identifier, {
      name: n.imported.name
    }).size() <= 1;
  }).replaceWith(function (nodePath) {
    var importedName = nodePath.node.imported.name;
    root.find(j.Identifier, {
      name: nodePath.node.local.name
    }).replaceWith(j.identifier(importedName));
    return j.importSpecifier(j.identifier(importedName), j.identifier(importedName));
  });
  return root;
}