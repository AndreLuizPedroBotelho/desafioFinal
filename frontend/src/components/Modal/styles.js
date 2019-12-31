import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: ${props => (props.show ? 'block' : 'none')};
  height: 100%;
  left: 0;
  overflow-y: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000002;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000002;
`;

export const Content = styled.div`
  margin: 60px 20px;
  background: #fff;
  cursor: default;
  padding: 25px;
  position: relative;
  z-index: 1000003;
  max-width: 440px;
  min-width: 440px;
  border-radius: 5px;
`;

export const Body = styled.div`
  margin: 10px 0;
`;
