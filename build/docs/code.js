import React from 'react';
import styled from 'styled-components';
import stringRaw from 'string-raw';
import { AkCodeBlock } from '@atlaskit/code';
/*
 * Tag function to render a code block, e.g. code`console.log("hello world")`
 * Template expressions aren't yet supported, and likely never will be.
 */

export default function code( // Tagged Template Literal support is still WIP for flow: https://github.com/facebook/flow/issues/2616
sources) {
  for (var _len = arguments.length, substitutions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substitutions[_key - 1] = arguments[_key];
  }

  var source = stringRaw(sources, substitutions);
  source = source.replace(/^(\s*\n)+/g, ''); // Remove leading newlines

  source = source.replace(/(\n\s*)+$/g, ''); // Remove trailing newlines

  return React.createElement(CodeWrapper, null, React.createElement(AkCodeBlock, {
    language: "javascript",
    text: source
  }));
}
var CodeWrapper = styled.div.withConfig({
  displayName: "code__CodeWrapper",
  componentId: "sc-3zahnc-0"
})(["\n  margin-top: 8px;\n"]);