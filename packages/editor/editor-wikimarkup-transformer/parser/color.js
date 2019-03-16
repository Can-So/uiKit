import { normalizeHexColor } from '@findable/editor-common';
export function getEditorColor(attrs) {
    var keys = Object.keys(attrs);
    return normalizeHexColor(keys[0]);
}
//# sourceMappingURL=color.js.map