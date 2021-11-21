import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => (props.theme as any).white};
  }

  html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
  *, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
  }


  
`;

export const AppContainer = styled.div`
  padding-right: 30px;
  padding-left: 30px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  height: 100vh;
`;

export default GlobalStyle;
