import { ButtonAppearances } from '../types';
import { PropsPasser } from '@findable/type-helpers';
declare type AppearanceProps = {
    appearance?: ButtonAppearances;
};
declare const withDeprecationWarnings: PropsPasser<AppearanceProps>;
export default withDeprecationWarnings;
