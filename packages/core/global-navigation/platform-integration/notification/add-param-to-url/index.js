// TODO: Check if we really need to use this package below
import UrlParse from 'url-parse';
export default (function (url, key, value) {
  if (!key || !value) {
    return url;
  }

  var parsedUrl = UrlParse(url);
  var seperator = parsedUrl.query.length ? '&' : '?';
  parsedUrl.set('query', "".concat(parsedUrl.query).concat(seperator).concat(key, "=").concat(encodeURIComponent(value)));
  return parsedUrl.href;
});