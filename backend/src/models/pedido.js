import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pedidoSchema = new Schema(
{
    // ID_REGISTRO_USUARIO: Quién hizo el pedido
    id_registro_usuario: {
      type: Schema.Types.ObjectId, // Tipo para referenciar otro documento
      ref: 'usuarios', // Hace referencia a la colección 'usuarios'
    required: true,
    },
    // ID_PRODUCTOS: Lista de productos comprados y su cantidad
    productos: [
    {
        id_producto: {
        type: Schema.Types.ObjectId,
          ref: 'productos', // Hace referencia a la colección 'productos'
        required: true,
        },
        cantidad: {
        type: Number,
        required: true,
          min: 1, // La cantidad debe ser al menos 1
        },
    },
    ],
    id_sucursal: { 
        type: String, // Asumimos que es un ID de sucursal simple por ahora
        trim: true
    },
    total: {
    type: Number,
    required: true,
    min: 0,
    },
    fecha: {
    type: Date,
    default: Date.now,
    },
},
{
    timestamps: true,
}
);

// Indicamos que use la colección que creaste: 'pedidos'
export default mongoose.model("Pedido", pedidoSchema, "pedidos");