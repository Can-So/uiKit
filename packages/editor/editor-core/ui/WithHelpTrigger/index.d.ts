import * as React from 'react';
import * as PropTypes from 'prop-types';
export default class WithHelpTrigger extends React.Component<any, any> {
    static contextTypes: {
        editorActions: PropTypes.Validator<any>;
    };
    openHelp: () => void;
    render(): any;
}
