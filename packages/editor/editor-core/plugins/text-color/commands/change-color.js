import { toggleColor } from './toggle-color';
import { removeColor } from './remove-color';
import { pluginKey } from '../pm-plugins/main';
import { getActiveColor } from '../utils/color';
import { withAnalytics, } from '../../analytics';
/**
 * Helper to create a higher order analytics command
 * @param newColor  - Color to be change in hex code
 * @param previousColor - Active color in hex code
 * @param palette - Current palette of colors
 * @return Higher order command with analytics logic inside.
 */
function createWithColorAnalytics(newColor, previousColor, palette) {
    var newColorLabel = palette.get(newColor) || newColor;
    var previousColorLabel = previousColor
        ? palette.get(previousColor) || previousColor
        : '';
    return withAnalytics({
        action: "formatted" /* FORMATTED */,
        actionSubject: "text" /* TEXT */,
        actionSubjectId: "color" /* FORMAT_COLOR */,
        eventType: "track" /* TRACK */,
        attributes: {
            newColor: newColorLabel.toLowerCase(),
            previousColor: previousColorLabel.toLowerCase(),
        },
    });
}
export var changeColor = function (color) { return function (state, dispatch) {
    var textColor = state.schema.marks.textColor;
    if (textColor) {
        var pluginState = pluginKey.getState(state);
        var activeColor = getActiveColor(state);
        var withColorAnalytics = createWithColorAnalytics(color, activeColor, pluginState.palette);
        if (pluginState.disabled) {
            return false;
        }
        if (color === pluginState.defaultColor) {
            withColorAnalytics(removeColor())(state, dispatch);
            return true;
        }
        withColorAnalytics(toggleColor(color))(state, dispatch);
        return true;
    }
    return false;
}; };
//# sourceMappingURL=change-color.js.map