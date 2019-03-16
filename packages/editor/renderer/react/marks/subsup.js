import * as React from 'react';
var isSub = function (type) {
    return type === 'sub';
};
export default function SubSup(props) {
    if (isSub(props.type)) {
        return React.createElement("sub", null, props.children);
    }
    return React.createElement("sup", null, props.children);
}
//# sourceMappingURL=subsup.js.map