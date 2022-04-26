import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15rem;
  height: 100vh;
  padding: 1rem;
  background: var(--background);

  border-right: 1px solid #ebecf0;

  @media (max-width: 630px) {
    position: relative;
    width: 100vw;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #ebecf0;
  }

  header {
    position: relative;
    width: 100%;
    text-align: center;

    h1 {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    .btn-logout {
      all: unset;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      position: absolute;
      top: 0.1rem;
      right: 0rem;
    }
  }

  .separator {
    width: 100%;
    height: 2px;
    border-radius: 5px;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(117,117,117,0.2497373949579832) 50%, rgba(0,212,255,0) 100%);
    margin: 1rem 0;
  }

  nav {
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (max-width: 630px) {
      flex-direction: row;
      overflow: auto;
      padding-bottom: 1rem;
    }

    a {
      display: flex;
      align-items: center;
      font-size: 1rem;
      font-weight: bold;
      padding: 0.8rem 1.2rem;
      border: none;
      border-radius: 0.30rem;
      background: var(--white);

      transition: all 0.3s;

      @media (max-width: 630px) {
        margin: 0 0.5rem;
      }

      & + a {
        margin-top: 1rem;

        @media (max-width: 630px) {
          margin-top: 0;
        }
      }
      .icon {
        margin-right: 0.7rem;
      }
      &.selected {
        box-shadow: 0px 8px 15px -3px rgba(0, 8, 20, .25);
        background: var(--black);
        color: var(--yellow1);
      }
      &:hover {
        box-shadow: 0px 8px 15px -3px rgba(0,0,0,0.1);
      }
    }
  }
`;