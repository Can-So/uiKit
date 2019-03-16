import * as React from 'react';
import * as PropTypes from 'prop-types';
import EditorActions from '../../actions';
export declare type EditorContextProps = {
    editorActions?: EditorActions;
};
export default class EditorContext extends React.Component<EditorContextProps, {}> {
    static childContextTypes: {
        editorActions: PropTypes.Requireable<any>;
    };
    private editorActions;
    constructor(props: EditorContextProps);
    getChildContext(): {
        editorActions: EditorActions;
    };
    render(): React.ReactElement<any>;
}
