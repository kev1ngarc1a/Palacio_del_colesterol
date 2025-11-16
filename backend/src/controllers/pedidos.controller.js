import Pedido from '../models/pedido.js'; 
import Product from '../models/product.js'; // Necesitas el modelo de Producto para verificar el stock

// 🟢 CREAR UN NUEVO PEDIDO (CREATE)
export const createPedido = async (req, res) => {
    // 1. Obtener datos necesarios
    // req.user.id viene del middleware authrole.js
    const id_registro_usuario = req.user.id; 
    const { productos, id_sucursal } = req.body; // Productos y sucursal vienen del frontend

    let totalCalculado = 0;
    
    try {
        // 2. Procesar los productos y calcular el total
        for (const item of productos) {
            // Busca el producto en la base de datos para obtener el precio
            const productDB = await Product.findById(item.id_producto);

            if (!productDB) {
                return res.status(404).json({ message: `Producto con ID ${item.id_producto} no encontrado.` });
            }
            
            // Asume que el modelo de producto tiene un campo 'precio'
            totalCalculado += productDB.precio * item.cantidad;
            
            // Aquí podrías agregar lógica para restar el stock si lo tuvieras
        }

        // 3. Crear el nuevo documento de pedido
        const newPedido = new Pedido({
            id_registro_usuario,
            productos,
            id_sucursal,
            total: totalCalculado, // Usamos el total calculado por seguridad
        });

        // 4. Guardar en MongoDB Atlas
        const savedPedido = await newPedido.save();

        res.status(201).json({ 
            message: "Pedido creado exitosamente.", 
            pedido: savedPedido 
        });

    } catch (error) {
        console.error("❌ Error al crear el pedido:", error);
        res.status(500).json({ message: "Error interno al procesar el pedido.", error: error.message });
    }
};

// 🟢 OBTENER MIS PEDIDOS (READ)
export const getMyPedidos = async (req, res) => {
    try {
        // Obtenemos el ID del usuario logueado del token
        const userId = req.user.id; 

        // 1. Buscar todos los pedidos hechos por este usuario
        // Usamos .populate() para que Mongoose reemplace las referencias (IDs)
        // con la información real del usuario y los productos.
        const pedidos = await Pedido.find({ id_registro_usuario: userId })
            .populate('id_registro_usuario', 'username email') // Rellena el usuario con solo nombre y email
            .populate('productos.id_producto', 'nombre_producto precio') // Rellena los datos del producto
            .sort({ fecha: -1 }); // Ordena por fecha reciente

        res.status(200).json(pedidos);

    } catch (error) {
        console.error("❌ Error al obtener los pedidos:", error);
        res.status(500).json({ message: "Error al obtener la lista de pedidos.", error: error.message });
    }
};
// ... Aquí irían updatePedido y deletePedido (si fueran necesarios)