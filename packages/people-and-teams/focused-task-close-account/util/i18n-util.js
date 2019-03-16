import { cs, da, de, en, en_GB, es, et, fi, fr, hu, is, it, ja, ko, nb, nl, pl, pt_BR, pt_PT, ro, ru, sk, sv, zh, } from '../i18n';
var localesMessagesMap = {
    cs: cs,
    da: da,
    de: de,
    en: en,
    en_GB: en_GB,
    es: es,
    et: et,
    fi: fi,
    fr: fr,
    hu: hu,
    is: is,
    it: it,
    ja: ja,
    ko: ko,
    nb: nb,
    nl: nl,
    pl: pl,
    pt_BR: pt_BR,
    'pt-BR': pt_BR,
    pt_PT: pt_PT,
    'pt-PT': pt_PT,
    ro: ro,
    ru: ru,
    sk: sk,
    sv: sv,
    zh: zh,
};
/**
 * Tries to get the most specific messages bundle for a given locale.
 *
 * Strategy:
 * 1. Try to find messages with the exact string (i.e. 'fr_FR')
 * 2. If that doesn't work, try to find messages for the country locale (i.e. 'fr')
 * 3. If that doesn't work, return english messages as a fallback.
 *
 * @param locale string specifying the locale like 'en_GB', or 'fr'.
 */
export var getMessagesForLocale = function (locale) {
    var messages = localesMessagesMap[locale];
    if (!messages) {
        var parentLocale = locale.split(/[-_]/)[0];
        messages = localesMessagesMap[parentLocale];
    }
    if (!messages) {
        messages = en;
    }
    return messages;
};
//# sourceMappingURL=i18n-util.js.map