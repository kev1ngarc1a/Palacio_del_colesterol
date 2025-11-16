import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\d+$/.test(v),
        message: (props) => `${props.value} no es un número válido`,
      },
    },
    rol: {
      type: String,
      enum: ["usuario", "admin"], // 👈 dos roles posibles
      default: "usuario", // por defecto será usuario normal
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
