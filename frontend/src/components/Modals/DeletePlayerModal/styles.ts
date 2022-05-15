import styled from 'styled-components';

export const Content = styled.div`
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 1.5rem;
    }

    .closeModalIcon {
      color: var(--blue);
      font-size: 1.5rem;
      cursor: pointer;
      transition: filter 0.2s;
      &:hover {
        filter: opacity(0.8);
      }
    }
  }

  p {
    font-size: 1.5rem;
    margin: 2rem 0;
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;

    button {
      border: none;
      border-radius: 0.25rem;
      padding: 0.6rem 1.5rem;
      transition: filter 0.2s;
      &+button {
        margin-left: 1rem;
      }
      &:hover {
        filter: opacity(0.8);
      }
  
      &.cancel {
        background: white;
        border: 1px solid #ccc;
        color: black;
      }
      &.submit {
        background: #407ba7;
        color: #fff;
      }
    }
  }
`;