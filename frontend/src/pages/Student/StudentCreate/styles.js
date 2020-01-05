import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Container = styled.div`
  margin: 0% 20%;
  margin-top: 20px;
  @media screen and (max-width: 1020px) and (min-width: 769px) {
    width: 90vh;
  }

  @media only screen and (width: 768px) {
    width: 75vh;
  }

  @media screen and (max-width: 767px) {
    width: 110vh;
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
  a,
  button {
    width: 124px;
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

  a {
    background: #cccccc;
    margin-right: 19px;
  }

  button {
    background: #ee4d64;
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

export const FormDiv = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 17px 25px;
  margin-top: 20px;

  input {
    height: 45px;
    width: 100%;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    color: #999999;
    font-size: 14px;
    margin: 5px 0;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    margin-bottom: 13px;
  }
`;

export const FormDivLine = styled.div`
  margin-bottom: 5px;
  width: ${props => props.width && `${props.width}%`};
  display: flex;
  flex-direction: ${props => (props.divFather ? 'row' : 'column')};
  margin-right: ${props => (props.divFather ? '0' : '5%')};

  label {
    font-weight: bold;
    font-size: 14px;
    color: #444444;
  }

  input {
    height: 45px;
    width: 100%;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    color: #999999;
    font-size: 14px;
    margin: 5px 0;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    margin-bottom: 13px;
    margin-right: 5%;
  }
`;

export const LinkHref = styled(Link)`
  color: ${props => (!props.light ? props.color : lighten(0.1, props.color))};
  margin-right: 5px;
`;

export const Button = styled.button`
  color: ${props => (!props.light ? props.color : lighten(0.1, props.color))};
`;
