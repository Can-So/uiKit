import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { Status as AkStatus } from '@atlaskit/status';
import { FabricElementsAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
var Status = /** @class */ (function (_super) {
    tslib_1.__extends(Status, _super);
    function Status() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Status.prototype.render = function () {
        var _a = this.props, text = _a.text, color = _a.color, localId = _a.localId;
        return (React.createElement(FabricElementsAnalyticsContext, { data: {
                userContext: 'document',
            } },
            React.createElement(AkStatus, { text: text, color: color, localId: localId })));
    };
    return Status;
}(PureComponent));
export default Status;
//# sourceMappingURL=status.js.map