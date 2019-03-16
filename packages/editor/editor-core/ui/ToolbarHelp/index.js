import * as React from 'react';
import QuestionIcon from '@atlaskit/icon/glyph/question';
import ToolbarButton from '../ToolbarButton';
import WithHelpTrigger from '../WithHelpTrigger';
var ToolbarHelp = function () { return (React.createElement(WithHelpTrigger, { render: function (showHelp) { return (React.createElement(ToolbarButton, { onClick: showHelp, title: "Open help dialog", titlePosition: "left", iconBefore: React.createElement(QuestionIcon, { label: "Open help dialog" }) })); } })); };
export default ToolbarHelp;
//# sourceMappingURL=index.js.map