import styled from 'styled-components';
import { FileStatus } from '../src';

export const FilesWrapper = styled.div``;

export interface FilesWrapperProps {
  status: FileStatus;
}

const statusColorMap = {
  uploading: 'cornflowerblue',
  processing: 'peachpuff',
  processed: 'darkseagreen',
  error: 'indianred',
};

export const FileWrapper = styled.div`
  padding: 5px;
  margin: 10px;
  display: inline-block;
  width: 315px;
  background-color: ${({ status }: FilesWrapperProps) =>
    statusColorMap[status]};
`;

export const CardsWrapper = styled.div`
  width: 900px;
  padding: 10px;
  border-right: 1px solid #ccc;

  h1 {
    text-align: center;
    border-bottom: 1px solid #ccc;
  }

  > div {
    width: auto;
    display: inline-block;
    margin: 10px;
  }
`;

export const Header = styled.div`
  button {
    margin: 5px;
  }
`;
