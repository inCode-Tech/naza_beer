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

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;

    .my-selected:not([disabled]) { 
      background: var(--black);
      border-color: transparent;
      color: var(--yellow1);
    }
    .my-selected:hover:not([disabled]) { 
      background: var(--black);
      border-color: transparent;
      color: var(--yellow1);
    }
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;

    @media (max-width: 500px) {
      flex-direction: column-reverse;
    }

    button {
      border: none;
      border-radius: 0.25rem;
      padding: 0.6rem 1.5rem;
      transition: filter 0.2s;
      &+button {
        margin-left: 1rem;

        @media (max-width: 500px) {
          margin-left: 0;
          margin-bottom: 1rem;
        }
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
        background: var(--black);
        color: var(--yellow2);
      }
    }
  }
`;