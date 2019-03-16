import * as React from 'react';
import { ContentType } from '../model/Result';
import PageIcon from '@findable/icon-object/glyph/page/24';
import BlogIcon from '@findable/icon-object/glyph/blog/24';
import ImageIcon from '@findable/icon-file-type/glyph/image/24';
import ExcelSpreadsheetIcon from '@findable/icon-file-type/glyph/excel-spreadsheet/24';
import VideoIcon from '@findable/icon-file-type/glyph/video/24';
import ArchiveIcon from '@findable/icon-file-type/glyph/archive/24';
import PowerpointPresentationIcon from '@findable/icon-file-type/glyph/powerpoint-presentation/24';
import SourceCodeIcon from '@findable/icon-file-type/glyph/source-code/24';
import AudioIcon from '@findable/icon-file-type/glyph/audio/24';
import WordDocumentIcon from '@findable/icon-file-type/glyph/word-document/24';
import PdfDocumentIcon from '@findable/icon-file-type/glyph/pdf-document/24';
import GenericIcon from '@findable/icon-file-type/glyph/generic/24';
import Avatar from '@findable/avatar';
import { colors } from '@findable/theme';
/**
 * The following code was derived from an implementation in confluence-frontend,
 * although it differs substantially.
 *
 * The original can be found at ./packages/confluence-rest-api/src/helpers/icons.js
 */
var ATTACHMENT_ICON_CLASS_PREFIXES = [
    // Quick Nav prefix
    'content-type-attachment-',
    // CQL prefix
    'icon-file-',
];
var DEFAULT_ATTACHMENT_AVATAR = GenericIcon;
var ATTACHMENT_FILE_EXTENSION_MATCHERS = [
    {
        regexp: /\.(gif|jpeg|jpg|png)$/i,
        avatar: ImageIcon,
    },
    {
        regexp: /\.(pdf)$/i,
        avatar: PdfDocumentIcon,
    },
    {
        regexp: /\.(docx|dotx|doc|dot)$/i,
        avatar: WordDocumentIcon,
    },
    {
        regexp: /\.(xml|html|js|css|java|jar|war|ear)$/i,
        avatar: SourceCodeIcon,
    },
    {
        regexp: /\.(xlt|xls|xlsm|xlsx|xlst)$/i,
        avatar: ExcelSpreadsheetIcon,
    },
    {
        regexp: /\.(wma|wmv|ram|mp3)$/i,
        avatar: AudioIcon,
    },
    {
        regexp: /\.(pptx|ppsx|potx|pot|ppt|pptm)$/i,
        avatar: PowerpointPresentationIcon,
    },
    {
        regexp: /\.(mov|mpeg|mpg|mp4|avi)$/i,
        avatar: VideoIcon,
    },
    {
        regexp: /\.(zip)$/i,
        avatar: ArchiveIcon,
    },
];
var getIconType = function (iconClass, fileName) {
    // Check the iconClass to make sure we're looking at an attachment
    var prefixMatches = ATTACHMENT_ICON_CLASS_PREFIXES.find(function (prefix) {
        return iconClass.startsWith(prefix);
    });
    // if it's an attachment, look at the file extension to work out which type
    if (prefixMatches) {
        var matchingType = ATTACHMENT_FILE_EXTENSION_MATCHERS.find(function (extensionMatcher) {
            var matches = extensionMatcher.regexp.exec(fileName);
            return !!matches && matches.length > 0;
        });
        if (matchingType) {
            return matchingType.avatar;
        }
    }
    return DEFAULT_ATTACHMENT_AVATAR;
};
export var getAvatarForConfluenceObjectResult = function (result) {
    if (result.contentType === ContentType.ConfluencePage) {
        return (React.createElement(PageIcon, { size: "medium", primaryColor: colors.B200, label: result.name }));
    }
    else if (result.contentType === ContentType.ConfluenceBlogpost) {
        return (React.createElement(BlogIcon, { label: result.name, size: "medium", primaryColor: colors.B200 }));
    }
    else if (result.contentType === ContentType.ConfluenceAttachment) {
        return getMediaTypeAvatarForResult(result);
    }
    else {
        return React.createElement(Avatar, { src: result.avatarUrl, size: "medium", appearance: "square" });
    }
};
export var getMediaTypeAvatarForResult = function (result) {
    var IconComponent = getIconType(result.iconClass, result.name);
    return React.createElement(IconComponent, { label: result.name, size: "medium" });
};
//# sourceMappingURL=confluence-avatar-util.js.map