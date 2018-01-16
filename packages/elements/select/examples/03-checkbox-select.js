// @flow
import React from 'react';
import { CheckboxSelect } from './common/components';
import { cities } from './common/data';

// data imported for brevity; equal to the options from Single Select example
export default () => (
  <CheckboxSelect options={cities} placeholder="Choose a City" />
);
