import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    nombre_completo: {
      type: String,
      required: true,
      trim: true,
    },
    cargo: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
    },
    correo: {
      type: String,
      lowercase: true,
      trim: true,
    },
    direccion: {
      type: String,
    },
    turno: {
      type: String,
      enum: ["Mañana", "Tarde", "Noche"],
      required: true,
    },
    inicio_contrato: {
      type: Date,
      required: true,
    },
    fin_contrato: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
