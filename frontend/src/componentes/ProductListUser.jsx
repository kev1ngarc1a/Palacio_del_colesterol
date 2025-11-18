import React, { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCardUser from "../componentes/ProductCardUser";
import HeaderUser from "../componentes/HeaderUser";
import Footer from "../componentes/Footer";

function ProductListUser() {
  const { products, loadProducts, loading } = useProducts();

  useEffect(() => {
    loadProducts(); // carga los productos del backend al montar el componente
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fff7e6] text-gray-800">

      {/* Header usuario */}
      <HeaderUser />

      {/* Contenido principal */}
      <main className="flex-grow p-8">
        {loading ? (
          <p className="text-center text-gray-500 py-10 text-lg">
            Cargando productos...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-10 text-lg">
            No hay productos registrados.
          </p>
        ) : (
          <div className="product-list">
            {products.map((product) => (
              <ProductCardUser key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductListUser;
