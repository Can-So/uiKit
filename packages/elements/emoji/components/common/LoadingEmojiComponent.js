import * as tslib_1 from "tslib";
import { Component } from 'react';
/**
 * A base class for components that don't want to start rendering
 * until the EmojiProvider is resolved.
 * Notes: super.componentDidMount and super.componentWillUnmount will need to be
 * called explicitly if they are overridden on the child class.
 */
var LoadingEmojiComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LoadingEmojiComponent, _super);
    function LoadingEmojiComponent(props, state) {
        var _this = _super.call(this, props) || this;
        _this.isUnmounted = false;
        _this.loaded = function (state) { return !!state.asyncLoadedComponent && !!state.loadedEmojiProvider; };
        _this.state = state;
        // initializing here instead of componentDidMount to avoid needless
        // rerendering if emojiProvider resolves immediately.
        _this.loadEmojiProvider(_this.props.emojiProvider);
        return _this;
    }
    LoadingEmojiComponent.prototype.componentDidMount = function () {
        // check for the module has not yet been loaded
        // state.asyncLoadedComponent should be initialised
        // with static field to prevent unnecessary rerender
        if (!this.state.asyncLoadedComponent) {
            this.asyncLoadComponent();
        }
    };
    LoadingEmojiComponent.prototype.componentWillReceiveProps = function (nextProps) {
        this.loadEmojiProvider(nextProps.emojiProvider);
    };
    LoadingEmojiComponent.prototype.componentWillUnmount = function () {
        this.isUnmounted = true;
    };
    LoadingEmojiComponent.prototype.loadEmojiProvider = function (futureEmojiProvider) {
        var _this = this;
        futureEmojiProvider
            .then(function (loadedEmojiProvider) {
            if (!_this.isUnmounted) {
                _this.setState({
                    loadedEmojiProvider: loadedEmojiProvider,
                });
            }
        })
            .catch(function () {
            if (!_this.isUnmounted) {
                _this.setState({
                    loadedEmojiProvider: undefined,
                });
            }
        });
    };
    LoadingEmojiComponent.prototype.setAsyncState = function (asyncLoadedComponent) {
        if (!this.isUnmounted) {
            this.setState({ asyncLoadedComponent: asyncLoadedComponent });
        }
    };
    LoadingEmojiComponent.prototype.renderLoading = function () {
        return null;
    };
    LoadingEmojiComponent.prototype.render = function () {
        if (this.loaded(this.state)) {
            var _a = this.state, loadedEmojiProvider = _a.loadedEmojiProvider, asyncLoadedComponent = _a.asyncLoadedComponent;
            return this.renderLoaded(loadedEmojiProvider, asyncLoadedComponent);
        }
        return this.renderLoading();
    };
    return LoadingEmojiComponent;
}(Component));
export default LoadingEmojiComponent;
//# sourceMappingURL=LoadingEmojiComponent.js.map