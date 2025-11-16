import mongoose from "mongoose";
export const connectDB = async () => {
  // siempre va el try catch en las conexiones a la base de datos
  try {
    await mongoose.connect(
      "mongodb+srv://kevin_user:kevin2004@cluster0.fbfhs7y.mongodb.net/Proyecto0DB?appName=Cluster0"
      
    );
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
