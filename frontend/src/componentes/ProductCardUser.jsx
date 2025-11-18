import React from "react";
import { useNavigate } from "react-router-dom";
import "../estilos/ProductCard.css";

export default function ProductCardUser({ product }) {

  const navigate = useNavigate();

  if (!product) {
    return <div className="loading">Cargando producto...</div>;
  }

  const imageUrl = product.imagen
    ? `http://localhost:5000${product.imagen}`
    : "https://via.placeholder.com/200x200?text=Sin+imagen";

  return (
    <div className="product-card">

      <div className="image-container">
        <img
          src={imageUrl}
          alt={product.nombre_producto}
          className="product-image"
        />
      </div>

      <h2 className="product-name">{product.nombre_producto}</h2>

      <p><strong>Precio:</strong> ${product.precio?.toLocaleString("es-CO")}</p>
      <p><strong>Descripción:</strong> {product.descripcion || "Sin descripción"}</p>

      <button
        className="btn-buy"
        onClick={() => navigate(`/producto/${product._id}`)}
      >
        Comprar
      </button>

    </div>
  );
}
