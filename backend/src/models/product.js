import mongoose from "mongoose";

const adicionalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 }
});

const productSchema = new mongoose.Schema(
  {
    imagen: { type: String },

    nombre_producto: {
      type: String,
      required: true,
      trim: true,
    },

    categoria: {
      type: String,
      required: true,
      trim: true,
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    descripcion: {
      type: String,
      trim: true,
    },

    // Adicionales para el producto
    adicionales: {
      type: [adicionalSchema],
      default: [],
    },

    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuarios",
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema, "productos");
