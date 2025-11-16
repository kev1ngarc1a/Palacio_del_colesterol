import React, { useEffect } from 'react';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import rellenoImg from '../img/relleno.jpg';
import coldImg from '../img/Palaciodelcolesterollogogrande1Iniciarsesion.png'
import { Link } from 'react-router-dom';
import { showSuccessNotification } from '../utils/notifications';
import "../estilos/Tienda.css"

const Relleno = () => {
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
              <img src={rellenoImg} alt="Imagen del producto" className="uk-border-rounded" />
              <p className="uk-text-lead uk-text-bold uk-margin-top">$7.000</p>
            </div>
          </div>

          <div className="uk-width-1-2@m">
            <h2 className="uk-heading-line"><span>Relleno</span></h2>
            <p className="uk-text-meta">
              Tradicional relleno colombiano preparado con arroz, carne de cerdo y especias, envuelto en tripa natural. Una delicia típica.
            </p>

            <div className="uk-margin">
              <label className="uk-form-label">Cantidad de porciones:</label>
              <div className="uk-form-controls">
                <input className="uk-input" type="number" name="cantidad" min="1" defaultValue="1" />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Acompañamiento:</label>
              <div className="uk-form-controls">
                <select className="uk-select" name="acompanamiento">
                  <option value="papa">Papa criolla</option>
                  <option value="yuca">Yuca frita</option>
                  <option value="arepa">Arepa</option>
                </select>
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label">Salsas:</label>
              <div className="uk-form-controls uk-grid-small uk-child-width-1-2" data-uk-grid>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="picante" /> Picante</label>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="rosada" /> Salsa rosada</label>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="mayonesa" /> Mayonesa</label>
                <label><input className="uk-checkbox" type="checkbox" name="salsas" value="ajo" /> Ajo</label>
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

export default Relleno;
