// @flow
exports.type = 'perItem';

exports.active = true;

exports.description = 'calls back when it finds a style element';

exports.params = {
  callback: console.log.bind(console), // eslint-disable-line no-console
};

exports.fn = function callbackOnStyleElement(
  item /*: any*/,
  params /*: {
  callback: () => mixed
}*/,
) {
  if (item.isElem('style')) {
    params.callback();
  }
};
