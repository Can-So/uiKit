import * as tslib_1 from "tslib";
import * as React from 'react';
import RecentList from './LinkAddToolbar';
import { WithProviders } from '@findable/editor-common';
var HyperlinkAddToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(HyperlinkAddToolbar, _super);
    function HyperlinkAddToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HyperlinkAddToolbar.prototype.render = function () {
        var _a = this.props, onSubmit = _a.onSubmit, onBlur = _a.onBlur;
        return (React.createElement(WithProviders, { providers: ['activityProvider'], providerFactory: this.props.providerFactory, renderNode: function (_a) {
                var activityProvider = _a.activityProvider;
                return (React.createElement(RecentList, { provider: activityProvider, onSubmit: onSubmit, onBlur: onBlur }));
            } }));
    };
    return HyperlinkAddToolbar;
}(React.PureComponent));
export default HyperlinkAddToolbar;
//# sourceMappingURL=index.js.map