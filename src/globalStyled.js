import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
  }

  body {
    height: 100%;
    margin: 0;
    width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  input {
    margin: 0;
    padding: 0;
  }

  button {
    padding: 0;
  }
  
  .root {
    height: 100%;
}
`;

export default GlobalStyle;
