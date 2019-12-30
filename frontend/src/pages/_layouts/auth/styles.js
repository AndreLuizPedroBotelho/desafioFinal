import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  min-height: 46rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background-color: #fff;
  max-width: 350px;
  height: 430px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  margin: 20px 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);

  img {
    margin: 20px 0;
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
    transition: 0.2s;
    margin-bottom: 13px;
  }

  input:focus {
    border-color: #ee4d64;
    transition: 0.2s;
  }

  label {
    font-size: 14px;
    color: #444444;
    font-weight: bold;
  }

  form {
    width: 100%;
  }

  button {
    width: 100%;
    height: 45px;
    border: none;
    font-size: 14px;
    font-weight: bold;
    background: #ee4d64;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }

  button:hover {
    background: #ca4558;
  }
`;
