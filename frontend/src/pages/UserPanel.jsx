import { useAuth } from "../context/AuthContext";

const UserPanel = () => {
    const { user, logout } = useAuth();
    
    return (
    <div className="uk-container uk-margin-top">
    <h2 className="uk-heading-line uk-text-center">
        <span>Bienvenido {user?.username}</span>
    </h2>

    <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-margin-auto">
        <p><strong>Nombre:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Teléfono:</strong> {user?.phone}</p>
        <p><strong>Rol:</strong> {user?.rol}</p>

        <button
        className="uk-button uk-button-danger uk-margin-top"
        onClick={logout}
        >
        Cerrar sesión
        </button>
    </div>
    </div>
);
};

export default UserPanel;