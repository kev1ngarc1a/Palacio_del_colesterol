import { Router } from 'express';
import { createPedido, getMyPedidos } from '../controllers/pedidos.controller.js';
import { verifyTokenAndRole } from '../middlewares/authrole.js'; 
// Importamos el middleware de rol

const router = Router();

// Todas las rutas de pedido requieren que el usuario esté logueado
router.use(verifyTokenAndRole(['usuario', 'admin'])); 

// Ruta para que un usuario cree un nuevo pedido
router.post('/pedidos', createPedido); 

// Ruta para que un usuario vea su historial de pedidos
router.get('/pedidos/my-orders', getMyPedidos);

export default router;