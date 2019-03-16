import { annotation } from '@findable/adf-schema';
// tslint:disable-next-line:variable-name
var annotationPlugin = {
    marks: function () {
        return [
            {
                name: 'annotation',
                mark: annotation,
            },
        ];
    },
};
export default annotationPlugin;
//# sourceMappingURL=index.js.map