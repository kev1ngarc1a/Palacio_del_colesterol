import Employee from "../models/employee.js";

// 👉 Crear empleado
export const crearEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Employee(req.body);
    await nuevoEmpleado.save();

    res.status(201).json({
      message: "Empleado guardado correctamente",
      empleado: nuevoEmpleado,
    });
  } catch (error) {
    console.error("Error al guardar empleado:", error);
    res.status(500).json({ message: "Error al guardar empleado" });
  }
};

// 👉 Obtener todos los empleados
export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Employee.find();
    res.json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ message: "Error al obtener empleados" });
  }
};

// 👉 Eliminar empleado
export const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoEliminado = await Employee.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    res.status(500).json({ message: "Error al eliminar empleado" });
  }
};
