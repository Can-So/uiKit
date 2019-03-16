export default function toItemId(id) {
  return "tabletreeitem-".concat(id).replace(/[^-_a-zA-Z0-9]/g, '');
}