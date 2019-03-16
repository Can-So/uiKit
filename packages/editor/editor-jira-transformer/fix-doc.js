function getNodeName(node) {
    return node && node.nodeName.toUpperCase();
}
function isMedia(node) {
    if (!node) {
        return false;
    }
    if (getNodeName(node) === 'SPAN' && node instanceof HTMLElement) {
        return !!node.querySelector('a > jira-attachment-thumbnail > img[data-attachment-type="thumbnail"], ' +
            'a[data-attachment-type="file"]');
    }
    return false;
}
function repairParagraph(p) {
    var paragraphs = [];
    var buffer = [];
    var mediaGroupFound = false;
    var skipBuffer = false;
    var processMedia = function () {
        if (buffer.length) {
            var head = buffer[0];
            if (getNodeName(head) === 'BR') {
                buffer.shift();
            }
            paragraphs.push(buffer);
            buffer = [];
        }
    };
    for (var i = 0, length_1 = p.childNodes.length; i < length_1; i++) {
        var node = p.childNodes[i];
        skipBuffer = false;
        // [..., M, BR, ...]
        if (getNodeName(node) === 'BR') {
            // [mmm, M, BR, ...]
            if (mediaGroupFound) {
                processMedia();
                mediaGroupFound = false;
                skipBuffer = true;
            }
            // [..., BR, M, ...]
            if (isMedia(node.nextSibling)) {
                mediaGroupFound = true;
                if (buffer.length) {
                    paragraphs.push(buffer);
                    buffer = [];
                }
            }
        }
        else if (isMedia(node)) {
            // [M, ...]
            if (node.previousSibling === null) {
                mediaGroupFound = true;
            }
        }
        else {
            if (mediaGroupFound) {
                // Skip white space characters inside media
                if (getNodeName(node) === '#TEXT' &&
                    (node.textContent || '').trim() === '') {
                    continue;
                }
                buffer = (paragraphs.pop() || []).concat(buffer);
                mediaGroupFound = false;
            }
        }
        if (!skipBuffer) {
            buffer.push(node);
        }
    }
    if (mediaGroupFound) {
        processMedia();
    }
    else {
        paragraphs.push(buffer);
    }
    if (paragraphs.length > 1) {
        var fragment_1 = document.createDocumentFragment();
        paragraphs.forEach(function (childP) {
            var innerP = document.createElement('p');
            childP.forEach(function (child) { return innerP.appendChild(child); });
            fragment_1.appendChild(innerP);
        });
        // Replace old P
        var parent_1 = p.parentNode;
        parent_1.insertBefore(fragment_1, p.nextSibling);
        // IE11 doesn't support remove
        parent_1.removeChild(p);
    }
}
export default function (doc) {
    var paragraphs = doc.querySelectorAll('p');
    for (var i = 0, length_2 = paragraphs.length; i < length_2; i++) {
        repairParagraph(paragraphs[i]);
    }
    return doc;
}
//# sourceMappingURL=fix-doc.js.map