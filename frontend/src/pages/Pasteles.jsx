import React from 'react';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import { Link } from 'react-router-dom'
import coldImg from '../img/Palaciodelcolesterollogogrande1Iniciarsesion.png'
import pastelfritoImg from '../img/pastelfrito.jpg'
import { showSuccessNotification } from '../utils/notifications';
import "../estilos/Tienda.css";

const Pasteles = () => {
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
      <div className="uk-grid-large" uk-grid="true">
        <div className="uk-width-1-2@m uk-text-center">
          <img src={pastelfritoImg} alt="Imagen del producto" className="uk-border-rounded" />
          <p className="uk-text-lead uk-text-bold uk-margin-top">$7.000</p>
        </div>

        <div className="uk-width-1-2@m">
          <h2 className="uk-heading-line"><span>Pasteles Fritos</span></h2>
          <p className="uk-text-meta">
            Disfruta de nuestros pasteles fritos crocantes, rellenos con sabrosas opciones:
            carne de res sazonada, pollo desmechado o papa criolla aliñada. Acompáñalos con tus salsas favoritas.
          </p>

          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="cantidad-res">Pasteles de carne de res:</label>
            <input className="uk-input" type="number" id="cantidad-res" name="carne_res" min="0" defaultValue="0" />
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="cantidad-pollo">Pasteles de pollo:</label>
            <input className="uk-input" type="number" id="cantidad-pollo" name="pollo" min="0" defaultValue="0" />
          </div>

          <div className="uk-margin">
            <label className="uk-form-label" htmlFor="cantidad-papa">Pasteles de papa:</label>
            <input className="uk-input" type="number" id="cantidad-papa" name="papa" min="0" defaultValue="0" />
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Elige tus salsas:</label>
            <div className="uk-form-controls uk-grid-small uk-child-width-1-2" uk-grid="true">
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

export default Pasteles;
