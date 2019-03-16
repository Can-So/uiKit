var canUseDOM = function canUseDOM() {
  return Boolean(typeof window !== 'undefined' && window.document && window.document.createElement);
};

var supportsVoiceOver = function supportsVoiceOver() {
  return /Mac OS X/.test(canUseDOM() ? navigator.userAgent : '');
};

export default supportsVoiceOver;