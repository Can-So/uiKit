import Avatar from '@atlaskit/avatar';
import Tag from '@atlaskit/tag';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './i18n';

export const MultiValue = props => {
  const {
    components: { Container },
    data,
    data: {
      label,
      user: { avatarUrl, fixed },
    },
    innerProps,
    selectProps,
    removeProps: { onClick: onRemove },
    isFocused,
  } = props;

  return (
    <Container data={data} innerProps={innerProps} selectProps={selectProps}>
      <FormattedMessage {...messages.remove}>
        {remove => (
          <Tag
            {...innerProps}
            appearance="rounded"
            text={label}
            elemBefore={
              <Avatar size="xsmall" src={avatarUrl} enableTooltip={false} />
            }
            removeButtonText={fixed ? undefined : remove}
            onAfterRemoveAction={onRemove}
            color={isFocused ? 'blueLight' : undefined}
          />
        )}
      </FormattedMessage>
    </Container>
  );
};
