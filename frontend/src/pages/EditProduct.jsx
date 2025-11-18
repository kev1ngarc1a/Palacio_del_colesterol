import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../estilos/EditProduct.css";
import HeaderAdmin from "../componentes/HeaderAdmin";
import Footer from "../componentes/Footer";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct, updateProduct } = useProducts();

  const [product, setProduct] = useState({
    nombre_producto: "",
    categoria: "",
    precio: "",
    descripcion: "",
  });

  const [preview, setPreview] = useState(null);
  const [newImage, setNewImage] = useState(null);

  // 🔹 Adicionales del producto
  const [adicionales, setAdicionales] = useState([]);

  // 🔹 Input temporal para nuevo adicional
  const [newAdicional, setNewAdicional] = useState({
    nombre: "",
    precio: "",
  });

  // 🟢 Cargar producto
  useEffect(() => {
    const loadProduct = async () => {
      const data = await getProduct(id);
      if (data) {
        setProduct({
          nombre_producto: data.nombre_producto,
          categoria: data.categoria,
          precio: data.precio,
          descripcion: data.descripcion,
        });

        setAdicionales(data.adicionales || []);

        if (data.imagen) {
          setPreview(`http://localhost:5000${data.imagen}`);
        }
      }
    };
    loadProduct();
  }, [id, getProduct]);

  // 🟢 Manejo de cambios
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // 🔹 Agregar adicional
  const addAdicional = () => {
    if (!newAdicional.nombre || !newAdicional.precio) return;

    setAdicionales([...adicionales, newAdicional]);
    setNewAdicional({ nombre: "", precio: "" });
  };

  // 🔹 Eliminar adicional
  const removeAdicional = (index) => {
    setAdicionales(adicionales.filter((_, i) => i !== index));
  };

  // 🟢 Enviar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre_producto", product.nombre_producto);
    formData.append("categoria", product.categoria);
    formData.append("precio", product.precio);
    formData.append("descripcion", product.descripcion);

    // 🔹 Enviar adicionales como JSON
    formData.append("adicionales", JSON.stringify(adicionales));

    if (newImage) formData.append("imagen", newImage);

    await updateProduct(id, formData);

    navigate("/product-list");
  };

  return (
    <>
      <HeaderAdmin />

      <div className="edit-container">
        <h1 className="edit-title">Editar Producto</h1>

        <form className="edit-form" onSubmit={handleSubmit} encType="multipart/form-data">

          {/* IMAGEN */}
          <label>Imagen del Producto</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && <img src={preview} className="imagen-preview" alt="Preview" />}

          {/* CAMPOS BÁSICOS */}
          <label>Nombre del producto</label>
          <input name="nombre_producto" value={product.nombre_producto} onChange={handleChange} required />

          <label>Categoría</label>
          <input name="categoria" value={product.categoria} onChange={handleChange} />

          <label>Precio</label>
          <input type="number" name="precio" value={product.precio} onChange={handleChange} required />

          <label>Descripción</label>
          <textarea name="descripcion" value={product.descripcion} onChange={handleChange} />

          {/* 🔹 ADICIONALES */}
          <h3>Adicionales</h3>

          <div className="adicional-inputs">
            <input
              type="text"
              placeholder="Nombre del adicional"
              value={newAdicional.nombre}
              onChange={(e) => setNewAdicional({ ...newAdicional, nombre: e.target.value })}
            />

            <input
              type="number"
              placeholder="Precio"
              value={newAdicional.precio}
              onChange={(e) => setNewAdicional({ ...newAdicional, precio: Number(e.target.value) })}
            />

            <button type="button" onClick={addAdicional} className="btn-add">Agregar</button>
          </div>

          <ul className="adicional-lista">
            {adicionales.map((a, index) => (
              <li key={index} className="adicional-item">
                {a.nombre} — ${a.precio}
                <button type="button" onClick={() => removeAdicional(index)} className="btn-delete">X</button>
              </li>
            ))}
          </ul>

          {/* BOTONES */}
          <div className="edit-buttons">
            <button type="submit" className="btn-save">Guardar cambios</button>
            <button type="button" className="btn-cancel" onClick={() => navigate("/product-list")}>Cancelar</button>
          </div>

        </form>
      </div>

      <Footer />
    </>
  );
}
