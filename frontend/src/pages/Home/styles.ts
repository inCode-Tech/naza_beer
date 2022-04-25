import styled from 'styled-components';

import playerImage from '../../assets/player.png';
import goalkeeperImage from '../../assets/goalkeeper.png';
import top1Image from '../../assets/top1.png';

export const Container = styled.div`
  position: relative;

  .content {
    padding-left: 15rem; // Navbar space
    width: 100%;

    @media (max-width: 630px) {
      padding-left: 0;
    }

    .main-information-container {
      display: flex;
      padding: 1rem 1.5rem;

      @media (max-width: 900px) {
        flex-direction: column;
      }

      & > div {
        border: 1px solid var(--black);
        border-radius: 0.30rem;
        padding: 1rem;
        flex: 1;
        color: var(--black);

        & + div {
          margin-left: 1rem;

          @media (max-width: 900px) {
            margin-left: 0;
            margin-top: 1rem;
          }
        }
        p {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }
        h2 {
          font-size: 2.3rem;
        }
      }

      .number-of-player-container {
        background: url(${playerImage}) no-repeat;
        background-size: auto 40%;
        background-position: 92% 20%;
      }
      .number-of-goalkeeper {
        background: url(${goalkeeperImage}) no-repeat;
        background-size: auto 40%;
        background-position: 92% 20%;
      }
      .top1-container {
        background: url(${top1Image}) no-repeat;
        background-size: auto 40%;
        background-position: 92% 20%;

        & > div > div {
          p {
            margin-bottom: 0;
            font-size: 1rem;
          }
        }
      }
    }

    .top3-information-container {
      display: flex;
      padding: 1rem 1.5rem;
      width: 100%;

      @media (max-width: 630px) {
        flex-direction: column;
      }

      & > div {
        flex: 1;

        & + div {
          margin-left: 1rem;

          @media (max-width: 630px) {
            margin-left: 0;
            margin-top: 1rem;
          }
        }

        p {
          padding: 0.6rem 0.8rem;
          background: var(--black);
          border-radius: 0.30rem 0.30rem 0 0;
          color: var(--yellow1);
          font-weight: bold;
          width: 100%;
          text-align: center;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid var(--black);
          border-radius: 0.30rem;

          td {
            padding: 0.8rem;
            line-height: 18px;

            &.td-trophy {
              display: flex;
              flex-direction: row;
              align-items: center;

              .icon {
                font-size: 1.5rem;
                margin-right: 0.6rem;
              }
            }

            span {
              font-weight: bold;
              font-size: 0.8rem;
            }
          }

          .tr-top1, .tr-top2 {
            border-bottom: 1px solid var(--black);
          }

          .tr-top1 .td-trophy .icon {
            color: #ffd60a;
          }
          .tr-top2 .td-trophy .icon {
            color: #6c757d;
          }
          .tr-top3 .td-trophy .icon {
            color: #aa6c2a;
          }
        }
      }
    }
  }
`;