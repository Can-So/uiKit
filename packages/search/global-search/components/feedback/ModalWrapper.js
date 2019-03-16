import * as tslib_1 from "tslib";
import * as React from 'react';
var Modal = /** @class */ (function (_super) {
    tslib_1.__extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Modal;
}(React.Component));
var isConfluence = function () {
    return document.location &&
        document.location.pathname &&
        document.location.pathname.startsWith('/wiki');
};
var promise = isConfluence()
    ? Promise.resolve(Modal)
    : import('@atlaskit/modal-dialog').then(function (Modal) { return Modal.default; });
export default promise;
//# sourceMappingURL=ModalWrapper.js.map