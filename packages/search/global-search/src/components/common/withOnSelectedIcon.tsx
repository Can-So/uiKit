import * as React from 'react';
import { ComponentType } from 'react';
import { ObjectResult as ObjectResultComponent } from '@atlaskit/quick-search';
import ShiftReturn from '../../assets/ShiftReturn';

export default function withOnSelectedIcon<P>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P & ObjectResultComponent> {
  return class WithFeedbackButton extends React.Component<
    P & ObjectResultComponent
  > {
    static displayName = `WithOnSelectedIcon(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    render() {
      return (
        <>
          <WrappedComponent>
            selectedIcon={ShiftReturn}
            ...this.props
          </WrappedComponent>
        </>
      );
    }
  };
}
