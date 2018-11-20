import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '@atlaskit/media-ui';
import * as deepEqual from 'deep-equal';
import { Context, ProcessedFileState } from '@atlaskit/media-core';
import { Outcome } from '../domain';
import { ErrorMessage, MediaViewerError } from '../error';
import { Spinner } from '../loading';
import { ErrorViewDownloadButton } from '../download';

export type BaseProps = {
  context: Context;
  item: ProcessedFileState;
  collectionName?: string;
};

export type BaseState<Content> = {
  content: Outcome<Content, MediaViewerError>;
};

export abstract class BaseViewer<
  Content,
  Props extends BaseProps,
  State extends BaseState<Content> = BaseState<Content>
> extends React.Component<Props, State> {
  state = this.initialState;

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.release();
  }

  // NOTE: We've moved parts of the logic to reset a component into this method
  // to optimise the performance. Resetting the state before the `componentDidUpdate`
  // lifecycle event allows us avoid one additional render cycle.
  // However, this lifecycle method might eventually be deprecated, so be careful
  // when working with it.
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>): void {
    if (this.needsReset(nextProps, this.props)) {
      this.release();
      this.setState(this.initialState);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.needsReset(prevProps, this.props)) {
      this.init();
    }
  }

  render() {
    return this.state.content.match({
      pending: () => <Spinner />,
      successful: content => this.renderSuccessful(content),
      failed: err => (
        <ErrorMessage error={err}>
          <p>
            <FormattedMessage {...messages.try_downloading_file} />
          </p>
          {this.renderDownloadButton(err)}
        </ErrorMessage>
      ),
    });
  }

  private renderDownloadButton(err: MediaViewerError) {
    const { item, context, collectionName } = this.props;
    return (
      <ErrorViewDownloadButton
        state={item}
        context={context}
        err={err}
        collectionName={collectionName}
      />
    );
  }

  protected needsReset(propsA: Props, propsB: Props) {
    return (
      !deepEqual(propsA.item, propsB.item) ||
      propsA.context !== propsB.context ||
      propsA.collectionName !== propsB.collectionName
    );
  }

  protected abstract init(): void;
  protected abstract release(): void;
  protected abstract get initialState(): State;
  protected abstract renderSuccessful(content: Content): React.ReactNode;
}
