import React, { useState, useEffect } from "react";

import { useAuth } from '../context/AuthContext'; 
import axios from '../api/axios'; 
import { useNavigate, Link } from "react-router-dom"; // LÍNEA CORRECTA: Contiene useNavigate y Link

import "../estilos/Inicio.css";
import "uikit/dist/css/uikit.min.css";
import Footer from "../componentes/Footer";
import UIkit from "uikit";
// import { Link } from "react-router-dom"; // <-- LÍNEA ELIMINADA (CAUSABA EL ERROR)
import "../estilos/Tienda.css";

// Mantenemos solo las imágenes fijas (logo, Hero, tarjetas, servicios)
import logo from "../img/Palaciodelcolesterollogogrande1Iniciarsesion.png";
import plato from "../img/Heroimage.jpg";
import ingredientes from "../img/Card1image.jpg";
import especias from "../img/Card2image.jpg";
import carnes from "../img/Card3.jpg";


import pagos from "../img/formas_pago.jpg";
import domicilio from "../img/domicilio.jpg";
import servicio from "../img/atencion_cliente.jpg";
import fondoComida from "../img/comida_rapida.png";
import Header from "./Header";


export default function Inicio() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Obtiene productos del backend usando la instancia de axios configurada
                const response = await axios.get('/products');
                // Limitamos a 8 productos para los Destacados
                setProducts(response.data.slice(0, 8)); 
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError("Error al cargar productos destacados. ¿Está el servidor activo?");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="uk-section uk-text-center uk-padding-large">
                <Header />
                <span uk-spinner="ratio: 3"></span>
                <p>Cargando lo mejor de nuestro menú...</p>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="uk-section uk-text-center uk-padding-large">
                <Header />
                <p className="uk-text-danger">{error}</p>
                <p>Intenta recargar la página o revisa la conexión con el servidor (puerto 5000).</p>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <Header />
            <main>
                {/* SECCIÓN HERO */}
                <section
                    className="uk-section uk-section-default"
                    style={{
                        backgroundImage: `linear-gradient(
                            rgba(255, 255, 255, 0.6), 
                            rgba(255, 255, 255, 0.6)
                        ), url(${fondoComida})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center right",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        padding: "80px 0",
                        color: "#2b2b2b",
                    }}
                >
                    <div className="uk-container">
                        <div
                            className="uk-grid-large uk-child-width-1-2@m uk-flex-middle uk-flex-center"
                            uk-grid=""
                        >
                            <div>
                                <h1 className="uk-heading-medium">
                                    ¿Ya decidiste que te vas a{" "}
                                    <span className="uk-text-danger">comer hoy?</span>
                                </h1>
                                <p>
                                    <b>
                                        ¡Date un gusto hoy! Disfruta nuestras comidas rápidas recién
                                        preparadas, con el sabor que tanto te gusta y domicilio
                                        incluido.
                                    </b>
                                </p>
                                <Link to="/Tienda"> {/* Usamos Link en lugar de <a> para React Router */}
                                    <button className="uk-button uk-button-primary uk-border-pill">
                                        Compra Ahora
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN INGREDIENTES */}
                <section className="uk-section uk-section-muted">
                    <div className="uk-container">
                        <h2 className="uk-text-center">
                            Solo usamos lo <span style={{ color: "#5f259f" }}>mejor</span>!
                        </h2>
                        <div
                            className="uk-grid-match uk-child-width-1-3@m uk-margin"
                            uk-grid="true"
                        >
                            <a
                                href="/login"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div
                                    className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded"
                                    style={{ cursor: "pointer" }}
                                >
                                    <h3>Ingredientes orgánicos</h3>
                                    <img
                                        src={ingredientes}
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            objectFit: "cover",
                                        }}
                                        alt="Ingredientes"
                                        className="uk-border-rounded"
                                    />
                                </div>
                            </a>

                            <a
                                href="/login"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div
                                    className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded"
                                    style={{ cursor: "pointer" }}
                                >
                                    <h3>Mejores especias</h3>
                                    <img
                                        src={especias}
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            objectFit: "cover",
                                        }}
                                        alt="Especias"
                                        className="uk-border-rounded"
                                    />
                                </div>
                            </a>

                            <a
                                href="/login"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <div
                                    className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded"
                                    style={{ cursor: "pointer" }}
                                >
                                    <h3>Carnes frescas</h3>
                                    <img
                                        src={carnes}
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            objectFit: "cover",
                                        }}
                                        alt="Carnes"
                                        className="uk-border-rounded"
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
                
                {/* SECCIÓN DESTACADOS (CARGADOS DINÁMICAMENTE) */}
                <section className="uk-section" style={{ backgroundColor: "#FFF5E6" }}>
                    <div className="uk-container">
                        <h2 className="uk-text-center">Destacados</h2>

                        <div
                            className="uk-child-width-1-4@m uk-grid-small uk-flex-center"
                            uk-grid="true"
                        >
                            {products.map((producto) => (
                                <div key={producto._id}>
                                    <Link to="/Tienda">
                                        <div className="uk-card uk-card-default uk-card-body uk-text-center uk-border-rounded uk-transition-toggle">
                                            <div
                                                style={{
                                                    backgroundColor: "#fff",
                                                    padding: "8px",
                                                    borderRadius: "80%",
                                                    display: "inline-block",
                                                    marginBottom: "10px",
                                                }}
                                            >
                                                <img
                                                    src={`http://localhost:5000${producto.imagen}`}
                                                    alt={producto.nombre_producto}
                                                    className="uk-border-circle"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        objectFit: "cover",
                                                        cursor: "pointer",
                                                        borderRadius: "50%",
                                                    }}
                                                />
                                            </div>
                                            <h4 className="uk-text-bold" style={{ color: "#5f259f" }}>
                                                {producto.nombre_producto}
                                            </h4>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        {products.length === 0 && !loading && (
                            <p className="uk-text-center uk-text-muted">No hay productos destacados para mostrar.</p>
                        )}
                    </div>
                </section>

                {/* SECCIÓN SERVICIOS */}
                <section className="uk-section uk-section-muted">
                    <div className="uk-container">
                        <h2 className="uk-text-center">
                            Elegibilidad para domicilio,{" "}
                            <span style={{ color: "#5f259f" }}>métodos de pago</span>, etc..
                        </h2>
                        <div
                            className="uk-grid-match uk-child-width-1-3@m uk-margin-top"
                            uk-grid="true"
                        >
                            <div>
                                <div className="uk-card uk-card-default uk-card-body uk-text-center">
                                    <h3>Domicilio</h3>
                                    <p>Elegibilidad domicilio para todo Neiva y el Huila</p>
                                    <a href="/login" className="image-link">
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "250px",
                                                objectFit: "cover",
                                            }}
                                            src={domicilio}
                                            alt="Domicilio"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className="uk-card uk-card-default uk-card-body uk-text-center">
                                    <h3>Métodos de pago</h3>
                                    <p>
                                        Aceptamos todos los medios de pago. Tarjeta de credito,
                                        debito, efectivo, etc.
                                    </p>
                                    <a href="/login" className="image-link">
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "250px",
                                                objectFit: "cover",
                                            }}
                                            src={pagos}
                                            alt="Pagos"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className="uk-card uk-card-default uk-card-body uk-text-center">
                                    <h3>Servicio al cliente</h3>
                                    <p>
                                        Si necesitas ayuda sobre un pedido grande, con gusto te
                                        ayudaremos.
                                    </p>
                                    <a href="/login" className="image-link">
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "250px",
                                                objectFit: "cover",
                                            }}
                                            src={servicio}
                                            alt="Servicio"
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}