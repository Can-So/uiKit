var validRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
var potentialRegex = /^[^\s@]+@[^\s@]*$/i;
export var isValidEmail = function (inputText) {
    if (inputText.match(validRegex)) {
        return 'VALID';
    }
    if (inputText.match(potentialRegex)) {
        return 'POTENTIAL';
    }
    return 'INVALID';
};
//# sourceMappingURL=emailValidation.js.map