import * as React from 'react';
import { UserPickerProps } from '../src/types';

// Used to display props for our documentation without exposing
// internal analytics types.
export class PropsExampleWrapper extends React.PureComponent<UserPickerProps> {}
