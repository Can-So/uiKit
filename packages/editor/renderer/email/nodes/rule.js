import { colors } from '@atlaskit/theme';
import { createTag, serializeStyle } from '../util';
var css = serializeStyle({
    border: 'none',
    'border-bottom': "1px solid " + colors.N30A,
});
export default function rule() {
    return createTag('hr', { style: css });
}
//# sourceMappingURL=rule.js.map