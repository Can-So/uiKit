// @flow

import React from 'react';
import { components } from 'react-select';
import Spinner from '@findable/spinner';
import SelectClearIcon from '@findable/icon/glyph/select-clear';
import DownIcon from '@findable/icon/glyph/hipchat/chevron-down';

// indicators
export const ClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <SelectClearIcon size="small" primaryColor="inherit" />
  </components.ClearIndicator>
);
export const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <DownIcon />
  </components.DropdownIndicator>
);

export const LoadingIndicator = (props: any) => (
  <div style={props.getStyles('loadingIndicator', props)} {...props.innerProps}>
    <Spinner size="small" />
  </div>
);
