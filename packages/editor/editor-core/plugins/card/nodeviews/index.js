import * as tslib_1 from "tslib";
import { ReactNodeView } from '../../../nodeviews';
var CardNodeView = /** @class */ (function (_super) {
    tslib_1.__extends(CardNodeView, _super);
    function CardNodeView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardNodeView.fromComponent = function (component, portalProviderAPI, props) {
        return function (node, view, getPos) {
            return new CardNodeView(node, view, getPos, portalProviderAPI, props, component, true).init();
        };
    };
    return CardNodeView;
}(ReactNodeView));
export { CardNodeView };
//# sourceMappingURL=index.js.map