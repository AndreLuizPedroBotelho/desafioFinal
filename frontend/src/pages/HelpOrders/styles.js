import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  margin: 0% 20%;

  @media screen and (max-width: 500px) {
    width: 100vh;
  }

  @media only screen and (width: 768px) {
    width: 70vh;
  }

  @media screen and (max-width: 1024px) and (min-width: 769px) {
    width: 50vh;
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

  thead {
    flex: 0 0 auto;
    width: calc(100% - 0.9em);
  }

  tbody {
    flex: 1 1 auto;
    display: block;
    overflow-y: auto;
    max-height: 60vh;
    margin-top: 10px;
  }

  .actions {
    width: 6rem;
  }

  tbody td:first-child ,thead th:first-child{
    text-align: left;
  }

  tbody td ,thead th{
    text-align: center;
    word-wrap: break-word;
  }

  tbody tr {
    width: 100%;
    padding: 13px 0;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:last-child {
    border-bottom: 0;
  }

  thead,  tbody tr {
    display: table;
    table-layout: fixed;
  }
`;

export const Button = styled.button`
  color: ${props => (!props.light ? props.color : lighten(0.1, props.color))};
  background: transparent;
  border: transparent;
`;
