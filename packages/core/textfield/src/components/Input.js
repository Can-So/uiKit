// @flow

import React from 'react';
import { css } from 'emotion';
import type { InputProps } from '../types';

export default ({
  appearance,
  forwardedRef,
  isCompact,
  isDisabled,
  isFocused,
  isHovered,
  isInvalid,
  isMonospaced,
  isReadOnly,
  isRequired,
  theme,
  ...rest
}: InputProps) => (
  <div className={css(theme.container)}>
    <input
      ref={forwardedRef}
      disabled={isDisabled}
      readOnly={isReadOnly}
      required={isRequired}
      className={css(theme.input)}
      {...rest}
    />
  </div>
);
