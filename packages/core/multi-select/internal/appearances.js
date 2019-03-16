// =============================================================
// NOTE: Duplicated in ../index and ../StatelessMultiSelect until
// docgen can follow imports.
// -------------------------------------------------------------
// DO NOT update values here without updating the other.
// =============================================================
export var appearances = {
  values: ['default', 'subtle'],
  default: 'default'
};
var appearancesMap = {
  default: 'standard',
  subtle: 'subtle'
};
export var mapAppearanceToFieldBase = function mapAppearanceToFieldBase(appearance) {
  return appearancesMap[appearance];
};