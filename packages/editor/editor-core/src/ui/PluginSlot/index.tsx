import * as React from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import { EditorAppearance, UIComponentFactory } from '../../types';
import { EventDispatcher, createDispatch } from '../../event-dispatcher';
import EditorActions from '../../actions';
import {
  analyticsEventKey,
  AnalyticsDispatch,
  AnalyticsEventPayload,
} from '../../plugins/analytics';

const PluginsComponentsWrapper = styled.div`
  display: flex;
`;

export interface Props {
  items?: Array<UIComponentFactory>;
  editorView?: EditorView;
  editorActions?: EditorActions;
  eventDispatcher?: EventDispatcher;
  providerFactory: ProviderFactory;
  appearance: EditorAppearance;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  containerElement: HTMLElement | undefined;
  disabled: boolean;
}

export default class PluginSlot extends React.Component<Props, any> {
  shouldComponentUpdate(nextProps: Props) {
    const {
      editorView,
      editorActions,
      items,
      providerFactory,
      eventDispatcher,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      containerElement,
      disabled,
    } = this.props;
    return !(
      nextProps.editorView === editorView &&
      nextProps.editorActions === editorActions &&
      nextProps.items === items &&
      nextProps.providerFactory === providerFactory &&
      nextProps.eventDispatcher === eventDispatcher &&
      nextProps.popupsMountPoint === popupsMountPoint &&
      nextProps.popupsBoundariesElement === popupsBoundariesElement &&
      nextProps.popupsScrollableElement === popupsScrollableElement &&
      nextProps.containerElement === containerElement &&
      nextProps.disabled === disabled
    );
  }

  fireAnalyticsEvent = (payload: AnalyticsEventPayload): void => {
    if (this.props.eventDispatcher) {
      const dispatch: AnalyticsDispatch = createDispatch(
        this.props.eventDispatcher,
      );
      dispatch(analyticsEventKey, {
        payload,
      });
    }
  };

  render() {
    const {
      items,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      appearance,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      containerElement,
      disabled,
    } = this.props;

    if (!items || !editorView) {
      return null;
    }

    return (
      <PluginsComponentsWrapper>
        {items.map((component, key) => {
          const props: any = { key };
          const element = component({
            editorView: editorView as EditorView,
            editorActions: editorActions as EditorActions,
            eventDispatcher: eventDispatcher as EventDispatcher,
            providerFactory,
            fireAnalyticsEvent: this.fireAnalyticsEvent,
            appearance,
            popupsMountPoint,
            popupsBoundariesElement,
            popupsScrollableElement,
            containerElement,
            disabled,
          });
          return element && React.cloneElement(element, props);
        })}
      </PluginsComponentsWrapper>
    );
  }
}
