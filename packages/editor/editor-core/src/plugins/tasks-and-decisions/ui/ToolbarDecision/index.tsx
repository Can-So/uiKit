import * as React from 'react';
import { PureComponent } from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { insertTaskDecision } from '../../commands';
import { messages } from '../../../insert-block/ui/ToolbarInsertBlock';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
  isReducedSpacing?: boolean;
}

export interface State {
  disabled: boolean;
}

export class ToolbarDecision extends PureComponent<
  Props & InjectedIntlProps,
  State
> {
  state: State = { disabled: false };

  render() {
    const { disabled } = this.state;
    const {
      isDisabled,
      isReducedSpacing,
      intl: { formatMessage },
    } = this.props;

    const label = formatMessage(messages.decision);

    return (
      <ToolbarButton
        onClick={this.handleInsertDecision}
        disabled={disabled || isDisabled}
        spacing={isReducedSpacing ? 'none' : 'default'}
        title={`${label} <>`}
        iconBefore={<DecisionIcon label={label} />}
      />
    );
  }

  private handleInsertDecision = withAnalytics(
    'atlassian.fabric.decision.trigger.button',
    (): boolean => {
      const { editorView } = this.props;
      if (!editorView) {
        return false;
      }
      insertTaskDecision(editorView, 'decisionList');
      return true;
    },
  );
}

export default injectIntl(ToolbarDecision);
