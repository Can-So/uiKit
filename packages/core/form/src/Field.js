// @flow
/* eslint-disable no-console */ // While in dev preview console.info will be used
/* eslint-disable react/no-unused-prop-types */
import React, { Component, type Node } from 'react';
import { colors } from '@atlaskit/theme';
import styled from 'styled-components';
import { type FormRef } from './Form';
import FieldWrapper, { HelperText, Label } from './styled/Field';
import { ValidatorMessage } from './';

type Props = {
  label?: string,
  /** The input name that would be passed to the server on a POST */
  name?: string,
  /** The id for the input component which can be referenced via getElementById */
  id?: string,
  /** Array of Field Validators for input value to be validated */
  validators?: Array<any>,
  /** If a valuee is required for form to be valid */
  isRequired?: boolean,
  /** Field helper text */
  helperText?: string,
  /** Message to display when field is invalid */
  invalidMessage?: string,
  /** Message to be displayed when field is valid */
  validMessage?: string,
  /** Is the field input valid */
  isInvalid?: boolean | void,
  /** Set the field component to be required */
  required?: boolean,
  /** One child which is an input component */
  children?: Node,
  /** One child which is an input component */
  component?: React$Element<*>, //
  /** Parent Form Reference & API */
  form?: FormRef,
  /** Handler to be called when the value changes. */
  onChange?: (e: any, meta?: any) => mixed, // TODO: This should be typed to SyntheticEvent<HTMLInputElement> | Event once form API is set.
  /** Validate when the component value has changed */
  validateOnChange?: boolean,
  /** Validate field component value when it loses focus */
  validateOnBlur?: boolean,
  /** Validate field component on change when it is invalid. NOT IMPLEMENTED */
  validateOnInvalid?: boolean,
  //labelAfter?: boolean,
};

type State = {
  fieldState: FieldState,
  component: React$Element<*>,
};

/**
 * The Field State exposed to the Form and other fields
 */
export type FieldState = {
  validators?: Array<any>,
  id?: string,
  name?: string,
  isValidated?: boolean,
  isInvalid?: boolean,
  required?: boolean,
  /** A string for most inputs but can also be an object or array e.g. Select */
  value?: any,
  label?: string,
  invalidMessage?: string,
  validMessage?: string,
  validate?: () => mixed,
  helperText?: string,
  validateOnChange?: boolean,
  validateOnBlur?: boolean,
  validateOnInvalid?: boolean,
  /** The value type passed for onChange from the field component. Most are html-input */
  componentType: string,
};

export type FieldComponent = React$Element<*> & {
  onChange: () => {},
};

const RequiredIndicator = styled.span`
  color: ${colors.red};
  padding-left: 2px;
`;

// TODO: Find out how multiple error messages are displayed. Likely an UO list
const messageSeperator: string = ' ';

