import React from 'react'
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';

import empanadaImg from '../img/empandacarne.jpg';
import coldImg from '../img/Palaciodelcolesterollogogrande1Iniciarsesion.png';
import { Link } from 'react-router-dom';
import { showSuccessNotification } from '../utils/notifications';
import "../estilos/Tienda.css";

const Empanadas = () => {
const handleAgregarCarrito = (e) => {
        e.preventDefault();
        showSuccessNotification('Producto agregado al carrito exitosamente!');
  };


  return (
    <>
      <header>  
        <span className='custom-font'>PaCo</span> <img src={coldImg} height="50" width="50" alt="Logo" />
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
              <img src={empanadaImg} alt="Empanadas de carne" className="uk-border-rounded" />
              <p className="uk-text-lead uk-text-bold uk-margin-top">$7.000</p>
            </div>
          </div>

          <div className="uk-width-1-2@m">
            <h2 className="uk-heading-line"><span>Personaliza tu pedido</span></h2>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="cantidad-res">Empanadas de carne de res:</label>
              <input className="uk-input" type="number" id="cantidad-res" name="carne_res" min="0" defaultValue="0" />
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="cantidad-pollo">Empanadas de pollo:</label>
              <input className="uk-input" type="number" id="cantidad-pollo" name="pollo" min="0" defaultValue="0" />
            </div>

            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="cantidad-papa">Empanadas de papa:</label>
              <input className="uk-input" type="number" id="cantidad-papa" name="papa" min="0" defaultValue="0" />
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Elige tus salsas:</label>
              <div className="uk-form-controls uk-grid-small uk-child-width-1-2" data-uk-grid>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="mayonesa" /> Mayonesa</label>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="rosada" /> Salsa rosada</label>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="picante" /> Picante</label>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="ajo" /> Salsa de ajo</label>
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

export default Empanadas;
