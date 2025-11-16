import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../componentes/HeaderAdmin";
import Footer from "../componentes/Footer";
import "../estilos/AddEmployee.css";

// 👉 Agregar tu función API
import { createEmployeeRequest } from "../api/Auth";

function AddEmployee() {
  const navigate = useNavigate();

  const [empleado, setEmpleado] = useState({
    nombre_completo: "",
    cargo: "",
    telefono: "",
    correo: "",
    direccion: "",
    turno: "",
    inicio_contrato: "",
    fin_contrato: "",
  });

  const handleChange = (e) => {
    setEmpleado({ ...empleado, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createEmployeeRequest(empleado);

      if (res.status === 201) {
        alert("Empleado agregado correctamente ✅");
        navigate("/employee-list");
      }
    } catch (error) {
      console.error(error);
      alert("Error al guardar el empleado ❌");
    }
  };

  return (
    <>
      <HeaderAdmin />
      <div className="add-employee-container">
        <form className="add-employee-form" onSubmit={handleSubmit}>
          {/* 🧩 COLUMNA IZQUIERDA */}
          <div>
            <label>Nombre Completo</label>
            <input
              type="text"
              name="nombre_completo"
              value={empleado.nombre_completo}
              onChange={handleChange}
              required
            />

            <label>Cargo</label>
            <input
              type="text"
              name="cargo"
              value={empleado.cargo}
              onChange={handleChange}
              required
            />

            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={empleado.telefono}
              onChange={handleChange}
            />

            <label>Correo</label>
            <input
              type="email"
              name="correo"
              value={empleado.correo}
              onChange={handleChange}
            />
          </div>

          {/* 🧩 COLUMNA DERECHA */}
          <div>
            <label>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={empleado.direccion}
              onChange={handleChange}
            />

            <label>Turno</label>
            <select
              name="turno"
              value={empleado.turno}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un turno</option>
              <option value="Mañana">Mañana</option>
              <option value="Tarde">Tarde</option>
              <option value="Noche">Noche</option>
            </select>

            <label>Inicio del Contrato</label>
            <input
              type="date"
              name="inicio_contrato"
              value={empleado.inicio_contrato}
              onChange={handleChange}
              required
            />

            <label>Finalización del Contrato</label>
            <input
              type="date"
              name="fin_contrato"
              value={empleado.fin_contrato}
              onChange={handleChange}
            />
          </div>

          {/* BOTONES */}
          <div className="button-container">
            <button type="submit" className="btn-save">
              Guardar Empleado
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/employee-list")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AddEmployee;
