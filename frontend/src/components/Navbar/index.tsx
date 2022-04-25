import { useState } from "react";
import { Link } from 'react-router-dom';

import { Container } from "./styles";

import { HiHome } from 'react-icons/hi';
import { GiSoccerKick, GiTrophy, GiSoccerBall } from 'react-icons/gi';

export function Navbar() {
  const [selected, setSelected] = useState("home");

  return (
    <Container>
      <h1>Naza Beer</h1>
      <div className="separator"></div>
      <nav>
        <Link 
          to="/inicio" 
          onClick={() => setSelected("home")}
          className={selected === "home" ? "selected" : ""}
        >
          <HiHome className="icon" />
          Início
        </Link>
        <Link 
          to="/jogadores" 
          onClick={() => setSelected("players")}
          className={selected === "players" ? "selected" : ""}
        >
          <GiSoccerKick className="icon" />
          Jogadores
        </Link>
        <Link 
          to="/vitorias" 
          onClick={() => setSelected("victories")}
          className={selected === "victories" ? "selected" : ""}
        >
          <GiTrophy className="icon" />
          Vitórias
        </Link>
        <Link 
          to="/gols" 
          onClick={() => setSelected("goals")}
          className={selected === "goals" ? "selected" : ""}
        >
          <GiSoccerBall className="icon" />
          Gols
        </Link>
      </nav>
    </Container>
  );
}