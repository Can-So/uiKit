import Tooltip from '@atlaskit/tooltip';
import * as React from 'react';
import { NoAccessWarning } from '../util/i18n';
export var NoAccessTooltip = function (_a) {
    var name = _a.name, children = _a.children;
    return (React.createElement(NoAccessWarning, { name: name }, function (text) { return (React.createElement(Tooltip, { content: text, position: "right" }, children)); }));
};
//# sourceMappingURL=NoAccessTooltip.js.map