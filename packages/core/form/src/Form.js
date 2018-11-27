// @flow
import React, { createContext, type Node, type Ref } from 'react';
import { createForm, type FormApi } from 'final-form';
import createDecorator from 'final-form-focus';

export const FormContext = createContext();
export const IsDisabledContext = createContext(false);

type FormProps = {
  ref: Ref<'form'>,
  onSubmit: (SyntheticEvent<HTMLFormElement> | any) => any,
};

type Props = {
  /* Children rendered inside the Form component. Function will be passed props from the form. */
  children: ({
    formProps: FormProps,
    disabled: boolean,
    dirty: boolean,
    submitting: boolean,
  }) => Node,
  /* Called when the form is submitted without errors */
  onSubmit: Object => any,
  /* When set the form and all fields will be disabled */
  isDisabled: boolean,
};

type State = {
  dirty: boolean,
  submitting: boolean,
};

const createFinalForm = (onSubmit, formRef) => {
  const form = createForm({
    onSubmit,
    mutators: {
      setDefaultValue: ([name, defaultValue], state) => {
        state.formState.initialValues = {
          ...state.formState.initialValues,
          [name]: defaultValue,
        };
        state.formState.values = {
          ...state.formState.values,
          [name]: defaultValue,
        };
      },
      printState: (_, state) => console.log(state),
    },
  });
  const withFocusDecorator = createDecorator(() =>
    formRef.current
      ? Array.from(formRef.current.querySelectorAll('input'))
      : [],
  );
  withFocusDecorator(form);
  return form;
};

class Form extends React.Component<Props, State> {
  static defaultProps = {
    isDisabled: false,
  };

  unsubscribe = () => {};
  formRef = React.createRef();
  form = createFinalForm(this.props.onSubmit, this.formRef);

  state = {
    dirty: false,
    submitting: false,
  };

  componentDidMount() {
    this.unsubscribe = this.form.subscribe(
      ({ submitting, dirty }) => {
        this.setState({ submitting, dirty });
      },
      {
        dirty: true,
        submitting: true,
      },
    );
  }

  componenWillUnmount() {
    this.unsubscribe();
  }

  registerField = (
    name: string,
    defaultValue: any,
    subscriber: Subscriber,
    subscription: FieldSubscription,
    config: FieldConfig,
  ) => {
    this.form.pauseValidation();
    const unsubscribe = this.form.registerField(
      name,
      subscriber,
      subscription,
      config,
    );
    this.form.mutators.setDefaultValue(name, defaultValue);
    this.form.resumeValidation();
    return unsubscribe;
  };

  handleSubmit = (e: SyntheticEvent<HTMLFormElement> | any) => {
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (this.form) {
      this.form.submit();
    }
  };

  render() {
    const { isDisabled, children } = this.props;
    const { dirty, submitting } = this.state;
    return (
      <FormContext.Provider value={this.registerField}>
        <IsDisabledContext.Provider value={isDisabled}>
          {children({
            formProps: {
              onSubmit: this.handleSubmit,
              ref: this.formRef,
            },
            dirty,
            submitting,
            disabled: isDisabled,
          })}
        </IsDisabledContext.Provider>
      </FormContext.Provider>
    );
  }
}

export default Form;
