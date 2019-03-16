import * as tslib_1 from "tslib";
import { isEmail, isValidEmail, } from '@atlaskit/user-picker';
import memoizeOne from 'memoize-one';
var matchAllowedDomains = memoizeOne(function (domain, config) {
    return (config &&
        config.allowedDomains &&
        config.allowedDomains.indexOf(domain) !== -1);
});
var cannotInvite = function (config, userDomains) {
    var e_1, _a;
    try {
        for (var userDomains_1 = tslib_1.__values(userDomains), userDomains_1_1 = userDomains_1.next(); !userDomains_1_1.done; userDomains_1_1 = userDomains_1.next()) {
            var domain = userDomains_1_1.value;
            if (!matchAllowedDomains(domain, config)) {
                return true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (userDomains_1_1 && !userDomains_1_1.done && (_a = userDomains_1.return)) _a.call(userDomains_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return false;
};
var extractDomain = function (email) { return email.replace(/^[^@]+@(.+)$/, '$1'); };
var removeDuplicates = function (values, nextValue) {
    return values.add(nextValue);
};
var checkDomains = function (config, selectedUsers) {
    var usersDomain = selectedUsers.reduce(function (set, email) { return removeDuplicates(set, extractDomain(email.id)); }, new Set());
    return cannotInvite(config, usersDomain);
};
/**
 * Decides if the warn message should be shown in the share form.
 *
 * @param config share configuration object
 * @param selectedUsers selected users in the user picker
 */
export var showInviteWarning = function (config, selectedUsers) {
    if (config && selectedUsers) {
        var mode = config.mode;
        var selectedEmails = Array.isArray(selectedUsers)
            ? selectedUsers.filter(isEmail)
            : [selectedUsers].filter(isEmail);
        return (selectedEmails.length > 0 &&
            (mode === 'EXISTING_USERS_ONLY' ||
                mode === 'INVITE_NEEDS_APPROVAL' ||
                ((mode === 'ONLY_DOMAIN_BASED_INVITE' ||
                    mode === 'DOMAIN_BASED_INVITE') &&
                    checkDomains(config, selectedEmails))));
    }
    return false;
};
export var optionDataToUsers = function (optionDataArray) {
    return optionDataArray.map(function (optionData) {
        switch (optionData.type) {
            case 'email':
                var user = {
                    type: 'user',
                    email: optionData.id,
                };
                return user;
            default:
                return {
                    type: optionData.type || 'user',
                    id: optionData.id,
                };
        }
    });
};
export var allowEmails = function (config) {
    return config && config.mode !== 'EXISTING_USERS_ONLY';
};
var needToCheckDomain = function (config) {
    return config && config.mode === 'ONLY_DOMAIN_BASED_INVITE';
};
export var isValidEmailUsingConfig = memoizeOne(function (config) {
    var checkDomain = needToCheckDomain(config);
    return function (inputText) {
        var result = isValidEmail(inputText);
        if (result === 'VALID' &&
            checkDomain &&
            !matchAllowedDomains(extractDomain(inputText), config)) {
            return 'POTENTIAL';
        }
        return result;
    };
});
//# sourceMappingURL=utils.js.map