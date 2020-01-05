import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Container = styled.div`
  margin: 0% 3%;
  @media screen and (max-width: 1020px) {
    width: 90vh;
  }

  @media screen and (max-width: 500px) {
    width: 120vh;
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
  a {
    width: 146px;
    height: 35px;
    border: none;
    font-size: 14px;
    font-weight: bold;
    background: #ee4d64;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    text-align: right;
    padding-right: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    box-shadow: 0px 6px 16px -4px rgba(99, 93, 99, 0.81);
    border-top: 0px;
    border-left: 0px;
    text-align: left;
    padding-left: 22px;
    border-radius: 4px;
  }
`;

export const TableDiv = styled.div`
  background-color: #fff;
  padding: 17px 25px;
  margin-top: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  display: table;

  tr {
    display: table-row;
  }

  thead {
    display: table-header-group;
    text-align: center;
  }

  tbody tr {
    width: 100%;
    padding: 13px 0;
    border-bottom: 1px solid #ddd;
    height: 3rem;
  }

  tbody td:first-child,
  thead th:first-child {
    text-align: left;
  }
  tbody {
    display: table-row-group;
  }

  .notFound {
    color: red;
  }
  .actions {
    text-align: right;
    width: 100px;
  }

  tbody td,
  thead th {
    text-align: center;
    word-wrap: break-word;
  }

  tbody tr:last-child {
    border-bottom: 0;
  }

  td,
  th {
    display: table-cell;
  }

  td {
    color: #999;
  }
`;

export const LinkHref = styled(Link)`
  color: ${props => (!props.light ? props.color : lighten(0.1, props.color))};
  margin-right: 5px;
`;

export const Button = styled.button`
  color: ${props => (!props.light ? props.color : lighten(0.1, props.color))};
  background: transparent;
  border: transparent;
`;
