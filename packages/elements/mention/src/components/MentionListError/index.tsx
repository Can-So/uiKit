import * as React from 'react';
import {
  MentionListErrorStyle,
  MentionListErrorHeadlineStyle,
  MentionListAdviceStyle,
} from './styles';
import { HttpError } from '../../api/MentionResource';
import { GenericErrorIllustration } from './GenericErrorIllustration';
import {
  DefaultAdvisedAction,
  DefaultHeadline,
  DifferentText,
  LoginAgain,
} from '../../util/i18n';

export interface Props {
  error?: Error;
}

const advisedActionMessages = {
  '401': LoginAgain,
  '403': DifferentText,
  default: DefaultAdvisedAction,
};

export default class MentionListError extends React.PureComponent<Props, {}> {
  /**
   * Translate the supplied Error into a message suitable for display in the MentionList.
   *
   * @param error the error to be displayed
   */
  private static getAdvisedActionMessage(
    error: Error | undefined,
  ): React.ComponentType<{}> {
    if (error && error.hasOwnProperty('statusCode')) {
      const httpError = error as HttpError;
      return (
        advisedActionMessages[httpError.statusCode.toString()] ||
        advisedActionMessages.default
      );
    }
    return advisedActionMessages.default;
  }

  render() {
    const { error } = this.props;
    const ErrorMessage = MentionListError.getAdvisedActionMessage(error);
    return (
      <MentionListErrorStyle>
        <GenericErrorIllustration />
        <MentionListErrorHeadlineStyle>
          <DefaultHeadline />
        </MentionListErrorHeadlineStyle>
        <MentionListAdviceStyle>
          <ErrorMessage />
        </MentionListAdviceStyle>
      </MentionListErrorStyle>
    );
  }
}
