import { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../../Context/AuthContext";
import {
  Menu,
  MenuItem,
  MenuButton,
} from '@szhsin/react-menu';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import { Container } from "./styles";

import { HiHome } from 'react-icons/hi';
import { GiSoccerKick, GiTrophy, GiSoccerBall } from 'react-icons/gi';
import { BsThreeDotsVertical } from 'react-icons/bs';

export function Navbar() {
  const { signOut } = useAuth();
  const [selected, setSelected] = useState("home");

  return (
    <Container>
      <header>
        <h1>Naza Beer</h1>
        <Menu
          menuButton={
            <MenuButton className="btn-logout">
              <BsThreeDotsVertical />
            </MenuButton>
          }
          theming="dark"
          align="end"
          transition
          arrow
        >
          <MenuItem onClick={signOut}>Sair</MenuItem>
        </Menu>
      </header>
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
        <Link 
          to="/pagamentos" 
          onClick={() => setSelected("payments")}
          className={selected === "payments" ? "selected" : ""}
        >
          <RiMoneyDollarCircleLine className="icon" />
          Pagamentos
        </Link>
      </nav>
    </Container>
  );
}