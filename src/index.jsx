import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import GlobalStyle from './globalStyled';

ReactDom.render((
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>), document.getElementById('root'));
