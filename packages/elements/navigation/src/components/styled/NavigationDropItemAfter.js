// @flow
import styled from 'styled-components';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import { whenCollapsed } from '../../theme/util';

// $FlowFixMe
const NavigationDropItemAfter = styled(NavigationItemAfter)`
  ${whenCollapsed`
    display: none;
  `};
`;

NavigationDropItemAfter.displayName = 'NavigationDropItemAfter';
export default NavigationDropItemAfter;
