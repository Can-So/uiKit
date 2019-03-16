import React from 'react';
import PrettyProps from 'pretty-proptypes';
import Button from '@findable/button';
import components from './components';
import ChevronDownIcon from '@findable/icon/glyph/chevron-down';
import ChevronUpIcon from '@findable/icon/glyph/chevron-up';

components.Button = ({ isCollapsed, ...rest }) => {
  return (
    <Button
      iconBefore={
        isCollapsed ? (
          <ChevronDownIcon label="expandIcon" />
        ) : (
          <ChevronUpIcon label="collapseIcon" />
        )
      }
      {...rest}
    />
  );
};

const Props = props => <PrettyProps components={components} {...props} />;

export default Props;
