import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { isPastDate, timestampToString, timestampToTaskContext, } from '@findable/editor-common';
var Date = /** @class */ (function (_super) {
    tslib_1.__extends(Date, _super);
    function Date() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Date.prototype.render = function () {
        var _a = this.props, timestamp = _a.timestamp, parentIsIncompleteTask = _a.parentIsIncompleteTask;
        var className = !!parentIsIncompleteTask && isPastDate(timestamp)
            ? 'date-node date-node-highlighted'
            : 'date-node';
        return (React.createElement("span", { className: className, "data-node-type": "date", "data-timestamp": timestamp }, parentIsIncompleteTask
            ? timestampToTaskContext(timestamp)
            : timestampToString(timestamp)));
    };
    return Date;
}(PureComponent));
export default Date;
//# sourceMappingURL=date.js.map