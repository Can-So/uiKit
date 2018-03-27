// @flow
import React, { type Node } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import Button from '../src';

const Icon = <AtlassianIcon label="Test icon" />;

const ButtonWrapper = ({
  inline = true,
  children,
}: {
  inline?: boolean,
  children: Node,
}) => (
  <div style={{ display: inline ? 'inline-block' : 'block', padding: 4 }}>
    {children}
  </div>
);

const ButtonOptions = () => (
  <div>
    <ButtonWrapper>
      <Button iconBefore={Icon}>Icon Before</Button>
    </ButtonWrapper>
    <ButtonWrapper>
      <Button iconAfter={Icon}>Icon After</Button>
    </ButtonWrapper>
    <ButtonWrapper inline={false}>
      <Button shouldFitContainer>Fit Container</Button>
    </ButtonWrapper>
  </div>
);

export default ButtonOptions;
