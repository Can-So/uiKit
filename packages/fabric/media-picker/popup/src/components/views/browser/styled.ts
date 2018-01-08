import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  .topShadow {
    position: fixed;
    top: 53px;
    z-index: 10;
    width: 100%;
    height: 2px;
    background-color: rgba(0, 30, 66, 0.1);
  }

  .bottomShadow {
    position: fixed;
    bottom: 80px;
    z-index: 10;
    width: 100%;
    height: 2px;
    background-color: rgba(0, 30, 66, 0.1);
  }
`;
