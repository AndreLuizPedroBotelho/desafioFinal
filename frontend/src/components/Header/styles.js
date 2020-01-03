import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 1px solid #eee;
  @media screen and (max-width: 768px) {
    width: 115vh;
  }

  @media screen and (max-width: 500px) {
    width: 130vh;
  }
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const LinkHref = styled(Link)`
  font-weight: bold;
  font-size:15px;
  color: ${props => props.active && props.active};
  margin-right: 10px;
`;

export const Profile = styled.div`
  display: flex;
  padding-left: 20px;
  border-left: 1px solid #eee;
  margin-left: 20px;

  div {
    text-align: right;
    margin-right: 20px;

    strong {
      display: block;
      color: #333;
    }
  }

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: transparent;
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: #de3b3b;
`;
