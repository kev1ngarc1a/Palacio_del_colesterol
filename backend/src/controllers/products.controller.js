import Product from "../models/product.js";
import path from "path";
import fs from "fs";

// 🟢 Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// 🟢 Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener producto", error });
  }
};

// 🟢 Crear producto
export const createProduct = async (req, res) => {
  try {
    // 🔥 LOGS CORRECTOS AQUÍ
    console.log("BODY:", req.body);
    console.log("ADICIONALES RAW:", req.body.adicionales);

    const { nombre_producto, categoria, descripcion, precio } = req.body;

    // Procesar adicionales
    let adicionales = [];
    if (req.body.adicionales) {
      try {
        adicionales = JSON.parse(req.body.adicionales);
      } catch (err) {
        console.error("❌ Error al parsear adicionales:", err);
      }
    }

    let imagen = null;
    if (req.file) {
      imagen = `/uploads/${req.file.filename}`;
    }

    const newProduct = new Product({
      nombre_producto,
      categoria,
      descripcion,
      precio,
      imagen,
      adicionales,
      creadoPor: req.user?.id || null,
    });

    await newProduct.save();
    return res.status(201).json(newProduct);

  } catch (error) {
    console.error("❌ ERROR CREATE PRODUCT:", error);
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// 🟢 Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 LOGS CORRECTOS AQUÍ
    console.log("BODY UPDATE:", req.body);
    console.log("ADICIONALES UPDATE RAW:", req.body.adicionales);

    const { nombre_producto, categoria, descripcion, precio } = req.body;

    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    // Procesar adicionales
    if (req.body.adicionales) {
      try {
        product.adicionales = JSON.parse(req.body.adicionales);
      } catch (err) {
        console.error("❌ Error al parsear adicionales:", err);
      }
    }

    // Imagen
    if (req.file) {
      if (product.imagen) {
        const oldImagePath = path.join(process.cwd(), product.imagen);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      product.imagen = `/uploads/${req.file.filename}`;
    }

    // Campos normales
    product.nombre_producto = nombre_producto || product.nombre_producto;
    product.categoria = categoria || product.categoria;
    product.descripcion = descripcion || product.descripcion;
    product.precio = precio || product.precio;

    await product.save();
    res.json({ message: "Producto actualizado correctamente", product });

  } catch (error) {
    console.error("❌ ERROR UPDATE:", error);
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// 🟢 Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    // Eliminar imagen
    if (product.imagen) {
      const imagePath = path.join(process.cwd(), product.imagen);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
