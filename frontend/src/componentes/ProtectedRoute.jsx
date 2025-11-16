import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Obtiene el estado de autenticación y carga del contexto
    const { isAuthenticated, loading } = useAuth();

    // Muestra un spinner o mensaje de carga mientras se verifica el token
    if (loading) {
        // Puedes reemplazar esto con tu propio spinner de UIkit si lo deseas
        return (
            <div className="uk-section uk-text-center uk-padding-large">
                <span uk-spinner="ratio: 3"></span>
                <p>Cargando información de usuario...</p>
            </div>
        );
    }

    // Si no está autenticado y no está cargando, redirige al usuario a la página de login
    if (!isAuthenticated && !loading) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, renderiza la ruta anidada (el componente que se quiere proteger)
    return <Outlet />;
};

export default ProtectedRoute;