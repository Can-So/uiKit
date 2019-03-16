import EmojiActivityIcon from '@findable/icon/glyph/emoji/activity';
import EmojiCustomIcon from '@findable/icon/glyph/emoji/custom';
import EmojiFlagsIcon from '@findable/icon/glyph/emoji/flags';
import EmojiFoodIcon from '@findable/icon/glyph/emoji/food';
import EmojiFrequentIcon from '@findable/icon/glyph/emoji/frequent';
import EmojiNatureIcon from '@findable/icon/glyph/emoji/nature';
import EmojiObjectsIcon from '@findable/icon/glyph/emoji/objects';
import EmojiPeopleIcon from '@findable/icon/glyph/emoji/people';
import EmojiSymbolsIcon from '@findable/icon/glyph/emoji/symbols';
import EmojiTravelIcon from '@findable/icon/glyph/emoji/travel';
import EmojiProductivityIcon from '@findable/icon/glyph/emoji/productivity';
import { customCategory, userCustomTitle, customTitle } from '../../constants';
export var CategoryDescriptionMap = {
    SEARCH: {
        id: 'SEARCH',
        name: 'categoriesSearchResults',
        icon: undefined,
        order: 0,
    },
    FREQUENT: {
        id: 'FREQUENT',
        name: 'frequentCategory',
        icon: EmojiFrequentIcon,
        order: 1,
    },
    PEOPLE: {
        id: 'PEOPLE',
        name: 'peopleCategory',
        icon: EmojiPeopleIcon,
        order: 2,
    },
    NATURE: {
        id: 'NATURE',
        name: 'natureCategory',
        icon: EmojiNatureIcon,
        order: 3,
    },
    FOODS: {
        id: 'FOODS',
        name: 'foodsCategory',
        icon: EmojiFoodIcon,
        order: 4,
    },
    ACTIVITY: {
        id: 'ACTIVITY',
        name: 'activityCategory',
        icon: EmojiActivityIcon,
        order: 5,
    },
    PLACES: {
        id: 'PLACES',
        name: 'placesCategory',
        icon: EmojiTravelIcon,
        order: 6,
    },
    OBJECTS: {
        id: 'OBJECTS',
        name: 'objectsCategory',
        icon: EmojiObjectsIcon,
        order: 7,
    },
    SYMBOLS: {
        id: 'SYMBOLS',
        name: 'symbolsCategory',
        icon: EmojiSymbolsIcon,
        order: 8,
    },
    FLAGS: {
        id: 'FLAGS',
        name: 'flagsCategory',
        icon: EmojiFlagsIcon,
        order: 9,
    },
    ATLASSIAN: {
        id: 'ATLASSIAN',
        name: 'productivityCategory',
        icon: EmojiProductivityIcon,
        order: 10,
    },
    USER_CUSTOM: {
        id: customCategory,
        name: userCustomTitle,
        icon: EmojiCustomIcon,
        order: 11,
    },
    CUSTOM: {
        id: customCategory,
        name: customTitle,
        icon: EmojiCustomIcon,
        order: 12,
    },
};
//# sourceMappingURL=categories.js.map