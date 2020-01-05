import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;
  }

  *:focus{
    outline:0;
  }

  html,body,#root{
    height:100%;
  }

  body{
    -webkit-font-smoothing:antialiased;
    background:#f5f5f5;
  }

  body,input,button,a{
    font:14px 'Roboto', sans-serif !important;
  }

  a{
    text-decoration:none;
  }

  ul{
    list-style:none;
  }

  textarea{
    resize: none;
  }

  button{
    cursor:pointer;
  }
`;
