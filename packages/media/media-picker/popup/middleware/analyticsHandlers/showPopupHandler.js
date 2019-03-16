import { SCREEN_EVENT_TYPE } from '@findable/analytics-gas-types';
import { isShowPopupAction } from '../../actions/showPopup';
export default (function (action) {
    if (isShowPopupAction(action)) {
        return [
            {
                name: 'mediaPickerModal',
                eventType: SCREEN_EVENT_TYPE,
            },
            {
                name: 'recentFilesBrowserModal',
                eventType: SCREEN_EVENT_TYPE,
            },
        ];
    }
});
//# sourceMappingURL=showPopupHandler.js.map