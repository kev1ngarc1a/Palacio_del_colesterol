import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./componentes/ProtectedRoute";
import Tienda from "./componentes/Tienda";
import "uikit/dist/css/uikit.min.css";
import Empanadas from "./pages/Empanadas";
import Hamburguesa from "./pages/Hamburguesa";
import Papas from "./pages/Papas";
import Pasteles from "./pages/Pasteles";
import Caliente from "./pages/Caliente";
import Picada from "./pages/Picada";
import Pollo from "./pages/Pollo";
import Relleno from "./pages/Relleno";
import Inicio from "./componentes/Inicio";
import Login from "./componentes/login";
import Register from "./componentes/register";
import Navbar from "./componentes/Navbar"; // Se mantiene la importación, pero se usa fuera de Routes
import Admin from "./componentes/Admin";
import AddProduct from "./pages/AddProduct";
import ProductList from "./componentes/ProductList";
import EditProduct from "./pages/EditProduct";
import UserPanel from "./pages/UserPanel";
import AddEmployee from "./pages/AddEmployee";
import EmployeeList from "./pages/EmployeeList";
import ProductDetailUser from "./componentes/ProductDetailUser";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Opcional: Si quieres que el Navbar aparezca en todas las páginas, 
          colócalo aquí fuera de <Routes>. Si ya está en <Header/>, omítelo. */}
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/empanadas" element={<Empanadas />} />
          <Route path="/hamburguesa" element={<Hamburguesa />} />
          <Route path="/papas" element={<Papas />} />
          <Route path="/pasteles" element={<Pasteles />} />
          <Route path="/caliente" element={<Caliente />} />
          <Route path="/picada" element={<Picada />} />
          <Route path="/pollo" element={<Pollo />} />
          <Route path="/relleno" element={<Relleno />} />
          <Route path="/tienda" element={<Tienda />} />
          {/* RUTA /Navbar ELIMINADA */}

          {/* RUTAS PROTEGIDAS (Solo accesibles si el usuario está logueado) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/add-product" element={<AddProduct />} />

            {/* CORRECCIÓN: Usar ProductList para ver la lista de productos */}
            <Route path="/view-products" element={<ProductList />} />
            <Route path="/add-employee" element={<AddEmployee />} />
            <Route path="/employee-list" element={<EmployeeList />} />

            {/* ProductList y EditProduct ya son funcionales aquí */}
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/products/:id" element={<EditProduct />} />
            <Route path="/usuario" element={<UserPanel />} />
            <Route path="/producto/:id" element={<ProductDetailUser />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
