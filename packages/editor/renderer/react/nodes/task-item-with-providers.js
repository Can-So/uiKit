import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { ResourcedTaskItem, } from '@atlaskit/task-decision';
var TaskItemWithProviders = /** @class */ (function (_super) {
    tslib_1.__extends(TaskItemWithProviders, _super);
    function TaskItemWithProviders() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { resolvedContextProvider: undefined };
        return _this;
    }
    TaskItemWithProviders.prototype.componentWillMount = function () {
        this.updateContextIdentifierProvider(this.props);
    };
    TaskItemWithProviders.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.contextIdentifierProvider !==
            this.props.contextIdentifierProvider) {
            this.updateContextIdentifierProvider(nextProps);
        }
    };
    TaskItemWithProviders.prototype.updateContextIdentifierProvider = function (props) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var resolvedContextProvider, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!props.contextIdentifierProvider) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, props.contextIdentifierProvider];
                    case 2:
                        resolvedContextProvider = _a.sent();
                        this.setState({ resolvedContextProvider: resolvedContextProvider });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.setState({ resolvedContextProvider: undefined });
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        this.setState({ resolvedContextProvider: undefined });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TaskItemWithProviders.prototype.render = function () {
        var _a = this.props, contextIdentifierProvider = _a.contextIdentifierProvider, objectAri = _a.objectAri, containerAri = _a.containerAri, otherProps = tslib_1.__rest(_a, ["contextIdentifierProvider", "objectAri", "containerAri"]);
        var _b = this.state.resolvedContextProvider ||
            {
                objectId: objectAri,
                containerId: containerAri,
            }, objectId = _b.objectId, containerId = _b.containerId;
        return (React.createElement(ResourcedTaskItem, tslib_1.__assign({}, otherProps, { objectAri: objectId, containerAri: containerId })));
    };
    return TaskItemWithProviders;
}(Component));
export default TaskItemWithProviders;
//# sourceMappingURL=task-item-with-providers.js.map