import * as React from 'react';
import { RenderOnClickHandler } from '../../Addon';
import EditorActions from '../../../actions';
export interface Props {
    onClick: (actionOnClick: EditorActions, renderOnClick: RenderOnClickHandler) => void;
    editorActions: EditorActions;
    togglePopup: () => void;
}
export default class DropdownWrapper extends React.Component<Props, any> {
    render(): JSX.Element;
    private handleClick;
}
