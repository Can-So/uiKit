import * as React from 'react';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import { akColorN30 } from '@atlaskit/util-shared-styles';
import { akEditorFullPageMaxWidth } from '@atlaskit/editor-common';
import { EditorAppearanceComponentProps, EditorAppearance } from '../../types';
import Avatars from '../../plugins/collab-edit/ui/avatars';
import PluginSlot from '../PluginSlot';
import Toolbar from '../Toolbar';
import ContentStyles from '../ContentStyles';
import { ClickAreaBlock } from '../Addon';
import WidthDetector from '../WidthDetector';

const GUTTER_PADDING = 32;

const FullPageEditorWrapper = styled.div`
  min-width: 340px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
FullPageEditorWrapper.displayName = 'FullPageEditorWrapper';

const ScrollContainer = styled(ContentStyles)`
  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
  display: flex;
  flex-direction: column;
`;
ScrollContainer.displayName = 'ScrollContainer';

const ContentArea = styled.div`
  line-height: 24px;
  height: 100%;
  width: 100%;
  max-width: ${akEditorFullPageMaxWidth + GUTTER_PADDING * 2}px;
  padding-top: 50px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-bottom: 55px;

  & .ProseMirror {
    flex-grow: 1;
    box-sizing: border-box;
  }

  && .ProseMirror {
    & > * {
      clear: both;
    }
    > p,
    > ul,
    > ol,
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6 {
      clear: none;
    }
  }
  & .ProseMirror .table-container table {
    margin-left: 0;
    margin-right: 0;
    width: 100%;
  }
`;
ContentArea.displayName = 'ContentArea';

const MainToolbar = styled.div`
  position: relative;
  align-items: center;
  border-bottom: 1px solid ${akColorN30};
  display: flex;
  height: 80px;
  flex-shrink: 0;
`;
MainToolbar.displayName = 'MainToolbar';

const MainToolbarCustomComponentsSlot = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
MainToolbarCustomComponentsSlot.displayName = 'MainToolbar';

const SecondaryToolbar = styled.div`
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  display: flex;
  padding: 24px 0;
`;
SecondaryToolbar.displayName = 'SecondaryToolbar';

export default class Editor extends React.Component<
  EditorAppearanceComponentProps,
  any
> {
  static displayName = 'FullPageEditor';
  private appearance: EditorAppearance = 'full-page';

  stopPropagation = (event: MouseEvent<HTMLDivElement>) =>
    event.stopPropagation();

  render() {
    const {
      editorDOMElement,
      editorView,
      editorActions,
      eventDispatcher,
      providerFactory,
      primaryToolbarComponents,
      contentComponents,
      customPrimaryToolbarComponents,
      customContentComponents,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      disabled,
      collabEdit,
    } = this.props;

    return (
      <FullPageEditorWrapper>
        <MainToolbar>
          <Toolbar
            editorView={editorView!}
            editorActions={editorActions}
            eventDispatcher={eventDispatcher!}
            providerFactory={providerFactory}
            appearance={this.appearance}
            items={primaryToolbarComponents}
            popupsMountPoint={popupsMountPoint}
            popupsBoundariesElement={popupsBoundariesElement}
            popupsScrollableElement={popupsScrollableElement}
            disabled={!!disabled}
          />
          <MainToolbarCustomComponentsSlot>
            <Avatars
              editorView={editorView}
              eventDispatcher={eventDispatcher}
              inviteToEditHandler={collabEdit && collabEdit.inviteToEditHandler}
              isInviteToEditButtonSelected={
                collabEdit && collabEdit.isInviteToEditButtonSelected
              }
            />
            {customPrimaryToolbarComponents}
          </MainToolbarCustomComponentsSlot>
        </MainToolbar>
        <ScrollContainer>
          <ClickAreaBlock editorView={editorView}>
            <ContentArea>
              <div
                style={{ padding: `0 ${GUTTER_PADDING}px` }}
                className="content-area"
              >
                {customContentComponents}
                {
                  <PluginSlot
                    editorView={editorView}
                    editorActions={editorActions}
                    eventDispatcher={eventDispatcher}
                    providerFactory={providerFactory}
                    appearance={this.appearance}
                    items={contentComponents}
                    popupsMountPoint={popupsMountPoint}
                    popupsBoundariesElement={popupsBoundariesElement}
                    popupsScrollableElement={popupsScrollableElement}
                    disabled={!!disabled}
                  />
                }
                {editorDOMElement}
              </div>
            </ContentArea>
          </ClickAreaBlock>
        </ScrollContainer>
        <WidthDetector editorView={editorView!} />
      </FullPageEditorWrapper>
    );
  }
}
