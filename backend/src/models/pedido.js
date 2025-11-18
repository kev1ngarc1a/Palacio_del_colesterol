import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pedidoSchema = new Schema(
  {
    id_registro_usuario: {
      type: Schema.Types.ObjectId,
      ref: "usuarios",
      required: true,
    },

    productos: [
      {
        id_producto: {
          type: Schema.Types.ObjectId,
          ref: "productos",
          required: true,
        },

        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },

        // 🔹 ADICIONALES opcionales
        adicionales: [
          {
            nombre: {
              type: String,
              required: false, // opcional
            },
            precio: {
              type: Number,
              required: false, // opcional
            },
            cantidad: {
              type: Number,
              min: 1,
              required: false, // opcional
            },
          },
        ],
      },
    ],

    id_sucursal: {
      type: String,
      trim: true,
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

export default mongoose.model("Pedido", pedidoSchema, "pedidos");
