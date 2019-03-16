/**
 * A replacement for `String.repeat` until it becomes widely available.
 */
export function stringRepeat(text, length) {
    var result = '';
    for (var x = 0; x < length; x++) {
        result += text;
    }
    return result;
}
/**
 * This function escapes all plain-text sequences that might get converted into markdown
 * formatting by Bitbucket server (via python-markdown).
 * @see MarkdownSerializerState.esc()
 */
export function escapeMarkdown(str, startOfLine, insideTable) {
    var strToEscape = str || '';
    strToEscape = strToEscape.replace(/[`*\\+_()\[\]{}]/g, '\\$&');
    if (startOfLine) {
        strToEscape = strToEscape
            .replace(/^[#-&(-*]/, '\\$&') // Don't escape ' character
            .replace(/^(\d+)\./, '$1\\.');
    }
    if (insideTable) {
        strToEscape = strToEscape.replace(/[|]/g, '\\$&');
    }
    return strToEscape;
}
var SPECIAL_CHARACTERS = /\u200c|↵/g;
function removeSpecialCharacters(node) {
    if (node.nodeType === 3 && node.textContent) {
        node.textContent = node.textContent.replace(SPECIAL_CHARACTERS, '');
    }
    Array.from(node.childNodes).forEach(function (child) { return removeSpecialCharacters(child); });
}
/**
 * This function gets markup rendered by Bitbucket server and transforms it into markup that
 * can be consumed by Prosemirror HTML parser, conforming to our schema.
 */
export function transformHtml(html, options) {
    var el = document.createElement('div');
    el.innerHTML = html;
    // Remove zero-width-non-joiner
    Array.from(el.querySelectorAll('p')).forEach(function (p) {
        removeSpecialCharacters(p);
    });
    // Convert mention containers, i.e.:
    //   <a href="/abodera/" rel="nofollow" title="@abodera" class="mention mention-me">Artur Bodera</a>
    Array.from(el.querySelectorAll('a.mention, a.ap-mention')).forEach(function (a) {
        var span = document.createElement('span');
        span.setAttribute('class', 'editor-entity-mention');
        span.setAttribute('contenteditable', 'false');
        var atlassianId = a.getAttribute('data-atlassian-id') || '';
        if (atlassianId) {
            // Atlassian ID is wrapped in curlies so that it get serialized as @{aid-id} instead of @aid-id
            span.setAttribute('data-mention-id', "{" + atlassianId + "}");
        }
        else {
            var title = a.getAttribute('title') || '';
            if (title) {
                var usernameMatch = title.match(/^@(.*?)$/);
                if (usernameMatch) {
                    var username = usernameMatch[1];
                    span.setAttribute('data-mention-id', username);
                }
            }
        }
        var text = a.textContent || '';
        if (text.indexOf('@') === 0) {
            span.textContent = a.textContent;
        }
        else {
            span.textContent = "@" + a.textContent;
        }
        a.parentNode.insertBefore(span, a);
        a.parentNode.removeChild(a);
    });
    // Convert mention containers, i.e.:
    //   <span class="ap-mention" data-atlassian-id="5c09bf77ec71bd223bbe866f">@Scott Demo</span>
    Array.from(el.querySelectorAll('span.ap-mention')).forEach(function (s) {
        var span = document.createElement('span');
        span.setAttribute('class', 'editor-entity-mention');
        span.setAttribute('contenteditable', 'false');
        var atlassianId = s.getAttribute('data-atlassian-id') || '';
        span.setAttribute('data-mention-id', "{" + atlassianId + "}");
        var text = s.textContent || '';
        span.textContent = text.indexOf('@') === 0 ? text : "@" + text;
        s.parentNode.insertBefore(span, s);
        s.parentNode.removeChild(s);
    });
    // Parse emojis i.e.
    //     <img src="https://d301sr5gafysq2.cloudfront.net/207268dc597d/emoji/img/diamond_shape_with_a_dot_inside.svg" alt="diamond shape with a dot inside" title="diamond shape with a dot inside" class="emoji">
    Array.from(el.querySelectorAll('img.emoji')).forEach(function (img) {
        var span = document.createElement('span');
        var shortName = img.getAttribute('data-emoji-short-name') || '';
        if (!shortName) {
            // Fallback to parsing Bitbucket's src attributes to find the
            // short name
            var src = img.getAttribute('src');
            var idMatch = !src ? false : src.match(/([^\/]+)\.[^\/]+$/);
            if (idMatch) {
                shortName = ":" + decodeURIComponent(idMatch[1]) + ":";
            }
        }
        if (shortName) {
            span.setAttribute('data-emoji-short-name', shortName);
        }
        img.parentNode.insertBefore(span, img);
        img.parentNode.removeChild(img);
    });
    if (!options.disableBitbucketLinkStripping) {
        // Convert all automatic links to plain text, because they will be re-created on render by the server
        Array.from(el.querySelectorAll('a'))
            // Don't convert external links (i.e. not automatic links)
            .filter(function (a) {
            return a.getAttribute('data-is-external-link') !== 'true';
        })
            .forEach(function (a) {
            Array.from(a.childNodes).forEach(function (child) {
                a.parentNode.insertBefore(child, a);
            });
            a.parentNode.removeChild(a);
        });
    }
    // Parse images
    // Not using :pseudo because of IE11 bug:
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/16104908/
    Array.from(el.querySelectorAll('img'))
        .filter(function (img) { return !img.classList.contains('emoji'); })
        .forEach(function (img) {
        var parentNode = img.parentNode;
        if (!parentNode) {
            return;
        }
        /**
         * Lift image node if parent isn't the root-element
         */
        if (parentNode !== el) {
            var isValidPath = validateImageNodeParent(parentNode);
            if (!isValidPath) {
                liftImageNode(parentNode, img);
            }
        }
        /**
         * Replace image with media node
         */
        var mediaSingle = document.createElement('div');
        mediaSingle.setAttribute('data-node-type', 'mediaSingle');
        var media = document.createElement('div');
        media.setAttribute('data-node-type', 'media');
        media.setAttribute('data-type', 'external');
        media.setAttribute('data-url', img.getAttribute('src'));
        mediaSingle.appendChild(media);
        img.parentNode.insertBefore(mediaSingle, img);
        img.parentNode.removeChild(img);
    });
    function validateImageNodeParent(node) {
        var ALLOWED_PARENTS = [
            'LI',
            'UL',
            'OL',
            'TD',
            'TH',
            'TR',
            'TBODY',
            'THEAD',
            'TABLE',
        ];
        if (node === el) {
            return true;
        }
        if (ALLOWED_PARENTS.indexOf(node.nodeName) === -1) {
            return false;
        }
        if (!node.parentNode) {
            return false;
        }
        return validateImageNodeParent(node.parentNode);
    }
    function liftImageNode(node, img) {
        var foundParent = false;
        var parent = node;
        while (!foundParent) {
            foundParent = validateImageNodeParent(parent.parentNode);
            if (!foundParent) {
                parent = parent.parentNode;
            }
        }
        var cloned = parent.cloneNode();
        var target = parent !== el ? parent.parentNode : el;
        while (img.nextSibling) {
            cloned.appendChild(img.nextSibling);
        }
        if (node !== parent) {
            while (node.nextSibling) {
                cloned.appendChild(node.nextSibling);
            }
        }
        if (parent.nextSibling) {
            target.insertBefore(cloned, parent.nextSibling);
            target.insertBefore(img, cloned);
        }
        else {
            target.appendChild(img);
            target.appendChild(cloned);
        }
        /**
         * If the splitting operation results in
         * the old parent being empty, remove it
         */
        if (node.childNodes.length === 0) {
            node.parentNode.removeChild(node);
        }
        /**
         * Remove cloned element if it's empty.
         */
        if (cloned.childNodes.length === 0) {
            cloned.parentNode.removeChild(cloned);
        }
    }
    return el;
}
//# sourceMappingURL=util.js.map