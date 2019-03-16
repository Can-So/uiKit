import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import { AutoDismissFlag } from '@atlaskit/flag';
import { colors } from '@atlaskit/theme';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';

var FeedbackFlag = function FeedbackFlag(props) {
  return React.createElement(AutoDismissFlag, _extends({
    icon: React.createElement(SuccessIcon, {
      primaryColor: colors.G300,
      label: "Success"
    }),
    id: "feedbackSent",
    description: "Your valuable feedback helps us continually improve our products.",
    title: "Thanks!"
  }, props));
};

export default FeedbackFlag;