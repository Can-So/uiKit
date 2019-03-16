import { DEFAULT_THEME_MODE } from '../constants';
var defaultTheme = {
  mode: DEFAULT_THEME_MODE
};
export default function getTheme(props) {
  if (props && props.theme && props.theme.__ATLASKIT_THEME__) {
    // $FlowFixMe - cannot narrow type between input types
    return props.theme.__ATLASKIT_THEME__;
  } else if (props && props.theme && props.theme.mode) {
    // $FlowFixMe - cannot narrow type between input types
    return props.theme;
  }

  return defaultTheme;
}