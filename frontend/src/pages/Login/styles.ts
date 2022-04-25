import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 0.4rem;
    background: white;
    filter: opacity(1);

    h1 {
      margin: 1rem 0 2rem 0;
    }

    input {
      border: 1px solid #979dac;
      padding: 0.3rem;
      border-radius: 0.4rem;
      margin-bottom: 1rem;
    }

    button {
      width: 100%;
      background: #003566;
      border: none;
      color: white;
      padding: 0.6rem 0;
      border-radius: 0.4rem;
      margin: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2.4rem;

      transition: 0.3s;

      &:hover {
        opacity: 0.8;
      }

      .loader {
        height: 1rem;
        width: 1rem;
        border: 2px solid transparent;
        border-bottom-color: #fff;
        border-radius: 50%;
        animation: rotateLoaderLogin 0.5s linear infinite;
      }
      @keyframes rotateLoaderLogin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    }
  }
`;