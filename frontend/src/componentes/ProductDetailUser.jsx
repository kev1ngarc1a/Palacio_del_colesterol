import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import HeaderUser from "./HeaderUser";
import Footer from "./Footer";
import "../estilos/ProductDetailUser.css";

export default function ProductDetailUser() {
  const { id } = useParams();
  const { getProduct } = useProducts();
  const [product, setProduct] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  // Adicionales con cantidad
  const [adicionalesState, setAdicionalesState] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await getProduct(id);
      setProduct(data);

      // Inicializamos adicionales con campos: { nombre, precio, cantidad, checked }
      if (data.adicionales) {
        setAdicionalesState(
          data.adicionales.map(a => ({
            ...a,
            cantidad: 1,
            checked: false,
          }))
        );
      }
    }
    loadData();
  }, [id, getProduct]);

  if (!product) return <p className="loading">Cargando producto...</p>;

  const imageUrl = product.imagen
    ? `http://localhost:5000${product.imagen}`
    : "https://via.placeholder.com/300?text=Sin+imagen";

  // Marcar / desmarcar adicional
  const toggleAdicional = (index) => {
    setAdicionalesState(prev =>
      prev.map((a, i) =>
        i === index ? { ...a, checked: !a.checked } : a
      )
    );
  };

  // Cambiar cantidad del adicional
  const changeAdicionalCantidad = (index, value) => {
    setAdicionalesState(prev =>
      prev.map((a, i) =>
        i === index ? { ...a, cantidad: Number(value) } : a
      )
    );
  };

  const handleAddToCart = () => {
    const adicionalesSeleccionados = adicionalesState
      .filter(a => a.checked)
      .map(a => ({
        nombre: a.nombre,
        precio: a.precio,
        cantidad: a.cantidad,
      }));

    const item = {
      productId: product._id,
      nombre: product.nombre_producto,
      precio: product.precio,
      cantidad,
      adicionales: adicionalesSeleccionados,
    };

    console.log("Producto agregado al carrito:", item);

    alert("Producto agregado al carrito con adicionales 😄");
  };

  return (
    <>
      <HeaderUser />

      <div className="product-detail-container">
        <div className="product-detail-card">

          {/* Imagen */}
          <img
            src={imageUrl}
            alt={product.nombre_producto}
            className="detail-img"
          />

          {/* Información */}
          <div className="detail-info">
            <h1>{product.nombre_producto}</h1>
            <p className="detail-price">
              ${product.precio?.toLocaleString("es-CO")}
            </p>
            <p>{product.descripcion}</p>

            {/* Selección de cantidad del producto */}
            <div className="quantity-box">
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              />
            </div>

            {/* ADICIONALES CON CANTIDAD */}
            {adicionalesState.length > 0 && (
              <div className="adicionales-box">
                <h3>Adicionales</h3>

                {adicionalesState.map((a, index) => (
                  <div key={index} className="adicional-row">
                    {/* Checkbox */}
                    <label className="adicional-option">
                      <input
                        type="checkbox"
                        checked={a.checked}
                        onChange={() => toggleAdicional(index)}
                      />
                      {a.nombre} — ${a.precio.toLocaleString("es-CO")}
                    </label>

                    {/* Cantidad del adicional */}
                    {a.checked && (
                      <input
                        type="number"
                        min="1"
                        value={a.cantidad}
                        className="adicional-cantidad"
                        onChange={(e) =>
                          changeAdicionalCantidad(index, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>          
            )}
            <br></br>
            {/* Botón agregar al carrito */}
            <button className="btn-add-cart" onClick={handleAddToCart}>
              🛒 Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
