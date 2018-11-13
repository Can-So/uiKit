import * as React from 'react';
import { mountWithIntl } from '@atlaskit/editor-test-helpers';

import DeleteButton from '../../../../../plugins/table/ui/TableFloatingControls/DeleteButton';
import tableMessages from '../../../../../plugins/table/ui/messages';

describe('Table controls - DeleteButton', () => {
  describe('callbacks', () => {
    it('fires the onMouseEnter callback', () => {
      const onMouseEnter = jest.fn();
      const button = mountWithIntl(
        <DeleteButton
          removeLabel={tableMessages.removeColumns}
          onMouseEnter={onMouseEnter}
        />,
      );
      button.simulate('mouseenter');
      expect(onMouseEnter).toBeCalled();
      button.unmount();
    });

    it('fires the onMouseLeave callback', () => {
      const onMouseLeave = jest.fn();
      const button = mountWithIntl(
        <DeleteButton
          removeLabel={tableMessages.removeRows}
          onMouseLeave={onMouseLeave}
        />,
      );
      button.simulate('mouseleave');
      expect(onMouseLeave).toBeCalled();
      button.unmount();
    });
  });
});
