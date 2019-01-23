import * as React from 'react';
import { ComponentClass, StatelessComponent, PureComponent } from 'react';
import * as ReactDOM from 'react-dom';

export type SimpleEventHandler = (event: Event) => void;

export interface WithOutsideClickProps {
  handleClickOutside?: SimpleEventHandler;
  handleEscapeKeydown?: SimpleEventHandler;
  handleEnterKeydown?: SimpleEventHandler;
}

// tslint:disable:next-line variable-name
export default function withOuterListeners<P>(
  Component: ComponentClass<P> | StatelessComponent<P>,
): ComponentClass<P & WithOutsideClickProps> {
  return class WithOutsideClick extends PureComponent<
    P & WithOutsideClickProps,
    {}
  > {
    componentDidMount() {
      if (this.props.handleClickOutside) {
        document.addEventListener('click', this.handleClick, false);
      }

      if (this.props.handleEscapeKeydown) {
        document.addEventListener('keydown', this.handleKeydown, false);
      }
    }

    componentWillUnmount() {
      if (this.props.handleClickOutside) {
        document.removeEventListener('click', this.handleClick, false);
      }

      if (this.props.handleEscapeKeydown) {
        document.removeEventListener('keydown', this.handleKeydown, false);
      }
    }

    handleClick = (evt: Event) => {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (
        !domNode ||
        (evt.target instanceof Node && !domNode.contains(evt.target))
      ) {
        (this.props.handleClickOutside as SimpleEventHandler)(evt);
      }
    };

    handleKeydown = evt => {
      if (evt.code === 'Escape' && this.props.handleEscapeKeydown) {
        (this.props.handleEscapeKeydown as SimpleEventHandler)(evt);
      } else if (evt.code === 'Enter' && this.props.handleEnterKeydown) {
        (this.props.handleEnterKeydown as SimpleEventHandler)(evt);
      }
    };

    render() {
      return <Component {...this.props as any} />;
    }
  };
}
