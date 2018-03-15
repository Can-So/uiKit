import * as React from 'react';
import styled from 'styled-components';
import {
  akColorB200,
  akColorB300,
  akColorB400,
  akBorderRadius,
} from '@atlaskit/util-shared-styles';
import DocumentFilledIcon from '@atlaskit/icon/glyph/document-filled';
import { hexToRgba } from '@atlaskit/editor-common';

import { MEDIA_HEIGHT, FILE_WIDTH } from './MediaComponent';

const IconWrapper = styled.div`
  color: ${hexToRgba(akColorB400, 0.4) || akColorB400};
  background: ${hexToRgba(akColorB300, 0.6) || akColorB300};
  border-radius: ${akBorderRadius};
  margin: 5px 3px 25px;
  width: ${FILE_WIDTH}px;
  min-height: ${MEDIA_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropLine = styled.div`
  background: ${akColorB200};
  border-radius: ${akBorderRadius};
  margin: 2px 0;
  width: 100%;
  height: 2px;
`;

export type PlaceholderType = 'single' | 'group';
export interface Props {
  type: PlaceholderType;
}

export default ({ type = 'group' }: Props) =>
  type === 'single' ? (
    <DropLine />
  ) : (
    <IconWrapper>
      <DocumentFilledIcon label="Document" size="medium" />
    </IconWrapper>
  );
