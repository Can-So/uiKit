import * as tslib_1 from "tslib";
import * as React from 'react';
import Mention from './';
var ResourcedMention = /** @class */ (function (_super) {
    tslib_1.__extends(ResourcedMention, _super);
    function ResourcedMention(props) {
        var _this = _super.call(this, props) || this;
        _this.handleMentionProvider = function (props) {
            var id = props.id, mentionProvider = props.mentionProvider;
            if (mentionProvider) {
                mentionProvider
                    .then(function (provider) {
                    _this.setState({
                        isHighlighted: provider.shouldHighlightMention({ id: id }),
                    });
                })
                    .catch(function () {
                    _this.setState({
                        isHighlighted: false,
                    });
                });
            }
            else {
                _this.setState({
                    isHighlighted: false,
                });
            }
        };
        _this.state = {
            isHighlighted: false,
        };
        return _this;
    }
    ResourcedMention.prototype.componentDidMount = function () {
        this.handleMentionProvider(this.props);
    };
    ResourcedMention.prototype.componentWillReceiveProps = function (nextProps) {
        var props = this.props;
        if (props.id !== nextProps.id ||
            props.mentionProvider !== nextProps.mentionProvider) {
            this.handleMentionProvider(nextProps);
        }
    };
    ResourcedMention.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state;
        return (React.createElement(Mention, { id: props.id, text: props.text, isHighlighted: state.isHighlighted, accessLevel: props.accessLevel, onClick: props.onClick, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave }));
    };
    return ResourcedMention;
}(React.PureComponent));
export default ResourcedMention;
//# sourceMappingURL=ResourcedMention.js.map