export default class Field extends Component<Props, State> {
  static defaultProps = {
    validators: [],
    isInvalid: undefined,
    required: false,
    invalidMessage: '',
    validMessage: '',
    helperText: '',
    validateOnChange: false,
    validateOnBlur: true,
    validateOnInvalid: true,
    //labelAfter: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      fieldState: this.getFieldStateFromProps(props),
      component: this.getComponentFromProps(props),
    };
    // Register the field in the parent form if there is one
    if (props.form && this.state.fieldState)
      props.form.registerField(this.state.fieldState);
  }
  /** Register the field in the form if there is one */
  componentDidMount() {}

  /** Handle prop or children prop changes */
  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      fieldState: this.getFieldStateFromProps(nextProps),
      component: this.getComponentFromProps(nextProps),
    });
  }

  /** Return the component from children or the component prop */
  getComponentFromProps = (props: Props): FieldComponent => {
    // Field must have component passed in or a single child
    if (React.Children.only(props.children) && props.component) {
      console.warn(
        'Field expects the component to be passed as a child OR component. Both have been passed and child is being used.',
      );
    } else if (!React.Children.only(props.children) && !props.component) {
      console.warn(
        'Field must have one valid child which is a field component. E.g FieldText, Select',
      );
    }
    return React.Children.only(props.children) || props.component || {};
  };

  /** Return the fieldState from Props */
  getFieldStateFromProps = (props: Props): FieldState => {
    const {
      id,
      name,
      label,
      validators,
      isInvalid,
      invalidMessage,
      validMessage,
      required,
      helperText,
      validateOnChange,
      validateOnBlur,
      validateOnInvalid,
    } = props;
    const childComponent: React$Element<*> = this.getComponentFromProps(props);
    const fieldState: FieldState = {
      validators,
      isInvalid,
      invalidMessage,
      validMessage,
      isRequired: required,
      name: childComponent.props.name || name,
      id: childComponent.props.id || id || name,
      label: childComponent.props.label || label,
      value: childComponent.props.value || '',
      validate: this.validate,
      helperText,
      validateOnChange,
      validateOnBlur,
      validateOnInvalid,
      componentType:
        childComponent.props.componentType || childComponent.type.name,
    };
    // For some components like Checkbox that are wrapped in withTheme and exported via anon function
    // we need to check for known props to idenitfy them. TODO: Fix this in the affected components and remove this hack
    if (!fieldState.componentType || !fieldState.componentType.length) {
      // Checkbox stateless
      if (childComponent.props.isChecked !== undefined)
        fieldState.componentType = 'CheckboxStateless';
    }
    return fieldState;
  };

  /**
   * Until we have a Form API we need to account for different onChange event types.
   * TODO: replace the hacks with a map of Field onChange event types
   */
  getValueFromEvent = () => {
    // Can we use
  };

  /**
   * Handle onChange for components that dispatch an input event.
   */
  handleOnChange = (event: any, meta: any) => {
    const fieldState = this.state.fieldState;
    console.info(`Field.onChange()${this.state.fieldState.componentType}`);

    // Call any onChange defined for Field or the component.
    // This is required to support stateless components
    if (this.state.component.props && this.state.component.props.onChange) {
      this.state.component.props.onChange(event);
    }

    // TODO: review if we need to expose this? Might make more sense to just have an onUpdate which fires
    // when fieldState is updated
    if (this.props.onChange) {
      this.props.onChange(event, meta);
    }

    // TODO: move mapping event types to field components to json
    // Most Inputs - Event from HTMLInput | Event

    // Checkbox
    if (this.state.fieldState.componentType === 'Checkbox') {
      fieldState.value = event.isChecked ? event.value : '';

      // Stateless checkbox
    } else if (this.state.fieldState.componentType === 'CheckboxStateless') {
      console.log(
        `Field.onChange()${this.state.fieldState.componentType} Stateless ${
          event.currentTarget.checked
        } ${event.currentTarget.value}`,
      );
      fieldState.value = event.currentTarget.checked
        ? event.currentTarget.value
        : '';
      // Most Inputs - Event from HTMLInput | Event
    } else if (event.target && event.target.value) {
      fieldState.value = event.target.value;
      console.log(
        `Field.onChange()${
          this.state.fieldState.componentType
        } event.target.value: ${event.target.value}`,
      );

      // Strings from inputs, objects & arrays of objects from select
    } else {
      //console.info(`${fieldState.name}: Select ${event.length}`);
      fieldState.value = event;
    }

    // Update Field State and pass on
    this.setState({ fieldState });
    if (this.props.validateOnChange) {
      this.validate();
    }
  };

  /** Handle onChange for components that dispatch an input event.
   * Until we have a Form API we need to account for different event types
   */
  handleOnBlur = () => {
    if (this.props.validateOnBlur) {
      this.validate();
    }
  };

  /**
   * Run any validators passed for this field
   */
  validate = () => {
    const { validators, value } = this.state.fieldState;
    const {
      isInvalid,
      invalidMessage,
      validMessage,
      required,
      ...rest
    } = this.state.fieldState;

    let result = true;
    let invalid: string = '';
    let valid: string = '';
    //let invalid:string = invalidMessage || '';
    //let valid: string  = validMessage || '';
    let invalidCount = 0;
    // console.log(`Field.validate(): ${value} ${validators.length}`);

    // Is the field required?
    if (required && !value) {
      invalidCount++;
      invalid = 'This field is required';
    } else if (validators && validators.length) {
      for (let i = 0; i < validators.length; i++) {
        if (validators[i].props.func) {
          result = validators[i].props.func(value, validators[i].props.options);

          // Invert result if validOn prop is false
          if (validators[i].props.validOnFalse) result = !result;

          // Most validators will only have an invalid message
          if (result) {
            valid = valid.concat(validators[i].props.valid + messageSeperator);
          } else {
            invalidCount++;
            invalid = invalid.concat(
              validators[i].props.invalid + messageSeperator,
            );
          }
        }
      }
    }

    this.setState({
      fieldState: {
        isInvalid: !!invalidCount,
        invalidMessage: invalid,
        validMessage: valid,
        ...rest,
      },
    });

    //console.log(`Field.validated(): ${result}`);
  };

  /** Render a label & make it required / not required. */
  renderLabel = () => {
    if (this.props.label && this.props.label.length) {
      return (
        <Label htmlFor={this.props.id}>
          {this.props.label}
          {this.props.isRequired ? (
            <RequiredIndicator role="presentation">*</RequiredIndicator>
          ) : null}
        </Label>
      );
    }
    return null;
  };

  /**
   * Render the field component passed as children and inject props from this field.
   * We always overide field components validation display.
   * TODO: audit all current field components to map others.
   */
  renderFieldComponent = () => {
    const {
      id,
      name,
      isInvalid,
      required,
      label,
      invalidMessage,
    } = this.state.fieldState;
    const component: any = this.state.component;
    let validationState = 'default';

    if (component) {
      // validationState & validationMessage are used to support AtlaskitSelect dev preview
      if (isInvalid !== undefined) {
        validationState = isInvalid ? 'error' : 'success';
      }
      return React.cloneElement(component, {
        id,
        name,
        isInvalid,
        isRequired: required,
        label,
        invalidMessage,
        isLabelHidden: true,
        isValidationHidden: true,
        validationMessage: invalidMessage,
        validationState,
        onChange: this.handleOnChange,
        onUpdate: this.handleOnChange,
        onBlur: this.handleOnBlur,
      });
    }
    return null;
  };

  /**
   * When we render Label, Helper & Validation are only handled only if passed as props. This allows for
   * components that currently roll their own to still be wrapped by Field.
   */
  render() {
    const {
      helperText,
      isInvalid,
      invalidMessage,
      validMessage,
    } = this.state.fieldState;

    return (
      <FieldWrapper>
        {this.renderLabel()}

        {this.renderFieldComponent()}

        {helperText && helperText.length ? (
          <HelperText>{helperText}</HelperText>
        ) : null}

        <ValidatorMessage
          isInvalid={isInvalid}
          validMessage={validMessage}
          invalidMessage={invalidMessage}
        />
      </FieldWrapper>
    );
  }
}
