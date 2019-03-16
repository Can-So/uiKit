import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditorView } from 'prosemirror-view';
import { IntlShape } from 'react-intl';
import { Transformer } from '@atlaskit/editor-common';
import EditorActions from './actions';
import { EditorProps } from './types/editor-props';
import { EventDispatcher } from './event-dispatcher';
export * from './types';
declare type Context = {
    editorActions?: EditorActions;
    intl: IntlShape;
};
export default class Editor extends React.Component<EditorProps, {}> {
    static defaultProps: EditorProps;
    static contextTypes: {
        editorActions: PropTypes.Requireable<any>;
        intl: IntlShape;
    };
    private providerFactory;
    private editorActions;
    constructor(props: EditorProps, context: Context);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: EditorProps): void;
    componentWillUnmount(): void;
    onEditorCreated(instance: {
        view: EditorView;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
    }): void;
    private deprecationWarnings;
    onEditorDestroyed(instance: {
        view: EditorView;
        transformer?: Transformer<string>;
    }): void;
    private registerEditorForActions;
    private unregisterEditorFromActions;
    private handleProviders;
    handleSave: (view: EditorView<any>) => void;
    render(): JSX.Element;
}
