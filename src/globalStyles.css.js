import { createGlobalStyle } from "styled-components";
import data from "./globalJson.json";

const themeStyle = data.colors;

export default createGlobalStyle`
  button.button_theme{
      background: ${themeStyle.backgroundColor};
      color: ${themeStyle.textColor};
      border: 1px solid ${themeStyle.borderColor};
      transition: .5s;
  }
  button.button_theme:hover{
    background:  ${themeStyle.hoverColor};
  }
`;
