import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "../estilos/productoform.css";
import Footer from "../componentes/Footer";
import HeaderAdmin from "../componentes/HeaderAdmin";

export default function AddProduct() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { createProduct, getProduct, updateProduct } = useProducts();
  const params = useParams();

  const [mensaje, setMensaje] = useState("");
  const [preview, setPreview] = useState(null);

  // 🔹 Estado para adicionales
  const [adicionales, setAdicionales] = useState([]);

  // 🔹 Estado temporal para input de nuevo adicional
  const [newAdicional, setNewAdicional] = useState({
    nombre: "",
    precio: "",
  });

  // Si es edición, cargar datos del producto existente
  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const producto = await getProduct(params.id);

        if (producto) {
          setValue("nombre_producto", producto.nombre_producto);
          setValue("categoria", producto.categoria);
          setValue("precio", producto.precio);
          setValue("descripcion", producto.descripcion);

          // Cargar adicionales existentes
          if (producto.adicionales) {
            setAdicionales(producto.adicionales);
          }

          // Mostrar previsualización de imagen
          if (producto.imagen) {
            const imageUrl = producto.imagen.startsWith("http")
              ? producto.imagen
              : `http://localhost:5000${producto.imagen}`;
            setPreview(imageUrl);
          }
        }
      }
    }
    loadProduct();
  }, [params.id, setValue, getProduct]);

  // Manejar previsualización de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
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

  // Enviar formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      formData.append("nombre_producto", data.nombre_producto);
      formData.append("categoria", data.categoria);
      formData.append("precio", data.precio);
      formData.append("descripcion", data.descripcion);

      // Adjuntar imagen
      if (data.imagen && data.imagen[0]) {
        formData.append("imagen", data.imagen[0]);
      }

      // 🔹 Adjuntar adicionales (como JSON)
      formData.append("adicionales", JSON.stringify(adicionales));

      if (params.id) {
        await updateProduct(params.id, formData);
        setMensaje("✅ Producto actualizado con éxito");
      } else {
        await createProduct(formData);
        setMensaje("✅ Producto guardado con éxito");
      }

      reset();
      setPreview(null);
      setAdicionales([]);

      setTimeout(() => setMensaje(""), 3000);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setMensaje("❌ Error al guardar el producto");
      setTimeout(() => setMensaje(""), 4000);
    }
  });

  return (
    <>
      <HeaderAdmin />

      <div className="form-container">
        <form
          className="form-producto"
          onSubmit={onSubmit}
          encType="multipart/form-data"
        >
          {mensaje && <p className="mensaje-exito">{mensaje}</p>}

          {/* Imagen */}
          <label htmlFor="imagen">Imagen del Producto</label>
          <input
            type="file"
            accept="image/*"
            {...register("imagen")}
            onChange={handleImageChange}
          />

          {preview && (
            <div className="preview-container">
              <img src={preview} alt="Vista previa" className="imagen-preview" />
            </div>
          )}

          {/* Nombre */}
          <label>Nombre del Producto</label>
          <input
            type="text"
            placeholder="Ingrese el nombre"
            {...register("nombre_producto", { required: true })}
          />

          {/* Categoría */}
          <label>Categoría</label>
          <input
            type="text"
            placeholder="Ejemplo: Pollo, Hamburguesa..."
            {...register("categoria", { required: true })}
          />

          {/* Precio */}
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            placeholder="Precio"
            {...register("precio", { required: true })}
          />

          {/* Descripción */}
          <label>Descripción</label>
          <textarea
            rows="3"
            placeholder="Ingrese una descripción"
            {...register("descripcion")}
          ></textarea>

          {/* 🔹 Sección de ADICIONALES */}
          <div className="adicionales-box">
            <h3>Adicionales</h3>

            <div className="adicional-inputs">
              <input
                type="text"
                placeholder="Nombre del adicional"
                value={newAdicional.nombre}
                onChange={(e) =>
                  setNewAdicional({ ...newAdicional, nombre: e.target.value })
                }
              />

              <input
                type="number"
                placeholder="Precio"
                value={newAdicional.precio}
                onChange={(e) =>
                  setNewAdicional({
                    ...newAdicional,
                    precio: Number(e.target.value),
                  })
                }
              />

              <button type="button" onClick={addAdicional} className="btn-add">
                Agregar
              </button>
            </div>

            <ul className="adicional-lista">
              {adicionales.map((a, index) => (
                <li key={index} className="adicional-item">
                  {a.nombre} — ${a.precio}
                  <button
                    type="button"
                    className="btn-delete"
                    onClick={() => removeAdicional(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button type="submit" className="btn-guardar">
            Guardar Producto
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}
