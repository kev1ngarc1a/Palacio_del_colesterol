import Pedido from '../models/pedido.js';
import Product from '../models/product.js'; 

// 🟢 CREAR PEDIDO
export const createPedido = async (req, res) => {
    const id_registro_usuario = req.user.id;
    const { productos, id_sucursal } = req.body;

    if (!productos || productos.length === 0) {
        return res.status(400).json({ message: "El pedido debe incluir al menos un producto." });
    }

    let totalCalculado = 0;

    try {
        const productosProcesados = [];

        for (const item of productos) {
            const productDB = await Product.findById(item.id_producto);

            if (!productDB) {
                return res.status(404).json({ message: `Producto con ID ${item.id_producto} no encontrado.` });
            }

            // 🔹 CALCULAR SUBTOTAL DEL PRODUCTO
            const subtotalProducto = productDB.precio * item.cantidad;
            totalCalculado += subtotalProducto;

            // 🔹 PROCESAR ADICIONALES
            let adicionalesProcesados = [];
            let subtotalAdicionales = 0;

            if (Array.isArray(item.adicionales)) {
                adicionalesProcesados = item.adicionales.map(ad => {
                    const subAd = ad.precio * ad.cantidad;
                    subtotalAdicionales += subAd;

                    return {
                        nombre: ad.nombre,
                        precio: ad.precio,
                        cantidad: ad.cantidad
                    };
                });
            }

            totalCalculado += subtotalAdicionales;

            // 🔹 GUARDAR PRODUCTO PROCESADO
            productosProcesados.push({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                adicionales: adicionalesProcesados
            });
        }

        // 🔹 CREAR DOCUMENTO DE PEDIDO
        const newPedido = new Pedido({
            id_registro_usuario,
            productos: productosProcesados,
            id_sucursal,
            total: totalCalculado,
        });

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



// 🟢 OBTENER LOS PEDIDOS DEL USUARIO LOGUEADO
export const getMyPedidos = async (req, res) => {
    try {
        const userId = req.user.id;

        const pedidos = await Pedido.find({ id_registro_usuario: userId })
            .populate("id_registro_usuario", "username email")
            .populate("productos.id_producto", "nombre_producto precio imagen")
            .sort({ fecha: -1 });

        res.status(200).json(pedidos);

    } catch (error) {
        console.error("❌ Error al obtener los pedidos:", error);
        res.status(500).json({ message: "Error al obtener pedidos.", error: error.message });
    }
};



// 🟡 OPCIONAL: ACTUALIZAR PEDIDO (por si deseas agregarlo luego)
export const updatePedido = async (req, res) => {
    return res.status(501).json({ message: "Función no implementada aún." });
};


// 🔴 OPCIONAL: ELIMINAR PEDIDO
export const deletePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByIdAndDelete(req.params.id);

        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado." });
        }

        res.json({ message: "Pedido eliminado correctamente." });

    } catch (error) {
        console.error("❌ Error al eliminar pedido:", error);
        res.status(500).json({ message: "Error interno.", error: error.message });
    }
};
