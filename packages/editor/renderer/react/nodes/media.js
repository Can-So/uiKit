import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { WithProviders } from '@atlaskit/editor-common';
import { MediaCard } from '../../ui/MediaCard';
var Media = /** @class */ (function (_super) {
    tslib_1.__extends(Media, _super);
    function Media() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCard = function (providers) {
            if (providers === void 0) { providers = {}; }
            var mediaProvider = providers.mediaProvider;
            return React.createElement(MediaCard, tslib_1.__assign({ mediaProvider: mediaProvider }, _this.props));
        };
        return _this;
    }
    Media.prototype.render = function () {
        var providers = this.props.providers;
        if (!providers) {
            return this.renderCard();
        }
        return (React.createElement(WithProviders, { providers: ['mediaProvider'], providerFactory: providers, renderNode: this.renderCard }));
    };
    return Media;
}(PureComponent));
export default Media;
//# sourceMappingURL=media.js.map