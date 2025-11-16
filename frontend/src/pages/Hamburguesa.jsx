import React from "react";
import "uikit/dist/css/uikit.min.css";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { Link } from 'react-router-dom'
import coldImg from '../img/Palaciodelcolesterollogogrande1Iniciarsesion.png'
import hamburguesaImg from '../img/hamburguesa.jpg'
import "../estilos/Tienda.css";
import { showSuccessNotification } from '../utils/notifications'
UIkit.use(Icons);

const Hamburguesa = () => {
const handleAgregarCarrito = (e) => {
        e.preventDefault();
        showSuccessNotification('Producto agregado al carrito exitosamente!');
  };


  return (
    <>
     <header>  
         <span className='custom-font'>PaCo</span><img src={coldImg} height="50" width="50" alt="Logo" />
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/Tienda">Tienda</Link></li>
            <li><a href="#">Iniciar sesión</a></li>
          </ul>
        </nav>
      </header>

      <div className="uk-container uk-container-expand uk-background-default uk-padding uk-border-rounded uk-box-shadow-large uk-margin-top">
        <div className="uk-grid-large" data-uk-grid>
          <div className="uk-width-1-2@m">
            <div className="uk-text-center">
              <img src={hamburguesaImg} alt="Hamburguesa" className="uk-border-rounded" />
              <p className="uk-text-lead uk-text-bold uk-margin-top">$7.000</p>
            </div>
          </div>

          <div className="uk-width-1-2@m">
            <h2 className="uk-heading-line"><span>Hamburguesa Clásica</span></h2>
            <p className="uk-text-meta">
              Hamburguesa jugosa con carne 100% res, servida en pan artesanal. Personalízala a tu gusto eligiendo los ingredientes que más te gusten.
            </p>

            <div className="uk-margin">
              <label className="uk-form-label">Ingredientes:</label>
              <div className="uk-form-controls uk-grid-small uk-child-width-1-2" data-uk-grid>
                {["queso", "tomate", "lechuga", "cebolla", "tocineta", "huevo", "pepino", "jalapeños"].map((item) => (
                  <label key={item}>
                    <input className="uk-checkbox" type="checkbox" name="ingredientes" value={item} /> {item.charAt(0).toUpperCase() + item.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="papas">¿Deseas papas a la francesa?</label>
              <div className="uk-form-controls">
                <select className="uk-select" id="papas" name="papas">
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>
            <div className="uk-margin">
              <button
                className="uk-button uk-button-secondary"
                onClick={handleAgregarCarrito}
              >
                Agregar al carrito
              </button>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default Hamburguesa;
