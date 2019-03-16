import { colors } from '@findable/theme';
import WarningIcon from '@findable/icon/glyph/warning';
import ErrorIcon from '@findable/icon/glyph/error';
import CheckCircleIcon from '@findable/icon/glyph/check-circle';
import InfoIcon from '@findable/icon/glyph/info';
import QuestionCircleIcon from '@findable/icon/glyph/question-circle';
export var baseAppearanceObj = {
  info: {
    backgroundColor: colors.B50,
    Icon: InfoIcon,
    primaryIconColor: colors.B500
  },
  warning: {
    backgroundColor: colors.Y50,
    Icon: WarningIcon,
    primaryIconColor: colors.Y500
  },
  error: {
    backgroundColor: colors.R50,
    Icon: ErrorIcon,
    primaryIconColor: colors.R500
  },
  confirmation: {
    backgroundColor: colors.G50,
    Icon: CheckCircleIcon,
    primaryIconColor: colors.G500
  },
  change: {
    backgroundColor: colors.P50,
    Icon: QuestionCircleIcon,
    primaryIconColor: colors.P500
  }
};