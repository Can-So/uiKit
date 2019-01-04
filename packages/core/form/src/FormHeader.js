// @flow
import React, { Component, type Node } from 'react';
import FormHeaderWrapper, {
  FormHeaderTitle,
  FormHeaderDescription,
  FormHeaderContent,
} from './styled/FormHeader';

type Props = {
  /** Header Title */
  title?: Node,
  /** Header sub title or description */
  description?: Node,
  /** Child contents will be rendered below the description */
  children?: Node,
};

export default class FormHeader extends Component<Props, void> {
  render() {
    const { title, description, children } = this.props;

    return (
      <FormHeaderWrapper>
        {title && <FormHeaderTitle>{title}</FormHeaderTitle>}
        {description && (
          <FormHeaderDescription>{description}</FormHeaderDescription>
        )}
        <FormHeaderContent>{children}</FormHeaderContent>
      </FormHeaderWrapper>
    );
  }
}
