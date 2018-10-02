// @flow

import React, { Component } from 'react';
import truncate from 'lodash.truncate';

import { type FormFields, type SelectValue } from '../types';

import FeedbackForm from './FeedbackForm';

type FieldValueType = string | Object | Object[];

type FieldType = {|
  id: string,
  value: FieldValueType,
|};

type FeedbackType = {|
  fields: FieldType[],
|};

type Props = {|
  /** The customer email */
  email: string,
  /** The customer name */
  name: string,
  /** The request id to access the widget service */
  requestTypeId: string,
  /** The embeddable key to access the widget service */
  embeddableKey: string,

  /**  Additional fields to send to the widget service **/
  additionalFields: FieldType[],
  /**  Override the default id for the "can be contacted" custom field in your widget service **/
  canBeContactedFieldId: string,
  /**  Override the default value for the "can be contacted" custom field in your widget service **/
  canBeContactedDefaultValue: FieldValueType,
  /**  Override the default id for the "customer name" custom field in your widget service **/
  customerNameFieldId: string,
  /**  Override the default value for the "customer name" custom field in your widget service **/
  customerNameDefaultValue: FieldValueType,
  /**  Override the default id for the "description" custom field in your widget service **/
  descriptionFieldId: string,
  /**  Override the default value for the "description" custom field in your widget service **/
  descriptionDefaultValue: FieldValueType,
  /**  Override the default id for the "enroll in research" custom field in your widget service **/
  enrollInResearchFieldId: string,
  /**  Override the default value for the "enroll in research" custom field in your widget service **/
  enrollInResearchDefaultValue: FieldValueType,
  /**  Override the default id for the "email" custom field in your widget service **/
  emailFieldId: string,
  /**  Override the default value for the "email" custom field in your widget service **/
  emailDefaultValue: FieldValueType,
  /**  Override the default id for the "summary" custom field in your widget service **/
  summaryFieldId: string,
  /**  Override the default value for the "summary" custom field in your widget service **/
  summaryDefaultValue: FieldValueType,
  /**  Number of characters that the "summary" field accepts, the rest will be truncated **/
  summaryTruncateLength: number,
  /** After this delay the onSubmit callback will be triggered optimistically **/
  timeoutOnSubmit: number,
  /**  Override the default id for the "type" custom field in your widget service **/
  typeFiedlId: string,
  /**  Override the default value for the "Bug" type of response in your widget service **/
  typeBugDefaultValue: FieldValueType,
  /**  Override the default value for the "Comment" type of response in your widget service **/
  typeCommentDefaultValue: FieldValueType,
  /**  Override the default value for the "Suggestion" type of response in your widget service **/
  typeSuggestionDefaultValue: FieldValueType,
  /**  Override the default value for the "Question" type of response in your widget service **/
  typeQuestionDefaultValue: FieldValueType,
  /**  Override the default value for the "Empty" type of response in your widget service **/
  typeEmptyDefaultValue: FieldValueType,
  /** Function that will be called to initiate the exit transition. */
  onClose: () => void,
  /** Function that will be called optimistically after a delay when the feedback is submitted. */
  onSubmit: () => void,
|};

const MAX_SUMMARY_LENGTH_CHARS = 100;

const singleLineTruncatedText = (
  text: string,
  length: number = MAX_SUMMARY_LENGTH_CHARS,
) => {
  const singleLineText = text.replace(/\n/g, ' ');
  return truncate(singleLineText, { length });
};

export default class FeedbackCollector extends Component<Props> {
  static defaultProps = {
    canBeContactedFieldId: 'customfield_10043',
    canBeContactedDefaultValue: [{ id: '10109' }],
    additionalFields: [],
    customerNameFieldId: 'customfield_10045',
    customerNameDefaultValue: 'unknown',
    descriptionFieldId: 'description',
    descriptionDefaultValue: '',
    enrollInResearchFieldId: 'customfield_10044',
    enrollInResearchDefaultValue: [{ id: '10110' }],
    emailFieldId: 'email',
    emailDefaultValue: 'do-not-reply@atlassian.com',
    summaryFieldId: 'summary',
    summaryDefaultValue: '',
    summaryTruncateLength: 100,
    timeoutOnSubmit: 700,
    typeFiedlId: 'customfield_10042',
    typeBugDefaultValue: { id: '10105' },
    typeCommentDefaultValue: { id: '10106' },
    typeSuggestionDefaultValue: { id: '10107' },
    typeQuestionDefaultValue: { id: '10108' },
    typeEmptyDefaultValue: { id: 'empty' },
    onClose: () => {},
    onSubmit: () => {},
  };

  props: Props;

  getTypeFieldValue(type: SelectValue) {
    switch (type) {
      case 'bug':
        return this.props.typeBugDefaultValue;
      case 'comment':
        return this.props.typeCommentDefaultValue;
      case 'suggestion':
        return this.props.typeSuggestionDefaultValue;
      case 'question':
        return this.props.typeQuestionDefaultValue;
      case 'empty':
      default:
        return this.props.typeEmptyDefaultValue;
    }
  }

  getEmail(formValues: FormFields) {
    return formValues.canBeContacted && this.props.email
      ? this.props.email
      : this.props.emailDefaultValue;
  }

  getDescription(formValues: FormFields) {
    return formValues.description || this.props.descriptionDefaultValue;
  }

  getSummary(formValues: FormFields) {
    return (
      singleLineTruncatedText(
        formValues.description,
        this.props.summaryTruncateLength,
      ) || this.props.summaryDefaultValue
    );
  }

  getCustomerName() {
    return this.props.name || this.props.customerNameDefaultValue;
  }

  mapFormToJSD(formValues: FormFields) {
    const fields = [
      {
        id: this.props.typeFiedlId,
        value: this.getTypeFieldValue(formValues.type),
      },
      {
        id: this.props.summaryFieldId,
        value: this.getSummary(formValues),
      },
      {
        id: this.props.descriptionFieldId,
        value: this.getDescription(formValues),
      },
      { id: this.props.emailFieldId, value: this.getEmail(formValues) },
      {
        id: this.props.customerNameFieldId,
        value: this.getCustomerName(),
      },
    ];

    return {
      fields: [
        ...fields,
        formValues.canBeContacted
          ? {
              id: this.props.canBeContactedFieldId,
              value: this.props.canBeContactedDefaultValue,
            }
          : undefined,
        formValues.enrollInResearchGroup
          ? {
              id: this.props.enrollInResearchFieldId,
              value: this.props.enrollInResearchDefaultValue,
            }
          : undefined,
        ...this.props.additionalFields,
      ].filter(Boolean),
    };
  }

  postFeedback = (formValues: FormFields) => {
    const body: FeedbackType = this.mapFormToJSD(formValues);

    fetch(
      `https://jsd-widget.atlassian.com/api/embeddable/${
        this.props.embeddableKey
      }/request?requestTypeId=${this.props.requestTypeId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    this.props.onClose();
    // slightly delay confirming submit since we don't wait for the REST call to succeed
    setTimeout(this.props.onSubmit, this.props.timeoutOnSubmit);
  };

  render() {
    return (
      <FeedbackForm onSubmit={this.postFeedback} onClose={this.props.onClose} />
    );
  }
}
