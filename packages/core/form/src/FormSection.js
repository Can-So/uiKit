// @flow
import React, { Component, type Node } from 'react';
import FormSectionWrapper, {
  FormSectionTitle,
  FormSectionDescription,
} from './styled/FormSection';

type Props = {
  /** Section Title */
  title?: Node,
  /** Content or child components to be rendered after description */
  children?: Node,
  /** Sub title or description of this section */
  description?: Node,
};

export default class FormSection extends Component<Props> {
  render() {
    const { title, description, children } = this.props;

    return (
      <FormSectionWrapper>
        {title && <FormSectionTitle>{title}</FormSectionTitle>}
        {description && (
          <FormSectionDescription>{description}</FormSectionDescription>
        )}
        {children}
      </FormSectionWrapper>
    );
  }
}
