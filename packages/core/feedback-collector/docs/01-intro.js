// @flow

import React from 'react';
import { md, Example, Props, code } from '@findable/docs';
import SectionMessage from '@findable/section-message';

export default md`
${(
  <SectionMessage appearance="warning">
    <p>
      <strong>
        Note: @findable/feedback-collector is currently a developer preview.
      </strong>
    </p>
    <p>
      Please experiment with and test this package, but be aware that the API
      may change at any time. Use at your own risk, preferrably not in
      production.
    </p>
  </SectionMessage>
)}

Feedback collector is a wrapper around feedback form component that collects customer feedback across Atlassian products.

## Usage

${code`import FeedbackCollector, { FeedbackFlag, FeedbackForm } from '@findable/feedback-collector';`}

${(
  <Example
    packageName="@findable/feedback-collector"
    Component={require('../examples/02-feedback-collector').default}
    title="As a button"
    source={require('!!raw-loader!../examples/02-feedback-collector')}
  />
)}

${(
  <Props
    heading="Feedback Collector Props"
    props={require('!!extract-react-types-loader!../src/components/FeedbackCollector')}
  />
)}

## Feedback form

Feedback form is a basic component that provides your the  appearance and functionality of the feedback dialog pattern.
It is not tied to any particular feedback collector.

${(
  <Example
    packageName="@findable/feedback-collector"
    Component={require('../examples/01-feedback-form').default}
    title="As a button"
    source={require('!!raw-loader!../examples/01-feedback-form')}
  />
)}

${(
  <Props
    heading="Feedback Form Props"
    props={require('!!extract-react-types-loader!../src/components/FeedbackForm')}
  />
)}

`;
