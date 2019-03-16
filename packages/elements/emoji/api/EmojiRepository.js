import * as tslib_1 from "tslib";
import { Search, UnorderedSearchIndex } from 'js-search';
import { defaultCategories, frequentCategory } from '../constants';
import { getCategoryId, isEmojiDescriptionWithVariations, } from '../type-helpers';
import { SearchSort, } from '../types';
import { tokenizerRegex } from './EmojiRepositoryRegex';
import { createSearchEmojiComparator, createUsageOnlyEmojiComparator, } from './internal/Comparators';
import { UsageFrequencyTracker } from './internal/UsageFrequencyTracker';
// FS-1097 - duplicated in mentions - extract at some point into a shared library
var Tokenizer = /** @class */ (function () {
    function Tokenizer() {
    }
    Tokenizer.prototype.tokenize = function (text) {
        return this.tokenizeAsTokens(text).map(function (token) { return token.token; });
    };
    Tokenizer.prototype.tokenizeAsTokens = function (text) {
        var match;
        var tokens = [];
        tokenizerRegex.lastIndex = 0;
        while ((match = tokenizerRegex.exec(text)) !== null) {
            if (match[0]) {
                tokens.push({
                    token: match[0],
                    start: match.index,
                });
            }
        }
        return tokens;
    };
    return Tokenizer;
}());
var addAllVariants = function (emoji, fnKey, map) {
    var key = fnKey(emoji);
    if (!map.has(key)) {
        map.set(key, []);
    }
    var emojisForKey = map.get(key);
    // Unnecessary, but typescript thinks it is. :/
    if (emojisForKey) {
        emojisForKey.push(emoji);
    }
    if (isEmojiDescriptionWithVariations(emoji)) {
        // map variations too
        var variations = emoji.skinVariations;
        if (variations) {
            variations.forEach(function (variation) { return addAllVariants(variation, fnKey, map); });
        }
    }
};
var findByKey = function (map, key) {
    var emojis = map.get(key);
    if (emojis && emojis.length) {
        // Priority is always to source from the last emoji set (last overrides first)
        return emojis[emojis.length - 1];
    }
    return undefined;
};
var splitQuery = function (query) {
    if (query === void 0) { query = ''; }
    var isColonQuery = query.indexOf(':') === 0;
    if (isColonQuery) {
        return {
            nameQuery: query.slice(1),
            asciiQuery: query,
        };
    }
    return {
        nameQuery: query,
        asciiQuery: '',
    };
};
export var getEmojiVariation = function (emoji, options) {
    if (isEmojiDescriptionWithVariations(emoji) && options) {
        var skinTone = options.skinTone;
        if (skinTone && emoji.skinVariations && emoji.skinVariations.length) {
            var skinToneEmoji = emoji.skinVariations[skinTone - 1]; // skinTone start at 1
            if (skinToneEmoji) {
                return skinToneEmoji;
            }
        }
    }
    return emoji;
};
var findEmojiIndex = function (emojis, toFind) {
    var findId = toFind.id;
    var match = -1;
    emojis.forEach(function (emoji, index) {
        // Match if ID is defined and are equal
        // Or both have no id and shortnames match
        if ((emoji.id && emoji.id === findId) ||
            (!emoji.id && !findId && emoji.shortName === toFind.shortName)) {
            match = index;
            return;
        }
    });
    return match;
};
var EmojiRepository = /** @class */ (function () {
    function EmojiRepository(emojis, usageTracker) {
        this.emojis = emojis;
        this.initMembers(usageTracker);
    }
    /**
     * Returns all available (and searchable) emoji in some default order.
     */
    EmojiRepository.prototype.all = function () {
        var options = {
            sort: SearchSort.None,
        };
        return this.search('', options);
    };
    /**
     * Text search of emoji shortName and name field for suitable matches.
     *
     * Returns an array of all (searchable) emoji if query is empty or null, otherwise returns matching emoji.
     *
     * You can change how the results are sorted by specifying a custom EmojiComparator in the SearchOptions. If
     * you don't want any sorting you can also disable via the SearchOptions (this might be a useful optimisation).
     * If no sort is specified in SearchOptions then a default sorting it applied based on the query.
     */
    EmojiRepository.prototype.search = function (query, options) {
        var filteredEmoji = [];
        var _a = splitQuery(query), nameQuery = _a.nameQuery, asciiQuery = _a.asciiQuery;
        if (nameQuery) {
            filteredEmoji = this.fullSearch.search(nameQuery);
            if (asciiQuery) {
                filteredEmoji = this.withAsciiMatch(asciiQuery, filteredEmoji);
            }
        }
        else {
            filteredEmoji = this.getAllSearchableEmojis();
        }
        filteredEmoji = this.applySearchOptions(filteredEmoji, query, options);
        return {
            emojis: filteredEmoji,
            query: query,
        };
    };
    /**
     * Returns all emoji with matching shortName
     */
    EmojiRepository.prototype.findAllMatchingShortName = function (shortName) {
        return this.shortNameMap.get(shortName) || [];
    };
    /**
     * Returns the first matching emoji matching the shortName, or null if none found.
     */
    EmojiRepository.prototype.findByShortName = function (shortName) {
        return findByKey(this.shortNameMap, shortName);
    };
    /**
     * Returns the first matching emoji matching the id, or null if none found.
     */
    EmojiRepository.prototype.findById = function (id) {
        return findByKey(this.idMap, id);
    };
    EmojiRepository.prototype.findByAsciiRepresentation = function (asciiEmoji) {
        return this.asciiMap.get(asciiEmoji);
    };
    EmojiRepository.prototype.findInCategory = function (categoryId) {
        if (categoryId === frequentCategory) {
            return this.getFrequentlyUsed();
        }
        else {
            return this.all().emojis.filter(function (emoji) { return emoji.category === categoryId; });
        }
    };
    EmojiRepository.prototype.addUnknownEmoji = function (emoji) {
        this.emojis = tslib_1.__spread(this.emojis, [emoji]);
        this.fullSearch.addDocuments([emoji]);
        this.addToMaps(emoji);
        this.addToDynamicCategories(emoji);
    };
    EmojiRepository.prototype.getAsciiMap = function () {
        return this.asciiMap;
    };
    /**
     * Return the most frequently used emoji, ordered from most frequent to least frequent. Return an empty array if
     * there are none.
     *
     * @param options optional settings to be applied to the set of frequently used emoji
     */
    EmojiRepository.prototype.getFrequentlyUsed = function (options) {
        var _this = this;
        var emojiIds = this.usageTracker.getOrder();
        var emojiResult = emojiIds
            .map(function (id) { return _this.findById(id); })
            .filter(function (e) { return e !== undefined; });
        if (options) {
            emojiResult = this.applySearchOptions(emojiResult, '', options);
        }
        return emojiResult;
    };
    EmojiRepository.prototype.getDynamicCategoryList = function () {
        return this.dynamicCategoryList.slice();
    };
    /**
     * Call this on emoji usage to allow the EmojiRepository to track the usage of emoji (which could be useful
     * in sorting, etc).
     *
     * @param emoji the emoji that was just used
     */
    EmojiRepository.prototype.used = function (emoji) {
        var _this = this;
        this.usageTracker.recordUsage(emoji);
        // If this is the first usage ensure that we update the dynamic categories.
        // This is done in a 'timeout' since the usageTracker call previously also happens in a timeout. This ensures that
        // the frequent category will not appear until the usage has been tracked (avoiding the possibility of an empty
        // frequent category being shown in the picker).
        if (this.dynamicCategoryList.indexOf(frequentCategory) === -1) {
            window.setTimeout(function () {
                _this.dynamicCategoryList.push(frequentCategory);
            });
        }
    };
    EmojiRepository.prototype.delete = function (emoji) {
        var deletedIndex = findEmojiIndex(this.emojis, emoji);
        if (deletedIndex !== -1) {
            // Remove the deleted emojis from the internal list
            this.emojis.splice(deletedIndex, 1);
            // Reconstruct repository member variables
            this.initMembers(this.usageTracker);
        }
    };
    EmojiRepository.prototype.withAsciiMatch = function (ascii, emojis) {
        var result = emojis;
        var asciiEmoji = this.findByAsciiRepresentation(ascii);
        if (asciiEmoji) {
            // Ensures that the same emoji isn't already in the list
            // If it is, we give precedence to the ascii match
            result = emojis.filter(function (e) { return e.id !== asciiEmoji.id; });
            result = tslib_1.__spread([asciiEmoji], result);
        }
        return result;
    };
    EmojiRepository.prototype.applySearchOptions = function (emojis, query, options) {
        if (!options) {
            options = {};
        }
        if (options.sort === undefined) {
            options.sort = SearchSort.Default;
        }
        var comparator;
        if (options.sort === SearchSort.Default) {
            comparator = createSearchEmojiComparator(query, this.usageTracker.getOrder());
        }
        else if (options.sort === SearchSort.UsageFrequency) {
            comparator = createUsageOnlyEmojiComparator(this.usageTracker.getOrder());
        }
        if (comparator) {
            comparator.compare = comparator.compare.bind(comparator); // TODO bind at a better place
            emojis = emojis.sort(comparator.compare);
        }
        if (options.limit && options.limit > 0) {
            emojis = emojis.slice(0, options.limit);
        }
        if (options.skinTone) {
            return emojis.map(function (emoji) {
                return getEmojiVariation(emoji, options);
            });
        }
        return emojis;
    };
    EmojiRepository.prototype.initMembers = function (usageTracker) {
        this.usageTracker = usageTracker || new UsageFrequencyTracker();
        this.initRepositoryMetadata();
        this.initSearchIndex();
    };
    /**
     * Optimisation to initialise all map member variables in single loop over emojis
     */
    EmojiRepository.prototype.initRepositoryMetadata = function () {
        var _this = this;
        this.shortNameMap = new Map();
        this.idMap = new Map();
        this.asciiMap = new Map();
        var categorySet = new Set();
        this.emojis.forEach(function (emoji) {
            categorySet.add(emoji.category);
            _this.addToMaps(emoji);
        });
        if (this.usageTracker.getOrder().length) {
            categorySet.add(frequentCategory);
        }
        this.dynamicCategoryList = Array.from(categorySet).filter(function (category) { return defaultCategories.indexOf(category) === -1; });
    };
    EmojiRepository.prototype.initSearchIndex = function () {
        this.fullSearch = new Search('id');
        this.fullSearch.tokenizer = new Tokenizer();
        this.fullSearch.searchIndex = new UnorderedSearchIndex();
        this.fullSearch.addIndex('name');
        this.fullSearch.addIndex('shortName');
        this.fullSearch.addDocuments(this.getAllSearchableEmojis());
    };
    EmojiRepository.prototype.getAllSearchableEmojis = function () {
        return this.emojis.filter(function (emojiDescription) { return emojiDescription.searchable; });
    };
    EmojiRepository.prototype.addToMaps = function (emoji) {
        var _this = this;
        // Give default value and assign higher weight to Atlassian emojis for logical order when sorting
        if (typeof emoji.order === 'undefined' || emoji.order === -1) {
            emoji.order = EmojiRepository.defaultEmojiWeight;
        }
        if (typeof emoji.id === 'undefined') {
            emoji.id = EmojiRepository.defaultEmojiWeight.toString();
        }
        addAllVariants(emoji, function (e) { return e.shortName; }, this.shortNameMap);
        addAllVariants(emoji, function (e) { return e.id; }, this.idMap);
        if (emoji.ascii) {
            emoji.ascii.forEach(function (a) { return _this.asciiMap.set(a, emoji); });
        }
    };
    EmojiRepository.prototype.addToDynamicCategories = function (emoji) {
        var category = getCategoryId(emoji);
        if (defaultCategories.indexOf(category) === -1 &&
            this.dynamicCategoryList.indexOf(category) === -1) {
            this.dynamicCategoryList.push(category);
        }
    };
    EmojiRepository.defaultEmojiWeight = 1000000;
    return EmojiRepository;
}());
export default EmojiRepository;
//# sourceMappingURL=EmojiRepository.js.map