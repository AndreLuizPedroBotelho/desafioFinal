import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Container = styled.div`
  margin: 0% 13%;
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
    margin-right: 19px;
    text-align: right;
    padding-right: 14px;
    padding-top: 10px;
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
  }

  tr td:nth-child(3) {
    padding-left: 17px;
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
