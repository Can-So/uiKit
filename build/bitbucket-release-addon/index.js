import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import queryString from 'query-string';
import flattenChangesets from '@findable/build-releases/version/flattenChangesets';
import getCommits from './get-commits';
import getFSChangesets from './get-fs-changesets';
var noChangesetMessage = "<div style=\"border: 2px solid red; padding: 10px; border-radius: 10px; display: inline-block;\">\n  <p><strong>Warning:</strong> No packages will be released with this PR</p>\n  <p>If this was not intentional make sure you have run `bolt changeset` if you are trying to release packages.</p>\n  <p>See <a href=\"https://github.com/fnamazing/uiKit/src/HEAD/docs/guides/07-releasing-packages.md\" target=\"_parent\">this guide</a> for more details.</p>\n\n</div>";
var errorLoadingChangesetMessage = "<div style=\"color: red; border: 2px solid; padding: 10px; border-radius: 10px; display: inline-block;\">\n<p>Error loading changesets for this PR</p>\n</div>";

function releasesToHtmlList(releases) {
  return "<ul>\n    ".concat(releases.map(function (release) {
    return release.name;
  }).join(', '), "\n  </ul>");
}

var releasedPackagesMessage = function releasedPackagesMessage(releases) {
  var majorReleases = releases.filter(function (release) {
    return release.type === 'major';
  });
  var minorReleases = releases.filter(function (release) {
    return release.type === 'minor';
  });
  var patchReleases = releases.filter(function (release) {
    return release.type === 'patch';
  });
  var majorReleasesSection = majorReleases.length > 0 ? "<h3>\uD83D\uDCA5 Major Releases</h3>".concat(releasesToHtmlList(majorReleases)) : '';
  var minorReleasesSection = minorReleases.length > 0 ? "<h3>\u2728 Minor Releases</h3>".concat(releasesToHtmlList(minorReleases)) : '';
  var patchReleasesSection = patchReleases.length > 0 ? "<h3>\uD83D\uDEE0 Patch Releases</h3>".concat(releasesToHtmlList(patchReleases)) : '';
  return "<div style=\"color: green; border: 1px solid; padding: 10px; border-radius: 10px; display: inline-block;\">\n    ".concat(majorReleasesSection, "\n    ").concat(minorReleasesSection, "\n    ").concat(patchReleasesSection, "\n  </div>");
};

var _queryString$parse = queryString.parse(window.location.search),
    user = _queryString$parse.user,
    repo = _queryString$parse.repo,
    pullrequestid = _queryString$parse.pullrequestid;

Promise.all([getCommits(user, repo, pullrequestid), getFSChangesets(user, repo, pullrequestid)]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      changesetsFromCommits = _ref2[0],
      changesetsFromFS = _ref2[1];

  var changesets = [].concat(_toConsumableArray(changesetsFromCommits), _toConsumableArray(changesetsFromFS));

  if (changesets.length === 0) {
    document.body.innerHTML = noChangesetMessage;
    return;
  }

  var releases = flattenChangesets(changesets);
  document.body.innerHTML = releasedPackagesMessage(releases);
}).catch(function (e) {
  console.error('error in changeset', e);
  document.body.innerHTML = errorLoadingChangesetMessage;
});