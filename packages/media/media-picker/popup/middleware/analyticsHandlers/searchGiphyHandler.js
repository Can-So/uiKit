import { SCREEN_EVENT_TYPE } from '@findable/analytics-gas-types';
import { isSearchGiphyAction } from '../../actions';
export default (function (action) {
    if (isSearchGiphyAction(action)) {
        return [
            {
                name: 'cloudBrowserModal',
                eventType: SCREEN_EVENT_TYPE,
                attributes: {
                    cloudType: 'giphy',
                },
            },
        ];
    }
});
//# sourceMappingURL=searchGiphyHandler.js.map