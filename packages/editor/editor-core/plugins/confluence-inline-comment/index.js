import { confluenceInlineComment } from '@findable/adf-schema';
// tslint:disable-next-line:variable-name
var confluenceInlineCommentPlugin = {
    marks: function () {
        return [
            {
                name: 'confluenceInlineComment',
                mark: confluenceInlineComment,
            },
        ];
    },
};
export default confluenceInlineCommentPlugin;
//# sourceMappingURL=index.js.map