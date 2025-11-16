import React from 'react';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import { Link } from 'react-router-dom';
import coldImg from '../img/Palaciodelcolesterollogogrande1Iniciarsesion.png';
import papasrellenasImg from '../img/papasrellenas.jpg';
import { showSuccessNotification } from '../utils/notifications';
import "../estilos/Tienda.css";

const Papas = () => {
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
          <img src={papasrellenasImg} alt="Imagen del producto" className="uk-border-rounded" />
          <p className="uk-text-lead uk-text-bold uk-margin-top">$7.000</p>
        </div>

        <div className="uk-width-1-2@m">
          <h2 className="uk-heading-line"><span>Papas Rellenas</span></h2>
          <p className="uk-text-meta">
            Deliciosas papas rellenas fritas al punto, crujientes por fuera y suaves por dentro.
            Puedes personalizarlas con tus rellenos y salsas favoritas.
          </p>

          <div className="uk-margin">
            <label className="uk-form-label">¿Cuántas deseas?</label>
            <div className="uk-form-controls">
              <input className="uk-input uk-margin-small-bottom" type="number" name="carne" placeholder="Empanadas de carne" min="0" />
              <input className="uk-input uk-margin-small-bottom" type="number" name="pollo" placeholder="Empanadas de pollo" min="0" />
              <input className="uk-input" type="number" name="papa" placeholder="Empanadas de papa" min="0" />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Salsas:</label>
            <div className="uk-form-controls uk-grid-small uk-child-width-1-2" uk-grid="true">
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="mayonesa" /> Mayonesa</label>
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="rosada" /> Salsa rosada</label>
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="barbacoa" /> Barbacoa</label>
              <label><input className="uk-checkbox" type="checkbox" name="salsas" value="picante" /> Picante</label>
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

export default Papas;
