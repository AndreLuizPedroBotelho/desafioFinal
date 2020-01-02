import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  margin: 0% 20%;

  @media screen and (max-width: 767px) {
    width: 100vh;
  }

  @media only screen and (width: 768px) {
    width: 75vh;
  }

  @media screen and (max-width: 1024px) and (min-width: 769px) {
    width: 50vh;
  }
`;

export const ContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    font-size: 24px;
    font-weight: bold;
    color: #444444;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 17px 25px;
  margin-top: 20px;
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tr:last-child td,
  tr:first-child th {
    border: 0;
  }

  td.actions {
    display: flex;
    height: 35px;
  }

  tr td:nth-child(3) {
    padding-left: 17px;
  }
`;

export const Button = styled.button`
  color: ${props => (!props.light ? props.color : lighten(0.1, props.color))};
  background: transparent;
  border: transparent;
`;
