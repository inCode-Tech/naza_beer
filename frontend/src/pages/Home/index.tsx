import { Container } from "./styles";

import { BsTrophyFill } from 'react-icons/bs';
import { IoMdFootball } from 'react-icons/io';

import { Footer } from "../../components/Footer";

export function Home() {
  return (
    <Container>
      <div className="content">
        <div className="main-information-container">
          <div className="number-of-player-container">
            <div>
              <p>Número de <br /> Jogadores</p>
              <h2>23</h2>
            </div>
            <div className="img"></div>
          </div>
          <div className="number-of-goalkeeper">
            <div>
              <p>Número de <br /> Goleiros</p>
              <h2>4</h2>
            </div>
            <div className="img"></div>
          </div>
          <div className="top1-container">
            <div>
              <p>Primeiros no <br /> ranking</p>

              <div>
                <p><b>Vitórias:</b> Kaiky Santos</p>
                <p><b>Gols:</b> Wesley Estevam</p>
              </div>
            </div>
          </div>
        </div>

        <div className="top3-information-container">
          <div className="top3-victories">
            <p>TOP 3 DE VITÓRIAS</p>
            <table>
              <tr className="tr-top1">
                <td className="td-trophy">
                  <BsTrophyFill className="icon" />
                  <div>
                    <span>Posição:</span><br />
                    1º
                  </div>
                </td>
                <td>
                  <span>Nome:</span><br />
                  Neymar
                </td>
                <td>
                  <span>Vitórias:</span><br />
                  37
                </td>
              </tr>
              <tr className="tr-top2">
                <td className="td-trophy">
                  <BsTrophyFill className="icon" />
                  <div>
                    <span>Posição:</span><br />
                    2º
                  </div>
                </td>
                <td>
                  <span>Nome:</span><br />
                  Neymar
                </td>
                <td>
                  <span>Vitórias:</span><br />
                  37
                </td>
              </tr>
              <tr className="tr-top3">
                <td className="td-trophy">
                  <BsTrophyFill className="icon" />
                  <div>
                    <span>Posição:</span><br />
                    3º
                  </div>
                </td>
                <td>
                  <span>Nome:</span><br />
                  Neymar
                </td>
                <td>
                  <span>Vitórias:</span><br />
                  37
                </td>
              </tr>
            </table>
          </div>
          <div className="top3-goals">
            <p>TOP 3 DE GOLS</p>
            <table>
              <tr className="tr-top1">
                <td className="td-trophy">
                  <IoMdFootball className="icon" />
                  <div>
                    <span>Posição:</span><br />
                    1º
                  </div>
                </td>
                <td>
                  <span>Nome:</span><br />
                  Neymar
                </td>
                <td>
                  <span>Vitórias:</span><br />
                  37
                </td>
              </tr>
              <tr className="tr-top2">
                <td className="td-trophy">
                  <IoMdFootball className="icon" />
                  <div>
                    <span>Posição:</span><br />
                    2º
                  </div>
                </td>
                <td>
                  <span>Nome:</span><br />
                  Neymar
                </td>
                <td>
                  <span>Vitórias:</span><br />
                  37
                </td>
              </tr>
              <tr className="tr-top3">
                <td className="td-trophy">
                  <IoMdFootball className="icon" />
                  <div>
                    <span>Posição:</span><br />
                    3º
                  </div>
                </td>
                <td>
                  <span>Nome:</span><br />
                  Neymar
                </td>
                <td>
                  <span>Vitórias:</span><br />
                  37
                </td>
              </tr>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </Container>
  );
}