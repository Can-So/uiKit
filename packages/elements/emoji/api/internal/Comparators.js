import * as tslib_1 from "tslib";
import { MAX_ORDINAL } from '../../constants';
import { isEmojiVariationDescription } from '../../type-helpers';
/**
 * Create the default sort comparator to be used for the user queries against emoji
 *
 * @param query the query used in the search to be sorted. Any colons will be stripped from the query and it will be
 * converted to lowercase.
 * @param orderedIds the id of emoji ordered by how frequently they are used
 */
export function createSearchEmojiComparator(query, orderedIds) {
    var textQuery = query
        ? query
            .replace(/:/g, '')
            .toLowerCase()
            .trim()
        : undefined;
    var comparators = [];
    if (query) {
        comparators.push(new AsciiMatchComparator(query));
    }
    // Add the comparators to the 'chain'. The order of adding each comparator is important to the sort that is applied by the
    // ChainedEmojiComparator. (Which is why you may see the same 'if' a few times.)
    if (textQuery) {
        comparators.push(new ExactShortNameMatchComparator(textQuery));
    }
    if (orderedIds && orderedIds.length) {
        comparators.push(new UsageFrequencyComparator(orderedIds));
    }
    if (textQuery) {
        comparators.push(new QueryStringPositionMatchComparator(textQuery, 'shortName'), new QueryStringPositionMatchComparator(textQuery, 'name'));
    }
    comparators.push(OrderComparator.Instance, AlphabeticalShortnameComparator.Instance);
    var comparator = new (ChainedEmojiComparator.bind.apply(ChainedEmojiComparator, tslib_1.__spread([void 0], comparators)))();
    comparator.compare = comparator.compare.bind(comparator);
    return comparator;
}
export function createUsageOnlyEmojiComparator(orderedIds) {
    var comparator = new ChainedEmojiComparator(new UsageFrequencyComparator(orderedIds), new EmojiTypeComparator(), OrderComparator.Instance);
    comparator.compare = comparator.compare.bind(comparator);
    return comparator;
}
/**
 * A combinator comparator that applies an ordered chained of sub-comparators. The first comparator that
 * returns a non-zero value stops the chain and causes that value to be returned. If a comparator returns a
 * zero then the next one in the chain is tried.
 *
 * If no comparators in the chain return a non-zero value then zero will be returned.
 */
var ChainedEmojiComparator = /** @class */ (function () {
    function ChainedEmojiComparator() {
        var comparators = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            comparators[_i] = arguments[_i];
        }
        this.chain = comparators;
    }
    ChainedEmojiComparator.prototype.compare = function (e1, e2) {
        for (var i = 0; i < this.chain.length; i++) {
            var result = this.chain[i].compare(e1, e2);
            if (result !== 0) {
                return result;
            }
        }
        return 0;
    };
    return ChainedEmojiComparator;
}());
export { ChainedEmojiComparator };
/**
 * Orders two emoji such that if one of them has an ascii representation that exactly matches the query then it will
 * be ordered first.
 */
var AsciiMatchComparator = /** @class */ (function () {
    function AsciiMatchComparator(query) {
        this.query = query;
    }
    AsciiMatchComparator.prototype.compare = function (e1, e2) {
        var e1HasAscii = e1.ascii && e1.ascii.indexOf(this.query) !== -1;
        var e2HasAscii = e2.ascii && e2.ascii.indexOf(this.query) !== -1;
        if (e1HasAscii && !e2HasAscii) {
            return -1;
        }
        else if (!e1HasAscii && e2HasAscii) {
            return 1;
        }
        return 0;
    };
    return AsciiMatchComparator;
}());
export { AsciiMatchComparator };
/**
 * Orders two emoji such that the one who's shortname matches the query exactly comes first. If there are matching
 * shortnames then the type of emoji is taken into account with SITE emoji coming first.
 */
var ExactShortNameMatchComparator = /** @class */ (function () {
    function ExactShortNameMatchComparator(query) {
        this.colonQuery = ":" + query + ":";
        this.typeComparator = new EmojiTypeComparator(true);
    }
    ExactShortNameMatchComparator.prototype.compare = function (e1, e2) {
        if (e1.shortName === this.colonQuery && e2.shortName === this.colonQuery) {
            return this.typeComparator.compare(e1, e2);
        }
        else if (e1.shortName === this.colonQuery) {
            return -1;
        }
        else if (e2.shortName === this.colonQuery) {
            return 1;
        }
        return 0;
    };
    return ExactShortNameMatchComparator;
}());
export { ExactShortNameMatchComparator };
/**
 * Orders two emoji based on their type, with the types being STANDARD, ATLASSIAN and SITE (in that order).
 * If the comparator is configured to 'reverse' then the order will be SITE, ATLASSIAN, STANDARD.
 *
 * Regardless of the reverse setting, an unknown type will always come last.
 */
