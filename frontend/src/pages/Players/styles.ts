import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  .content {
    padding-left: 15rem; // Navbar space
    width: 100%;

    @media (max-width: 630px) {
      padding-left: 0;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;

      h1 {
        font-size: 1.6rem;
        display: flex;
        align-items: center;

        .icon {
          margin-right: 0.5rem;
        }
      }

      button {
        display: flex;
        align-items: center;
        background: var(--yellow2);
        color: var(--black);
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 0.30rem;
        font-size: 0.8rem;
        font-weight: bold;

        transition: all 0.3s;

        .icon {
          font-size: 1rem;
          margin-right: 0.5rem;
        }
        
        &:hover {
          opacity: 0.8;
        }
      }
    }

    table {
      padding: 1rem 1.5rem;
      width: 100%;
      border-spacing: 0;

      thead {
        background: var(--black);
        color: var(--yellow2);
      }

      td, th {
        text-align: left;
        vertical-align: top;
        padding: 0.5rem 1.2rem;
      }

      .td-buttons {
        display: flex;
        justify-content: flex-end;
      }
      .td-buttons button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 0.30rem;
        font-size: 1.3rem;
        padding: 0.2rem;
        color: white;

        transition: all 0.3s;

        & + button {
          margin-left: 0.5rem;
        }

        &.edit-button {
          background: var(--black);
          color: var(--yellow1);
        }
        &.delete-button {
          background: var(--black);
          color: var(--yellow1);
        }

        &:hover {
          opacity: 0.8;
        }
      }

      thead tr th:nth-last-child(1){
        text-align: right;
      }

      tbody tr:nth-child(odd) {
        background-color: var(--table-tr);
      }
    }
  }
`;