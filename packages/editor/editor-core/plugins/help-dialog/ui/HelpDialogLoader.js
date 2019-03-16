import * as Loadable from 'react-loadable';
export var HelpDialogLoader = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-editor-core-helpdialog" */ './index').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
//# sourceMappingURL=HelpDialogLoader.js.map