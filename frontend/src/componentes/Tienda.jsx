// src/componentes/Tienda.jsx
import { Link } from 'react-router-dom'
import '../estilos/Tienda.css'
import coldImg from '../img/Palaciodelcolesterollogogrande1Iniciarsesion.png'
import empanadaImg from '../img/empandacarne.jpg'
import rellenoImg from '../img/relleno.jpg'
import pastelImg from '../img/pastelfrito.jpg'
import hamburguesaImg from '../img/hamburguesa.jpg'
import papaImg from '../img/papasrellenas.jpg'
import CalienteImg from '../img/Caliente.jpg'
import polloImg from '../img/pollo.jpg'
import picadaImg from '../img/MG_1606.jpg.webp'
import Header from "./Header";
import Footer from '../componentes/Footer';

export default function Tienda() {
  return (
    <>

      <Header />
      <main>
        <h1 className='tituloBienvenida'>PaCo – Tu Sabor Favorito</h1>
      </main>

      <section className="menu">
        <div className="item">
          <img src={empanadaImg} alt="Empanadas de carne" />
          <h3>Empanadas</h3>
          <p className="price">$3.000</p>
          <Link to="/Empanadas"><button className="buy-button">Comprar</button></Link>
        </div>

        <div className="item">
          <img src={pastelImg} alt="Pasteles fritos" />
          <h3>Pasteles fritos</h3>
          <p className="price">$3.000</p>
          <Link to="/Pasteles"><button className="buy-button">Comprar</button></Link>
        </div>

        <div className="item">
          <img src={hamburguesaImg} alt="Hamburguesas" />
          <h3>Hamburguesas</h3>
          <p className="price">$12.000</p>
          <Link to="/Hamburguesa"><button className="buy-button">Comprar</button></Link>
        </div>

        <div className="item">
          <img src={papaImg} alt="Papas rellenas" />
          <h3>Papas rellenas</h3>
          <p className="price">$3.000</p>
          <Link to="/Papas"><button className="buy-button">Comprar</button></Link>
        </div>

        <div className="item">
          <img src={CalienteImg} alt="Perro-Caliente" />
          <h3>Perro Caliente</h3>
          <p className="price">$14.000</p>
          <Link to="/Caliente"><button className="buy-button">Comprar</button></Link>
        </div>

        <div className="item">
          < img src={polloImg} alt="Pollo a la Broster" />
          <h3>Pollo a la Broster</h3>
          <p className="price">$10.000</p>
          <Link to="/pollo"><button className="buy-button">Comprar</button></Link>
        </div>

        <div className="item">
          <img src={picadaImg} alt="Picada del palacio" />
          <h3>Picada del palacio</h3>
          <p className="price">$25.000</p>
          <Link to="/Picada"><button className="buy-button">Comprar</button></Link>
        </div>

        <div className="item">
          <img src={rellenoImg} alt="Relleno" />
          <h3>Relleno</h3>
          <p className="price">$16.000</p>
          <Link to="/Relleno"><button className="buy-button">Comprar</button></Link>
        </div>
      </section>
      
      < Footer />
    </>
  );
}
