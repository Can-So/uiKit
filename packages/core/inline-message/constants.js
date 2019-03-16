import { gridSize } from '@atlaskit/theme';
import WarningIcon from '@atlaskit/icon/glyph/warning';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import InfoIcon from '@atlaskit/icon/glyph/info';
import ErrorIcon from '@atlaskit/icon/glyph/error';
export var itemSpacing = gridSize() / 2;
export var typesMapping = {
  connectivity: {
    icon: WarningIcon,
    iconSize: 'medium'
  },
  confirmation: {
    icon: CheckCircleIcon,
    iconSize: 'medium'
  },
  info: {
    icon: InfoIcon,
    iconSize: 'medium'
  },
  warning: {
    icon: WarningIcon,
    iconSize: 'medium'
  },
  error: {
    icon: ErrorIcon,
    iconSize: 'medium'
  }
};