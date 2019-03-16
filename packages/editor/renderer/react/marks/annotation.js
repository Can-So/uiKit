import * as React from 'react';
export default (function (_a) {
    var id = _a.id, annotationType = _a.annotationType, children = _a.children;
    return (React.createElement("span", { "data-mark-type": "annotation", "data-mark-annotation-type": annotationType, "data-id": id }, children));
});
//# sourceMappingURL=annotation.js.map