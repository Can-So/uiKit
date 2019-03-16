export var AC_XMLNS = 'http://example.com/ac';
export var RI_XMLNS = 'http://example.com/ri';
export var FAB_XMLNS = 'http://example.com/fab';
export var XHTML_XMLNS = 'http://www.w3.org/1999/xhtml';
export default function (node) {
    // The naive approach here is to simply call .outerHTML on a node, however this has an undesirable
    // behaviour of including the xmlns:* attributes on the node. Confluence Storage Format expects that
    // these are *not* included.
    //
    // To avoid including these, we fall back to hacky plain text slicing. The strategy is to included
    // some wrapper elements that will contain the xmlns:* attributes. A document will be structured as:
    //
    //     <wrapper xmlns="http://www.w3.org/1999/xhtml">
    //       <fab:wrapper xmlns="http://example.com/fab">
    //         <ac:wrapper xmlns="http://example.com/ac">
    //           <ri:wrapper xmlns="http://example.com/ri">
    //             …
    //           </ri:wrapper>
    //         </ac:wrapper>
    //       </fab:wrapper>
    //     </wrapper>
    //
    // Before content is added, `.outerHTML` of the `ac:wrapper` is used to determine the number of
    // leading/trailing bytes need to be trimmed in the final result (to remove the wrappers).
    //
    // WARNING: This method will move `element` into a new parent element, but will put it back
    // before returning.
    var doc = node.ownerDocument;
    var marker = doc.createElement('marker');
    if (node.parentNode) {
        node.parentNode.replaceChild(marker, node);
    }
    var wrapper = doc.createElementNS(XHTML_XMLNS, 'wrapper');
    var acWrapper = doc.createElementNS(AC_XMLNS, 'ac:wrapper');
    var riWrapper = doc.createElementNS(RI_XMLNS, 'ri:wrapper');
    var fabWrapper = doc.createElementNS(FAB_XMLNS, 'fab:wrapper');
    wrapper.appendChild(fabWrapper);
    fabWrapper.appendChild(acWrapper);
    acWrapper.appendChild(riWrapper);
    // Force avoid self-closing tags, as these would invalidate suffix/prefix length calculations.
    var wedge = '|';
    var wedgeText = doc.createTextNode(wedge);
    riWrapper.appendChild(wedgeText);
    var template = wrapper.outerHTML;
    var prefixLength = template.indexOf(wedge);
    var suffixLength = template.length - prefixLength - wedge.length;
    riWrapper.removeChild(wedgeText);
    riWrapper.appendChild(node);
    var wrappedResult = wrapper.outerHTML;
    var result = wrappedResult.slice(prefixLength, wrappedResult.length - suffixLength);
    if (marker.parentNode) {
        marker.parentNode.replaceChild(node, marker);
    }
    return result.replace(/\s\/>/g, '/>'); // Remove unnecessary white-space added by IE
}
//# sourceMappingURL=encode-cxhtml.js.map