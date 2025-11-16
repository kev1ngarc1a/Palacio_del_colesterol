import React from 'react';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import MG_1606Img from '../img/MG_1606.jpg.webp';
import coldImg from '../img/Palaciodelcolesterollogogrande1Iniciarsesion.png'
import { Link } from 'react-router-dom'
import { showSuccessNotification } from '../utils/notifications'
import "../estilos/Tienda.css"

const Picada = () => {
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
            <img src={MG_1606Img} alt="Imagen del producto" className="uk-border-rounded" />
            <p className="uk-text-lead uk-text-bold uk-margin-top">$7.000</p>
          </div>
        </div>

        <div className="uk-width-1-2@m">
          <h2 className="uk-heading-line"><span>Picada del Palacio</span></h2>
          <p className="uk-text-meta">
            Una deliciosa combinación de carnes y acompañamientos tradicionales. Ideal para compartir y disfrutar de una experiencia llena de sabor.
          </p>

          <div className="uk-margin">
            <label className="uk-form-label">Cantidad de porciones:</label>
            <div className="uk-form-controls">
              <input className="uk-input" type="number" name="cantidad" placeholder="¿Cuántas deseas?" min="1" defaultValue="1" />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Incluye:</label>
            <ul className="uk-list uk-list-bullet">
              <li>Carne de res</li>
              <li>Chorizo</li>
              <li>Morcilla</li>
              <li>Costilla</li>
              <li>Arepa</li>
              <li>Papa criolla</li>
              <li>Plátano maduro</li>
            </ul>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Salsas:</label>
            <div className="uk-form-controls uk-grid-small uk-child-width-1-2" data-uk-grid>
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="mayonesa" /> Mayonesa</label>
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="rosada" /> Salsa rosada</label>
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="barbacoa" /> Barbacoa</label>
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="picante" /> Picante</label>
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

export default Picada;