var EmojiTypeComparator = /** @class */ (function () {
    function EmojiTypeComparator(reverse) {
        if (reverse) {
            this.typeToNumber = new Map([
                ['SITE', 0],
                ['ATLASSIAN', 1],
                ['STANDARD', 2],
            ]);
        }
        else {
            this.typeToNumber = new Map([
                ['STANDARD', 0],
                ['ATLASSIAN', 1],
                ['SITE', 2],
            ]);
        }
    }
    EmojiTypeComparator.prototype.compare = function (e1, e2) {
        return this.emojiTypeToOrdinal(e1) - this.emojiTypeToOrdinal(e2);
    };
    EmojiTypeComparator.prototype.emojiTypeToOrdinal = function (emoji) {
        var ordinal = this.typeToNumber.get(emoji.type);
        if (ordinal === undefined) {
            ordinal = 10;
        }
        return ordinal;
    };
    return EmojiTypeComparator;
}());
export { EmojiTypeComparator };
/**
 * Order two emoji such as the one which is more frequently used comes first. If neither have any usage
 * information then leave their order unchanged.
 */
var UsageFrequencyComparator = /** @class */ (function () {
    function UsageFrequencyComparator(orderedIds) {
        var _this = this;
        this.positionLookup = new Map();
        // Make ordering start from 1 to avoid having zero in the map (which is falsey)
        orderedIds.map(function (id, index) { return _this.positionLookup.set(id, index + 1); });
    }
    UsageFrequencyComparator.prototype.compare = function (e1, e2) {
        if (!e1.id || !e2.id) {
            return 0; // this shouldn't occur. Leave position unchanged if there is any missing id.
        }
        var i1 = this.getPositionInOrder(e1);
        var i2 = this.getPositionInOrder(e2);
        return i1 - i2;
    };
    /**
     * Get the ordinal representing the position of this emoji.
     *
     * @param id the id of the emoji
     */
    UsageFrequencyComparator.prototype.getPositionInOrder = function (emoji) {
        var id = emoji.id ? emoji.id : '0';
        if (isEmojiVariationDescription(emoji)) {
            id = emoji.baseId;
        }
        var position = this.positionLookup.get(id);
        if (position) {
            return position;
        }
        else {
            return MAX_ORDINAL;
        }
    };
    return UsageFrequencyComparator;
}());
export { UsageFrequencyComparator };
/**
 * A comparator that will sort higher an emoji which matches the query string earliest in the indicated
 * property.
 */
var QueryStringPositionMatchComparator = /** @class */ (function () {
    /**
     * @param query the query to match
     * @param propertyToCompare the property of EmojiDescription to check for query within
     */
    function QueryStringPositionMatchComparator(query, propertyToCompare) {
        this.query = query;
        if (!propertyToCompare) {
            throw new Error('propertyToCompare is required');
        }
        this.propertyName = propertyToCompare;
    }
    QueryStringPositionMatchComparator.prototype.getScore = function (emoji) {
        // It is fine to do override the null check here because we are checking
        // it on the constructor.
        var propertyValue = emoji[this.propertyName];
        var score = propertyValue
            ? propertyValue.indexOf(this.query)
            : MAX_ORDINAL;
        return score === -1 ? MAX_ORDINAL : score;
    };
    QueryStringPositionMatchComparator.prototype.compare = function (e1, e2) {
        return this.getScore(e1) - this.getScore(e2);
    };
    return QueryStringPositionMatchComparator;
}());
export { QueryStringPositionMatchComparator };
var OrderComparator = /** @class */ (function () {
    function OrderComparator() {
    }
    Object.defineProperty(OrderComparator, "Instance", {
        get: function () {
            return this.INSTANCE || (this.INSTANCE = new this());
        },
        enumerable: true,
        configurable: true
    });
    OrderComparator.prototype.compare = function (e1, e2) {
        var o1 = e1.order ? e1.order : MAX_ORDINAL;
        var o2 = e2.order ? e2.order : MAX_ORDINAL;
        return o1 - o2;
    };
    return OrderComparator;
}());
export { OrderComparator };
var AlphabeticalShortnameComparator = /** @class */ (function () {
    function AlphabeticalShortnameComparator() {
    }
    Object.defineProperty(AlphabeticalShortnameComparator, "Instance", {
        get: function () {
            return this.INSTANCE || (this.INSTANCE = new this());
        },
        enumerable: true,
        configurable: true
    });
    AlphabeticalShortnameComparator.prototype.compare = function (e1, e2) {
        return e1.shortName.localeCompare(e2.shortName);
    };
    return AlphabeticalShortnameComparator;
}());
export { AlphabeticalShortnameComparator };
//# sourceMappingURL=Comparators.js.map