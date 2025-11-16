import { createContext, useState, useContext, useEffect } from "react";
import axios from '../api/axios'; // Importa tu instancia configurada

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true); // <-- definir loading

  const signup = async (userData) => {
    try {
      const res = await axios.post('/register', userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response?.data || ["Error en el registro"]);
    }
  };

  const signin = async (credentials) => {
    try {
      await axios.post('/login', credentials);
      const profileRes = await axios.get('/profile');
      setUser(profileRes.data);
      setIsAuthenticated(true);
      setErrors([]);
      return profileRes.data;
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUser(null);
      if (Array.isArray(error.response?.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response?.data?.message || "Error al iniciar sesión"]);
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      //Usar axios.post a /logout
      await axios.post('/logout'); 
    } catch (error) {
        console.error("Error al limpiar cookie en backend", error);
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checklogin() {
      setLoading(true);
      try {
        // verityTokenRequest debe hacer la petición al servidor con credentials
        const res = await axios.get('/profile');; // no dependa de Cookies.get (httpOnly)
        if (res.status === 200 && res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    checklogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading, // <-- exportar loading para controlar render en Navbar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
