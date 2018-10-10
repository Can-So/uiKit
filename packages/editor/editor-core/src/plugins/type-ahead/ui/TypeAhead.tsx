import * as React from 'react';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { borderRadius, colors, gridSize, math } from '@atlaskit/theme';
import { Popup, akEditorFloatingDialogZIndex } from '@atlaskit/editor-common';
import { TypeAheadItemsList } from './TypeAheadItemsList';
import { selectByIndex } from '../commands/select-item';
import { setCurrentIndex } from '../commands/set-current-index';
import { TypeAheadItem } from '../types';

export const TypeAheadContent: React.ComponentClass<
  React.HTMLAttributes<{}>
> = styled.div`
  background: ${colors.N0};
  border-radius: ${borderRadius()}px;
  box-shadow: 0 0 1px ${colors.N60A}, 0 4px 8px -2px ${colors.N50A};
  padding: ${math.divide(gridSize, 2)}px 0;
  min-width: 250px;
  max-height: 264px; /* 48px(item height) * 5.5(visible items) = 264 */
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
`;

export type TypeAheadProps = {
  active: boolean;
  items?: Array<TypeAheadItem>;
  isLoading?: boolean;
  currentIndex: number;
  editorView: EditorView;
  anchorElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
};

export function TypeAhead({
  active,
  items,
  isLoading,
  anchorElement,
  currentIndex,
  editorView,
  popupsMountPoint,
  popupsBoundariesElement,
  popupsScrollableElement,
}: TypeAheadProps) {
  if (!active || !anchorElement || !items || !items.length) {
    return null;
  }
  return (
    <Popup
      zIndex={akEditorFloatingDialogZIndex}
      target={anchorElement}
      mountTo={popupsMountPoint}
      boundariesElement={popupsBoundariesElement}
      scrollableElement={popupsScrollableElement}
      fitHeight={300}
      fitWidth={340}
      offset={[0, 8]}
    >
      <TypeAheadContent>
        {Array.isArray(items) ? (
          <TypeAheadItemsList
            insertByIndex={index =>
              selectByIndex(index)(editorView.state, editorView.dispatch)
            }
            setCurrentIndex={index =>
              setCurrentIndex(index)(editorView.state, editorView.dispatch)
            }
            items={items}
            currentIndex={currentIndex}
          />
        ) : !items && isLoading ? (
          'loading...'
        ) : (
          'no items'
        )}
      </TypeAheadContent>
    </Popup>
  );
}
