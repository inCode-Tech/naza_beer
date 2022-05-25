import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import '@szhsin/react-menu/dist/theme-dark.css';
import 'react-day-picker/dist/style.css';

export const GlobalStyles = createGlobalStyle`
  :root {
    --shape: #ffffff;
    --background: #fafbfc;
    --button-default: #004e89;

    --yellow1: #ffd60a;
    --yellow2: #ffc300;
    --blue1: #003566;
    --blue2: #001d3d;
    --black: #000814;
    --table-tr: rgba(0, 8, 20,.025);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button, select {
    cursor: pointer;
  }

  .react-modal-overlay{
    background: rgba(0,0,0,.5);
    position: fixed;
    z-index: 30;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-modal-content{
    width: 100%;
    max-width: 576px;
    background: var(--shape);
    padding: 3rem;
    position: relative;
    border-radius: 0.30rem;

    @media (max-width: 630px) {
      padding-top: 5rem;
      width: 100vw;
      height: 100vh;
    }
  }
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 300ms;
    .react-modal-content {
      transform: scale(0);
      transition: transform 300ms;
    }
  }
  .ReactModal__Overlay--after-open {
    opacity: 1;
    transition: opacity 300ms;
    .react-modal-content {
      transform: scale(1);
    }
  }
  .ReactModal__Overlay--before-close {
    opacity: 0;
    transition: opacity 300ms;
    .react-modal-content {
      transform: scale(0);
    }
  }
`;