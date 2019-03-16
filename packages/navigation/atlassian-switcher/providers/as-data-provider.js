import * as tslib_1 from "tslib";
import * as React from 'react';
var Status;
(function (Status) {
    Status["LOADING"] = "loading";
    Status["COMPLETE"] = "complete";
    Status["ERROR"] = "error";
})(Status || (Status = {}));
export var isComplete = function (result) { return result.status === Status.COMPLETE; };
export var isError = function (result) {
    return result.status === Status.ERROR;
};
export var isLoading = function (result) { return result.status === Status.LOADING; };
export default function (mapPropsToPromise, mapPropsToInitialValue) {
    var getInitialState = function (props) {
        if (mapPropsToInitialValue) {
            var initialValue = mapPropsToInitialValue(props);
            if (initialValue !== undefined) {
                return {
                    status: Status.COMPLETE,
                    data: initialValue,
                };
            }
        }
        return {
            status: Status.LOADING,
            data: null,
        };
    };
    return /** @class */ (function (_super) {
        tslib_1.__extends(DataProvider, _super);
        function DataProvider() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.acceptResults = true;
            _this.state = getInitialState(_this.props);
            return _this;
        }
        DataProvider.prototype.componentWillUnmount = function () {
            /**
             * Promise resolved after component is unmounted to be ignored
             */
            this.acceptResults = false;
        };
        DataProvider.prototype.componentDidMount = function () {
            var _this = this;
            mapPropsToPromise(this.props)
                .then(function (result) {
                _this.onResult(result);
            })
                .catch(function (error) {
                _this.onError(error);
            });
        };
        DataProvider.prototype.onResult = function (value) {
            if (this.acceptResults) {
                this.setState({
                    data: value,
                    status: Status.COMPLETE,
                });
            }
        };
        DataProvider.prototype.onError = function (error) {
            /**
             * Do not transition from "complete" state to "error"
             */
            if (this.acceptResults && !isComplete(this.state)) {
                this.setState({
                    error: error,
                    status: Status.ERROR,
                });
            }
        };
        DataProvider.prototype.render = function () {
            return this.props.children(this.state);
        };
        return DataProvider;
    }(React.Component));
}
//# sourceMappingURL=as-data-provider.js.map