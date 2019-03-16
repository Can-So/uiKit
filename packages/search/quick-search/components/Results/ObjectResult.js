import * as tslib_1 from "tslib";
import * as React from 'react';
import Avatar from '@findable/avatar';
import ResultBase from './ResultBase';
/**
 * Generic result type for Atlassian objects.
 */
var ObjectResult = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectResult, _super);
    function ObjectResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getAvatar = function () {
            if (_this.props.avatar) {
                return _this.props.avatar;
            }
            return (React.createElement(Avatar, { borderColor: "transparent", src: _this.props.avatarUrl, appearance: "square", size: "small", status: _this.props.isPrivate ? 'locked' : null }));
        };
        return _this;
    }
    ObjectResult.prototype.getSubtext = function () {
        var _a = this.props, objectKey = _a.objectKey, containerName = _a.containerName;
        if (objectKey && containerName) {
            return (React.createElement("text", null,
                objectKey,
                " \u00B7 ",
                containerName));
        }
        return containerName || objectKey;
    };
    ObjectResult.prototype.render = function () {
        var _a = this.props, name = _a.name, containerName = _a.containerName, isPrivate = _a.isPrivate, objectKey = _a.objectKey, _b = _a.type, type = _b === void 0 ? 'object' : _b, commonResultProps = tslib_1.__rest(_a, ["name", "containerName", "isPrivate", "objectKey", "type"]);
        return (React.createElement(ResultBase, tslib_1.__assign({}, commonResultProps, { type: type, text: name, subText: this.getSubtext(), icon: this.getAvatar() })));
    };
    return ObjectResult;
}(React.PureComponent));
export default ObjectResult;
//# sourceMappingURL=ObjectResult.js.map