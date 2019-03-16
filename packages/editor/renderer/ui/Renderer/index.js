import * as tslib_1 from "tslib";
import * as React from 'react';
import { PureComponent } from 'react';
import { defaultSchema } from '@findable/adf-schema';
import { UnsupportedBlock, ProviderFactory, BaseTheme, WidthProvider, } from '@findable/editor-common';
import { ReactSerializer, renderDocument } from '../../';
import { Wrapper } from './style';
import { TruncatedWrapper } from './truncated-wrapper';
var Renderer = /** @class */ (function (_super) {
    tslib_1.__extends(Renderer, _super);
    function Renderer(props) {
        var _this = _super.call(this, props) || this;
        _this.providerFactory = props.dataProviders || new ProviderFactory();
        _this.updateSerializer(props);
        return _this;
    }
    Renderer.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.portal !== this.props.portal) {
            this.updateSerializer(nextProps);
        }
    };
    Renderer.prototype.updateSerializer = function (props) {
        var eventHandlers = props.eventHandlers, portal = props.portal, rendererContext = props.rendererContext, document = props.document, extensionHandlers = props.extensionHandlers, schema = props.schema, appearance = props.appearance, disableHeadingIDs = props.disableHeadingIDs, allowDynamicTextSizing = props.allowDynamicTextSizing;
        this.serializer = new ReactSerializer({
            providers: this.providerFactory,
            eventHandlers: eventHandlers,
            extensionHandlers: extensionHandlers,
            portal: portal,
            objectContext: tslib_1.__assign({ adDoc: document, schema: schema }, rendererContext),
            appearance: appearance,
            disableHeadingIDs: disableHeadingIDs,
            allowDynamicTextSizing: allowDynamicTextSizing,
        });
    };
    Renderer.prototype.render = function () {
        var _a = this.props, document = _a.document, onComplete = _a.onComplete, schema = _a.schema, appearance = _a.appearance, adfStage = _a.adfStage, allowDynamicTextSizing = _a.allowDynamicTextSizing, maxHeight = _a.maxHeight, truncated = _a.truncated;
        try {
            var _b = renderDocument(document, this.serializer, schema || defaultSchema, adfStage), result = _b.result, stat = _b.stat;
            if (onComplete) {
                onComplete(stat);
            }
            var rendererOutput = (React.createElement(RendererWrapper, { appearance: appearance, dynamicTextSizing: !!allowDynamicTextSizing }, result));
            return truncated ? (React.createElement(TruncatedWrapper, { height: maxHeight }, rendererOutput)) : (rendererOutput);
        }
        catch (ex) {
            return (React.createElement(RendererWrapper, { appearance: appearance, dynamicTextSizing: !!allowDynamicTextSizing },
                React.createElement(UnsupportedBlock, null)));
        }
    };
    Renderer.prototype.componentWillUnmount = function () {
        var dataProviders = this.props.dataProviders;
        // if this is the ProviderFactory which was created in constructor
        // it's safe to destroy it on Renderer unmount
        if (!dataProviders) {
            this.providerFactory.destroy();
        }
    };
    return Renderer;
}(PureComponent));
export default Renderer;
export function RendererWrapper(_a) {
    var appearance = _a.appearance, children = _a.children, dynamicTextSizing = _a.dynamicTextSizing;
    return (React.createElement(WidthProvider, null,
        React.createElement(BaseTheme, { dynamicTextSizing: dynamicTextSizing },
            React.createElement(Wrapper, { appearance: appearance }, children))));
}
//# sourceMappingURL=index.js.map