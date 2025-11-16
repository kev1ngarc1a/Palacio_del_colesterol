import express from "express";
import {
  crearEmpleado,
  obtenerEmpleados,
  eliminarEmpleado,
} from "../controllers/empleados.controllers.js";

const router = express.Router();

router.post("/empleados", crearEmpleado); // Guardar empleado
router.get("/empleados", obtenerEmpleados); // Listar empleados
router.delete("/empleados/:id", eliminarEmpleado);

export default router;
