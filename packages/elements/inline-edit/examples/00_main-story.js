import { storiesOf, action } from '@kadira/storybook';
import React from 'react';
import ModalDialog from '@atlaskit/modal-dialog';
import Tag from '@atlaskit/tag';
import Group from '@atlaskit/tag-group';
import MentionInlineEdit from './MentionInlineEdit';
import TextInlineEdit from './TextInlineEdit';
import LoopConfirmInlineEdit from './LoopConfirmInlineEdit';
import SlowInlineEdit from './SlowInlineEdit';
import SingleSelectInlineEdit from './SingleSelectInlineEdit';
import MultiSelect from '@atlaskit/multi-select';
import exampleMentions from './example-mentions';
import InlineEdit, { InlineEditStateless } from '../src';
import { name } from '../package.json';

const MultiSelectItems = [
  { content: 'Apple', value: 'Apple' },
  { content: 'Banana', value: 'Banana' },
  { content: 'Cherry', value: 'Cherry' },
  { content: 'Mango', value: 'Mango' },
  { content: 'Orange', value: 'Orange' },
  { content: 'Strawberry', value: 'Strawberry' },
  { content: 'Watermelon', value: 'Watermelon' },
];

const containerStyle = {
  padding: 20,
  backgroundColor: 'white',
  width: 400,
};

storiesOf(name, module)
  .add('with label', () => (
    <div style={containerStyle}>
      <TextInlineEdit />
    </div>
  ))
  .add('with label hidden', () => (
    <div style={containerStyle}>
      <TextInlineEdit isLabelHidden />
    </div>
  ))
  .add('in edit mode', () => (
    <div style={containerStyle}>
      <TextInlineEdit isEditing />
    </div>
  ))
  .add('with invalid input', () => (
    <div style={containerStyle}>
      <TextInlineEdit label="This field has NO error message or warning dialog" />
      <TextInlineEdit
        label="This field has a warning icon, but no error message"
        isInvalid
      />
      <TextInlineEdit
        label="This field has an error message, which is shown when the field is focused"
        isInvalid
        invalidMessage="This error message is shown when the field is focused"
      />
      <TextInlineEdit
        label="This field will has an an error message with tabbable links, which is shown when the field is focused"
        isInvalid
        invalidMessage={
          <span>
            A message containing a <a href="//atlassian.com">link</a>, a{' '}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="//design.atlassian.com"
            >
              second link (opens in new tab)
            </a>, and a <button type="button">button</button>
          </span>
        }
      />
    </div>
  ))
  .add('with lots of text', () => (
    <div style={containerStyle}>
      <TextInlineEdit initialValue="Banana banana banana banana banana banana banana banana banana banana banana" />
    </div>
  ))
  .add('with lots of text and no spaces', () => (
    <div style={containerStyle}>
      <TextInlineEdit initialValue="BananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananaBananana" />
    </div>
  ))
  .add('with confirmation loop', () => (
    <div style={containerStyle}>
      <LoopConfirmInlineEdit />
    </div>
  ))
  .add('with confirmation when enter is pressed', () => (
    <div style={containerStyle}>
      <TextInlineEdit shouldConfirmOnEnter />
    </div>
  ))
  .add('with confirmation cancellation', () => (
    <div style={containerStyle}>
      <TextInlineEdit
        isConfirmOnBlurDisabled
        onConfirm={cancelConfirmation => {
          action('Cancelling confirmation')();
          cancelConfirmation();
        }}
      />
    </div>
  ))
  .add('with no edit view', () => (
    <div style={containerStyle}>
      <InlineEdit
        label="Read-only"
        readView="Can't touch this"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ))
  .add('with no edit view and label hidden', () => (
    <div style={containerStyle}>
      <InlineEdit
        label="Read-only"
        readView="Can't touch this"
        isLabelHidden
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ))
  .add('with readview set to container width', () => (
    <div style={containerStyle}>
      <InlineEdit
        isFitContainerWidthReadView
        label="full-hover"
        readView="Hover all the way"
        editView="Not an inspiring edit view"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ))
  .add('with confirm on blur disabled', () => (
    <div style={containerStyle}>
      <TextInlineEdit isConfirmOnBlurDisabled />
    </div>
  ))
  .add('with narrow maximum width', () => {
    const narrowContainerStyle = {
      ...containerStyle,
      width: 250,
    };

    return (
      <div style={narrowContainerStyle}>
        <TextInlineEdit isConfirmOnBlurDisabled />
      </div>
    );
  })
  .add('with spinner', () => (
    <div style={containerStyle}>
      <InlineEditStateless
        label="Not able to edit"
        readView="Can't touch this"
        isEditing
        isWaiting
        onConfirm={() => {}}
        onCancel={() => {}}
        onEditRequested={() => {}}
      />
    </div>
  ))
  .add('with slow confirmation', () => (
    <div style={containerStyle}>
      <SlowInlineEdit />
    </div>
  ))
  .add('with tag-group view', () => (
    <div style={containerStyle}>
      <InlineEdit
        label="Favourite fruit"
        disableEditViewFieldBase
        editView={
          <MultiSelect
            defaultSelected={MultiSelectItems}
            items={MultiSelectItems}
            isDefaultOpen
            shouldFitContainer
            shouldFocus
          />
        }
        readView={
          <Group>
            <Tag text="Apple" />
            <Tag text="Banana" />
            <Tag text="Cherry" />
            <Tag text="Mango" />
            <Tag text="Orange" />
            <Tag text="Strawberry" />
            <Tag text="Watermelon" />
          </Group>
        }
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ))
  .add('with mention list', () => (
    <div style={containerStyle}>
      <MentionInlineEdit label="User picker" mentions={exampleMentions} />
    </div>
  ))
  .add('with single select', () => (
    <div style={containerStyle}>
      <SingleSelectInlineEdit
        label="Single select"
        selectItems={[
          {
            items: [
              { content: 'High', value: 'high' },
              { content: 'Medium', value: 'medium' },
              { content: 'Low', value: 'low' },
            ],
          },
        ]}
      />
    </div>
  ))
  .add('with custom internal component', () => (
    <div style={containerStyle}>
      <InlineEdit
        label="With many much long text"
        readView={
          <div>
            <p>{"It's been, one week since you looked at me"}</p>
            <p>{"cocked your head to the side and said 'I'm angry'"}</p>
          </div>
        }
        editView="This is a terrible edit view"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  ))
  .add('inside modal dialog', () => (
    <div style={containerStyle}>
      <ModalDialog width="200px" isOpen onClose={() => {}}>
        <div style={{ height: '200px' }}>
          <TextInlineEdit label="field 1" isConfirmOnBlurDisabled />
        </div>
      </ModalDialog>
    </div>
  ));
