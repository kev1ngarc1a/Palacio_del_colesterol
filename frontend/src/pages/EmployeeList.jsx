import React, { useEffect, useState } from "react";
import { getEmployeesRequest } from "../api/Auth";
import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../componentes/HeaderAdmin";
import Footer from "../componentes/Footer";
import "../estilos/EmployeeList.css";

function EmployeeList() {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const res = await getEmployeesRequest();
      setEmpleados(res.data);
    } catch (error) {
      console.error("Error cargando empleados:", error);
    }
  };

  // ✅ Eliminar empleado
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/empleados/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setEmpleados(empleados.filter((e) => e._id !== id));
        alert("Empleado eliminado correctamente");
      } else {
        alert("Error al eliminar el empleado");
      }
    } catch (error) {
      console.error("Error eliminando empleado:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <>
      <HeaderAdmin />

      <div className="employee-list-container">
        <h2>Registro de Empleados</h2>

        <button className="btn-add" onClick={() => navigate("/add-employee")}>
          + Nuevo Empleado
        </button>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Turno</th>
              <th>Inicio Contrato</th>
              <th>Fin Contrato</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No hay empleados registrados
                </td>
              </tr>
            ) : (
              empleados.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.nombre_completo}</td>
                  <td>{emp.cargo}</td>
                  <td>{emp.telefono}</td>
                  <td>{emp.correo}</td>
                  <td>{emp.turno}</td>
                  <td>{emp.inicio_contrato?.slice(0, 10)}</td>
                  <td>{emp.fin_contrato?.slice(0, 10)}</td>

                  {/* 👉 Botón Eliminar */}
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
}

export default EmployeeList;
