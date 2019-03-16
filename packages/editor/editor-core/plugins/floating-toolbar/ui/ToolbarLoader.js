import * as Loadable from 'react-loadable';
export var ToolbarLoader = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-editor-core-floating-toolbar" */ './Toolbar').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
//# sourceMappingURL=ToolbarLoader.js.map