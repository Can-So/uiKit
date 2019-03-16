import * as tslib_1 from "tslib";
export var emoji = function (_a) {
    var input = _a.input, position = _a.position, schema = _a.schema;
    var e_1, _b, e_2, _c;
    var substring = input.substring(position);
    try {
        // Look for a emoji
        for (var EMOJIS_1 = tslib_1.__values(EMOJIS), EMOJIS_1_1 = EMOJIS_1.next(); !EMOJIS_1_1.done; EMOJIS_1_1 = EMOJIS_1.next()) {
            var emo = EMOJIS_1_1.value;
            try {
                for (var _d = tslib_1.__values(emo.markup), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var text = _e.value;
                    if (substring.startsWith(text)) {
                        return {
                            type: 'pmnode',
                            nodes: [schema.nodes.emoji.createChecked(emo.adf)],
                            length: text.length,
                        };
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_c = _d.return)) _c.call(_d);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (EMOJIS_1_1 && !EMOJIS_1_1.done && (_b = EMOJIS_1.return)) _b.call(EMOJIS_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return {
        type: 'text',
        text: substring.substr(0, 1),
        length: 1,
    };
};
export var EMOJIS = [
    {
        markup: [':)', ':-)'],
        adf: {
            id: '1f642',
            shortName: ':slight_smile:',
            text: '🙂',
        },
    },
    {
        markup: [':(', ':-('],
        adf: {
            id: '1f61e',
            shortName: ':disappointed:',
            text: '😞',
        },
    },
    {
        markup: [':P', ':-P', ':p', ':-p'],
        adf: {
            id: '1f61b',
            shortName: ':stuck_out_tongue:',
            text: '😛',
        },
    },
    {
        markup: [':D', ':-D'],
        adf: {
            id: '1f603',
            shortName: ':smiley:',
            text: '😃',
        },
    },
    {
        markup: [';)', ';-)'],
        adf: {
            id: '1f609',
            shortName: ':wink:',
            text: '😉',
        },
    },
    {
        markup: ['(y)'],
        adf: {
            id: '1f44d',
            shortName: ':thumbsup:',
            text: '👍',
        },
    },
    {
        markup: ['(n)'],
        adf: {
            id: '1f44e',
            shortName: ':thumbsdown:',
            text: '👎',
        },
    },
    {
        markup: ['(i)'],
        adf: {
            id: 'atlassian-info',
            shortName: ':info:',
            text: ':info',
        },
    },
    {
        markup: ['(/)'],
        adf: {
            id: 'atlassian-check_mark',
            shortName: ':check_mark:',
            text: ':check_mark:',
        },
    },
    {
        markup: ['(x)'],
        adf: {
            id: 'atlassian-cross_mark',
            shortName: ':cross_mark:',
            text: ':cross_mark:',
        },
    },
    {
        markup: ['(!)'],
        adf: {
            id: 'atlassian-warning',
            shortName: ':warning:',
            text: ':warning:',
        },
    },
    {
        markup: ['(+)'],
        adf: {
            id: 'atlassian-plus',
            shortName: ':plus:',
            text: ':plus:',
        },
    },
    {
        markup: ['(-)'],
        adf: {
            id: 'atlassian-minus',
            shortName: ':minus:',
            text: ':minus:',
        },
    },
    {
        markup: ['(?)'],
        adf: {
            id: 'atlassian-question_mark',
            shortName: ':question:',
            text: ':question:',
        },
    },
    {
        markup: ['(on)'],
        adf: {
            id: 'atlassian-light_bulb_on',
            shortName: ':light_bulb_on:',
            text: ':light_bulb_on:',
        },
    },
    {
        markup: ['(off)'],
        adf: {
            id: 'atlassian-light_bulb_off',
            shortName: ':light_bulb_off:',
            text: ':light_bulb_off:',
        },
    },
    {
        markup: ['(*)', '(*y)'],
        adf: {
            id: 'atlassian-yellow_star',
            shortName: ':yellow_star:',
            text: ':yellow_star:',
        },
    },
    {
        markup: ['(*r)'],
        adf: {
            id: 'atlassian-red_star',
            shortName: ':red_star:',
            text: ':red_star:',
        },
    },
    {
        markup: ['(*g)'],
        adf: {
            id: 'atlassian-green_star',
            shortName: ':green_star:',
            text: ':green_star:',
        },
    },
    {
        markup: ['(*b)'],
        adf: {
            id: 'atlassian-blue_star',
            shortName: ':blue_star:',
            text: ':blue_star:',
        },
    },
    {
        markup: ['(flag)'],
        adf: {
            id: 'atlassian-flag_on',
            shortName: ':flag_on:',
            text: ':flag_on:',
        },
    },
    {
        markup: ['(flagoff)'],
        adf: {
            id: 'atlassian-flag_off',
            shortName: ':flag_off:',
            text: ':flag_off:',
        },
    },
];
//# sourceMappingURL=emoji.js.map