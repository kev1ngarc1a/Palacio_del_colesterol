// src/componentes/Header.jsx
import { Link } from "react-router-dom";
import coldImg from "../img/Logopropio.jpg";

export default function Header() {
  return (
    <header>
      <span className="custom-font">PaCo</span>
      <Link to="/">
        <img 
          className="uk-margin-left" 
          src={coldImg} 
          height="50px" 
          width="50px" 
          alt="Logo" 
        />
      </Link>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Tienda">Tienda</Link></li>
          <li><Link to="/login">Iniciar sesión</Link></li>
        </ul>
      </nav>
    </header>
  );
}
