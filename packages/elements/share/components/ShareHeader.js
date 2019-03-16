import * as tslib_1 from "tslib";
import { FormHeader } from '@atlaskit/form';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';
export var ShareHeader = function (_a) {
    var title = _a.title;
    return (React.createElement(FormHeader, { title: title === undefined ? React.createElement(FormattedMessage, tslib_1.__assign({}, messages.formTitle)) : title }));
};
//# sourceMappingURL=ShareHeader.js.map