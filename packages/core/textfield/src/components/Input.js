// @flow

import React from 'react';
import { InputWrapper } from '../styled';
import type { InputProps } from '../types';

export default ({
  appearance,
  forwardedRef,
  isCompact,
  isDisabled,
  isFocused,
  isInvalid,
  isMonospaced,
  isReadOnly,
  isRequired,
  theme,
  ...props
}: InputProps) => (
  <InputWrapper
    {...theme.textField({ appearance })}
    appearance={appearance}
    isCompact={isCompact}
    isDisabled={isDisabled}
    isFocused={isFocused}
    isMonospaced={isMonospaced}
    isReadOnly={isReadOnly}
    isRequired={isRequired}
    isInvalid={isInvalid}
  >
    <input
      ref={forwardedRef}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
      {...props}
    />
  </InputWrapper>
);
