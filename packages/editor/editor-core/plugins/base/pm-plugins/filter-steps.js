import { Plugin } from 'prosemirror-state';
import { sendLogs } from '../../../utils/sendLogs';
var hasInvalidSteps = function (tr) {
    return (tr.steps || []).some(function (step) { return step.from > step.to; });
};
export default (function () {
    return new Plugin({
        filterTransaction: function (tr) {
            if (hasInvalidSteps(tr)) {
                // tslint:disable-next-line:no-console
                console.warn('The transaction was blocked because it contains invalid steps', tr.steps);
                sendLogs({
                    events: [
                        {
                            name: 'atlaskit.fabric.editor.invalidstep',
                            product: 'atlaskit',
                            properties: {
                                message: 'Blocked transaction with invalid steps',
                            },
                            serverTime: new Date().getTime(),
                            server: 'local',
                            user: '-',
                        },
                    ],
                });
                return false;
            }
            return true;
        },
    });
});
//# sourceMappingURL=filter-steps.js.map